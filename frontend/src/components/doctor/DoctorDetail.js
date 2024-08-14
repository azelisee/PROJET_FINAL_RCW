import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDoctorById } from '../../services/api';
import '../../css/PatientDetail.css';

const DoctorDetail = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
        getDoctorById(id).then((response) => {
            if (response.data) {
                setDoctor(response.data);
            } else {
                console.error('Expected an object but got:', response.data);
            }
        }).catch(error => {
            console.error('There was an error fetching the doctor details!', error);
        });
    }, [id]);

    if (!doctor) return <div>Loading...</div>;

    return (
            <div className="patient-detail-container">
            <h2>{doctor.name}</h2>
            <p><strong>Title:</strong> {doctor.title}</p>
            <p><strong>Email:</strong> {doctor.email}</p>
            <p><strong>Phone:</strong> {doctor.phone}</p>
            <p><strong>Speciality:</strong> {doctor.speciality}</p>
            <p><strong>Seniority:</strong> {doctor.seniority} years</p>
            <p><strong>Gender:</strong> {doctor.gender}</p>
            <p><strong>Department:</strong> {doctor.department.name}</p>
            <p><strong>Hospital:</strong> {doctor.hospital.name}</p>
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
            <center><button type="button"><Link to={`/doctors/${doctor._id}/edit`}>Edit Doctor</Link></button></center>
        </div>
    );
};

export default DoctorDetail;
