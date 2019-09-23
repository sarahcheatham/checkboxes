const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const priceSchema = new Schema({
    self: {
        type: Number
    },
    remote: {
        type: Number
    },
    onsite: {
        type: Number
    }
});

const opportunitySchema = new Schema({
    opp:{
        type: String
    },
    price: [priceSchema]
});

module.exports = mongoose.model("Opportunity", opportunitySchema);