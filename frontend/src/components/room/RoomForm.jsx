import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRoom } from '../../services/api';
import { useVerifyAccess } from '../../utils/DecodeToken';
import '../../css/PatientForm.css';

const RoomForm = () => {
    const [room, setRoom] = useState({
        roomNumber: '',
        bedNumber: '',
        department: '',
        hospital: ''
    });

    const [message, setMessage] = useState({ type: '', content: '' });
    const navigate = useNavigate();

    const verifyAccess = useVerifyAccess(['Administrator', 'Doctor']);

    useEffect(() => {
        if (!verifyAccess) {
            navigate('/unauthorized');
            return;
        }
    }, [navigate, verifyAccess]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoom({ ...room, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createRoom(room)
            .then(response => {
                setMessage({ type: 'success', content: 'Room created successfully!' });
                navigate('/rooms');
            })
            .catch(error => {
                setMessage({ type: 'error', content: 'Error creating room.' });
                console.error('Error creating room:', error);
            });
    };

    return (
        <center>
            <div className="form-container">
                <h2>Add Room</h2>
                {message.content && (
                    <div className={`message ${message.type}`}>
                        {message.content}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="number" name="roomNumber" placeholder="Room Number" value={room.roomNumber} onChange={handleChange} required />
                        <input type="number" name="bedNumber" placeholder="Bed Number" value={room.bedNumber} onChange={handleChange} required />
                        <input type="text" name="department" placeholder="Department ID" value={room.department} onChange={handleChange} required />
                        <input type="text" name="hospital" placeholder="Hospital ID" value={room.hospital} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn-green">Add Room</button>
                </form>
            </div>
        </center>
    );
};

export default RoomForm;
