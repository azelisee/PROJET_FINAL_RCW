import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNurseById } from '../../services/api';
import '../../css/PatientDetail.css';

const NurseDetail = () => {
    const { id } = useParams();
    const [nurse, setNurse] = useState(null);

    useEffect(() => {
        getNurseById(id).then((response) => {
            setNurse(response.data.nurse);
        }).catch(error => {
            console.error('Error fetching nurse details:', error);
        });
    }, [id]);

    if (!nurse) return <div>Loading...</div>;

    return (
        <center>
            <div className="patient-detail-container">
            <h2>Nurse Details</h2>
            <p><strong>Name:</strong> {nurse.name}</p>
            <p><strong>Title:</strong> {nurse.title}</p>
            <p><strong>Email:</strong> {nurse.email}</p>
            <p><strong>Gender:</strong> {nurse.gender}</p>
            <p><strong>Phone:</strong> {nurse.phone}</p>
            <p><strong>Department:</strong> {nurse.department}</p>
            <p><strong>Hospital:</strong> {nurse.hospital}</p>
            <p><strong>Date of Birth:</strong> {new Date(nurse.dateOfBirth).toLocaleDateString()}</p>
            <p><strong>Qualifications:</strong> {nurse.qualifications.join(', ')}</p>
            <p><strong>Seniority:</strong> {nurse.seniority} years</p>
            <Link to={`/nurses/${nurse._id}/edit`}>Edit Nurse</Link>
        </div>
        </center>
    );
};

export default NurseDetail;
