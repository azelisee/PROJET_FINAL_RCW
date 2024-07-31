const Room = require('../models/room');

exports.createRoom = async (req, res) => {
    try {
        const room = new Room(req.body);
        await room.save();
        res.status(201).json(room);
        console.log(room);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};

exports.getRooms = async (req, res) => {
    try {
        const rooms = await Room.find().populate('department');
        res.status(200).json(rooms);
        console.log(rooms);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};

exports.getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id).populate('department');
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.status(200).json(room);
        console.log(room);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};

exports.updateRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.status(200).json(room);
        console.log(room);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};

exports.deleteRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.status(200).json({ message: 'Room deleted successfully' });
        console.log(room);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
