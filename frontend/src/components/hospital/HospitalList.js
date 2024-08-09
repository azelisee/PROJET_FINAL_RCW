import React, { useEffect, useState } from 'react';
import { getHospitals } from '../../services/api';
const HospitalList = () => {
    const [hospitals, setHospitals] = useState([]);

    useEffect(() => {
        getHospitals().then(data => setHospitals(data));
    }, []);

    return (
        <div>
            <h2>Hospitals</h2>
            <ul>
                {hospitals.map(hospital => (
                    <li key={hospital._id}>{hospital.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default HospitalList;
