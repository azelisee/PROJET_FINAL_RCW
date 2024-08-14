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
        const existingRoom = await RoomModel.findOne(req.body.roomNumber);
        if (existingRoom) {
            return res.status(400).send('A room with this number already exists');
        }
        const room = new RoomModel(req.body);
        await room.save();
        res.status(201).send('New Room created',room);
        console.log('Recorded in MongoDB Atlas : ', room);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};

exports.getRooms = async (req, res) => {
    try {
        const rooms = await RoomModel.find();
        res.status(200).send(rooms);
        console.log('Records from mongoDB Atlas : ',rooms);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getRoomById = async (req, res) => {
    try {
        const room = await RoomModel.findById(req.params.id);
        if (room) {
            res.status(200).json(room);
            console.log(`Record from MongoDB Atlas:`, room);
        } else {
            res.status(404).json('No room found');
            console.log('No room found');
        }
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log(error);
    }
};

exports.updateRoom = async (req, res) => {
    try {
        const room = await RoomModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!room) {
            return res.status(404).send('Room not found',room);
        }
        res.status(200).send('Room updated : ', room);
        console.log('Updated in MongoDB Atlas:', room);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteRoom = async (req, res) => {
    try {
        const id = await RoomModel.findByIdAndDelete(id);
        if (!id) {
            return res.status(404).send('Room not found');
        }
        res.status(200).send('Room deleted : ',id);
        console.log('Deleted from MongoDB Atlas:', id);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
