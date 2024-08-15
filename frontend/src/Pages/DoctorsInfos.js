import React from 'react';
import '../css/Infos.css';

const DoctorsInfos = () => {
    return (
        <div className="infos-container">
            <h1>Our Doctors</h1>
            <p>Meet our team of highly qualified doctors who are experts in their respective fields and dedicated to providing the best care...</p>
            <div className="image-gallery">
                <img src="/images/doctor1.jpg" alt="Doctor in Consultation" />
                <img src="/images/doctor2.jpg" alt="Surgical Team" />
                <img src="/images/doctor3.jpg" alt="Pediatrician with Patient" />
            </div>
            <div className="video-container">
                <video controls>
                    <source src="/videos/doctor-demo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <p className="info-paragraph">
                Our doctors are leaders in their fields, committed to ongoing education and research to stay at the forefront of medical advancements. They work closely with patients to create personalized treatment plans.
            </p>
        </div>
    );
};

export default DoctorsInfos;
