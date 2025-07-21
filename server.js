const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
});

// importing Model (blueprint) from MongoDB:
const Cheese = require('./models/cheese.js');

// middleware:
app.use(express.urlencoded({ extended: false }));
//app.use(methodOverride("_method"));
//pp.use(morgan("dev"));

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


// GET / READ, step to prep for CREATE:
app.get('/cheese/new', async (req, res) => {
    res.render('cheesedata/new.ejs');
})

// POST / CREATE:
app.post("/cheese", async (req, res) => {
    await Cheese.create(req.body);
    res.redirect("/cheese/new")
})






app.listen(3000, () => {
    console.log('Listening on local host 3000!')
})