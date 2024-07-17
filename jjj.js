const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const collection = require("./config");
const bcrypt = require('bcrypt');
const multer = require('multer');

const app = express();

// Middleware for parsing JSON data
app.use(express.json());

// Middleware for serving static files
app.use(express.static("public"));

// Middleware for parsing URL-encoded data
app.use(express.urlencoded({ extended: false }));

// Use EJS as the view engine
app.set("view engine", "ejs");

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/bio", (req, res) => {
    res.render("bio");
});

app.get("/home", (req, res) => {
    res.render("home"); // Assuming you have a home.ejs file in your views directory
});

// Register User
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    };

    const existingUser = await collection.findOne({ name: data.name });

    if (existingUser) {
        res.send('User already exists. Please choose a different username.');
    } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword;
        const userdata = await collection.insertMany(data);
        console.log(userdata);
        res.redirect('/login');
    }
});

// Login user 
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            res.send("User name not found");
        } else {
            const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
            if (!isPasswordMatch) {
                res.send("Wrong Password");
            } else {
                res.render("bio");
            }
        }
    } catch {
        res.send("Wrong Details");
    }
});

// Save Bio Information
app.post("/save-bio", upload.single('profilepic'), async (req, res) => {
    try {
        const username = req.body.name;
        const profilePic = req.file ? req.file.path : null;
        const salary = req.body.salary;

        const user = await collection.findOneAndUpdate(
            { name: username },
            { profilePic: profilePic, salary: salary },
            { new: true }
        );

        if (user) {
            // Send message and then redirect to home page
            setTimeout(() => {
                res.redirect('/home');
            }, 3000); // 3000 milliseconds = 3 seconds
        } else {
            res.send('User not found');
        }
    } catch (error) {
        console.error("Error saving bio information:", error);
        res.send('Error saving bio information');
    }
});



// Define Port for Application
const port = 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
