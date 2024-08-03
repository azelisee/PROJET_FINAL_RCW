import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {getRoomById} from '../../services/api';

const RoomDetail = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);

    useEffect(() => {
        getRoomById.get(id).then(data => setRoom(data));
    }, [id]);

    return (
        <div>
            {room ? (
                <>
                    <h2>Room {room.roomNumber}</h2>
                    <p>Bed Number: {room.bedNumber}</p>
                    <p>Department: {room.department}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default RoomDetail;
