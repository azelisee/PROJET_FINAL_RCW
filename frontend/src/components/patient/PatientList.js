import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPatients, deletePatient } from '../../services/api';
import '../css/PatientForm.css';
import '../css/PatientList.css';

const PatientList = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        getPatients().then((response) => {
            if (response.data.patients) {
                setPatients(response.data.patients);
            } else {
                console.error('Expected an array but got:', response.data);
            }
        }).catch(error => {
            console.error('There was an error fetching the patients!', error);
        });
    }, []);


    const handleDelete = (id) => {
        deletePatient(id).then(() => {
            setPatients(patients.filter(patient => patient._id !== id));
        }).catch(error => {
            console.error('There was an error deleting the patient!', error);
        });
    };

    return (
        <center>
            <div className="patient-list-container">
            <h2>Display all our Patients</h2>
            <center>
                <button type="button">
                    <Link to="/patients/new">Add Patient</Link>
                </button>
            </center>
            {patients.length > 0 ? (
                <ul>
                    {patients.map((patient) => (
                        <li key={patient._id}>
                            <Link to={`/patients/${patient._id}`}>{patient.name}</Link>
                            <button onClick={() => handleDelete(patient._id)} type="button">
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No patients found</p>
            )}
        </div>
        </center>
    );
};

export default PatientList;
