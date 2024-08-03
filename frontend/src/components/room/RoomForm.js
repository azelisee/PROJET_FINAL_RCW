import React, { useState } from 'react';
import {createRoom} from '../../services/api';
import { useNavigate } from 'react-router-dom';

const RoomForm = () => {
    const [room, setRoom] = useState({
        roomNumber: '',
        bedNumber: '',
        department: ''
    });

    const history = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoom({ ...room, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createRoom.create(room).then(() => {
            history.push('/rooms');
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Room</h2>
            <input type="number" name="roomNumber" value={room.roomNumber} onChange={handleChange} placeholder="Room Number" required />
            <input type="number" name="bedNumber" value={room.bedNumber} onChange={handleChange} placeholder="Bed Number" required />
            <input type="text" name="department" value={room.department} onChange={handleChange} placeholder="Department ID" required />
            <button type="submit">Submit</button>
        </form>
    );
};

export default RoomForm;
