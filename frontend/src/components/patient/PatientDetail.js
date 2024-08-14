import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPatientById } from '../../services/api';
import '../../css/PatientDetail.css';


const PatientDetail = () => {
    const {id} = useParams();
    console.log('id:',id );

    const [patient, setPatient] = useState(null);
    useEffect(() => {
        getPatientById(id).then((response) => {
            if (response.data) {
                setPatient(response.data);
            } else {
                console.error('Expected an object but got:', response.data);
            }
        }).catch(error => {
            console.error('There was an error fetching the patient details!', error);
        });
    }, [id]);


    if (!patient) return <div>Loading...</div>;

    return (
        <div className="patient-detail-container">
            <h2>Patient Details</h2>

            <div className="patient-detail-field">
                <p><strong>Name:</strong> {patient.name}</p>
            </div>
            <div className="patient-detail-field">
                <p><strong>Age:</strong> {patient.age}</p>
            </div>
            <div className="patient-detail-field">
                <p><strong>Email:</strong> {patient.email}</p>
            </div>
            <div className="patient-detail-field">
                <p><strong>Phone:</strong> {patient.tel}</p>
            </div>
            <div className="patient-detail-field">
                <p><strong>Address:</strong> {patient.address}</p>
            </div>
            <div className="patient-detail-field">
                <p><strong>Date of Birth:</strong> {new Date(patient.dateOfBirth).toLocaleDateString()}</p>
            </div>
            <div className="patient-detail-field">
                <p><strong>Gender:</strong> {patient.gender}</p>
            </div>
            <div className="patient-detail-field">
                <p><strong>Blood Type:</strong> {patient.bloodType}</p>
            </div>

            <h3>Medical Folders</h3>
            {patient.medicalFolders.length > 0 ? patient.medicalFolders.map((folder, index) => (
                <div key={index}>
                    <h4>{folder.folderName}</h4>
                    <ul>
                        {folder.documents.map((doc, idx) => (
                            <li key={idx}>
                                <a href={doc.url} target="_blank" rel="noopener noreferrer">{doc.type}</a> (Added on: {new Date(doc.dateAdded).toLocaleDateString()})
                            </li>
                        ))}
                    </ul>
                </div>
            )) : <p>No medical folders available.</p>}

            <h3>Consultation History</h3>
            {patient.consultationHistory.length > 0 ? patient.consultationHistory.map((consultation, index) => (
                <div key={index}>
                    <p><strong>Date:</strong> {new Date(consultation.date).toLocaleDateString()}</p>
                    <p><strong>Doctor:</strong> {consultation.doctorName}</p>
                    <p><strong>Notes:</strong> {consultation.notes}</p>
                    <p><strong>Diagnosis:</strong> {consultation.diagnosis}</p>
                    <p><strong>Prescriptions:</strong></p>
                    <ul>
                        {consultation.prescriptions.map((prescription, idx) => (
                            <li key={idx}>{prescription.medicine} - {prescription.dosage} for {prescription.duration}</li>
                        ))}
                    </ul>
                    <p><strong>Department:</strong> {consultation.department}</p>
                    <p><strong>Room:</strong> {consultation.room}</p>
                </div>
            )) : <p>No consultation history available.</p>}

            <h3>Treatments</h3>
            {patient.treatments.length > 0 ? patient.treatments.map((treatment, index) => (
                <div key={index}>
                    <p><strong>Treatment Name:</strong> {treatment.treatmentName}</p>
                    <p><strong>Description:</strong> {treatment.description}</p>
                    <p><strong>Status:</strong> {treatment.status}</p>
                    <p><strong>Start Date:</strong> {new Date(treatment.startDate).toLocaleDateString()}</p>
                    <p><strong>End Date:</strong> {treatment.endDate ? new Date(treatment.endDate).toLocaleDateString() : 'Ongoing'}</p>
                    <p><strong>Department:</strong> {treatment.department}</p>
                    <p><strong>Room:</strong> {treatment.room}</p>
                </div>
            )) : <p>No treatments available.</p>}

            <h3>Current Room</h3>
            <p>{patient.currentRoom}</p>

            <center><Link to={`/patients/${patient._id}/edit`} className="btn" style={{width : '150px'}}>Edit Patient</Link></center>
        </div>
    );
};

export default PatientDetail;
