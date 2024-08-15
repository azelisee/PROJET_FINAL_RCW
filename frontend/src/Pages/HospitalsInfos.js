import React from 'react';
import '../css/Infos.css';

const HospitalsInfos = () => {
    return (
        <div className="infos-container">
            <h1>Our Hospitals</h1>
            <p>
                Our hospitals are equipped with state-of-the-art facilities and offer a wide range of medical services
                to meet the needs of our patients. From emergency care to specialized treatments, our hospitals are committed to
                providing the highest quality care in a compassionate and supportive environment.
            </p>
            <div className="info-section">
                <h2>Our Facilities</h2>
                <p>
                    We offer modern facilities that are designed to ensure patient comfort and safety. Our hospitals include advanced
                    diagnostic and treatment equipment, spacious patient rooms, and comfortable waiting areas for families and visitors.
                </p>
                <div className="image-gallery">
                    <img src="/images/hospital-facility1.jpg" alt="Hospital Facility 1" />
                    <img src="/images/hospital-facility2.jpg" alt="Hospital Facility 2" />
                    <img src="/images/hospital-facility3.jpg" alt="Hospital Facility 3" />
                </div>
            </div>

            <div className="info-section">
                <h2>Services Offered</h2>
                <p>
                    Our hospitals provide a wide range of services, including:
                </p>
                <ul>
                    <li>Emergency and trauma care</li>
                    <li>Outpatient services</li>
                    <li>Surgical services</li>
                    <li>Maternity and neonatal care</li>
                    <li>Cardiology and heart surgery</li>
                    <li>Orthopedic services</li>
                    <li>Cancer treatment and chemotherapy</li>
                    <li>Physical therapy and rehabilitation</li>
                    <li>Laboratory and imaging services</li>
                    <li>And many others</li>
                </ul>
                <div className="image-gallery">
                    <img src="/images/hospital-services1.jpg" alt="Hospital Services 1" />
                    <img src="/images/hospital-services2.jpg" alt="Hospital Services 2" />
                </div>
            </div>

            <div className="info-section">
                <h2>Patient Testimonials</h2>
                <p>
                    Our patients are at the heart of everything we do. Here’s what some of them have to say about their experience at our hospitals:
                </p>
                <blockquote>
                    "The care I received was outstanding. The staff were compassionate, and the facilities were top-notch."
                    <footer>- Patient A</footer>
                </blockquote>
                <blockquote>
                    "I felt safe and well-cared for throughout my treatment. I couldn't have asked for better care."
                    <footer>- Patient B</footer>
                </blockquote>
                <blockquote>
                    "The hospital provided excellent service, and the staff made sure I was comfortable at all times."
                    <footer>- Patient C</footer>
                </blockquote>
            </div>

            <div className="info-section">
                <h2>Watch Our 3D Virtual Tour</h2>
                <p>
                    Take a virtual tour of our facilities to see where you'll be receiving care. This video showcases our state-of-the-art technology, patient rooms, and much more.
                </p>
                <div className="video-container">
                    <video controls>
                        <source src="/videos/hospital-demo.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>

            <div className="info-section">
                <h2>Contact Us</h2>
                <p>
                    For more information about our hospitals or to schedule a visit, please contact us:
                </p>
                <ul>
                    <li>Email: <a href="mailto:azoumakokou@teccart.online" style={{color:'white'}}>azoumakokou@teccart.online</a></li>
                    <li>Phone: (438)-456-7890</li>
                </ul>
            </div>
        </div>
    );
};

export default HospitalsInfos;
