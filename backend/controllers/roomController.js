const initRoomModel = require('../models/roomModel');
const connectToDatabase = require('../config/databases');

let db, RoomModel;
const initDatabases = async () => {
    db = await connectToDatabase();
    RoomModel = initRoomModel(db);
};
initDatabases();

exports.createRoom = async (req, res) => {
    try {
        const existingRoom = await RoomModel.findOne({ roomNumber: req.body.roomNumber });
        if (existingRoom) {
            return res.status(400).json({ message: 'A room with this number already exists' });
        }
        const room = new RoomModel(req.body);
        await room.save();

        console.log('Recorded in MongoDB Atlas:', room);
        res.status(201).json({ message: 'New Room created', room });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

exports.getRooms = async (req, res) => {
    try {
        const rooms = await RoomModel.find();
        console.log('Records from MongoDB Atlas:', rooms);
        res.status(200).json(rooms);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

exports.getRoomById = async (req, res) => {
    try {
        const room = await RoomModel.findById(req.params.id);
        if (room) {
            console.log(`Record from MongoDB Atlas:`, room);
            res.status(200).json(room);
        } else {
            console.log('No room found');
            res.status(404).json({ message: 'No room found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

exports.updateRoom = async (req, res) => {
    try {
        const room = await RoomModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        console.log('Updated in MongoDB Atlas:', room);
        res.status(200).json({ message: 'Room updated', room });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

exports.deleteRoom = async (req, res) => {
    try {
        const room = await RoomModel.findByIdAndDelete(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        console.log('Deleted from MongoDB Atlas:', room);
        res.status(200).json({ message: 'Room deleted', room });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
