import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRoomById } from '../../services/api';
import '../../css/PatientDetail.css';

const RoomDetail = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);

    useEffect(() => {
        getRoomById(id).then((response) => {
            setRoom(response.data);
        }).catch(error => {
            console.error('There was an error fetching the room details!', error);
        });
    }, [id]);

    if (!room) return <div>Loading...</div>;

    return (
        <div className="patient-detail-container">
            <h2>Room Details</h2>
            <div className="patient-detail-field"><p><strong>Room Number:</strong> {room.roomNumber}</p></div>
            <div className="patient-detail-field"><p><strong>Bed Number:</strong> {room.bedNumber}</p></div>
            <div className="patient-detail-field"><p><strong>Department:</strong> {room.department.name}</p></div>
            <div className="patient-detail-field"><p><strong>Hospital:</strong> {room.hospital.name}</p></div>
            <center><Link to={`/rooms/${room._id}/edit`} className="btn" style={{ width: '150px' }}>Edit Room</Link></center>
        </div>
    );
};

export default RoomDetail;
