const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema
const userSchema = new mongoose.Schema({
    actuales: {
        type: [Number],
        default: [0,0,0]
    },
    max: {
        type: [Number],
        default: [0,0,0]
    },
    dosis: {
        type: [Number],
        default: [0,0,0]
    },
    nuevo: {
        type: Boolean,
        default: true
    },
    user: {
        type: String,
        required: true,
        unique: true
    },
    did: {
        type: Number,
        required: true,
        unique: true
    },
    temperature : {
        type: Number,
        default: 0,
    },
    temperatures : {
        type: [Number],
        default: []
    },
    buttons : {
        type: [Number],
        default: [0,0,0]
    },
    date: {
        type: [Date],
        default: [Date.now]
    }
},{
    timestamps: true
});

const Profile = mongoose.model('Profile', userSchema);

module.exports = Profile;