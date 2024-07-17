
const mongoose = require('mongoose');

// Replace the connection URL with your MongoDB Atlas cluster URL
const connect = mongoose.connect("mongodb+srv://amaina:kiragu333@cluster2.yrnwah6.mongodb.net/", 
    {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Check if the database is connected
connect.then(() => {
    console.log("Database Connected Successfully");
}).catch((err) => {
    console.error("Database connection error:", err);
});

// Create Schema
const Loginschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String // URL or file path for the profile picture
    },
    salary: {
        type: Number
    }
});

// Collection model
const collection = mongoose.model("users", Loginschema);

module.exports = collection;
