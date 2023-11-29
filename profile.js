const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the user schema
const userSchema = new mongoose.Schema(
    {
        actuales: {
            type: [Number],
            default: [0, 0, 0],
        },
        max: {
            type: [Number],
            default: [0, 0, 0],
        },
        dosis: {
            type: [Number],
            default: [0, 0, 0],
        },
        cont: {
            type: Number,
            default: 0,
        },
        user: {
            type: String,
            required: true,
            unique: true,
        },
        did: {
            type: Number,
            required: true,
            unique: true,
        },
        temperature: {
            type: Number,
            default: 0,
        },
        temperatures: {
            type: [
                {
                    value: {
                        type: Number,
                        required: true,
                    },
                    date: {
                        type: String,
                        default: "",
                    },
                },
            ],
            default: [{ value: 0, date: "Off" }],
        },
        buttons: {
            type: [Number],
            default: [0, 0, 0],
        },
    },
    {
        timestamps: true,
    }
);

const Profile = mongoose.model("Profile", userSchema);

module.exports = Profile;
