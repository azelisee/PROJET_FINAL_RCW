import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStaffById, updateStaff } from '../../services/api';
import '../../css/PatientForm.css';

const StaffEdit = () => {
    const { id } = useParams();
    const [staff, setStaff] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getStaffById(id).then((response) => {
            if (response.data.staff) {
                setStaff(response.data.staff);
            } else {
                console.error('Expected an object but got:', response.data);
            }
        }).catch(error => {
            console.error('There was an error fetching the staff details!', error);
        });
    }, [id]);

    const handleChange = (e) => {
        setStaff({
            ...staff,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateStaff(id, staff).then(() => {
            navigate(`/staff/${id}`);
        }).catch(error => {
            console.error('There was an error updating the staff member!', error);
        });
    };

    if (!staff) return <div>Loading...</div>;

    return (
        <center>
            <div className="form-container">
            <h2>Edit Staff</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={staff.name} onChange={handleChange} required />
                <input type="email" name="email" value={staff.email} onChange={handleChange} required />
                <input type="text" name="phone" value={staff.phone} onChange={handleChange} required />
                <select name="role" value={staff.role} onChange={handleChange} required>
                    <option value="Technician">Technician</option>
                    <option value="Administrator">Administrator</option>
                    <option value="Caregiver">Caregiver</option>
                    <option value="Other">Other</option>
                </select>
                <input type="text" name="department" value={staff.department} onChange={handleChange} required />
                <input type="text" name="hospital" value={staff.hospital} onChange={handleChange} required />
                <input type="date" name="dateOfBirth" value={staff.dateOfBirth} onChange={handleChange} required />

                <button type="submit">Update Staff</button>
            </form>
        </div>
        </center>
    );
};

export default StaffEdit;
