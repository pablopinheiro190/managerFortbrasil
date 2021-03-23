const mongoose = require('mongoose')
const PointSchema = require('./Utils/PointSchema')

const Schema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    adress: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        require: true, 
        lowercase: true
    },
    type: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    location: {
        type: PointSchema,
        index: '2dsphere',
    },
    order: {
        type: Number,
    }
})

module.exports = mongoose.model('Store', Schema)