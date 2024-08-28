import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';
import { useVerifyAccess } from '../utils/DecodeToken';

const Navbar = () => {
    const navigate = useNavigate();
    const verifyAccess = useVerifyAccess();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.clear();
        console.log('Check localStorage content : ',localStorage);
        navigate('/login');
    };

    const anylink = (page, allowedRoles) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            const hasAccess = verifyAccess(allowedRoles);
            if (hasAccess) {
                navigate(`/${page}`);
            }
        }
    };

    return (
        <center>
            <nav>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <button>
                                    <Link to="/home">Home</Link>
                                </button>
                            </th>
                            <th>
                                <button>
                                    <Link to="/diagnose">Diagnose</Link>
                                </button>
                            </th>
                            <th>
                                <button onClick={() => anylink('patients', ['Administrator','Technician','Caregiver','Other','Doctor', 'Nurse','Patient'])}>
                                    Patients
                                </button>
                            </th>
                            <th>
                                <button onClick={() => anylink('doctors', ['Administrator','Technician','Caregiver','Other','Doctor', 'Nurse','Patient'])}>
                                    Doctors
                                </button>
                            </th>
                            <th>
                                <button onClick={() => anylink('nurses', ['Administrator','Technician','Caregiver','Other','Doctor', 'Nurse','Patient'])}>
                                    Nurses
                                </button>
                            </th>
                            <th>
                                <button onClick={() => anylink('staff', ['Administrator','Technician','Caregiver','Other','Doctor', 'Nurse'])}>
                                    Staff
                                </button>
                            </th>
                            <th>
                                <button onClick={() => anylink('rooms', ['Administrator','Technician','Caregiver','Other','Doctor', 'Nurse'])}>
                                    Rooms
                                </button>
                            </th>
                            <th>
                                <button onClick={() => anylink('departments', ['Administrator','Technician','Caregiver','Other','Doctor', 'Nurse','Patient'])}>
                                    Departments
                                </button>
                            </th>
                            <th>
                                <button onClick={() => anylink('hospitals', ['Administrator','Technician','Caregiver','Other','Doctor', 'Nurse','Patient'])}>
                                    Hospitals
                                </button>
                            </th>
                            <th>
                                <button onClick={() => anylink('transfers', ['Administrator','Technician','Caregiver','Other','Doctor', 'Nurse'])}>
                                    Transfers
                                </button>
                            </th>
                            <th>
                                <button onClick={handleLogout}>
                                    Logout
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </nav>
        </center>
    );
};

export default Navbar;
