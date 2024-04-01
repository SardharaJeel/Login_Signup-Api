const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Email: String,
    Otp: String
})

module.exports = mongoose.model("otp", userSchema)