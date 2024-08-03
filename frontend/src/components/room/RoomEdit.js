import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {getRoomById, updateRoom} from '../../services/api';

const RoomEdit = () => {
    const { id } = useParams();
    const history = useNavigate();
    const [room, setRoom] = useState({
        roomNumber: '',
        bedNumber: '',
        department: ''
    });

    useEffect(() => {
        getRoomById.get(id).then(data => setRoom(data));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoom({ ...room, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateRoom.update(id, room).then(() => {
            history.push(`/rooms/${id}`);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Room</h2>
            <input type="number" name="roomNumber" value={room.roomNumber} onChange={handleChange} placeholder="Room Number" required />
            <input type="number" name="bedNumber" value={room.bedNumber} onChange={handleChange} placeholder="Bed Number" required />
            <input type="text" name="department" value={room.department} onChange={handleChange} placeholder="Department ID" required />
            <button type="submit">Submit</button>
        </form>
    );
};

export default RoomEdit;
