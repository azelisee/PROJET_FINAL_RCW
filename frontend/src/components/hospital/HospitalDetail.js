import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHospitalById } from '../../services/api';

const HospitalDetail = () => {
    const { id } = useParams();
    const [hospital, setHospital] = useState(null);

    useEffect(() => {
        getHospitalById(id).then(data => setHospital(data));
    }, [id]);

    if (!hospital) return <div>Loading...</div>;

    return (
        <div>
            <h2>{hospital.name}</h2>
            <p>{hospital.description}</p>
        </div>
    );
};

export default HospitalDetail;
