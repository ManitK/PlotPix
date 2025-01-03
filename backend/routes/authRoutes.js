const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userExists = await User.findOne({ username });
        if (userExists) return res.status(400).json({ message: 'Username already exists' });

        const emailExists = await User.findOne ({ email });
        if (emailExists) return res.status(400).json({ message: 'Email already exists' });

        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ success: true, message: 'User registered successfully' });
    } 
    catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Invalid username or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid username or password' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // res.status(200).json({ success: true, token, username: user.username });
        res.status(200).json({ success: true, token, user: { username: user.username, email: user.email, progress: user.progress } });
    } 
    catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Update Progress Route
router.post('/update-progress', async (req,res) => {
    const { username,genre,level} = req.body;

    try{
        const user = await User.findOne({username});
        if (!user) return res.status(400).json({ message: 'User not found' });

        user.progress.set(genre,level);
        await user.save();
        res.status(200).json({ success: true, message: 'Progress updated successfully' });
    }
    catch (error){
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get User Progress Route
router.post('/get-progress', async (req,res) => {
    const {username} = req.body;

    try{
        const user = await User.findOne({username});
        if (!user) return res.status(400).json({ message: 'User not found' });

        res.status(200).json({ success: true, progress: user.progress });
    }
    catch (error){
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;