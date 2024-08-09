const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    fromHospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
    toHospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
    toDepartment: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    transferDate: { type: Date, required: true },
    reason: { type: String, required: true }
});

const initTransferModel = (conn) => conn.model('Transfer', transferSchema);

module.exports = initTransferModel;
