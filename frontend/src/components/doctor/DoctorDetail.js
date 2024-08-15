import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getDoctorById } from '../../services/api';
import '../../css/PatientDetail.css';
import {useVerifyAccess} from '../../utils/DecodeToken';

const DoctorDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const verifyAccess = useVerifyAccess(['Administrator', 'Doctor', 'Nurse']);

    useEffect(() => {
        if (!verifyAccess()) {
            navigate('/unauthorized');
        } else {
            getDoctorById(id).then((response) => {
                if (response.data) {
                    setDoctor(response.data);
                } else {
                    console.error('Expected an object but got:', response.data);
                }
            }).catch(error => {
                console.error('There was an error fetching the doctor details!', error);
            });
        }
    }, [id, navigate, verifyAccess]);

    if (!doctor) return <div>Loading...</div>;

    return (
        <div className="patient-detail-container">
            <h2>Doctor Details</h2>
            <div className="patient-detail-field">
                <p><strong>Title:</strong> {doctor.title}</p>
            </div>
            <div className="patient-detail-field">
                <p><strong>Email:</strong> {doctor.email}</p>
            </div>
            <div className="patient-detail-field">
                <p><strong>Phone:</strong> {doctor.phone}</p>
            </div>
            <div className="patient-detail-field">
                <p><strong>Speciality:</strong> {doctor.speciality}</p>
            </div>
            <div className="patient-detail-field">
                <p><strong>Seniority:</strong> {doctor.seniority} years</p>
            </div>
            <div className="patient-detail-field">
                <p><strong>Gender:</strong> {doctor.gender}</p>
            </div>
            <div className="patient-detail-field">
                <p><strong>Department:</strong> {doctor.department.name}</p>
            </div>
            <div className="patient-detail-field">
                <p><strong>Hospital:</strong> {doctor.hospital.name}</p>
            </div>
            <h3>Schedule:</h3>
            <ul>
                {doctor.schedule.map((slot, index) => (
                    <li key={index}>{slot.day}: {slot.startTime} - {slot.endTime}</li>
                ))}
            </ul>
            <h3>Appointments:</h3>
            <ul>
                {doctor.appointments.map((appointment, index) => (
                    <li key={index}>
                        Patient: {appointment.patient.name} on {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                        ({appointment.status})
                    </li>
                ))}
            </ul>
            <center><Link to={`/doctors/${doctor._id}/edit`} className="btn" style={{width : '150px'}}>Edit Doctor</Link></center>
        </div>
    );
};

export default DoctorDetail;
