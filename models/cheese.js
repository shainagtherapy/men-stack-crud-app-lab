const mongoose = require('mongoose');

const cheeseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    coo: {type: String, required: true},
    milkType: {type: String, required: true},
    flavorProfile: {type: String, required: true},
    intensity: {type: Number, required: true},
});

const Cheese = mongoose.model("Cheese", cheeseSchema);
module.exports = Cheese;