import React from 'react';
import '../css/Infos.css';

const NursesInfos = () => {
    return (
        <div className="infos-container">
            <h1>Our Nurses</h1>
            <p>Our nursing staff is the backbone of our hospital, providing compassionate care and support to our patients around the clock...</p>
            <div className="image-gallery">
                <img src="/images/nurse1.jpg" alt="Nurse Assisting Patient" />
                <img src="/images/nurse2.jpg" alt="Nurse Station" />
                <img src="/images/nurse3.jpg" alt="Nurse in ICU" />
            </div>
            <div className="video-container">
                <video controls>
                    <source src="/videos/nurse-demo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <p className="info-paragraph">
                Our nurses are trained in the latest patient care techniques and are dedicated to ensuring that each patient receives the best possible care. They are available 24/7 to assist with patient needs and collaborate with doctors and other healthcare professionals.
            </p>
        </div>
    );
};

export default NursesInfos;
