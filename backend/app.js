require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const app = express()
const userRouter = require('./routes/userRouter')
const homeRouter = require('./routes/homeRouter')
const adminRouter = require('./routes/adminRouter')
const swipeRouter = require('./routes/swipeRouter')
const utilRouter = require('./routes/utilRouter')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const emailRoutes = require('./routes/emailRoutes') // Import the email routes
const PORT = process.env.PORT

// Connect to the database
connectDB()

// Middleware setup
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || origin.startsWith(process.env.FRONTEND_URL)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}));
app.use(cors({ origin: "https://skill-exchanger-fronted.vercel.app" }));
// Define your routes
app.use('/user', userRouter)
app.use('/home', homeRouter)
app.use('/swipe', swipeRouter)
app.use('/admin', adminRouter)  // Admin dashboard route
app.use('/api/emails', emailRoutes); // Use the email routes for sending and storing emails
app.use('/', utilRouter)

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
