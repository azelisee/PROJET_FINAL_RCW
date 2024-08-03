import React, { useState } from 'react';
import axios from 'axios';

const CreatePatient = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        email: '',
        tel: '',
        address: '',
        dateOfBirth: '',
        gender: '',
        bloodType: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/patients', formData)
            .then(response => console.log(response.data))
            .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} />
            <input type="number" name="age" placeholder="Age" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="text" name="tel" placeholder="Phone" onChange={handleChange} />
            <input type="text" name="address" placeholder="Address" onChange={handleChange} />
            <input type="date" name="dateOfBirth" placeholder="Date of Birth" onChange={handleChange} />
            <select name="gender" onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
            <select name="bloodType" onChange={handleChange}>
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
            <button type="submit">Create Patient</button>
        </form>
    );
};

export default CreatePatient;
