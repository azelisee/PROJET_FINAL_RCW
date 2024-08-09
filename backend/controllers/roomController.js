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
        const roomNumber = roomData.roomNumber;

        const existingRoomAtlas = await RoomModel1.findOne({ roomNumber });
        const existingRoomCompass = await RoomModel2.findOne({ roomNumber });
        if (existingRoomAtlas || existingRoomCompass) {
            return res.status(400).send({ message: 'Error: A room with this number already exists in one of the databases.' });
        }
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
        const roomsAtlas = await RoomModel1.find();
        const roomsCompass = await RoomModel2.find();

        const rooms = roomsAtlas.map(atlasRoom => {
            const compassRoom = roomsCompass.find(compass => compass.roomNumber === atlasRoom.roomNumber);
            return {
                id1: atlasRoom._id,
                id2: compassRoom ? compassRoom._id : null,
                roomNumber: atlasRoom.roomNumber,
                bedNumber: atlasRoom.bedNumber,
            };
        });
        res.status(200).send({ rooms });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getRoomById = async (req, res) => {
    try {
        const room1 = await RoomModel1.findById(req.params.id);
        //const room2 = await RoomModel2.findById(req.params.id);

        if (room1) {
            res.status(200).json({room1 : room1});
            console.log(`Data from MongoDB Atlas : ${room1}`);
            //console.log(`Data from MongoDB Compass : ${room2}`);
        } else {
            res.status(404).json({ error: 'Room not found' });
            console.log('Room not found');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
exports.updateRoom = async (req, res) => {
    try {
        const ids = req.params.id1 + ',' + req.params.id2;
        console.log('\nExtracted IDs:', ids);
        if (!req.params.id1 || !req.params.id2) {
            throw new Error('Two IDs must be provided for updating.');
        }
        const atlasId = req.params.id1.trim();
        const compassId = req.params.id2.trim();

        const roomData = req.body;

        const room1 = await RoomModel1.findByIdAndUpdate(atlasId, roomData, { new: true });
        const room2 = await RoomModel2.findByIdAndUpdate(compassId, roomData, { new: true });
        if (!room1 || !room2) {
            return res.status(404).send({ message: 'Room not found in one or both databases.' });
        }
        res.status(200).send({ message: 'Room updated in both databases' });
        console.log('Updated in MongoDB Atlas:', room1);
        console.log('Updated in MongoDB Compass:', room2);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteRoom = async (req, res) => {
    try {
        const ids = req.params.id1 + ',' + req.params.id2;
        console.log('\nExtracted IDs:', ids);
        if (!req.params.id1 || !req.params.id2) {
            throw new Error('Two IDs must be provided for deletion.');
        }
        const atlasId = req.params.id1.trim();
        const compassId = req.params.id2.trim();

        const atlasResult = await RoomModel1.findByIdAndDelete(atlasId);
        const compassResult = await RoomModel2.findByIdAndDelete(compassId);
        if (!atlasResult || !compassResult) {
            return res.status(404).send({ message: 'Room not found in one or both databases.' });
        }
        res.status(200).send({ message: 'Room deleted from both databases' });
        console.log('Deleted from MongoDB Atlas:', atlasId);
        console.log('Deleted from MongoDB Compass:', compassId);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
