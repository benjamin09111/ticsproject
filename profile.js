const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema
const userSchema = new mongoose.Schema({
    max: {
        type: [Number],
        default: [-1,-1,-1]
    },
    dosis: {
        type: [Number],
        default: [-1,-1,-1]
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
        default: [-1,-1,-1]
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