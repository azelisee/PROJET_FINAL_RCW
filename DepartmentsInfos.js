import React from 'react';
import '../css/Infos.css';

const DepartmentsInfos = () => {
    return (
        <div className="infos-container">
            <h1>Our Departments</h1>
            <p>Our hospitals departments are equipped with state-of-the-art facilities and staffed by highly trained professionals...</p>
            <div className="image-gallery">
                <img src="/images/i-d1.jpg" alt="Cardiology Department" height="100px" width="150px"/>
                <img src="/images/i-d2.jpg" alt="Neurology Department" height="100px" width="150px"/>
                <img src="/images/i-d3.jpg" alt="Pediatrics Department" height="100px" width="150px"/>
            </div>
            <div className="video-container">
                <video controls>
                    <source src="/videos/vd.mp4" type="video/mp4" />
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
