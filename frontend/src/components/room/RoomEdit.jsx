import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRoomById, updateRoom } from '../../services/api';
import {useVerifyAccess}  from '../../utils/DecodeToken';
import '../../css/PatientForm.css';

const RoomEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [room, setRoom] = useState({
        roomNumber: '',
        bedNumber: '',
        department: '',
        hospital: ''
    });
    const [error, setError] = useState('');

    const verifyAccess = useVerifyAccess(['Administrator', 'Doctor']);

    useEffect(() => {
        if (!verifyAccess) {
            navigate('/unauthorized');
            return;
        }

        getRoomById(id).then((response) => {
            setRoom(response.data);
        }).catch(error => {
            setError('There was an error fetching the room details!');
            console.error('There was an error fetching the room details!', error);
        });
    }, [id, navigate, verifyAccess]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoom({ ...room, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateRoom(id, room).then(() => {
            navigate(`/rooms/${id}`);
        }).catch(error => {
            setError('There was an error updating the room!');
            console.error('There was an error updating the room!', error);
        });
    };

    return (
        <center>
            <form onSubmit={handleSubmit} className="form-container">
                <h2>Edit Room</h2>
                {error && <p>{error}</p>}
                <div className="form-group">
                    <input type="number" name="roomNumber" value={room.roomNumber} onChange={handleChange} placeholder="Room Number" required />
                    <input type="number" name="bedNumber" value={room.bedNumber} onChange={handleChange} placeholder="Bed Number" required />
                </div>
                <div className="form-group">
                    <input type="text" name="department" value={room.department} onChange={handleChange} placeholder="Department ID" required />
                    <input type="text" name="hospital" value={room.hospital} onChange={handleChange} placeholder="Hospital ID" required />
                </div>
                <br/>
                <center><button type="submit" style={{width:'175px'}} className="btn-green">Submit</button></center>
            </form>
        </center>
    );
};

export default RoomEdit;
