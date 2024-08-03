import React from 'react';
import { Link } from 'react-router-dom';
import '../Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Hospital Management System</h1>
                <p>Your comprehensive solution to managing hospital resources efficiently and effectively.</p>
            </header>
            <main className="home-main">
                <div className="home-card">
                    <Link to="/patients">
                        <img src="/frontend/public/images/1.jpg"/>
                        <h2>Manage Patients</h2>
                        <p>View and manage patient information, medical records, and more.</p>
                    </Link>
                </div>
                <div className="home-card">
                    <Link to="/doctors">
                        <img src="/frontend/public/images/2.jpg"/>
                        <h2>Manage Doctors</h2>
                        <p>Organize doctor schedules, specialties, and profiles.</p>
                    </Link>
                </div>
                <div className="home-card">
                    <Link to="/nurses">
                        <img src="/frontend/public/images/3.webp"/>
                        <h2>Manage Nurses</h2>
                        <p>Manage nurse assignments, shifts, and qualifications.</p>
                    </Link>
                </div>
                <div className="home-card">
                    <Link to="/rooms">
                        <img src="/frontend/public/images/4.jpg"/>
                        <h2>Manage Rooms</h2>
                        <p>Track room availability, assignments, and conditions.</p>
                    </Link>
                </div>
                <div className="home-card">
                    <Link to="/departments">
                        <img src="/frontend/public/images/5.jpg"/>
                        <h2>Manage Departments</h2>
                        <p>Coordinate departmental activities, staff, and resources.</p>
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default Home;
