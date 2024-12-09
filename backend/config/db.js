const mongoose = require("mongoose");

const connectDB = async () => {
    const DB_NAME = 'SkillSwapDB';
    const DB_URI = process.env.DB_URI;
    
    try {
        const connectionInstance = await mongoose.connect(DB_URI);
        console.log(`\nMONGO DB CONNECTED !!`);
    } catch (err) {
        console.log(`MONGODB CONNECTION ERROR: ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;
