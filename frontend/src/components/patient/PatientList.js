import React, { useEffect, useState } from 'react';
import { getPatients } from '../../services/api';

const PatientList = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        const response = await getPatients();
        setPatients(response.data);
    };

    return (
        <div>
            <h1>Patients</h1>
            <ul>
                {patients.map(patient => (
                    <li key={patient._id}>
                        {patient.name} - {patient.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PatientList;
