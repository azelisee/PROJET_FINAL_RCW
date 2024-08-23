import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPatientById, updatePatient } from '../../services/api';
import '../../css/PatientForm.css';
import { useVerifyAccess } from '../../utils/DecodeToken';
import { jwtDecode } from 'jwt-decode';

const PatientEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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
    const [error, setError] = useState('');
    const [role, setRole] = useState('');

    const verifyAccess = useVerifyAccess(['Doctor','Patient']);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && token.split('.').length === 3) {
            try {
                const decodedToken = jwtDecode(token);
                if(decodedToken && verifyAccess){
                    setRole(decodedToken.role || decodedToken.title);
                    console.log('decodedToken : ',decodedToken);
                    console.log('role : ',role);
                }
            } catch (error) {
                console.error('Token decoding failed:', error);
            }
        } else {
            console.error('Invalid or malformed token');
        }

        getPatientById(id)
            .then((response) => {
                if (response.data) {
                    const patientData = response.data;
                    // Convertir les dates en format "yyyy-MM-dd"
                    if (patientData.dateOfBirth) {
                        patientData.dateOfBirth = new Date(patientData.dateOfBirth).toISOString().split('T')[0];
                    }
                    if (patientData.consultationHistory) {
                        patientData.consultationHistory = patientData.consultationHistory.map((consultation) => {
                            if (consultation.date) {
                                consultation.date = new Date(consultation.date).toISOString().split('T')[0];
                            }
                            return consultation;
                        });
                    }
                    if (patientData.treatments) {
                        patientData.treatments = patientData.treatments.map((treatment) => {
                            if (treatment.startDate) {
                                treatment.startDate = new Date(treatment.startDate).toISOString().split('T')[0];
                            }
                            if (treatment.endDate) {
                                treatment.endDate = new Date(treatment.endDate).toISOString().split('T')[0];
                            }
                            return treatment;
                        });
                    }
                    setPatient(patientData);
                } else {
                    setError('Invalid response data');
                    console.error('Invalid response data:', response.data);
                }
            })
            .catch(error => {
                setError('There was an error fetching the patient details!');
                console.error('There was an error fetching the patient details!', error);
            });

    }, [id, role]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatient({ ...patient, [name]: value });
    };

    const handleNestedChange = (e, index, field, subfield = null, subfieldIndex = null) => {
        const { name, value } = e.target;
        const updatedField = [...patient[field]];
        if (subfield) {
            updatedField[index][subfield][subfieldIndex] = {
                ...updatedField[index][subfield][subfieldIndex],
                [name]: value
            };
        } else {
            updatedField[index] = {
                ...updatedField[index],
                [name]: value
            };
        }
        setPatient({ ...patient, [field]: updatedField });
    };

    const addNestedField = (field, index = null, subfield = null) => {
        let newField = {};
        if (field === 'medicalFolders') {
            newField = { folderName: '', documents: [{ type: '', url: '', dateAdded: '' }] };
        } else if (field === 'consultationHistory') {
            newField = {
                date: '',
                doctorId: '',
                doctorName: '',
                notes: '',
                diagnosis: '',
                prescriptions: [{ medicine: '', dosage: '', duration: '' }],
                department: '',
                room: ''
            };
        } else if (field === 'treatments') {
            newField = { treatmentName: '', startDate: '', endDate: '', description: '', status: '' };
        }

        if (subfield) {
            const updatedField = [...patient[field]];
            updatedField[index][subfield].push(newField);
            setPatient({ ...patient, [field]: updatedField });
        } else {
            setPatient({ ...patient, [field]: [...patient[field], newField] });
        }
    };

    const addPrescription = (index) => {
        const updatedConsultationHistory = [...patient.consultationHistory];
        updatedConsultationHistory[index].prescriptions.push({ medicine: '', dosage: '', duration: '' });
        setPatient({ ...patient, consultationHistory: updatedConsultationHistory });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let updateData = { ...patient };

        if (role === 'Patient') {
            const allowedFieldsForPatient = ['title', 'name','age', 'email', 'password', 'tel', 'address', 'dateOfBirth', 'gender'];
            updateData = Object.keys(updateData)
                .filter(key => allowedFieldsForPatient.includes(key))
                .reduce((obj, key) => {
                    obj[key] = updateData[key];
                    return obj;
                }, {});
        } else if (role === 'Doctor') {
            const allowedFieldsForDoctor = ['bloodType', 'medicalFolders', 'consultationHistory', 'treatments', 'currentRoom'];
            updateData = Object.keys(updateData)
                .filter(key => allowedFieldsForDoctor.includes(key))
                .reduce((obj, key) => {
                    obj[key] = updateData[key];
                    return obj;
                }, {});
        }

        updatePatient(id, updateData)
            .then(() => {
                navigate(`/patients/${id}`);
            })
            .catch(error => {
                setError('There was an error updating the patient!');
                console.error('There was an error updating the patient!', error);
            });
    };

    return (
        <center>
            <form onSubmit={handleSubmit} className="form-container">
                <h2>Edit Patient</h2>
                {error && <p>{error}</p>}

                {(role === 'Patient') && (
                    <>
                        <div  className="form-group">
                            <select name="title" value={patient.title} onChange={handleChange} required>
                                <option value="">Select Title</option>
                                <option value="Patient">Patient</option>
                            </select>
                        </div>
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
                            <input type="password" name="password" value={patient.password} onChange={handleChange} placeholder="Password" />
                        </div>
                    </>
                )}

                {role === 'Doctor' && (
                    <>
                        <div className="form-group">
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
                            <div key={index} className="medical-folder">
                                <div className="form-group">
                                    <label>Folder Name:</label>
                                    <input
                                        type="text"
                                        name="folderName"
                                        value={folder.folderName}
                                        onChange={(e) => handleNestedChange(e, index, 'medicalFolders')}
                                        placeholder="Folder Name"
                                        required
                                    />
                                </div>
                                <h4>Documents</h4>
                                {folder.documents.map((doc, docIndex) => (
                                    <div key={docIndex} className="form-group">
                                        <label>Document Type:</label>
                                        <input
                                            type="text"
                                            name="type"
                                            value={doc.type}
                                            onChange={(e) => handleNestedChange(e, index, 'medicalFolders', 'documents', docIndex)}
                                            placeholder="Document Type"
                                            required
                                        />
                                        <label>Document URL:</label>
                                        <input
                                            type="url"
                                            name="url"
                                            value={doc.url}
                                            onChange={(e) => handleNestedChange(e, index, 'medicalFolders', 'documents', docIndex)}
                                            placeholder="Document URL"
                                            required
                                        />
                                        <label>Date Added:</label>
                                        <input
                                            type="date"
                                            name="dateAdded"
                                            value={doc.dateAdded}
                                            onChange={(e) => handleNestedChange(e, index, 'medicalFolders', 'documents', docIndex)}
                                            placeholder="Date Added"
                                        />
                                    </div>
                                ))}
                                <button type="button" onClick={() => addNestedField('medicalFolders', index, 'documents')} style={{ width: '175px' }}>
                                    Add Document
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={() => addNestedField('medicalFolders')} style={{ width: '175px' }}>Add Medical Folder</button>

                        <h3>Consultation History</h3>
                        {patient.consultationHistory.map((consultation, index) => (
                            <div key={index} className="form-group">
                                <input
                                    type="date"
                                    name="date"
                                    value={consultation.date}
                                    onChange={(e) => handleNestedChange(e, index, 'consultationHistory')}
                                    placeholder="Consultation Date"
                                    required
                                />
                                <input
                                    type="text"
                                    name="doctorId"
                                    value={consultation.doctorId}
                                    onChange={(e) => handleNestedChange(e, index, 'consultationHistory')}
                                    placeholder="Doctor ID"
                                    required
                                />
                                <input
                                    type="text"
                                    name="doctorName"
                                    value={consultation.doctorName}
                                    onChange={(e) => handleNestedChange(e, index, 'consultationHistory')}
                                    placeholder="Doctor Name"
                                    required
                                />
                                <input
                                    type="text"
                                    name="notes"
                                    value={consultation.notes}
                                    onChange={(e) => handleNestedChange(e, index, 'consultationHistory')}
                                    placeholder="Notes"
                                />
                                <input
                                    type="text"
                                    name="diagnosis"
                                    value={consultation.diagnosis}
                                    onChange={(e) => handleNestedChange(e, index, 'consultationHistory')}
                                    placeholder="Diagnosis"
                                />

                                <h4>Prescriptions</h4>
                                {consultation.prescriptions.map((prescription, prescriptionIndex) => (
                                    <div key={prescriptionIndex} className="form-group">
                                        <input
                                            type="text"
                                            name="medicine"
                                            value={prescription.medicine}
                                            onChange={(e) => handleNestedChange(e, index, 'consultationHistory', 'prescriptions', prescriptionIndex)}
                                            placeholder="Medicine"
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="dosage"
                                            value={prescription.dosage}
                                            onChange={(e) => handleNestedChange(e, index, 'consultationHistory', 'prescriptions', prescriptionIndex)}
                                            placeholder="Dosage"
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="duration"
                                            value={prescription.duration}
                                            onChange={(e) => handleNestedChange(e, index, 'consultationHistory', 'prescriptions', prescriptionIndex)}
                                            placeholder="Duration"
                                            required
                                        />
                                    </div>
                                ))}
                                <button type="button" onClick={() => addPrescription(index)} style={{ width: '175px' }}>
                                    Add Prescription
                                </button>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="department"
                                        value={consultation.department}
                                        onChange={(e) => handleNestedChange(e, index, 'consultationHistory')}
                                        placeholder="Department"
                                    />
                                    <input
                                        type="text"
                                        name="room"
                                        value={consultation.room}
                                        onChange={(e) => handleNestedChange(e, index, 'consultationHistory')}
                                        placeholder="Room"
                                    />
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={() => addNestedField('consultationHistory')} style={{ width: '175px' }}>Add Consultation</button>

                        <h3>Treatments</h3>
                        {patient.treatments.map((treatment, index) => (
                            <div key={index} className="form-group">
                                <input
                                    type="text"
                                    name="treatmentName"
                                    value={treatment.treatmentName}
                                    onChange={(e) => handleNestedChange(e, index, 'treatments')}
                                    placeholder="Treatment Name"
                                    required
                                />
                                <input
                                    type="date"
                                    name="startDate"
                                    value={treatment.startDate}
                                    onChange={(e) => handleNestedChange(e, index, 'treatments')}
                                    placeholder="Start Date"
                                />
                                <input
                                    type="date"
                                    name="endDate"
                                    value={treatment.endDate}
                                    onChange={(e) => handleNestedChange(e, index, 'treatments')}
                                    placeholder="End Date"
                                />
                                <input
                                    type="text"
                                    name="description"
                                    value={treatment.description}
                                    onChange={(e) => handleNestedChange(e, index, 'treatments')}
                                    placeholder="Description"
                                />
                                <select
                                    name="status"
                                    value={treatment.status}
                                    onChange={(e) => handleNestedChange(e, index, 'treatments')}
                                    required
                                >
                                    <option value="">Select Status</option>
                                    <option value="ongoing">Ongoing</option>
                                    <option value="completed">Completed</option>
                                    <option value="planned">Planned</option>
                                </select>
                            </div>
                        ))}
                        <button type="button" onClick={() => addNestedField('treatments')} style={{ width: '175px' }}>Add Treatment</button>
                    </>
                )}

                <center>
                    <button type="submit" style={{ width: '175px' }} className="btn-green">
                        Submit
                    </button>
                </center>
            </form>
        </center>
    );
};

export default PatientEdit;
