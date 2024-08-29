const { sendAppointmentRequest, sendAppointmentConfirmation } = require('../services/emailService');

// Handle appointment request
exports.requestAppointment = async (req, res) => {
    const { email, name } = req.body;
    try {
        await sendAppointmentRequest(email, name);
        res.status(200).json({ message: 'Appointment request sent' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email' });
    }
};

// Confirm appointment (to be used by doctors/admin)
exports.confirmAppointment = async (req, res) => {
    const { email, doctorName, appointmentDate, hour } = req.body;
    try {
        await sendAppointmentConfirmation(email, doctorName, appointmentDate, hour);
        res.status(200).json({ message: 'Appointment confirmation sent' });
    } catch (error) {
        console.error('Error sending confirmation email:', error);
        res.status(500).json({ message: 'Error sending confirmation email' });
    }
};
