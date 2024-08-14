import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDoctors, deleteDoctor } from '../../services/api';
import '../../css/PatientForm.css';
import '../../css/PatientList.css';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        getDoctors().then((response) => {
            if (response.data) {
                setDoctors(response.data);
            } else {
                console.error('Expected an array but got:', response.data);
            }
        }).catch(error => {
            console.error('There was an error fetching the doctors!', error);
        });
    }, []);

    const handleDelete = (id) => {
        deleteDoctor(id)
            .then(() => {
                setDoctors(doctors.filter(doctor => doctor._id !== id));
                console.log('Deleted successfully');
            })
            .catch(error => console.error('Error deleting:', error));
    };

    return (
        <center>
            <div className="patient-list-container">
            <center>
                <h2>Doctor List</h2>
                <button type="button">
                    <Link to="/doctors/new">Add Doctor</Link>
                </button>
            </center>
            {doctors.length > 0 ? (
                <ul>
                    {doctors.map((doctor) => (
                        <li key={doctor._id}>
                            <Link to={`/doctors/${doctor._id}`}>{doctor.name}</Link>
                            <button onClick={() => handleDelete(doctor._id)} type="button">Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No doctors found</p>
            )}
        </div>
        </center>
    );
};

export default DoctorList;
