import React, { useEffect, useState } from 'react';
import { useParams,  useNavigate  } from 'react-router-dom';
import {getNurseById, updateNurse} from '../../services/api';

const NurseEdit = () => {
    const { id } = useParams();
    const history =  useNavigate ();
    const [nurse, setNurse] = useState({
        name: '',
        email: '',
        phone: '',
        gender: '',
        department: '',
        dateOfBirth: '',
        qualifications: '',
        seniority: ''
    });

    useEffect(() => {
        getNurseById.get(id).then(data => setNurse(data));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNurse({ ...nurse, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateNurse.update(id, nurse).then(() => {
            history.push(`/nurses/${id}`);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Nurse</h2>
            <input type="text" name="name" value={nurse.name} onChange={handleChange} placeholder="Name" required />
            <input type="email" name="email" value={nurse.email} onChange={handleChange} placeholder="Email" required />
            <input type="tel" name="phone" value={nurse.phone} onChange={handleChange} placeholder="Phone" required />
            <select name="gender" value={nurse.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
            <input type="text" name="department" value={nurse.department} onChange={handleChange} placeholder="Department ID" required />
            <input type="date" name="dateOfBirth" value={nurse.dateOfBirth} onChange={handleChange} placeholder="Date of Birth" required />
            <input type="text" name="qualifications" value={nurse.qualifications} onChange={handleChange} placeholder="Qualifications" required />
            <input type="number" name="seniority" value={nurse.seniority} onChange={handleChange} placeholder="Seniority" required />
            <button type="submit">Submit</button>
        </form>
    );
};

export default NurseEdit;
