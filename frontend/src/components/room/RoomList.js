import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRoomById, updateRoom } from '../../services/api';
import '../../css/PatientForm.css';
import '../../css/PatientList.css';

const RoomEdit = () => {
    const { id } = useParams();
    const [room, setRoom] = useState({
        roomNumber: '',
        bedNumber: '',
        department: '',
        hospital: ''
    });
    const navigate = useNavigate();

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoom({ ...room, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateRoom(id, room)
            .then(response => {
                console.log('Room updated:', response.data);
                navigate('/rooms');
            })
            .catch(error => console.error('Error updating room:', error));
    };

    return (
        <center>
            <div className="form-container">
            <h2>Edit Room</h2>
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
                <button type="submit" style={{width:'175px'}}>Update Room</button>
            </form>
        </div>
        </center>
    );
};

export default RoomEdit;
