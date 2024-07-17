const express = require('express');
const bcrypt = require('bcrypt');
const collection = require('../config');

const router = express.Router();

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

// Register User
router.post("/signup", async (req, res) => {
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
router.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            res.send("User name not found");
        } else {
            const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
            if (!isPasswordMatch) {
                res.send("Wrong Password");
            } else {
                res.render("home");
            }
        }
    } catch {
        res.send("Wrong Details");
    }
});

module.exports = router;
