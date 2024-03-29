const asyncHandler = require("express-async-handler");
const User = require("../models/authModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const { hashToken, generateToken, decrypt, encrypt } = require("../utils/hash");


//Done Register User
exports.registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please fill in all required fields",
        });
    }
    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password must be up to 6 characters",
        });
    }

    // Check if user email already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({
            success: false,
            message: "Email has already been registered",
        });
    }


    // Create new user
    const user = await User.create({
        name,
        email,
        password,
    });

    //   Generate JWT Token
    const token = await generateToken(user._id);

    // Send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: "none",
        secure: true,
    });

    if (user) {
        const { _id, name, email, photo, phone, bio, isVerified, role } = user;
        res.status(201).json({
            success: true,
            message: "Register Successfully",
            _id,
            name,
            email,
            photo,
            phone,
            bio,
            isVerified,
            role,
            token,
        });
    } else {
        return res.status(400).json({
            success: false,
            message: "Invalid user data",
        });
    }
});

//Done Login User
// loginToken used in save Login code 
exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate Request
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please add email and password",
        });
    }

    // Check if user exists
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User not found, please signup",
        });
    }

    // User exists, check if password is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (!passwordIsCorrect) {
        return res.status(400).json({
            success: false,
            message: "Invalid email or password",
        });
    }

    //   Generate Token

    const token = generateToken(user._id);

    if (user && passwordIsCorrect) {

        const options = {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), // 1 day
            sameSite: "none",
            secure: true,
        };

        const { _id, name, email, photo, phone, bio, isVerified, role } = user;
        return res.status(200).cookie("token", token, options).json({
            success: true,
            message: "Login Successfully",
            _id,
            name,
            email,
            photo,
            phone,
            bio,
            isVerified,
            role,
        });
    } else {
        return res.status(400).json({
            success: false,
            message: "Something went wrong, please try again",
        });
    }
});

//Done Logout User
exports.logout = asyncHandler(async (req, res) => {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure: true,
    });
    return res.status(200).json({
        success: true,
        message: "Logout Successfully"
    });
});

//Done Get Login Status
exports.loginStatus = asyncHandler(async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json(false);
    }
    // Verify Token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified) {
        return res.json(true);
    }
    return res.json(false);
});

//getUserData

exports.getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        const { _id, name, email, photo, phone, bio, isVerified, role, vToken } =
            user;

        return res.status(200).json({
            success: true,
            _id,
            name,
            email,
            photo,
            phone,
            bio,
            isVerified,
            role,
            vToken,
        });
    } else {
        return res.status(400).json({
            success: false,
            message: "User Not Found",
        });
    }
});


