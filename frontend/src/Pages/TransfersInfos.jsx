import React from 'react';
import '../css/Infos.css';

const TransfersInfos = () => {
    return (
        <div className="infos-container">
            <h1>Patient Transfers</h1>
            <p>At our healthcare facilities, patient transfers are managed with the utmost precision and care, ensuring that every transition is as seamless and stress-free as possible. Below, we provide detailed insights into our transfer protocols and procedures.</p>

            <div className="image-gallery">
                <img src="/images/i-t1.jpg" alt="Patient being transferred" height="100px" width="150px"/>
                <img src="/images/i-t2.jpg" alt="Ambulance for transfer" height="100px" width="150px"/>
                <img src="/images/i-t3.png" alt="Transfer process coordination" height="100px" width="150px"/>
            </div>

            <div className="video-container">
                <video controls>
                    <source src="/videos/vt.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            <p className="info-paragraph">
                We prioritize patient safety and comfort during every transfer, whether it involves moving between departments within the same facility or transferring to another hospital. Our comprehensive protocols ensure that all medical records, necessary equipment, and support staff are in place to provide continuity of care.
            </p>

            <p className="info-paragraph">
                Our dedicated team of healthcare professionals coordinates every aspect of the transfer, from initial assessment to the handover at the receiving facility. We work closely with transport services to ensure timely and efficient transfers, minimizing wait times and reducing the potential for complications.
            </p>

            <p className="info-paragraph">
                By maintaining clear communication and thorough documentation throughout the transfer process, we ensure that patients receive the highest standard of care, regardless of their location. This commitment to excellence is reflected in our meticulous attention to detail and our unwavering focus on patient well-being.
            </p>
        </div>
    );
};

export default TransfersInfos;
