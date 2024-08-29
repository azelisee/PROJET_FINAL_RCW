import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getNurses, deleteNurse } from '../../services/api';
import {useVerifyAccess} from '../../utils/DecodeToken';
import '../../css/PatientList.css';

const NurseList = () => {
    const [nurses, setNurses] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const verifyAccess = useVerifyAccess(['Administrator', 'Technician','Caregiver','Other','Doctor', 'Nurse','Patient']);
    const role = localStorage.getItem('role');

    useEffect(() => {
        getNurses().then((response) => {
            if (response.data) {
                setNurses(response.data);
            } else {
                console.error('Expected an array but got:', response.data);
            }
        }).catch(error => {
            console.error('There was an error fetching the nurses!', error);
        });
    }, []);

    const handleAddNurseClick = (e) => {
        e.preventDefault();
        if (role === 'Doctor') {
            navigate('/nurses/new');
        }else{
            navigate('/unauthorized');
        }
    };

    const handleNurseDetailClick = (e, id) => {
        e.preventDefault();
        if (role ==='Administrator'|| role === 'Caregiver'|| role === 'Doctor'|| role === 'Nurse'|| role === 'Patient') {
            navigate(`/nurses/${id}`);
        }else{
            navigate('/unauthorized');
        }
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this nurse?");
        if (confirmDelete) {
            if (id && role === 'Doctor') {
                deleteNurse(id)
                    .then(response => {
                        setMessage('Nurse deleted successfully');
                        setTimeout(() => {
                            setMessage('');
                        }, 3000);
                        getNurses();
                        navigate('/nurses');
                    })
                    .catch(error => {
                        console.error('Error deleting:', error);
                        setMessage('Error deleting nurse');
                    });
            } else {
                console.error('ID is undefined : ',id, ' or incorrect role : ',role);
            }
        }
    };

    return (
        <center>
            <div className="patient-list-container">
                <h1>Nurses</h1>
                {message && <p className="message">{message}</p>}
                <center>
                    <button type="button" className="add-patient-button" onClick={handleAddNurseClick}>
                        Add Nurse
                    </button>
                </center>
                {nurses.length > 0 ? (
                    <div className="patient-cards">
                        {nurses.map((nurse) => (
                            <div key={nurse._id} className="patient-card">
                                <Link to="#" onClick={(e) => handleNurseDetailClick(e, nurse._id)}>
                                    <p>{nurse.name}</p>
                                    <p>Gender: {nurse.gender}</p>
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
