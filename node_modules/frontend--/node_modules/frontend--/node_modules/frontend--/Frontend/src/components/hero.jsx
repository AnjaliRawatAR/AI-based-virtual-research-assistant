import React from 'react';
import backgroundImage from './assets/images/ai-virtual-assistant.jpg'; // adjust path if needed
import './App.css'; // keep your styles

const Hero = () => {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="hero-content">
        <h1>Welcome to AVRA</h1>
        <p>
          An AI-powered research assistant designed to revolutionize the way you gather and interpret information. Whether you're a student, professional, or curious mind — AVRA is here to help.
        </p>
        <button className="cta-button">Let's Get Started</button>
      </div>
    </section>
  );
};

export default Hero;
