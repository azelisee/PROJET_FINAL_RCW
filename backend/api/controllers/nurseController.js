const Nurse = require('../models/nurse');

exports.createNurse = async (req, res) => {
    try {
        const nurse = new Nurse(req.body);
        await nurse.save();
        res.status(201).json(nurse);
        console.log(nurse);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};

exports.getNurses = async (req, res) => {
    try {
        const nurses = await Nurse.find().populate('department');
        res.status(200).json(nurses);
        console.log(nurses);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};

exports.getNurseById = async (req, res) => {
    try {
        const nurse = await Nurse.findById(req.params.id).populate('department');
        if (!nurse) {
            return res.status(404).json({ error: 'Nurse not found' });
        }
        res.status(200).json(nurse);
        console.log(nurse);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log( error);
    }
};

exports.updateNurse = async (req, res) => {
    try {
        const nurse = await Nurse.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!nurse) {
            return res.status(404).json({ error: 'Nurse not found' });
        }
        res.status(200).json(nurse);
        console.log(nurse);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};

exports.deleteNurse = async (req, res) => {
    try {
        const nurse = await Nurse.findByIdAndDelete(req.params.id);
        if (!nurse) {
            return res.status(404).json({ error: 'Nurse not found' });
        }
        res.status(200).json({ message: 'Nurse deleted successfully' });
        console.log(nurse);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
