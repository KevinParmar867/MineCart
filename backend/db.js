const mongoose = require("mongoose");

const mongoURL = process.env.MONGO_URL || "mongodb://0.0.0.0:27017/MineCart";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

module.exports = connectToMongo;