const express = require('express');
const multer = require('multer');
const collection = require('../config');

const router = express.Router();

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

router.get("/bio", (req, res) => {
    res.render("bio");
});

// Save Bio Information
router.post("/save-bio", upload.single('profilepic'), async (req, res) => {
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
            res.send('Bio information updated successfully');
        } else {
            res.send('User not found');
        }
    } catch (error) {
        console.error("Error saving bio information:", error);
        res.send('Error saving bio information');
    }
});

module.exports = router;
