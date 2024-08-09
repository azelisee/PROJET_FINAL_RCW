import React, { useState } from 'react';
import { createPatient } from '../../services/api';
import '../css/PatientForm.css';

const PatientForm = () => {
    const [patient, setPatient] = useState({
        name: '',
        age: '',
        email: '',
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatient({ ...patient, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createPatient(patient).then(response => {
            console.log('Patient created', response.data);
        });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2>Add New Patient</h2>
                <div className="form-group">
                    <input type="text" name="name" value={patient.name} onChange={handleChange} placeholder="Name" required />
                    <input type="number" name="age" value={patient.age} onChange={handleChange} placeholder="Age" required />
                    <input type="email" name="email" value={patient.email} onChange={handleChange} placeholder="Email" required />
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
                    <input type="text" name="folderName" placeholder="Folder Name" />
                    <div>
                        <input type="text" name="documentType" placeholder="Document Type" />
                        <input type="url" name="documentUrl" placeholder="Document URL" />
                        <input type="date" name="documentDate" />
                        <br/>
                        <button type="button">Add Medical Folder</button>
                    </div>
                </div>

                <h3>Consultation History</h3>
                <div className="form-group">
                    <input type="date" name="consultationDate" placeholder="Date" />
                    <input type="text" name="doctorId" placeholder="Doctor ID" />
                    <input type="text" name="doctorName" placeholder="Doctor Name" />
                    <input type="text" name="notes" placeholder="Notes" />
                    <input type="text" name="diagnosis" placeholder="Diagnosis" />
                </div>
                <button type="button" style={{width:'175px'}}>Add Consultation</button>

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
                    <button type="button">Add Treatment</button>
                </div>

                <div className="form-group">
                    <input type="text" name="currentRoom" value={patient.currentRoom} onChange={handleChange} placeholder="Current Room" />
                </div>

                <center><button type="submit"  style={{width:'175px'}}>Add Patient</button></center>
            </form>
        </div>
    );
};

export default PatientForm;
