import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getHospitals, deleteHospital } from '../../services/api';
import '../../css/PatientList.css';

const HospitalList = () => {
    const [hospitals, setHospitals] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const fetchHospitals = () => {
        getHospitals().then((response) => {
            if (response.data) {
                setHospitals(response.data);
            } else {
                console.error('Expected an array but got:', response.data);
            }
        }).catch(error => {
            console.error('There was an error fetching the hospitals!', error);
        });
    };

    useEffect(() => {
        fetchHospitals();
    }, []);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this hospital?");
        if (confirmDelete) {
            if (id) {
                deleteHospital(id)
                    .then(response => {
                        setMessage('Hospital deleted successfully');
                        setTimeout(() => {
                            setMessage('');
                        }, 3000);
                        fetchHospitals();
                        navigate('/hospitals');
                    })
                    .catch(error => {
                        console.error('Error deleting:', error);
                        setMessage('Error deleting hospital');
                    });
            } else {
                console.error('ID is undefined');
            }
        }
    };

    return (
        <center>
            <div className="patient-list-container">
                <h1>Hospitals</h1>
                {message && <p className="message">{message}</p>}
                <center>
                    <button type="button" className="add-patient-button">
                        <Link to="/hospitals/new">Add Hospital</Link>
                    </button>
                </center>
                {hospitals.length > 0 ? (
                    <div className="patient-cards">
                        {hospitals.map((hospital) => (
                            <div key={hospital._id} className="patient-card">
                                <Link to={`/hospitals/${hospital._id}`}>
                                    <p>{hospital.name}</p>
                                    <p>Address: {hospital.address}</p>
                                </Link>
                                <button onClick={() => handleDelete(hospital._id)} type="button">
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No hospitals found</p>
                )}
            </div>
        </center>
    );
};

export default HospitalList;
