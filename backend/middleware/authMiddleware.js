// const catchAsyncErrors = require("./catchAsyncErrors");
const dotenv = require('dotenv').config();
const asyncHandler = require("express-async-handler");
const User = require("../models/authModel");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log(req.file);
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, please login",
            });
        }

        const verified = await jwt.verify(token, process.env.JWT_SECRET);

        // Get user id from token
        const user = await User.findById(verified.id).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }
        if (user.role === "suspended") {
            return res.status(400).json({
                success: false,
                message: "User has been suspended, please contact support",
            });
        }
        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Not authorized, please login",
        });
    }
});

const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(401).json({
            success: false,
            message: "Not authorized as an admin",
        });
    }
};

module.exports = { protect, adminOnly };