const initRoomModel = require('../models/roomModel');
const { connectToDatabase1, connectToDatabase2 } = require('../config/databases');

let db1, db2, RoomModel1, RoomModel2;

const initDatabases = async () => {
    db1 = await connectToDatabase1();
    db2 = await connectToDatabase2();
    RoomModel1 = initRoomModel(db1);
    RoomModel2 = initRoomModel(db2);
};
initDatabases();

exports.createRoom = async (req, res) => {
    try {
        const roomData = req.body;
        const room1 = new RoomModel1(roomData);
        const room2 = new RoomModel2(roomData);

        await room1.save();
        await room2.save();

        res.status(201).send({ message: 'Room created in both databases' });
        console.log('Recorded in MongoDB Atlas : ', room1);
        console.log('\nRecorded in MongoDB Compass : ', room2);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
exports.getRooms = async (req, res) => {
    try {
        const rooms1 = await RoomModel1.find();
        const rooms2 = await RoomModel2.find();

        if (rooms1) {
            res.status(200).json(`Records from MongoDB Atlas : ${rooms1}`);
            console.log(`Records from MongoDB Atlas : ${rooms1}`);
        } else if (rooms2) {
            res.status(200).json(`Records from MongoDB Compass : ${rooms2}`);
            console.log(`Records from MongoDB Compass : ${rooms2}`);
        } else {
            res.status(404).json({ error: 'Room not found' });
            console.log('Room not found');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
exports.getRoomById = async (req, res) => {
    try {
        const room1 = await RoomModel1.findById(req.params.id);
        const room2 = await RoomModel2.findById(req.params.id);

        if (room1) {
            res.status(200).json(`Data from MongoDB Atlas : ${room1}`);
            console.log(`Data from MongoDB Atlas : ${room1}`);
        } else if (room2) {
            res.status(200).json(`Data from MongoDB Compass : ${room2}`);
            console.log(`Data from MongoDB Compass : ${room2}`);
        } else {
            res.status(404).json({ error: 'Patient not found' });
            console.log('Patient not found');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
exports.updateRoom = async (req, res) => {
    try {
        const roomData = req.body;
        const ids = req.params.id.split(',');
        console.log('\nExtracted IDs:', ids);
        if (ids.length !== 2) {
            console.log('HELP : Make space and coma before the first id in params');
            throw new Error('Exactly two IDs must be provided');
        }
        const atlasId = ids[0];
        const compassId = ids[1];

        const room1 = await RoomModel1.findByIdAndUpdate(atlasId, roomData);
        const room2 = await RoomModel2.findByIdAndUpdate(compassId, roomData);

        res.status(200).send({ message: 'Congratulations, the room has been updated \\(^_-)// !!!' });
        console.log('Recorded in MongoDB Atlas : ',room1);
        console.log('\nRecorded in MongoDB Compass : ',room2);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
exports.deleteRoom = async (req, res) => {
    try {
        const ids = req.params.id.split(',');
        console.log('\nExtracted IDs:', ids);
        if (ids.length !== 2) {
            console.log('HELP : Make space and coma before the first id in params');
            throw new Error('Exactly two IDs must be provided');
        }
        const atlasId = ids[0];
        const compassId = ids[1];

        await RoomModel1.findByIdAndDelete(atlasId);
        await RoomModel2.findByIdAndDelete(compassId);

        res.status(200).send({ message: 'Room Removed from databases' });
        console.log('Recorded in MongoDB Atlas : ', atlasId);
        console.log('\nRecorded in MongoDB Compass : ', compassId);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
