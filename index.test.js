const request = require("supertest")
const app = require("./src/app.js")   //pulling in app file 
const { Restaurant } = require("./models") // pulling in restaurant from models 
const syncSeed = require("./seed.js") //method from seed.js - means running on a clean database. 
let restQuantity // consistent data 

beforeAll (async () => {   // this means it runs from the seed and runs the syncseed
    await syncSeed()
    const restaurants = await Restaurant.findAll({}) //do this to check quantity at any point 
    restQuantity = restaurants.length
})

describe('Restaurant', () => {
    
    test('GET will return status code of 200', async () => {
        const response = await request(app).get("/restaurant") // checking that test is successful ie code 200
        expect(response.statusCode).toBe(200)
    })

    test('GET restaurant returns an array of restaurants', async () => {
        const response = await request(app).get("/restaurant")
        expect(Array.isArray(response.body)).toBe(true)  //using built in method to check the array is an array
        expect(response.body[0]).toHaveProperty("cuisine")  // this checks it has a specific property 
    })

    test('GET restaurant returns the correct number of restauarants', async () => {
        const response = await request(app).get("/restaurant")
        expect(response.body.length).toEqual(restQuantity)  //checking length is correct in line with variable declared above 
    })

    test('GET restaurant returns an array of restaurants', async () => {
        const response = await request(app).get("/restaurant")
        expect(response.body).toContainEqual(   //need to use toContainEqual as it's an array
            expect.objectContaining({
                name: "Applebees", 
                location: "Texas", 
                cuisine: "FastFood"
            })
        )
    })

    test('GET restaurant:id returns correct data', async () => {
        const restaurantId = 1
        const response = await request(app).get("/Restaurant/1")
        expect(response.body).toEqual(   //can use .toEqual as not an array as only taking 1 item from the array 
            expect.objectContaining({
            id: 1,
            name: "AppleBees",
            location: "Texas",
            cuisine: "FastFood"
        })
    )
})

    test('POST restaurant returns an array of restaurants including new values', async () => {
        const response = await request(app)
        .post("/restaurant")   //post ie to update
        .send({name: "McDonalds", location: "Maghull", cuisine: "Fastfood"})  //send the information to the array  // THIS IS METHOD CHAINING 
        expect(response.body.length).toEqual(restQuantity + 1)    //using restQuantity as in starting and adding 1 
    })

    test('PUT restaurant returns an array of restaurants', async () => {
        await request(app)
        .put("/restaurant/1")
        .send({ name: "McDonalds", location: "Maghull", cuisine: "FastFood"}) // noting what info will be sent to replace item 1
        const restaurant = await Restaurant.findbyPk(1)
        expect(restaurant.name).toEqual("McDonalds")
    })

    test("delete db by id", async () => {
        await request(app).delete("/restaurant/1")   //deleted item 1 from db
        const restaurants = await Restaurant.findAll({})
        expect(restaurant.length).toEqual(restQuantity) 
        expect(restaurant[0].id).not.toEqual(1) //checking first 1 does not have an id of 1 as should have been deleted. 
    })
})
