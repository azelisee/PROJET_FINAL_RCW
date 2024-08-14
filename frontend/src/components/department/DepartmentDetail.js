import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getDepartmentById } from '../../services/api';
import '../../css/PatientDetail.css';

const DepartmentDetail = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState(null);

    useEffect(() => {
        getDepartmentById(id).then((response) => {
            setDepartment(response.data);
        }).catch(error => {
            console.error('There was an error fetching the department details!', error);
        });
    }, [id]);

    if (!department) return <div>Loading...</div>;

    return (
        <div className="patient-detail-container">
            <h2>Department Details</h2>
            <div className="patient-detail-field"><p><strong>Department Number:</strong> {department.depNumber}</p></div>
            <div className="patient-detail-field"><p><strong>Name:</strong> {department.name}</p></div>
            <div className="patient-detail-field"><p><strong>Description:</strong> {department.description}</p></div>
            <div className="patient-detail-field"><p><strong>Hospital:</strong> {department.hospital}</p></div>
            <center><Link to={`/departments/${department._id}/edit`} className="btn" style={{ width: '150px' }}>Edit Department</Link></center>
        </div>
    );
};

export default DepartmentDetail;
