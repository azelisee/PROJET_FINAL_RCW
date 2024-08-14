import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
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
                            <button>
                                <Link to="/patients">Patients</Link>
                            </button>
                        </th>
                        <th>
                            <button>
                                <Link to="/doctors">Doctors</Link>
                            </button>
                        </th>
                        <th>
                            <button>
                                <Link to="/nurses">Nurses</Link>
                            </button>
                        </th>
                        <th>
                            <button>
                                <Link to="/staff">Staff</Link>
                            </button>
                        </th>
                        <th>
                            <button>
                                <Link to="/rooms">Rooms</Link>
                            </button>
                        </th>
                        <th>
                            <button>
                                <Link to="/departments">Departments</Link>
                            </button>
                        </th>
                        <th>
                            <button>
                                <Link to="/hospitals">Hospitals</Link>
                            </button>
                        </th>
                        <th>
                            <button>
                                <Link to="/transfers">Transfers</Link>
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
