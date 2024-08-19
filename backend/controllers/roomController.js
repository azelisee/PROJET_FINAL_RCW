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
        const existingRoom = await RoomModel.findOne({roomNumber : req.body.roomNumber});
        if (existingRoom) {
            res.send('A room with this number already exists');
        }
        const room = new RoomModel(req.body);
        await room.save();

        console.log('Recorded in MongoDB Atlas : ', room);
        res.send('New Room created',room);
    } catch (error) {
        console.log(error);
        res.send({ error: error.message });
    }
};

exports.getRooms = async (req, res) => {
    try {
        const rooms = await RoomModel.find();
        console.log('Records from mongoDB Atlas : ',rooms);
        res.send(rooms);
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
};

exports.getRoomById = async (req, res) => {
    try {
        const room = await RoomModel.findById(req.params.id);
        if (room) {
            console.log(`Record from MongoDB Atlas:`, room);
            res.send(room);
        } else {
            console.log('No room found');
            res.send('No room found');
        }
    } catch (error) {
        console.log(error);
        res.send({error: error.message});
    }
};

exports.updateRoom = async (req, res) => {
    try {
        const room = await RoomModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!room) {
            res.send('Room not found',room);
        }
        console.log('Updated in MongoDB Atlas:', room);
        res.send('Room updated : ', room);
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
};

exports.deleteRoom = async (req, res) => {
    try {
        const id = await RoomModel.findByIdAndDelete(id);
        if (!id) {
            res.send('Room not found');
        }
        console.log('Deleted from MongoDB Atlas:', id);
        res.send('Room deleted : ',id);
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
};
