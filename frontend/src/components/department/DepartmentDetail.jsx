import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getDepartmentById } from '../../services/api';
import '../../css/PatientDetail.css';
import { useVerifyAccess } from '../../utils/DecodeToken';

const DepartmentDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [department, setDepartment] = useState(null);
    const [error, setError] = useState('');

    const verifyAccess = useVerifyAccess(['Administrator','Doctor']);

    useEffect(() => {
        getDepartmentById(id).then((response) => {
                if (response.data) {
                    setDepartment(response.data);
                } else {
                    console.error('Expected an object but got:', response.data);
                    setError('Invalid response data.');
                }
        })
        .catch((error) => {
            console.error('There was an error fetching the department details!', error);
            setError('There was an error fetching the department details!');
        });
    }, [id]);

    const handleDepartmentEditClick = (e, id) => {
        e.preventDefault();
        if (verifyAccess()) {
            navigate(`/departments/${department._id}/edit`);
        }else{
            navigate('/unauthorized');
        }
    };

    if (error) return <div>{error}</div>;
    if (!department) return <div>Loading...</div>;

    return (
        <div className="patient-detail-container">
            <h2>Department Details</h2>
            <div className="patient-detail-field"><p><strong>Department Number:</strong> {department.depNumber}</p></div>
            <div className="patient-detail-field"><p><strong>Name:</strong> {department.name}</p></div>
            <div className="patient-detail-field"><p><strong>Description:</strong> {department.description}</p></div>
            <div className="patient-detail-field"><p><strong>Doctors</strong> {department.doctors}</p></div>
            <div className="patient-detail-field"><p><strong>Nurses:</strong> {department.nurses}</p></div>
            <div className="patient-detail-field"><p><strong>Hospital:</strong> {department.hospital}</p></div>
            <center>
                <Link to="#" onClick={(e) => handleDepartmentEditClick(e, department._id)} className="btn" style={{ width: '150px' }}>
                    Edit Department
                </Link>
            </center>
        </div>
    );
};

export default DepartmentDetail;
