import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDepartmentById } from '../../services/api';

const DepartmentDetail = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState(null);

    useEffect(() => {
        getDepartmentById(id).then(data => setDepartment(data));
    }, [id]);

    if (!department) return <div>Loading...</div>;

    return (
        <div>
            <h2>{department.name}</h2>
            <p>{department.description}</p>
        </div>
    );
};

export default DepartmentDetail;
