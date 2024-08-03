import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDoctorById } from '../../services/api';

const DoctorDetail = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
        getDoctorById(id).then(data => setDoctor(data));
    }, [id]);

    if (!doctor) return <div>Loading...</div>;

    return (
        <div>
            <h2>{doctor.name}</h2>
            <p>{doctor.specialty}</p>
        </div>
    );
};

export default DoctorDetail;
