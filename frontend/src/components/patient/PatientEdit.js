import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {getPatientById, updatePatient} from '../../services/api';

const PatientEdit = () => {
    const { id } = useParams();
    const history = useNavigate();
    const [patient, setPatient] = useState({
        name: '',
        age: '',
        email: '',
        tel: '',
        address: '',
        dateOfBirth: '',
        gender: '',
        bloodType: ''
    });

    useEffect(() => {
        getPatientById.get(id).then(data => setPatient(data));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatient({ ...patient, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updatePatient.update(id, patient).then(() => {
            history.push(`/patients/${id}`);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Patient</h2>
            <input type="text" name="name" value={patient.name} onChange={handleChange} placeholder="Name" required />
            <input type="number" name="age" value={patient.age} onChange={handleChange} placeholder="Age" required />
            <input type="email" name="email" value={patient.email} onChange={handleChange} placeholder="Email" required />
            <input type="tel" name="tel" value={patient.tel} onChange={handleChange} placeholder="Phone" required />
            <input type="text" name="address" value={patient.address} onChange={handleChange} placeholder="Address" required />
            <input type="date" name="dateOfBirth" value={patient.dateOfBirth} onChange={handleChange} placeholder="Date of Birth" required />
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
            <button type="submit">Submit</button>
        </form>
    );
};

export default PatientEdit;
