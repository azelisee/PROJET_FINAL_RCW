import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRoomById } from '../../services/api';
import '../../css/PatientDetail.css';

const RoomDetail = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);

    useEffect(() => {
        getRoomById(id).then((response) => {
            if (response.data.room) {
                setRoom(response.data.room);
            } else {
                console.error('Expected an object but got:', response.data);
            }
        }).catch(error => {
            console.error('There was an error fetching the room details!', error);
        });
    }, [id]);

    if (!room) return <div>Loading...</div>;

    return (
        <center>
            <div className="patient-detail-container">
            <h2>{`Room ${room.roomNumber} - Bed ${room.bedNumber}`}</h2>
            <p><strong>Department:</strong> {room.department.name}</p>
            <p><strong>Hospital:</strong> {room.hospital.name}</p>
            <Link to={`/rooms/${room._id}/edit`}>Edit Room</Link>
        </div>
        </center>
    );
};

export default RoomDetail;
