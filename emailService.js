const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config({path: '../config/.env'});

const transporter = nodemailer.createTransport({
    host : process.env.SMTP_HOST,
    port : process.env.SMTP_PORT,
    auth : {
        user : process.env.SMTP_AUTH_USER,
        pass : process.env.SMTP_AUTH_PASS,
    }
});

exports.sendAppointmentRequest = (userEmail, userName) => {
    const mailOptions = {
        from: `${process.env.SMTP_AUTH_NAME} <${process.env.SMTP_AUTH_USER}>`,
        to: userEmail,
        subject: 'Appointment Request Received',
        text: 'Appointment Request Received',
        html: `<body>
                <h1>Appointment Request Received</h1>
                <p>Dear ${userName},<p/>
                <p>Your appointment request has been received. We will get back to you shortly.</p>
                <br/>
                <p>Best regards,</p>
                <p>Hospital Management System</p>
            </body>`
    };
    console.log("Message sent: %s", mailOptions.messageId);
    return transporter.sendMail(mailOptions);
};

exports.sendAppointmentConfirmation = (userEmail, doctorName, appointmentDate, hour) => {
    const mailOptions = {
        from: `${process.env.SMTP_AUTH_NAME} <${process.env.SMTP_AUTH_USER}>`,
        to: userEmail,
        subject: 'Appointment Confirmation',
        text: 'Appointment Confirmation',
        html : `<body>
                <h1>Appointment Confirmation</h1>
                <p>Dear ${userEmail},\n\nYour appointment with Dr. ${doctorName} is confirmed for ${appointmentDate} at ${hour}.</p>
                <br/>
                <p>Best regards,</p>
                <p>Hospital Management System</p>
            </body>`
    };
    console.log("Message sent: %s", mailOptions.messageId);
    return transporter.sendMail(mailOptions);
};

