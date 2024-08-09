import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/patients">Patients</Link></li>
                <li><Link to="/doctors">Doctors</Link></li>
                <li><Link to="/nurses">Nurses</Link></li>
                <li><Link to="/rooms">Rooms</Link></li>
                <li><Link to="/departments">Departments</Link></li>
                <li><Link to="/hospitals">Hospitals</Link></li>
                <li><Link to="/transfers">Transfers</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
