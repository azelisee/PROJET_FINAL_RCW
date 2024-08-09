const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    website: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    departments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }]
});

const initHospitalModel = (conn) => conn.model('Hospital', hospitalSchema);

module.exports = initHospitalModel;
