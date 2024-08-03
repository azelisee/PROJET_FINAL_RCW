import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PatientDetails = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);

    useEffect(() => {
        axios.get(`/patients/${id}`)
            .then(response => setPatient(response.data))
            .catch(error => console.error(error));
    }, [id]);

    if (!patient) return <div>Loading...</div>;

    return (
        <div>
            <h2>{patient.name}</h2>
            <p>Age: {patient.age}</p>
            <p>Email: {patient.email}</p>
        </div>
    );
};

export default PatientDetails;
