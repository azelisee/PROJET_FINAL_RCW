import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getHospitals, deleteHospital } from '../../services/api';
import '../../css/PatientList.css';

const HospitalList = () => {
    const [hospitals, setHospitals] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const role = localStorage.getItem('role');

    useEffect(() => {
        getHospitals().then((response) => {
            if (response.data) {
                setHospitals(response.data);
            } else {
                console.error('Expected an array but got:', response.data);
            }
        }).catch(error => {
            console.error('There was an error fetching the hospitals!', error);
        });
    }, []);

    const handleAddHospitalClick = (e) => {
        e.preventDefault();
        if (role === 'Doctor' || role === 'Administrator') {
            navigate('/hospitals/new');
        }else{
            navigate('/unauthorized');
        }
    };

    const handleHospitalDetailClick = (e, id) => {
        e.preventDefault();
        if (role === 'Administrator'|| role === 'Technician' || role === 'Caregiver' || role === 'Other' || role === 'Doctor'|| role === 'Nurse' || role === 'Patient') {
            navigate(`/hospitals/${id}`);
        }else{
            navigate('/unauthorized');
        }
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this hospital?");
        if (confirmDelete) {
            if (id && (role === 'Doctor' || role === 'Administrator')) {
                deleteHospital(id)
                    .then(response => {
                        setMessage('Hospital deleted successfully');
                        setTimeout(() => {
                            setMessage('');
                        }, 3000);
                        getHospitals();
                        navigate('/hospitals');
                    })
                    .catch(error => {
                        console.error('Error deleting:', error);
                        setMessage('Error deleting hospital');
                    });
            } else {
                console.error('ID is undefined : ',id, ' or incorrect role : ',role);
            }
        }
    };

    return (
        <center>
            <div className="patient-list-container">
                <h1>Hospitals</h1>
                {message && <p className="message">{message}</p>}
                <center>
                    <button type="button" className="add-patient-button" onClick={handleAddHospitalClick}>
                        Add Hospital
                    </button>
                </center>
                {hospitals.length > 0 ? (
                    <div className="patient-cards">
                        {hospitals.map((hospital) => (
                            <div key={hospital._id} className="patient-card">
                                <Link to="#" onClick={(e) => handleHospitalDetailClick(e, hospital._id)}>
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
