const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config({path: './config/.env'});

const app = express();

app.use(cors());

const connectToDatabase  = require('./config/databases');

const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const nurseRoutes = require('./routes/nurseRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const roomRoutes = require('./routes/roomRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const transferRoutes = require('./routes/transferRoutes');
const authRoutes = require('./routes/authRoutes');
const staffRoutes = require('./routes/staffRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const middlewareRoutes = require('./routes/middlewareRoutes');

app.use(bodyParser.json());

app.use('/patients', patientRoutes);
app.use('/doctors', doctorRoutes);
app.use('/nurses', nurseRoutes);
app.use('/departments', departmentRoutes);
app.use('/rooms', roomRoutes);
app.use('/hospitals', hospitalRoutes);
app.use('/transfers', transferRoutes);
app.use('/auth', authRoutes);
app.use('/staff', staffRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/access', middlewareRoutes);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

    console.log(connectToDatabase);
    console.log('Connected to MongoDB Atlas');
});
