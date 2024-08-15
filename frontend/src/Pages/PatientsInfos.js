import React from 'react';
import '../css/Infos.css';

const PatientInfos = () => {
    return (
        <div className="infos-container">
            <h1>Our Patients</h1>
            <p>We are committed to providing the highest level of care to our patients. Here, you can learn more about the patient services we offer and how we support patient well-being...</p>
            <div className="image-gallery">
                <img src="/images/patient1.jpg" alt="Patient Consultation" />
                <img src="/images/patient2.jpg" alt="Patient in Recovery" />
                <img src="/images/patient3.jpg" alt="Patient with Nurse" />
            </div>
            <div className="video-container">
                <video controls>
                    <source src="/videos/patient-demo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <p className="info-paragraph">
                Our patients are at the center of everything we do. We offer a range of services designed to support their recovery and well-being, from personalized treatment plans to comprehensive aftercare.
            </p>
            <p className="info-paragraph">
                We believe in treating each patient with dignity, respect, and compassion, ensuring that they have access to the best possible care. Our team works closely with patients and their families to address any concerns and provide the support they need.
            </p>
        </div>
    );
};

export default PatientInfos;
