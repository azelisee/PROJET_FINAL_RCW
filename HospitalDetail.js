import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getHospitalById } from '../../services/api';
import '../../css/PatientDetail.css';
import {useVerifyAccess} from '../../utils/DecodeToken';

const HospitalDetail = () => {
    const { id } = useParams();
    const [hospital, setHospital] = useState(null);
    const navigate = useNavigate();
    const verifyAccess = useVerifyAccess(['Administrator','Technician','Caregiver','Other', 'Doctor','Nurse']);

    useEffect(() => {
        if (!verifyAccess()) {
            navigate('/unauthorized');
        } else {
            getHospitalById(id).then((response) => {
                setHospital(response.data);
            }).catch(error => {
                console.error('There was an error fetching the hospital details!', error);
            });
        }
    }, [id, navigate, verifyAccess]);

    if (!hospital) return <div>Loading...</div>;

    return (
        <div className="patient-detail-container">
            <h2>Hospital Details</h2>
            <div className="patient-detail-field"><p><strong>Name:</strong> {hospital.name}</p></div>
            <div className="patient-detail-field"><p><strong>Address:</strong> {hospital.address}</p></div>
            <div className="patient-detail-field"><p><strong>Website:</strong> <a href={hospital.website} target="_blank" rel="noopener noreferrer">{hospital.website}</a></p></div>
            <div className="patient-detail-field"><p><strong>Email:</strong> {hospital.email}</p></div>
            <div className="patient-detail-field"><p><strong>Phone:</strong> {hospital.phone}</p></div>
            <center><Link to={`/hospitals/${hospital._id}/edit`} className="btn" style={{ width: '150px' }}>Edit Hospital</Link></center>
        </div>
    );
};

export default HospitalDetail;
