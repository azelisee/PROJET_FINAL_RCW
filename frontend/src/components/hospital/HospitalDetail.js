import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getHospitalById } from '../../services/api';
import '../../css/PatientDetail.css';

const HospitalDetail = () => {
    const { id } = useParams();
    const [hospital, setHospital] = useState(null);

    useEffect(() => {
        getHospitalById(id).then((response) => {
            if (response.data) {
                setHospital(response.data);
            } else {
                console.error('Expected an object but got:', response.data);
            }
        }).catch(error => {
            console.error('There was an error fetching the hospital details!', error);
        });
    }, [id]);

    if (!hospital) return <div>Loading...</div>;

    return (
            <div className="patient-detail-container">
            <h2>{hospital.name}</h2>
            <p><strong>Address:</strong> {hospital.address}</p>
            <p><strong>Website:</strong> <a href={hospital.website} target="_blank" rel="noopener noreferrer">{hospital.website}</a></p>
            <p><strong>Email:</strong> {hospital.email}</p>
            <p><strong>Phone:</strong> {hospital.phone}</p>
            <h3>Departments:</h3>
            <ul>
                {hospital.departments.length > 0 ? (
                    hospital.departments.map((department, index) => (
                        <li key={index}>{department.name}</li>
                    ))
                ) : (
                    <p>No departments available</p>
                )}
            </ul>
            <center><button type="button"><Link to={`/hospitals/${hospital._id}/edit`}>Edit Hospital</Link></button></center>
        </div>
    );
};

export default HospitalDetail;
