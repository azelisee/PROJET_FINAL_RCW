import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRoom } from '../../services/api';
import '../../css/PatientForm.css';

const RoomForm = () => {
    const [room, setRoom] = useState({
        roomNumber: '',
        bedNumber: '',
        department: '',
        hospital: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoom({ ...room, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createRoom(room)
            .then(response => {
                console.log('Room created:', response.data);
                navigate('/rooms');
            })
            .catch(error => console.error('Error creating room:', error));
    };

    return (
        <center>
            <div className="form-container">
            <h2>Add Room</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    name="roomNumber"
                    placeholder="Room Number"
                    value={room.roomNumber}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="bedNumber"
                    placeholder="Bed Number"
                    value={room.bedNumber}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="department"
                    placeholder="Department ID"
                    value={room.department}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="hospital"
                    placeholder="Hospital ID"
                    value={room.hospital}
                    onChange={handleChange}
                    required
                />
                <button type="submit" style={{width:'175px'}}>Add Room</button>
            </form>
        </div>
        </center>
    );
};

export default RoomForm;
