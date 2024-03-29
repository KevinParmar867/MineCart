const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "First Name cannot exceed 30 characters"],
        minLength: [3, "First Name should have more than 4 characters"],
    },

    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        // Prevent the password from being returned
        select: false,
    },

   
    role: {
        type: String,
        required: true,
        default: "user",
        // user and admin 
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }
},
    {
        timestamps: true,
        minimize: false,
    }
);

//Encrypt password before saving to DB
userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) {
        return next();
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;