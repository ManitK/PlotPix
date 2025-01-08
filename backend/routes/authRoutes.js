const express = require('express');
const app = express();
app.use(express.json());

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

        // const newUser = new User({ username, email, password });
        const newUser = new User({username, email, password, progress: {}, score: 0});
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
router.post('/update-progress/:username', async (req,res) => {
    const {genre, level} = req.body;

    try{
        const user = await User.findOne({ username: req.params.username });
        if (!user) return res.status(400).json({ message: 'User not found' });

        // console.log('Existing Progress:', user.progress);
        user.progress[genre] = level;
        // console.log('Updated Progress:', user.progress);
        user.markModified('progress');
        await user.save();
        res.status(200).json({ success: true, message: 'Progress updated successfully' });
    }
    catch (error){
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get User Progress Route
router.get('/get-progress/:username', async (req,res) => {

    try{
        const user = await User.findOne({username: req.params.username});
        if (!user) return res.status(400).json({ message: 'User not found' });

        res.status(200).json({ success: true, progress: user.progress });
    }
    catch (error){
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Update User Score Route
router.post('/update-score/:username', async (req,res) => {
    const {score} = req.body;

    try{
        const user = await User.findOne({username: req.params.username});
        if (!user) return res.status(400).json({ message: 'User not found' });

        user.score = score;
        await user.save();

        res.status(200).json({ success: true, message: 'Score updated successfully' });
    }
    catch (error){
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get User Score Route
router.get('/get-score/:username', async (req,res) => {

    try{
        const user = await User.findOne({username: req.params.username});
        if (!user) return res.status(400).json({ message: 'User not found' });

        // res.setHeader('Content-Type', 'application/json');
        // res.type('json');
        res.status(200).json({ success: true, score: user.score });
    }
    catch (error){
        res.status(500).json({ success: false, message: 'Server error' });
    }

});

// Get All Scores Route
router.get('/get-leaderboard', async (req,res) => {

    try{
        const users = await User.find({}, { username: 1, score: 1, _id: 0}).sort({ score: -1 });

        const leaderboardDict = Object.fromEntries(
            users.map(user => [user.username, user.score])
        );

        res.status(200).json({ success: true, scores: leaderboardDict });
    }
    catch (error){
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;