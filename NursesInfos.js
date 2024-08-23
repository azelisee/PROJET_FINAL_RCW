import React from 'react';
import '../css/Infos.css';

const NursesInfos = () => {
    return (
        <div className="infos-container">
            <h1>Our Nurses</h1>
            <p>Our nursing staff is the backbone of our hospital, providing compassionate care and support to our patients around the clock...</p>
            <div className="image-gallery">
                <img src="/images/n1.jpg" alt="Nurse Assisting Patient" height="100px" width="150px"/>
                <img src="/images/n2.jpg" alt="Nurse Station" height="100px" width="150px" />
                <img src="/images/n3.jpg" alt="Nurse in ICU"  height="100px" width="150px"/>
            </div>
            <div className="video-container">
                <video controls>
                    <source src="/videos/vn.mp4" type="video/mp4" />
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
