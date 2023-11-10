const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema
const userSchema = new mongoose.Schema({
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
    }
},{
    timestamps: true
});

const Profile = mongoose.model('Profile', userSchema);

module.exports = Profile;