import React from 'react';
import '../css/Infos.css';

const StaffInfos = () => {
    return (
        <div className="infos-container">
            <h1>Our Staff</h1>
            <p>Beyond our medical professionals, our hospital is supported by a dedicated staff that ensures everything runs smoothly...</p>
            <div className="image-gallery">
                <img src="/images/staff1.jpg" alt="Admin Staff" />
                <img src="/images/staff2.jpg" alt="Technical Team" />
                <img src="/images/staff3.jpg" alt="Support Staff" />
            </div>
            <div className="video-container">
                <video controls>
                    <source src="/videos/staff-demo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <p className="info-paragraph">
                From administrators to technicians, our staff members work behind the scenes to ensure that the hospital operates efficiently. Their dedication and hard work make it possible for us to provide top-quality care to our patients.
            </p>
        </div>
    );
};

export default StaffInfos;
