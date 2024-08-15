import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getHospitalById, updateHospital } from '../../services/api';
import '../../css/PatientForm.css';
import {useVerifyAccess} from '../../utils/DecodeToken';

const HospitalEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [hospital, setHospital] = useState({
        name: '',
        address: '',
        website: '',
        email: '',
        phone: '',
        departments: []
    });
    const [error, setError] = useState('');
    const verifyAccess = useVerifyAccess(['Administrator', 'Doctor']);

    useEffect(() => {
        if (!verifyAccess()) {
            navigate('/unauthorized');
        } else {
            getHospitalById(id).then((response) => {
                setHospital(response.data);
            }).catch(error => {
                setError('There was an error fetching the hospital details!');
                console.error('There was an error fetching the hospital details!', error);
            });
        }
    }, [id, navigate, verifyAccess]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHospital({ ...hospital, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateHospital(id, hospital).then(() => {
            navigate(`/hospitals/${id}`);
        }).catch(error => {
            setError('There was an error updating the hospital!');
            console.error('There was an error updating the hospital!', error);
        });
    };

    return (
        <center>
            <form onSubmit={handleSubmit} className="form-container">
                <h2>Edit Hospital</h2>
                {error && <p>{error}</p>}
                <div className="form-group">
                    <input type="text" name="name" value={hospital.name} onChange={handleChange} placeholder="Name" required />
                </div>
                <div className="form-group">
                    <input type="text" name="address" value={hospital.address} onChange={handleChange} placeholder="Address" required />
                </div>
                <div className="form-group">
                    <input type="url" name="website" value={hospital.website} onChange={handleChange} placeholder="Website" required />
                </div>
                <div className="form-group">
                    <input type="email" name="email" value={hospital.email} onChange={handleChange} placeholder="Email" required />
                </div>
                <div className="form-group">
                    <input type="tel" name="phone" value={hospital.phone} onChange={handleChange} placeholder="Phone" required />
                </div>
                <br/>
                <center><button type="submit" style={{width:'175px'}} className="btn-green">Submit</button></center>
            </form>
        </center>
    );
};

export default HospitalEdit;
