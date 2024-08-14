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
        phone: '',
        gender: '',
        department: '',
        hospital: '',
        dateOfBirth: '',
        qualifications: '',
        seniority: '',
        schedule: []
    });
    const [error, setError] = useState('');

    useEffect(() => {
        getNurseById(id).then((response) => {
            setNurse(response.data);
        }).catch(error => {
            setError('There was an error fetching the nurse details!');
            console.error('There was an error fetching the nurse details!', error);
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNurse({ ...nurse, [name]: value });
    };

    const handleScheduleChange = (index, field, value) => {
        const updatedSchedule = [...nurse.schedule];
        updatedSchedule[index] = { ...updatedSchedule[index], [field]: value };
        setNurse({ ...nurse, schedule: updatedSchedule });
    };

    const addScheduleSlot = () => {
        setNurse({ ...nurse, schedule: [...nurse.schedule, { day: '', startTime: '', endTime: '' }] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateNurse(id, nurse).then(() => {
            navigate(`/nurses/${id}`);
        }).catch(error => {
            setError('There was an error updating the nurse!');
            console.error('There was an error updating the nurse!', error);
        });
    };

    return (
        <center>
            <form onSubmit={handleSubmit} className="form-container">
                <h2>Edit Nurse</h2>
                {error && <p>{error}</p>}
                <div className="form-group">
                    <input type="text" name="name" value={nurse.name} onChange={handleChange} placeholder="Name" required />
                    <input type="text" name="title" value={nurse.title} onChange={handleChange} placeholder="Title" required />
                </div>
                <div className="form-group">
                    <input type="email" name="email" value={nurse.email} onChange={handleChange} placeholder="Email" required />
                    <input type="tel" name="phone" value={nurse.phone} onChange={handleChange} placeholder="Phone" required />
                </div>
                <div className="form-group">
                    <input type="text" name="gender" value={nurse.gender} onChange={handleChange} placeholder="Gender" required />
                    <input type="text" name="department" value={nurse.department} onChange={handleChange} placeholder="Department ID" required />
                </div>
                <div className="form-group">
                    <input type="text" name="hospital" value={nurse.hospital} onChange={handleChange} placeholder="Hospital ID" required />
                    <input type="date" name="dateOfBirth" value={nurse.dateOfBirth} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <input type="text" name="qualifications" value={nurse.qualifications} onChange={handleChange} placeholder="Qualifications" required />
                    <input type="number" name="seniority" value={nurse.seniority} onChange={handleChange} placeholder="Seniority (years)" required />
                </div>
                <br/>
                <h3>Schedule</h3>
                {nurse.schedule.map((slot, index) => (
                    <div key={index} className="form-group">
                        <input type="text" placeholder="Day" value={slot.day} onChange={(e) => handleScheduleChange(index, 'day', e.target.value)} required />
                        <input type="time" placeholder="Start Time" value={slot.startTime} onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)} required />
                        <input type="time" placeholder="End Time" value={slot.endTime} onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)} required />
                    </div>
                ))}
                <button type="button" onClick={addScheduleSlot} style={{width:'175px'}}>Add Schedule</button>
                <br/>
                <center><button type="submit" style={{width:'175px'}} className="btn-green">Submit</button></center>
            </form>
        </center>
    );
};

export default NurseEdit;
