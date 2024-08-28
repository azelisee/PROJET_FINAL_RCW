import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getRoomById } from '../../services/api';
import {useVerifyAccess} from '../../utils/DecodeToken';
import '../../css/PatientDetail.css';

const RoomDetail = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const verifyAccess = useVerifyAccess(['Administrator', 'Doctor', 'Nurse', 'Technician','Caregiver']);

    useEffect(() => {
        getRoomById(id).then((response) => {
            setRoom(response.data);
        }).catch(error => {
            console.error('There was an error fetching the room details!', error);
            setError('There was an error fetching the patient details!');
        });
    }, [id]);

    const handleRoomEditClick = (e, id) => {
        e.preventDefault();
        if (verifyAccess()) {
            navigate(`/rooms/${room._id}/edit`);
        }else{
            navigate('/unauthorized');
        }
    };

    if (error) return <div>{error}</div>;
    if (!room) return <div>Loading...</div>;

    return (
        <div className="patient-detail-container">
            <h2>Room Details</h2>
            <div className="patient-detail-field"><p><strong>Room Number:</strong> {room.roomNumber}</p></div>
            <div className="patient-detail-field"><p><strong>Bed Number:</strong> {room.bedNumber}</p></div>
            <div className="patient-detail-field"><p><strong>Department:</strong> {room.department}</p></div>
            <div className="patient-detail-field"><p><strong>Hospital:</strong> {room.hospital}</p></div>
            <center><Link to="#" className="btn" style={{ width: '150px' }} onClick={(e) => handleRoomEditClick(e, room._id)}>Edit Room</Link></center>
        </div>
    );
};

export default RoomDetail;
