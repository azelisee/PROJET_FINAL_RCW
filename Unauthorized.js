import React from 'react';
import '../css/NotFound.css';

const Unauthorized = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h2 className="not-found-title">Unauthorized Access</h2>
                <p className="not-found-message">You do not have permission to view this page.</p>
                <a href="/home" className="back-home-link">Back to Home</a>
            </div>
        </div>
    );
};

export default Unauthorized;
