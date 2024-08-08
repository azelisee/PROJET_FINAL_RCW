const mongoose = require('mongoose');

// Main database
const connectToDatabase1 = async() => {
    try {
        mongoose.set('strictQuery', false);
        const conn1 = await mongoose.createConnection(process.env.DATABASE_URI1);
        console.log(`Connected to MongoDB Atlas : ${conn1.host}`);
        return conn1;
    } catch (error) {
        console.log(`Connection error : ${error.message}`);
    }
};

// Second hand database
const connectToDatabase2 = async() => {
    try {
        mongoose.set('strictQuery', false);
        const conn2 = await mongoose.createConnection(process.env.DATABASE_URI2);
        console.log(`Connected to MongoDB Compass : ${conn2.host}`);
        return conn2;
    } catch (error) {
        console.log(`Connection error : ${error.message}`);
    }
};

module.exports = { connectToDatabase1, connectToDatabase2 };
