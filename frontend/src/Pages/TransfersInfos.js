import React from 'react';
import '../css/Infos.css';

const TransfersInfos = () => {
    return (
        <div className="infos-container">
            <h1>Patient Transfers</h1>
            <p>Efficient and secure patient transfers are a critical aspect of our healthcare services. Below, you will find detailed information about how we manage transfers between hospitals and departments...</p>
            <div className="image-gallery">
                <img src="/images/transfer1.jpg" alt="Patient being transferred" />
                <img src="/images/transfer2.jpg" alt="Ambulance for transfer" />
                <img src="/images/transfer3.jpg" alt="Transfer process coordination" />
            </div>
            <div className="video-container">
                <video controls>
                    <source src="/videos/transfer-demo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <p className="info-paragraph">
                We ensure that every transfer is handled with the utmost care, ensuring the safety and comfort of our patients. Our transfer protocols are designed to minimize delays and ensure seamless transitions between facilities.
            </p>
            <p className="info-paragraph">
                Our team coordinates with healthcare professionals at both the sending and receiving locations to maintain continuity of care and ensure that all necessary information is transferred along with the patient.
            </p>
        </div>
    );
};

export default TransfersInfos;
