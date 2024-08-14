import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createHospital } from '../../services/api';
import '../../css/PatientForm.css';

const HospitalForm = () => {
    const [hospital, setHospital] = useState({
        name: '',
        address: '',
        website: '',
        email: '',
        phone: '',
        departments: []
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHospital({ ...hospital, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createHospital(hospital)
            .then(response => {
                console.log('Hospital created:', response.data);
                navigate('/hospitals');
            })
            .catch(error => console.error('Error creating hospital:', error));
    };

    return (
        <center>
             <div className="form-container">
            <h2>Add Hospital</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={hospital.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={hospital.address}
                    onChange={handleChange}
                    required
                />
                <input
                    type="url"
                    name="website"
                    placeholder="Website"
                    value={hospital.website}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={hospital.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={hospital.phone}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add Hospital</button>
            </form>
        </div>
        </center>
    );
};

export default HospitalForm;
