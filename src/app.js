const express = require("express");
const app = express();
const { Restaurant } = require("../models/index")
const { Menu } = require("../models/index")
const { Item } = require("../models/index")
const db = require("../db/connection");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const { check, validationResult } = require("express-validator")

//TODO: Create your GET Request Route Below: 
app.get("/restaurants", async (req, res) => {
    const restaurants = await Restaurant.findAll({});
    res.json(restaurants)
});

app.get("/restaurant/:id", async (req, res) => {
    const number = req.params.id
    const restaurant = await Restaurant.findByPk(number)
    res.json(restaurant)
})

app.post("/restaurant", [
    check("name").notEmpty().trim(),
    check("location").notEmpty().trim(),
    check("cuisine").notEmpty().trim()
] function (req, res){
    const errors = await validationResult(req)
    if (errors.isEmpty()) {
        return.json({ error: errors.array() })
    } else {
        Restauarant.push(req.body)
        res.json(Restaurant)
        }
    })


app.put("/restaurants/:id", async (req, res) => {
    const updatedRest = await Restaurant.update(req.body, {where: {id: req.params.id}})
    res.json(updatedRest)
})

app.delete("/restaurants/:id", async (req, res) => {
    const deletedRest = await Restaurant.destroy({where: {id: req.params.id}})
    res.json(deletedRest)
})

module.exports = app;