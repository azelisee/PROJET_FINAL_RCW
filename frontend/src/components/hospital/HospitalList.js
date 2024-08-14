import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getHospitals, deleteHospital } from '../../services/api';
import '../../css/PatientForm.css';
import '../../css/PatientList.css';

const HospitalList = () => {
    const [hospitals, setHospitals] = useState([]);

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

    const handleDelete = (id) => {
        deleteHospital(id)
            .then(() => {
                setHospitals(hospitals.filter(hospital => hospital._id !== id));
                console.log('Deleted successfully');
            })
            .catch(error => console.error('Error deleting:', error));
    };

    return (
        <center>
            <div className="patient-list-container">
            <h2>Hospitals</h2>
            <button type="button"><Link to="/hospitals/new">Add Hospital</Link></button>
            {hospitals.length > 0 ? (
                <ul>
                    {hospitals.map((hospital) => (
                        <li key={hospital._id}>
                            <Link to={`/hospitals/${hospital._id}`}>{hospital.name}</Link>
                            <button onClick={() => handleDelete(hospital._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hospitals found</p>
            )}
        </div>
        </center>
    );
};

export default HospitalList;
