import React, { useState , useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import { confirmAppointment } from '../services/api';
import { useVerifyAccess } from '../utils/DecodeToken';
import '../css/appointment.css';

const ConfirmAppointment = () => {
    const [email, setEmail] = useState('');
    const [doctorName, setDoctorName] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [hour, setHour] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const verifyAccess = useVerifyAccess(['Technician']);

    useEffect(() => {
        if (!verifyAccess()) {
            navigate('/unauthorized');
            return;
        }
    }, [email, navigate, verifyAccess]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await confirmAppointment(email, doctorName, appointmentDate, hour);
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error confirming appointment:', error);
            setMessage('Error confirming appointment. Please try again.');
        }
    };

    return (
        <div className='page-container'>
            <h2>Confirm an Appointment</h2>
            <form onSubmit={handleSubmit} className='form-group'>
                <div>
                    <label className='form-group label'>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className='form-group label'>Doctor Name:</label>
                    <input className='form-group input'
                        type="text"
                        value={doctorName}
                        onChange={(e) => setDoctorName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className='form-group label'>Appointment Date:</label>
                    <input className='form-group input'
                        type="date"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className='form-group label'>Hour:</label>
                    <input className='form-group input'
                        type="time"
                        value={hour}
                        onChange={(e) => setHour(e.target.value)}
                        required
                    />
                </div>
                <center><button type="submit" className='btn'>Submit</button></center>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ConfirmAppointment;
