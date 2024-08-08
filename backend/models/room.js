const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomNumber: { type: Number, required: true },
    bedNumber: { type: Number, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true }
});

// Function to create models for both databases
const initRoomModel = (conn) => conn.model('Room ', roomSchema);

module.exports = initRoomModel;
