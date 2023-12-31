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
    cont: {
        type: Number,
        default: 0
    },
    user: {
        type: String,
        required: true,
        unique: true
    },
    did: {
        type: String,
        required: true,
        unique: true
    },
    temperature : {
        type: Number,
        default: 0,
    },
    temperatures: [{
        value: {
            type: Number,
            required: true,
            default: 0
        },
        date: {
            type: String,
            default: Date.now().toLocaleString()
        }
    }], 
    buttons : {
        type: [Number],
        default: [0,0,0]
    },
},{
    timestamps: true
});

const Profile = mongoose.model('Profile', userSchema);

module.exports = Profile;