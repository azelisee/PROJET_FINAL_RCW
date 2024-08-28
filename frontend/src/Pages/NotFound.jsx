import React from 'react';
import '../css/NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h2 className="not-found-title">404</h2>
                <p className="not-found-message">Oops! The page you are looking for does not exist.</p>
                <a href="/home" className="back-home-link">Back to Home</a>
            </div>
        </div>
    );
};

export default NotFound;
