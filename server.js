const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const methodOverride = require("method-override");
const morgan = require("morgan");

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
});

// importing Model (blueprint) from MongoDB:
const Cheese = require('./models/cheese.js');

// middleware:
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

// Landing page/ servers title message:
app.get('/', async (req, res) => {
    res.render('index.ejs')
})

// GET - index route / READ
app.get("/cheese", async (req, res) => {
    const allCheese = await Cheese.find();
    console.log(allCheese)
    //res.send("welcome to the cheese index")
    res.render("cheesedata/index.ejs", { cheese: allCheese })
})


// new = GET / READ, step to prep for CREATE:
app.get('/cheese/new', async (req, res) => {
    res.render('cheesedata/new.ejs');
})

// show Id = GET / READ
app.get('/cheese/:cheeseId', async (req,res) => {
     const foundCheese = await Cheese.findById(req.params.cheeseId);
     res.render("cheesedata/show.ejs", { cheese : foundCheese})
 })

// POST / CREATE:
app.post("/cheese", async (req, res) => {
    await Cheese.create(req.body);
    res.redirect("/cheese")
})

// DELETE METHOD = DELETE CRUD OPERATION
app.delete("/cheese/:cheeseId", async (req, res) => {
    await Cheese.findByIdAndDelete(req.params.cheeseId);
    res.redirect("/cheese")
})

// GET / READ (for edit)
app.get("/cheese/:cheeseId/edit", async (req, res) => {
    const foundCheese = await Cheese.findById(req.params.cheeseId);
    res.render("cheesedata/edit.ejs", {
        cheese: foundCheese,
    })
})

// PUT / UPDATE (for updating, follow-up to the edit step^)
app.put("/cheese/:cheeseId", async (req, res) => {
    await Cheese.findByIdAndUpdate(req.params.cheeseId, req.body);
    res.redirect(`/cheese/${req.params.cheeseId}`)
})


app.listen(3000, () => {
    console.log('Listening on local host 3000!')
})