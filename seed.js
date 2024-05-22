const Restaurant = require("./models/index")
const Menu = require('./models/index')
const Item = require('./models/index')
const { seedRestaurant } = require("./seedData");
const { seedMenu } = require("./seedData");
const { seedItem } = require("./seedData");
const db = require("./db/connection");
const { Sequelize } = require("sequelize");


const syncSeed = async () => {
    await sequelize.sync({ force: true });
    await Restaurant.bulkCreate(seedRestaurant)
    await Menu.bulkCreate(seedMenu)
    await Item.bulkCreate(seedItem)
  


}

syncSeed() 

module.exports = syncSeed()