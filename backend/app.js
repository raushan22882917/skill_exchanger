require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const app = express();
const userRouter = require('./routes/userRouter');
const homeRouter = require('./routes/homeRouter');
const adminRouter = require('./routes/adminRouter');
const swipeRouter = require('./routes/swipeRouter');
const utilRouter = require('./routes/utilRouter');
const emailRoutes = require('./routes/emailRoutes'); // Import the email routes
const cookieParser = require('cookie-parser');
const cors = require('cors');

const PORT = process.env.PORT || 5000; // Provide a default value for PORT if it's missing in .env

// Connect to the database
connectDB();

// Middleware setup
app.use(express.json());
app.use(cookieParser());

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL, // Use the FRONTEND_URL from .env
    credentials: true
}));

// Define routes
app.use('/user', userRouter);
app.use('/home', homeRouter);
app.use('/swipe', swipeRouter);
app.use('/admin', adminRouter);  // Admin dashboard route
app.use('/api/emails', emailRoutes); // Use the email routes for sending and storing emails
app.use('/', utilRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
