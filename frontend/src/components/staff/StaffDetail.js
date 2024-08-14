import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getStaffById } from '../../services/api';
import '../../css/PatientDetail.css';

const StaffDetail = () => {
    const { id } = useParams();
    const [staff, setStaff] = useState(null);

    useEffect(() => {
        getStaffById(id).then((response) => {
            setStaff(response.data);
        }).catch(error => {
            console.error('There was an error fetching the staff details!', error);
        });
    }, [id]);

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
            <center><Link to={`/staff/${staff._id}/edit`} className="btn" style={{ width: '150px' }}>Edit Staff</Link></center>
        </div>
    );
};

export default StaffDetail;
