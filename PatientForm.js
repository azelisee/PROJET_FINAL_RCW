import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPatient } from '../../services/api';
import '../../css/PatientForm.css';
import {useVerifyAccess} from '../../utils/DecodeToken';

const PatientForm = () => {
    const [patient, setPatient] = useState({
        title: '',
        name: '',
        age: '',
        email: '',
        password: '',
        tel: '',
        address: '',
        dateOfBirth: '',
        gender: '',
        bloodType: '',
        medicalFolders: [],
        consultationHistory: [],
        treatments: [],
        currentRoom: ''
    });

    const [message, setMessage] = useState({ type: '', content: '' });

    const navigate = useNavigate();
    const verifyAccess = useVerifyAccess(['Doctor', 'Nurse']);

    useEffect(() => {
        if (!verifyAccess()) {
            navigate('/unauthorized');
        }
    }, [verifyAccess, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatient({ ...patient, [name]: value });
    };

    const addConsultation = () => {
        setPatient({
            ...patient,
            consultationHistory: [
                ...patient.consultationHistory,
                {
                    date: '',
                    doctorId: '',
                    doctorName: '',
                    notes: '',
                    diagnosis: '',
                    prescriptions: [{ medicine: '', dosage: '', duration: '' }],
                    department: '',
                    room: ''
                }
            ]
        });
    };

    const handleConsultationChange = (e, index, field) => {
        const updatedConsultationHistory = [...patient.consultationHistory];
        updatedConsultationHistory[index][field] = e.target.value;
        setPatient({ ...patient, consultationHistory: updatedConsultationHistory });
    };

    const handlePrescriptionChange = (e, index, prescriptionIndex, field) => {
        const updatedConsultationHistory = [...patient.consultationHistory];
        updatedConsultationHistory[index].prescriptions[prescriptionIndex][field] = e.target.value;
        setPatient({ ...patient, consultationHistory: updatedConsultationHistory });
    };

    const addPrescription = (index) => {
        const updatedConsultationHistory = [...patient.consultationHistory];
        updatedConsultationHistory[index].prescriptions.push({ medicine: '', dosage: '', duration: '' });
        setPatient({ ...patient, consultationHistory: updatedConsultationHistory });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createPatient(patient)
            .then(response => {
                setMessage({ type: 'success', content: 'Patient created successfully!' });
                console.log('Patient created', response.data);
                navigate('/patients');
            })
            .catch(error => {
                setMessage({ type: 'error', content: 'Failed to create patient.' });
                console.error('There was an error creating the patient!', error);
            });
    };

    return (
        <center>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Add New Patient</h2>
                    {message.content && (
                        <div className={`message ${message.type}`}>
                            {message.content}
                        </div>
                    )}
                    <div className="form-group">
                    <select name="title" value={patient.title} onChange={handleChange} required>
                        <option value="">Select Title</option>
                        <option value="Patient">Patient</option>
                    </select>
                        <input type="text" name="name" value={patient.name} onChange={handleChange} placeholder="Name" required />
                        <input type="number" name="age" value={patient.age} onChange={handleChange} placeholder="Age" required />
                        <input type="email" name="email" value={patient.email} onChange={handleChange} placeholder="Email" required />
                        <input type="password" name="password" value={patient.password} onChange={handleChange} placeholder="Password" required />
                        <input type="tel" name="tel" value={patient.tel} onChange={handleChange} placeholder="Phone" required />
                        <input type="text" name="address" value={patient.address} onChange={handleChange} placeholder="Address" required />
                        <input type="date" name="dateOfBirth" value={patient.dateOfBirth} onChange={handleChange} required />
                        <select name="gender" value={patient.gender} onChange={handleChange} required>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <select name="bloodType" value={patient.bloodType} onChange={handleChange} required>
                            <option value="">Select Blood Type</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>

                    <h3>Medical Folders</h3>
                    <div className="form-group">
                        <div>
                            <input type="text" name="folderName" placeholder="Folder Name" />
                            <input type="text" name="documentType" placeholder="Document Type" />
                            <input type="url" name="documentUrl" placeholder="Document URL" />
                            <input type="date" name="documentDate" />
                            <br />
                            <button type="button" className="btn-blue">Add Medical Folder</button>
                        </div>
                    </div>

                    <h3>Consultation History</h3>
                    {patient.consultationHistory.map((consultation, index) => (
                        <div key={index} className="form-group">
                            <input
                                type="date"
                                name="consultationDate"
                                value={consultation.date}
                                onChange={(e) => handleConsultationChange(e, index, 'date')}
                                placeholder="Date"
                            />
                            <input
                                type="text"
                                name="doctorId"
                                value={consultation.doctorId}
                                onChange={(e) => handleConsultationChange(e, index, 'doctorId')}
                                placeholder="Doctor ID"
                            />
                            <input
                                type="text"
                                name="doctorName"
                                value={consultation.doctorName}
                                onChange={(e) => handleConsultationChange(e, index, 'doctorName')}
                                placeholder="Doctor Name"
                            />
                            <input
                                type="text"
                                name="notes"
                                value={consultation.notes}
                                onChange={(e) => handleConsultationChange(e, index, 'notes')}
                                placeholder="Notes"
                            />
                            <input
                                type="text"
                                name="diagnosis"
                                value={consultation.diagnosis}
                                onChange={(e) => handleConsultationChange(e, index, 'diagnosis')}
                                placeholder="Diagnosis"
                            />
                            <div>
                                <h4>Prescriptions</h4>
                                {consultation.prescriptions.map((prescription, prescriptionIndex) => (
                                    <div key={prescriptionIndex} className="prescription-group">
                                        <input
                                            type="text"
                                            name="medicine"
                                            value={prescription.medicine}
                                            onChange={(e) => handlePrescriptionChange(e, index, prescriptionIndex, 'medicine')}
                                            placeholder="Medicine"
                                        />
                                        <input
                                            type="text"
                                            name="dosage"
                                            value={prescription.dosage}
                                            onChange={(e) => handlePrescriptionChange(e, index, prescriptionIndex, 'dosage')}
                                            placeholder="Dosage"
                                        />
                                        <input
                                            type="text"
                                            name="duration"
                                            value={prescription.duration}
                                            onChange={(e) => handlePrescriptionChange(e, index, prescriptionIndex, 'duration')}
                                            placeholder="Duration"
                                        />
                                    </div>
                                ))}
                                <button type="button" className="btn-blue" onClick={() => addPrescription(index)}>Add Prescription</button>
                            </div>
                            <input
                                type="text"
                                name="department"
                                value={consultation.department}
                                onChange={(e) => handleConsultationChange(e, index, 'department')}
                                placeholder="Department"
                            />
                            <input
                                type="text"
                                name="room"
                                value={consultation.room}
                                onChange={(e) => handleConsultationChange(e, index, 'room')}
                                placeholder="Room"
                            />
                        </div>
                    ))}
                    <button type="button" className="btn-blue" onClick={addConsultation}>Add Consultation</button>

                    <h3>Treatments</h3>
                    <div className="form-group">
                        <input type="text" name="treatmentName" placeholder="Treatment Name" />
                        <input type="date" name="startDate" placeholder="Start Date" />
                        <input type="date" name="endDate" placeholder="End Date" />
                        <input type="text" name="description" placeholder="Description" />
                        <select name="status">
                            <option value="">Select Status</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                            <option value="planned">Planned</option>
                        </select>
                        <button type="button" className="btn-blue">Add Treatment</button>
                    </div>

                    <div className="form-group">
                        <input type="text" name="currentRoom" value={patient.currentRoom} onChange={handleChange} placeholder="Current Room" />
                    </div>

                    <center><button type="submit" className="btn-green">Add Patient</button></center>
                </form>
            </div>
        </center>
    );
};

export default PatientForm;
