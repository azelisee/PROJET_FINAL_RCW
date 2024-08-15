import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import '../css/Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('title');
        navigate('/login');
    };

    const anylink = (page) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            try {
                const decodedToken = jwtDecode(token);
                const role = decodedToken.role || decodedToken.title;

                if (role === 'Administrator' || (role === 'Doctor' && page !== 'staff')) {
                    navigate(`/${page}`);
                } else if (role === 'Nurse' && ['patients', 'rooms'].includes(page)) {
                    navigate(`/${page}`);
                } else if (role === 'Technician' && page === 'rooms') {
                    navigate(`/${page}`);
                } else {
                    navigate('/unauthorized');
                }
            } catch (error) {
                console.error('Token decoding failed:', error);
                navigate('/login');
            }
        }
    };

    return (
        <center>
            <nav>
                <table>
                    <tr>
                        <thead>
                            <th>
                                <button>
                                    <Link to="/">Home</Link>
                                </button>
                            </th>
                            <th>
                                <button onClick={() => anylink('patients')}>
                                    Patients
                                </button>
                            </th>
                            <th>
                                <button onClick={() => anylink('doctors')}>
                                    Doctors
                                </button>
                            </th>
                            <th>
                                <button onClick={() => anylink('nurses')}>
                                    Nurses
                                </button>
                            </th>
                            <th>
                                <button onClick={() => anylink('staff')}>
                                    Staff
                                </button>
                            </th>
                            <th>
                                <button onClick={() => anylink('rooms')}>
                                    Rooms
                                </button>
                            </th>
                            <th>
                                <button onClick={() => anylink('departments')}>
                                    Departments
                                </button>
                            </th>
                            <th>
                                <button onClick={() => anylink('hospitals')}>
                                    Hospitals
                                </button>
                            </th>
                            <th>
                                <button onClick={() => anylink('transfers')}>
                                    Transfers
                                </button>
                            </th>
                            <th>
                                <button onClick={handleLogout}>
                                    Logout
                                </button>
                            </th>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                            </tr>
                        </tbody>
                    </tr>
                </table>
            </nav>
        </center>
    );
};

export default Navbar;
