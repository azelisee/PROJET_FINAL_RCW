import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import '../css/Home.css';
import '../css/footer.css';
import { useVerifyAccess } from '../utils/DecodeToken';

const Home = () => {

    const navigate = useNavigate();
    const verifyAccess = useVerifyAccess();

    const linktoTech = (page, allowedRoles) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            const hasAccess = verifyAccess(allowedRoles);
            if (hasAccess) {
                navigate(`${page}`);
            }
        }
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Hospital Management System</h1>
                <p>Your comprehensive solution to managing hospital resources efficiently and effectively.</p>
            </header>
            <main className="home-main">
                <div className="home-card">
                    <Link to="/i-hospitals">
                        <img src="/images/hospital2.png" alt="Manage Hospitals"/>
                        <h2>Manage Hospitals</h2>
                        <p>Oversee hospital facilities, staff, and departments.</p>
                    </Link>
                </div>
                <div className="home-card">
                    <Link to="/i-departments">
                        <img src="/images/departments3.jpg" alt="Manage Departments"/>
                        <h2>Manage Departments</h2>
                        <p>Coordinate departmental activities, staff, and resources.</p>
                    </Link>
                </div>
                <div className="home-card">
                    <Link to="/i-rooms">
                        <img src="/images/room8.jpg" alt="Manage Rooms"/>
                        <h2>Manage Rooms</h2>
                        <p>Track room availability, assignments, and conditions.</p>
                    </Link>
                </div>
                <div className="home-card">
                    <Link to="/i-doctors">
                        <img src="/images/doctor3.jpg" alt="Manage Doctors"/>
                        <h2>Manage Doctors</h2>
                        <p>Organize doctor schedules, specialties, and profiles.</p>
                    </Link>
                </div>
                <div className="home-card">
                    <Link to="/i-nurses">
                        <img src="/images/nurse4.jpg" alt="Manage Nurses"/>
                        <h2>Manage Nurses</h2>
                        <p>Manage nurse assignments, shifts, and qualifications.</p>
                    </Link>
                </div>
                <div className="home-card">
                    <Link to="/i-staff">
                        <img src="/images/staff1.jpg" alt="Manage Staff"/>
                        <h2>Manage Staff</h2>
                        <p>Manage other medical staff including technicians, admin, and caregivers.</p>
                    </Link>
                </div>
                <div className="home-card">
                    <Link to="/i-patients">
                        <img src="/images/patient1.jpg" alt="Manage Patients"/>
                        <h2>Manage Patients</h2>
                        <p>View and manage patient information, medical records, and more.</p>
                    </Link>
                </div>
                <div className="home-card">
                    <Link to="/i-transfers">
                        <img src="/images/transfer4.jpg" alt="Manage Transfers"/>
                        <h2>Manage Transfers</h2>
                        <p>Manage patient transfers between hospitals and departments.</p>
                    </Link>
                </div>
            </main>
            <footer className="home-footer">
                <div className="footer-content">
                    <h3>Contact Us</h3>
                    <p>Email: <a href="mailto:azoumaelisee98@gmail.com" style={{color:'white'}}>azoumaelisee98@gmail.com</a></p>
                    <p>Phone: 438-456-7890</p>
                    <p>For appointments, please send an email to our support.</p>
                    <p>You will receive a confirmation email once your request is received.</p>
                    <p>
                        <Link to='/admina' onClick={() => linktoTech('admina'['Technician'])}>
                            <span role="img" aria-label="email">📥</span>
                        </Link>
                        <Link to='/adminb' onClick={() => linktoTech('adminb'['Technician'])}>
                            <span role="img" aria-label="email">📤</span>
                        </Link>
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
