import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNurseById } from '../../services/api';

const NurseDetail = () => {
    const { id } = useParams();
    const [nurse, setNurse] = useState(null);

    useEffect(() => {
        getNurseById(id).then(data => setNurse(data));
    }, [id]);

    if (!nurse) return <div>Loading...</div>;

    return (
        <div>
            <h2>{nurse.name}</h2>
            <p>{nurse.department}</p>
        </div>
    );
};

export default NurseDetail;
