import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getHospitalById, updateHospital } from '../../services/api';
import '../../css/PatientForm.css';

const HospitalEdit = () => {
    const { id } = useParams();
    const [hospital, setHospital] = useState({
        name: '',
        address: '',
        website: '',
        email: '',
        phone: '',
        departments: []
    });
    const navigate = useNavigate();

    useEffect(() => {
        getHospitalById(id).then((response) => {
            if (response.data.hospital) {
                setHospital(response.data.hospital);
            } else {
                console.error('Expected an object but got:', response.data);
            }
        }).catch(error => {
            console.error('There was an error fetching the hospital details!', error);
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHospital({ ...hospital, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateHospital(id, hospital)
            .then(response => {
                console.log('Hospital updated:', response.data);
                navigate('/hospitals');
            })
            .catch(error => console.error('Error updating hospital:', error));
    };

    return (
        <center>
            <div className="patient-form-container">
            <h2>Edit Hospital</h2>
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
                <center><button type="submit" style={{width:'175px'}}>Update Hospital</button></center>
            </form>
        </div>
        </center>
    );
};

export default HospitalEdit;
