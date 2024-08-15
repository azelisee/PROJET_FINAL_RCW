import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDoctorById, updateDoctor } from '../../services/api';
import '../../css/PatientForm.css';
import {useVerifyAccess} from '../../utils/DecodeToken';

const DoctorEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState({
        name: '',
        title: '',
        email: '',
        phone: '',
        gender: '',
        speciality: '',
        seniority: '',
        department: '',
        hospital: '',
        schedule: []
    });
    const [error, setError] = useState('');
    const verifyAccess = useVerifyAccess(['Administrator', 'Doctor']);

    useEffect(() => {
        if (!verifyAccess()) {
            navigate('/unauthorized');
        } else {
            getDoctorById(id).then((response) => {
                setDoctor(response.data);
            }).catch(error => {
                setError('There was an error fetching the doctor details!');
                console.error('There was an error fetching the doctor details!', error);
            });
        }
    }, [id, navigate, verifyAccess]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctor({ ...doctor, [name]: value });
    };

    const handleScheduleChange = (index, field, value) => {
        const updatedSchedule = [...doctor.schedule];
        updatedSchedule[index] = { ...updatedSchedule[index], [field]: value };
        setDoctor({ ...doctor, schedule: updatedSchedule });
    };

    const addScheduleSlot = () => {
        setDoctor({ ...doctor, schedule: [...doctor.schedule, { day: '', startTime: '', endTime: '' }] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateDoctor(id, doctor).then(() => {
            navigate(`/doctors/${id}`);
        }).catch(error => {
            setError('There was an error updating the doctor!');
            console.error('There was an error updating the doctor!', error);
        });
    };

    return (
        <center>
            <form onSubmit={handleSubmit} className="form-container">
                <h2>Edit Doctor</h2>
                {error && <p>{error}</p>}
                <div className="form-group">
                    <input type="text" name="name" value={doctor.name} onChange={handleChange} placeholder="Name" required />
                    <input type="text" name="title" value={doctor.title} onChange={handleChange} placeholder="Title" required />
                </div>
                <div className="form-group">
                    <input type="email" name="email" value={doctor.email} onChange={handleChange} placeholder="Email" required />
                    <input type="tel" name="phone" value={doctor.phone} onChange={handleChange} placeholder="Phone" required />
                </div>
                <div className="form-group">
                    <select name="gender" value={doctor.gender} onChange={handleChange} required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <input type="text" name="speciality" value={doctor.speciality} onChange={handleChange} placeholder="Speciality" required />
                </div>
                <div className="form-group">
                    <input type="number" name="seniority" value={doctor.seniority} onChange={handleChange} placeholder="Seniority (years)" required />
                    <input type="text" name="department" value={doctor.department} onChange={handleChange} placeholder="Department ID" required />
                </div>
                <div className="form-group">
                    <input type="text" name="hospital" value={doctor.hospital} onChange={handleChange} placeholder="Hospital ID" required />
                </div>
                <br/>
                <h3>Schedule</h3>
                {doctor.schedule.map((slot, index) => (
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

export default DoctorEdit;
