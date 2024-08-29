import React from 'react';
import '../css/Infos.css';

const DoctorsInfos = () => {
    return (
        <div className="infos-container">
            <h1>Our Doctors</h1>
            <p>Meet ours teams of highly qualified doctors who are experts in their respective fields and dedicated to providing the best care...</p>
            <div className="image-gallery">
                <img src="/images/i-doc1.jpg" alt="Doctor in Consultation"  height="100px" width="150px"/>
                <img src="/images/i-doc2.jpg" alt="Surgical Team" height="100px" width="150px"/>
                <img src="/images/i-doc3.jpg" alt="Pediatrician with Patient" height="100px" width="150px"/>
            </div>
            <div className="video-container">
                <video controls>
                    <source src="/videos/vdoc.mp4" type="video/mp4" />
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
