const Product = require('../models/productModel');
const asyncHandler = require("express-async-handler");

// Controller function to add a new product
const addProduct = asyncHandler(async (req, res) => {
    // Retrieve product details from request body
    const { name, description, price, category, quantity } = req.body;

    const product = await Product.create({
        name,
        description,
        price,
        category,
        quantity,
        imageUrl: req.file ? req.file.filename : null,
    });

    // Send success response
    res.status(201).json({ message: 'Product added successfully', product });
});

// Controller function to update a product
const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id);

    const { name, description, price, category, imageUrl, quantity } = req.body;

    const product = await Product.findByIdAndUpdate(id, {
        name,
        description,
        price,
        category,
        imageUrl: req.file ? req.file.filename : imageUrl,
        quantity,
        updatedAt: new Date()
    }, { new: true });
    res.json({ message: 'Product updated successfully', product });
});

// Controller function to delete a product
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    // Send success response
    res.json({ message: 'Product deleted successfully' });
});

// Controller function to get all products
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find().sort("-createdAt");
    if (!products) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
    res.status(200).json(products);
});

module.exports = { addProduct, updateProduct, deleteProduct, getProducts };
