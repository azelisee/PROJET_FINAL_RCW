import React from 'react';
import '../css/Infos.css';

const StaffInfos = () => {
    return (
        <div className="infos-container">
            <h1>Our Staff</h1>
            <p>Beyond our medical professionals, our hospital is supported by a dedicated staff that ensures everything runs smoothly...</p>
            <div className="image-gallery">
                <img src="/images/i-s1.jpg" alt="Admin Staff"  height="100px" width="150px"/>
                <img src="/images/i-s2.jpg" alt="Technical Team" height="100px" width="150px"/>
                <img src="/images/i-s3.jpg" alt="Support Staff" height="100px" width="150px"/>
            </div>
            <div className="video-container">
                <video controls>
                    <source src="/videos/vs.mp4" type="video/mp4" />
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
