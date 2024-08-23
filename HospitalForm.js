import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createHospital } from '../../services/api';
import '../../css/PatientForm.css';
import {useVerifyAccess} from '../../utils/DecodeToken';

const HospitalForm = () => {
    const [hospital, setHospital] = useState({
        name: '',
        address: '',
        website: '',
        email: '',
        phone: '',
        departments: []
    });

    const [message, setMessage] = useState({ type: '', content: '' });
    const navigate = useNavigate();
    const verifyAccess = useVerifyAccess(['Administrator','Doctor']);

    useEffect(() => {
        if (!verifyAccess()) {
            navigate('/unauthorized');
        }
    }, [verifyAccess, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHospital({ ...hospital, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createHospital(hospital)
            .then(response => {
                setMessage({ type: 'success', content: 'Hospital created successfully!' });
                navigate('/hospitals');
            })
            .catch(error => {
                setMessage({ type: 'error', content: 'Error creating hospital.' });
                console.error('Error creating hospital:', error);
            });
    };

    return (
        <center>
            <div className="form-container">
                <h2>Add Hospital</h2>
                {message.content && (
                    <div className={`message ${message.type}`}>
                        {message.content}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={hospital.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={hospital.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="url"
                            name="website"
                            placeholder="Website"
                            value={hospital.website}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={hospital.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone"
                            value={hospital.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-green">Add Hospital</button>
                </form>
            </div>
        </center>
    );
};

export default HospitalForm;
