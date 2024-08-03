const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();

const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const nurseRoutes = require('./routes/nurseRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const roomRoutes = require('./routes/roomRoutes');

dotenv.config({path: '../api/config/.env'});

app.use(bodyParser.json());

app.use('/patients', patientRoutes);
app.use('/doctors', doctorRoutes);
app.use('/nurses', nurseRoutes);
app.use('/departments', departmentRoutes);
app.use('/rooms', roomRoutes);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
