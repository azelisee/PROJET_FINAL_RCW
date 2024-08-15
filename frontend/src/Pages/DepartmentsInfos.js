import React from 'react';
import '../css/Infos.css';

const DepartmentsInfos = () => {
    return (
        <div className="infos-container">
            <h1>Our Departments</h1>
            <p>Our hospital departments are equipped with state-of-the-art facilities and staffed by highly trained professionals...</p>
            <div className="image-gallery">
                <img src="/images/department1.jpg" alt="Cardiology Department" />
                <img src="/images/department2.jpg" alt="Neurology Department" />
                <img src="/images/department3.jpg" alt="Pediatrics Department" />
            </div>
            <div className="video-container">
                <video controls>
                    <source src="/videos/department-demo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <p className="info-paragraph">
                Each department is dedicated to providing the best care possible, with a focus on patient safety and outcomes. From cardiology to neurology, our specialists are here to help.
            </p>
        </div>
    );
};

export default DepartmentsInfos;
