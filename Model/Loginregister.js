const mongoose = require('mongoose')

const Loginregister = new mongoose.Schema({
    Name: String,
    Email: String,
    Password: String
})

module.exports = mongoose.model('Login_Register', Loginregister)