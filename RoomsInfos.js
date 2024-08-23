import React from 'react';
import '../css/Infos.css';

const RoomsInfos = () => {
    return (
        <div className="infos-container">
            <h1>Our Rooms</h1>
            <p>Our hospital rooms are designed to ensure patient comfort and safety, with all the necessary amenities to support recovery...</p>
            <div className="image-gallery">
                <img src="/images/room2.jpg" alt="Private Room"  height="100px" width="150px"/>
                <img src="/images/room3.jpg" alt="ICU Room"  height="100px" width="150px"/>
                <img src="/images/room6.jpg" alt="Pediatric Room"  height="100px" width="150px"/>
            </div>
            <div className="video-container">
                <video controls>
                    <source src="/videos/vr.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <p className="info-paragraph">
                Our rooms are equipped with the latest medical technology and designed with the patient's comfort in mind. We offer private rooms, ICU facilities, and specialized rooms for children and their families.
            </p>
        </div>
    );
};

export default RoomsInfos;
