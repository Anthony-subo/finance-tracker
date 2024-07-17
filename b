const mongoose = require('mongoose');

// Replace the connection URL with your MongoDB Atlas cluster URL
const connect = mongoose.connect("mongodb+srv://amaina:kiragu333@cluster2.yrnwah6.mongodb.net/");

// Check database connected or not
connect.then(() => {
    console.log("Database Connected Successfully");
}).catch((err) => {
    console.error("Database connection error:", err);
});

// Create Schema
const Loginschema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Collection model
const collection = mongoose.model("users", Loginschema);

module.exports = collection;