import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getRooms, deleteRoom } from '../../services/api';
import '../../css/PatientList.css';

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const fetchRooms = () => {
        getRooms().then((response) => {
            if (response.data) {
                setRooms(response.data);
            } else {
                console.error('Expected an array but got:', response.data);
            }
        }).catch(error => {
            console.error('There was an error fetching the rooms!', error);
        });
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this room?");
        if (confirmDelete) {
            if (id) {
                deleteRoom(id)
                    .then(response => {
                        setMessage('Room deleted successfully');
                        setTimeout(() => {
                            setMessage('');
                        }, 3000);
                        fetchRooms();
                        navigate('/rooms');
                    })
                    .catch(error => {
                        console.error('Error deleting:', error);
                        setMessage('Error deleting room');
                    });
            } else {
                console.error('ID is undefined');
            }
        }
    };

    return (
        <center>
            <div className="patient-list-container">
                <h1>Rooms</h1>
                {message && <p className="message">{message}</p>}
                <center>
                    <button type="button" className="add-patient-button">
                        <Link to="/rooms/new">Add Room</Link>
                    </button>
                </center>
                {rooms.length > 0 ? (
                    <div className="patient-cards">
                        {rooms.map((room) => (
                            <div key={room._id} className="patient-card">
                                <Link to={`/rooms/${room._id}`}>
                                    <p>Room Number: {room.roomNumber}</p>
                                    <p>Bed Number: {room.bedNumber}</p>
                                </Link>
                                <button onClick={() => handleDelete(room._id)} type="button">
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No rooms found</p>
                )}
            </div>
        </center>
    );
};

export default RoomList;
