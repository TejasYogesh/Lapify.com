import React, { useState } from 'react';
import '../App.css'
  // Place your image in src/assets/

const AboutUs = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-text">
          <h1>About Us</h1>
          <p className="intro">
            Lapify.com is your go-to destination for certified second-hand laptops. We bring affordability, quality,
            and eco-friendliness together in one place.
          </p>

          <p>
            Our mission is to bridge the gap between quality tech and affordability. We handpick every laptop, run
            detailed quality checks, and deliver devices that perform like new.
          </p>

          {showMore && (
            <div className="extra-content">
              <p>
                We started Lapify with a vision to create a sustainable future in tech. Every reused laptop not only saves
                money but also reduces e-waste, making our planet greener.
              </p>
              <p>
                Our inventory includes top brands like Dell, HP, Lenovo, and Apple – all tested for performance, battery
                life, and reliability. From students to startups, Lapify is here to serve everyone with trustworthy
                second-hand devices.
              </p>
              <p>
                We’re more than just a marketplace – we’re a movement towards smarter, responsible tech consumption.
              </p>
            </div>
          )}

          <button className="read-more-button" onClick={() => setShowMore(!showMore)}>
            {showMore ? 'Read Less' : 'Read More'}
          </button>
        </div>

        <div className="about-image">
          <img src={aboutImage} alt="About Lapify" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;