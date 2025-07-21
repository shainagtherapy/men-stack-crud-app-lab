const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

//const mongoose = require('mongoose')

// const cheeseSchema = new mongoose.Schema({
//     name: {type: String, required: true},
//     country: {type: String, required: true},
//     milkType: {type: String, required: true},
//     pairing: {type: String, required: true},
//     flavorProfile: {type: String, required: true},
//     intensity: {type: Number, required: true},
// // image: String; <-- from lecture example
// })

// const Cheese = mongoose.model('cheese', cheeseSchema)
// module.exports = Cheese

app.get('/', (req, res) => {
    res.send('Hello there!')
})

app.listen(3000, () => {
    console.log('Listening on local host 3000!')
})