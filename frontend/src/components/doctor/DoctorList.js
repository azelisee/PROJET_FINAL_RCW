import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {getDoctors} from '../../services/api';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        getDoctors.getAll().then(data => setDoctors(data));
    }, []);

    return (
        <div>
            <h2>Doctors</h2>
            <Link to="/doctors/new">Add New Doctor</Link>
            <ul>
                {doctors.map(doctor => (
                    <li key={doctor._id}>
                        <Link to={`/doctors/${doctor._id}`}>{doctor.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DoctorList;
