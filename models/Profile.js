const {Schema, model} = require("mongoose")

const schema = new Schema({
    name: {type: String, required: true, unique: true},
    specific: {type: String, required: false},
    balance: {type: Number, default: 0},
    date: {type: Date, default: Date.now}
})

module.exports = model("Profile", schema)