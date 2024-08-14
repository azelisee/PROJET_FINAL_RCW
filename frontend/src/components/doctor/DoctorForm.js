import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDoctor } from '../../services/api';
import '../../css/PatientForm.css';

const DoctorForm = () => {
    const [doctor, setDoctor] = useState({
        name: '',
        title: '',
        email: '',
        password: '',
        gender: '',
        phone: '',
        speciality: '',
        seniority: '',
        department: '',
        hospital: '',
        schedule: []
    });

    const navigate = useNavigate();

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
        createDoctor(doctor)
            .then(response => {
                console.log('Doctor created:', response.data);
                navigate('/doctors');
            })
            .catch(error => console.error('Error creating doctor:', error));
    };

    return (
        <center>
            <div className="form-container">
            <h2>Add Doctor</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={doctor.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={doctor.title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={doctor.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={doctor.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={doctor.phone}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="speciality"
                    placeholder="Speciality"
                    value={doctor.speciality}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="seniority"
                    placeholder="Seniority (years)"
                    value={doctor.seniority}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="department"
                    placeholder="Department ID"
                    value={doctor.department}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="hospital"
                    placeholder="Hospital ID"
                    value={doctor.hospital}
                    onChange={handleChange}
                    required
                />
                <h3>Schedule</h3>
                {doctor.schedule.map((slot, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder="Day"
                            value={slot.day}
                            onChange={(e) => handleScheduleChange(index, 'day', e.target.value)}
                            required
                        />
                        <input
                            type="time"
                            placeholder="Start Time"
                            value={slot.startTime}
                            onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)}
                            required
                        />
                        <input
                            type="time"
                            placeholder="End Time"
                            value={slot.endTime}
                            onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)}
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={addScheduleSlot}>Add Schedule Slot</button>
                <button type="submit">Add Doctor</button>
            </form>
        </div>
        </center>
    );
};

export default DoctorForm;
