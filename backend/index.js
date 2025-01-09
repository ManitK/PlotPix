// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();

// cors
app.use(cors());
app.use(bodyParser.json());

const mongoURI = process.env.NODE_ENV === 'production' 
    ? process.env.MONGO_URI
    : 'mongodb://localhost:27017/mern-auth';

console.log("Using Mongo URI:", mongoURI);

// db conn
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// routes
app.use('/api/auth', authRoutes); 

// starting server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
