const mongoose = require('mongoose');

const connectToDatabase = async() => {
    try {
        mongoose.set('strictQuery', false);
        const conn1 = await mongoose.createConnection(process.env.DATABASE_URI1);
        return conn1;
    } catch (error) {
        console.log(`Connection error : ${error.message}`);
    }
};
module.exports = connectToDatabase;
