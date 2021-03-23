const mongoose = require('mongoose')
const PointSchema = require('./Utils/PointSchema')

const Schema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        require: true, 
        lowercase: true
    },
    password: {
        type: String,
        require: true,
    },
    location: {
        type: PointSchema,
        index: '2dsphere',
    }
})

module.exports = mongoose.model('User', Schema)