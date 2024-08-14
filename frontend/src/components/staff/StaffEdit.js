import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStaffById, updateStaff } from '../../services/api';
import '../../css/PatientForm.css';

const StaffEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [staff, setStaff] = useState({
        name: '',
        email: '',
        phone: '',
        role: '',
        department: '',
        hospital: '',
        dateOfBirth: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        getStaffById(id).then((response) => {
            setStaff(response.data);
        }).catch(error => {
            setError('There was an error fetching the staff details!');
            console.error('There was an error fetching the staff details!', error);
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStaff({ ...staff, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateStaff(id, staff).then(() => {
            navigate(`/staff/${id}`);
        }).catch(error => {
            setError('There was an error updating the staff!');
            console.error('There was an error updating the staff!', error);
        });
    };

    return (
        <center>
            <form onSubmit={handleSubmit} className="form-container">
                <h2>Edit Staff</h2>
                {error && <p>{error}</p>}
                <div className="form-group">
                    <input type="text" name="name" value={staff.name} onChange={handleChange} placeholder="Name" required />
                    <input type="email" name="email" value={staff.email} onChange={handleChange} placeholder="Email" required />
                </div>
                <div className="form-group">
                    <input type="tel" name="phone" value={staff.phone} onChange={handleChange} placeholder="Phone" required />
                    <select name="role" value={staff.role} onChange={handleChange} required>
                        <option value="">Select Role</option>
                        <option value="Technician">Technician</option>
                        <option value="Administrator">Administrator</option>
                        <option value="Caregiver">Caregiver</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <input type="text" name="department" value={staff.department} onChange={handleChange} placeholder="Department ID" required />
                    <input type="text" name="hospital" value={staff.hospital} onChange={handleChange} placeholder="Hospital ID" required />
                </div>
                <div className="form-group">
                    <input type="date" name="dateOfBirth" value={staff.dateOfBirth} onChange={handleChange} required />
                </div>
                <br/>
                <center><button type="submit" style={{width:'175px'}} className="btn-green">Submit</button></center>
            </form>
        </center>
    );
};

export default StaffEdit;
