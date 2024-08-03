import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {getRooms} from '../../services/api';

const RoomList = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        getRooms.getAll().then(data => setRooms(data));
    }, []);

    return (
        <div>
            <h2>Rooms</h2>
            <Link to="/rooms/new">Add New Room</Link>
            <ul>
                {rooms.map(room => (
                    <li key={room._id}>
                        <Link to={`/rooms/${room._id}`}>{room.roomNumber} - {room.bedNumber}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoomList;
