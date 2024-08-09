import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPatientById, updatePatient } from '../../services/api';
import '../css/PatientForm.css';

const PatientEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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

    useEffect(() => {
        getPatientById(id).then((response) => {
            console.log(response.data);
            if (response.data && response.data.patient) {
                setPatient(response.data.patient);
            } else {
                console.error('Invalid response data:', response.data);
            }
        }).catch(error => {
            console.error('There was an error fetching the patient details!', error);
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatient({ ...patient, [name]: value });
    };

    const handleNestedChange = (e, index, field, subfield = null) => {
        const { name, value } = e.target;
        const updatedField = [...patient[field]];

        if (subfield) {
            updatedField[index][subfield][name] = value;
        } else {
            updatedField[index][name] = value;
        }

        setPatient({ ...patient, [field]: updatedField });
    };

    const addNestedField = (field) => {
        let newField = {};
        if (field === 'medicalFolders') {
            newField = { folderName: '', documents: [{ type: '', url: '', dateAdded: '' }] };
        } else if (field === 'consultationHistory') {
            newField = { date: '', doctorId: '', doctorName: '', notes: '', diagnosis: '', prescriptions: [{ medicine: '', dosage: '', duration: '' }], department: '', room: '' };
        } else if (field === 'treatments') {
            newField = { treatmentName: '', startDate: '', endDate: '', description: '', status: '', department: '', room: '' };
        }
        setPatient({ ...patient, [field]: [...patient[field], newField] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updatePatient(id, patient).then(() => {
            navigate(`/patients/${id}`);
        }).catch(error => {
            console.error('There was an error updating the patient!', error);
        });
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2>Edit Patient</h2>
            <div className="form-group">
                <input type="text" name="name" value={patient.name} onChange={handleChange} placeholder="Name" required />
                <input type="number" name="age" value={patient.age} onChange={handleChange} placeholder="Age" required />
            </div>
            <div className="form-group">
                <input type="email" name="email" value={patient.email} onChange={handleChange} placeholder="Email" required />
                <input type="tel" name="tel" value={patient.tel} onChange={handleChange} placeholder="Phone" required />
            </div>
            <div className="form-group">
                <input type="text" name="address" value={patient.address} onChange={handleChange} placeholder="Address" required />
                <input type="date" name="dateOfBirth" value={patient.dateOfBirth} onChange={handleChange} placeholder="Date of Birth" required />
            </div>
            <div className="form-group">
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
            {patient.medicalFolders.map((folder, index) => (
                <div key={index}>
                    <input type="text" name="folderName" value={folder.folderName} onChange={(e) => handleNestedChange(e, index, 'medicalFolders')} placeholder="Folder Name" required />
                    <h4>Documents</h4>
                    {folder.documents.map((doc, docIndex) => (
                        <div key={docIndex} className="form-group">
                            <input type="text" name="type" value={doc.type} onChange={(e) => handleNestedChange(e, index, 'medicalFolders', 'documents')} placeholder="Document Type" required />
                            <input type="url" name="url" value={doc.url} onChange={(e) => handleNestedChange(e, index, 'medicalFolders', 'documents')} placeholder="Document URL" required />
                            <input type="date" name="dateAdded" value={doc.dateAdded} onChange={(e) => handleNestedChange(e, index, 'medicalFolders', 'documents')} placeholder="Date Added" />
                        </div>
                    ))}
                </div>
            ))}
            <button type="button" onClick={() => addNestedField('medicalFolders')}  style={{width:'175px'}}>Add Medical Folder</button>

            <h3>Consultation History</h3>
            {patient.consultationHistory.map((consultation, index) => (
                <div key={index} className="form-group">
                    <input type="date" name="date" value={consultation.date} onChange={(e) => handleNestedChange(e, index, 'consultationHistory')} placeholder="Consultation Date" required />
                    <input type="text" name="doctorId" value={consultation.doctorId} onChange={(e) => handleNestedChange(e, index, 'consultationHistory')} placeholder="Doctor ID" required />
                    <input type="text" name="doctorName" value={consultation.doctorName} onChange={(e) => handleNestedChange(e, index, 'consultationHistory')} placeholder="Doctor Name" required />
                    <input type="text" name="notes" value={consultation.notes} onChange={(e) => handleNestedChange(e, index, 'consultationHistory')} placeholder="Notes" />
                    <input type="text" name="diagnosis" value={consultation.diagnosis} onChange={(e) => handleNestedChange(e, index, 'consultationHistory')} placeholder="Diagnosis" />
                </div>
            ))}
            <button type="button" onClick={() => addNestedField('consultationHistory')}  style={{width:'175px'}}>Add Consultation</button>

            <h3>Treatments</h3>
            {patient.treatments.map((treatment, index) => (
                <div key={index} className="form-group">
                    <input type="text" name="treatmentName" value={treatment.treatmentName} onChange={(e) => handleNestedChange(e, index, 'treatments')} placeholder="Treatment Name" required />
                    <input type="date" name="startDate" value={treatment.startDate} onChange={(e) => handleNestedChange(e, index, 'treatments')} placeholder="Start Date" />
                    <input type="date" name="endDate" value={treatment.endDate} onChange={(e) => handleNestedChange(e, index, 'treatments')} placeholder="End Date" />
                    <input type="text" name="description" value={treatment.description} onChange={(e) => handleNestedChange(e, index, 'treatments')} placeholder="Description" />
                    <select name="status" value={treatment.status} onChange={(e) => handleNestedChange(e, index, 'treatments')} required>
                        <option value="">Select Status</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                        <option value="planned">Planned</option>
                    </select>
                </div>
            ))}
            <button type="button" onClick={() => addNestedField('treatments')}  style={{width:'175px'}}>Add Treatment</button>
             <br/>
            <input type="text" name="currentRoom" value={patient.currentRoom} onChange={handleChange} placeholder="Current Room" style={{width:'185px'}}  required />

            <center><button type="submit"  style={{width:'175px'}}>Submit</button></center>
        </form>
    );
};

export default PatientEdit;
