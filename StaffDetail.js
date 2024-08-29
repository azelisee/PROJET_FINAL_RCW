import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getStaffById } from '../../services/api';
import {useVerifyAccess} from '../../utils/DecodeToken';
import '../../css/PatientDetail.css';

const StaffDetail = () => {
    const { id } = useParams();
    const [staff, setStaff] = useState(null);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const verifyAccess = useVerifyAccess(['Administrator', 'Doctor','Nurse']);

    useEffect(() => {
        getStaffById(id).then((response) => {
            setStaff(response.data);
        }).catch(error => {
            console.error('There was an error fetching the staff details!', error);
            setError('There was an error fetching the staff details!');
        });
    }, [id]);

    const handleStaffEditClick = (e, id) => {
        e.preventDefault();
        if (verifyAccess()) {
            navigate(`/staff/${staff._id}/edit`);
        }else{
            navigate('/unauthorized');
        }
    };

    if (error) return <div>{error}</div>;
    if (!staff) return <div>Loading...</div>;

    return (
        <div className="patient-detail-container">
            <h2>Staff Details</h2>
            <div className="patient-detail-field"><p><strong>Name:</strong> {staff.name}</p></div>
            <div className="patient-detail-field"><p><strong>Email:</strong> {staff.email}</p></div>
            <div className="patient-detail-field"><p><strong>Phone:</strong> {staff.phone}</p></div>
            <div className="patient-detail-field"><p><strong>Role:</strong> {staff.role}</p></div>
            <div className="patient-detail-field"><p><strong>Department:</strong> {staff.department}</p></div>
            <div className="patient-detail-field"><p><strong>Hospital:</strong> {staff.hospital}</p></div>
            <div className="patient-detail-field"><p><strong>Date of Birth:</strong> {new Date(staff.dateOfBirth).toLocaleDateString()}</p></div>
            <center><Link to="#" className="btn" style={{ width: '150px' }} onClick={(e) => handleStaffEditClick(e, staff._id)}>Edit Staff</Link></center>
        </div>
    );
};

export default StaffDetail;
