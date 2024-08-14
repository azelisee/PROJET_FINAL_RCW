import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNurseById, updateNurse } from '../../services/api';
import '../../css/PatientForm.css';

const NurseEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nurse, setNurse] = useState({
        name: '',
        title: '',
        email: '',
        password: '',
        gender: '',
        phone: '',
        department: '',
        hospital: '',
        dateOfBirth: '',
        qualifications: '',
        seniority: '',
        schedule: []
    });

    useEffect(() => {
        getNurseById(id).then((response) => {
            setNurse(response.data.nurse);
        }).catch(error => {
            console.error('Error fetching nurse details:', error);
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNurse({ ...nurse, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateNurse(id, nurse).then(() => {
            navigate('/nurses');
        }).catch(error => console.error('Error updating nurse:', error));
    };

    return (
        <center>
            <form onSubmit={handleSubmit} className="form-container">
            <h2>Edit Nurse</h2>
            <input type="text" name="name" value={nurse.name} onChange={handleChange} required />
            <input type="text" name="title" value={nurse.title} onChange={handleChange} required />
            <input type="email" name="email" value={nurse.email} onChange={handleChange} required />
            <input type="password" name="password" value={nurse.password} onChange={handleChange} required />
            <input type="text" name="gender" value={nurse.gender} onChange={handleChange} required />
            <input type="text" name="phone" value={nurse.phone} onChange={handleChange} required />
            <input type="text" name="department" value={nurse.department} onChange={handleChange} required />
            <input type="text" name="hospital" value={nurse.hospital} onChange={handleChange} required />
            <input type="date" name="dateOfBirth" value={nurse.dateOfBirth} onChange={handleChange} required />
            <input type="text" name="qualifications" value={nurse.qualifications} onChange={handleChange} required />
            <input type="number" name="seniority" value={nurse.seniority} onChange={handleChange} required />
            <button type="submit" style={{width:'175px'}}>Update Nurse</button>
        </form>
        </center>
    );
};

export default NurseEdit;
