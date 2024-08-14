import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDepartmentById } from '../../services/api';
import '../../css/PatientDetail.css';

const DepartmentDetail = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState(null);

    useEffect(() => {
        getDepartmentById(id).then((response) => {
            if (response.data.department) {
                setDepartment(response.data.department);
            } else {
                console.error('Expected an object but got:', response.data);
            }
        }).catch(error => {
            console.error('There was an error fetching the department details!', error);
        });
    }, [id]);

    if (!department) return <div>Loading...</div>;

    return (
        <center>
            <div className="patient-detail-container">
            <h2>{department.name}</h2>
            <p><strong>Department Number:</strong> {department.depNumber}</p>
            <p><strong>Description:</strong> {department.description}</p>
            <p><strong>Hospital:</strong> {department.hospital.name}</p>
            <Link to={`/departments/${department._id}/edit`}>Edit Department</Link>
        </div>
        </center>
    );
};

export default DepartmentDetail;
