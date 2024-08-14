import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getNurses, deleteNurse } from '../../services/api';
import '../../css/PatientList.css';

const NurseList = () => {
    const [nurses, setNurses] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const fetchNurses = () => {
        getNurses().then((response) => {
            if (response.data) {
                setNurses(response.data);
            } else {
                console.error('Expected an array but got:', response.data);
            }
        }).catch(error => {
            console.error('There was an error fetching the nurses!', error);
        });
    };

    useEffect(() => {
        fetchNurses();
    }, []);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this nurse?");
        if (confirmDelete) {
            if (id) {
                deleteNurse(id)
                    .then(response => {
                        setMessage('Nurse deleted successfully');
                        setTimeout(() => {
                            setMessage('');
                        }, 3000);
                        fetchNurses();
                        navigate('/nurses');
                    })
                    .catch(error => {
                        console.error('Error deleting:', error);
                        setMessage('Error deleting nurse');
                    });
            } else {
                console.error('ID is undefined');
            }
        }
    };

    return (
        <center>
            <div className="patient-list-container">
                <h1>Nurses</h1>
                {message && <p className="message">{message}</p>}
                <center>
                    <button type="button" className="add-patient-button">
                        <Link to="/nurses/new">Add Nurse</Link>
                    </button>
                </center>
                {nurses.length > 0 ? (
                    <div className="patient-cards">
                        {nurses.map((nurse) => (
                            <div key={nurse._id} className="patient-card">
                                <Link to={`/nurses/${nurse._id}`}>
                                    <p>{nurse.name}</p>
                                    <p>Sex: {nurse.gender}</p>
                                    <p>Seniority: {nurse.seniority} years</p>
                                </Link>
                                <button onClick={() => handleDelete(nurse._id)} type="button">
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No nurses found</p>
                )}
            </div>
        </center>
    );
};

export default NurseList;
