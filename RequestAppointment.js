import React, { useState , useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import { requestAppointment } from '../services/api';
import { useVerifyAccess } from '../utils/DecodeToken';
import '../css/appointment.css';

const RequestAppointment = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
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
            const response = await requestAppointment(email, name);
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error requesting appointment:', error);
            setMessage('Error requesting appointment. Please try again.');
        }
    };

    return (
        <div className='page-container'>
            <h2>Request an Appointment</h2>
            <form onSubmit={handleSubmit} className='form-group'>
                <div>
                    <label className='form-group label'>Email:</label>
                    <input className='form-group input'
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className='form-group label'>Name:</label>
                    <input className='form-group input'
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <center><button type="submit" className='btn'>Submit</button></center>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RequestAppointment;
