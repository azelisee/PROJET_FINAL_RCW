import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getStaffById } from '../../services/api';
import '../../css/PatientDetail.css';

const StaffDetail = () => {
    const { id } = useParams();
    const [staff, setStaff] = useState(null);

    useEffect(() => {
        getStaffById(id).then((response) => {
            if (response.data.staff) {
                setStaff(response.data.staff);
            } else {
                console.error('Expected an object but got:', response.data);
            }
        }).catch(error => {
            console.error('There was an error fetching the staff details!', error);
        });
    }, [id]);

    if (!staff) return <div>Loading...</div>;

    return (
        <center>
            <div className="patient-detail-container">
                <h2>{staff.name}</h2>
                <p><strong>Email:</strong> {staff.email}</p>
                <p><strong>Phone:</strong> {staff.phone}</p>
                <p><strong>Role:</strong> {staff.role}</p>
                <p><strong>Department:</strong> {staff.department.name}</p>
                <p><strong>Hospital:</strong> {staff.hospital.name}</p>
                <p><strong>Date of Birth:</strong> {new Date(staff.dateOfBirth).toLocaleDateString()}</p>
                <p><strong>Hire Date:</strong> {new Date(staff.hireDate).toLocaleDateString()}</p>

                <Link to={`/staff/${staff._id}/edit`} className="btn">Edit Staff</Link>
            </div>
        </center>
    );
};

export default StaffDetail;
