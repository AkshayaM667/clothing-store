import React from 'react';
import './Hero.css';

import arrow_icon from '../Assets/arrow.png';
import hero_image from '../Assets/hero_image.png';

const Hero = () => {
  const scrollToNewCollections = () => {
    const section = document.getElementById('new-collections');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hero">
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div className="hero-tagline">
          <p className="hero-line">Feel the Aura.</p>
          <p className="hero-line">Wear the Attire.</p>
        </div>
        <div className="hero-latest-btn" onClick={scrollToNewCollections}>
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="arrow icon" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="hero" />
      </div>
    </div>
  );
};

export default Hero;
