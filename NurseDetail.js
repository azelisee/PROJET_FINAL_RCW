import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getNurseById } from '../../services/api';
import '../../css/PatientDetail.css';
import {useVerifyAccess} from '../../utils/DecodeToken';

const NurseDetail = () => {
    const { id } = useParams();
    const [nurse, setNurse] = useState(null);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const verifyAccess = useVerifyAccess(['Administrator', 'Doctor', 'Nurse','Technician','Caregiver']);

    useEffect(() => {
        getNurseById(id).then((response) => {
            setNurse(response.data);
        }).catch(error => {
            console.error('Error fetching nurse details:', error);
            setError('There was an error fetching the nurse details!');
        });
    }, [id]);

    const handleNurseEditClick = (e, id) => {
        e.preventDefault();
        if (verifyAccess()) {
            navigate(`/nurses/${nurse._id}/edit`);
        }else{
            navigate('/unauthorized');
        }
    };

    if (error) return <div>{error}</div>;
    if (!nurse) return <div>Loading...</div>;

    return (
        <div className="patient-detail-container">
            <h2>Nurse Details</h2>
            <div className="patient-detail-field">
                <p><strong>Name:</strong> {nurse.name}</p>
            </div>
            <div className="patient-detail-field">
                <p><strong>Title:</strong> {nurse.title}</p>
            </div>
            <div className="patient-detail-field">
                <p><strong>Email:</strong> {nurse.email}</p>
            </div>
            <div className="patient-detail-field">
                <p><strong>Gender:</strong> {nurse.gender}</p>
            </div>
            <div className="patient-detail-field">
                <p><strong>Phone:</strong> {nurse.phone}</p>
            </div>
            <div className="patient-detail-field">
                <p><strong>Department:</strong> {nurse.department}</p>
            </div>
            <div className="patient-detail-field">
                <p><strong>Hospital:</strong> {nurse.hospital}</p>
            </div>
            <div className="patient-detail-field">
                <p><strong>Date of Birth:</strong> {new Date(nurse.dateOfBirth).toLocaleDateString()}</p>
            </div>
            <div className="patient-detail-field">
                <p><strong>Qualifications:</strong> {nurse.qualifications.join(', ')}</p>
            </div>
            <div className="patient-detail-field">
                <p><strong>Seniority:</strong> {nurse.seniority} years</p>
            </div>
            <center><Link to="#" className="btn" style={{width : '150px'}} onClick={(e) => handleNurseEditClick(e, nurse._id)}>Edit Nurse</Link></center>
        </div>
    );
};

export default NurseDetail;
