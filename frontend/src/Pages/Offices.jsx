import React from 'react';

const Offices = () => {
  return (
    <div className="page offices-page">
      <h1>Our Offices</h1>
      <p>
        Auraa Attire operates from multiple locations to ensure a seamless experience for our customers and partners.
      </p>

      <h3>Headquarters</h3>
      <p>
        <strong>Auraa Attire HQ</strong><br />
        401, Elegance Business Park,<br />
        Mumbai, Maharashtra - 400093<br />
        India<br />
        Email: support@auraaattire.com<br />
        Phone: +91 98765 43210
      </p>

      <h3>Regional Offices</h3>
      <ul>
        <li>Delhi NCR</li>
        <li>Bangalore</li>
        <li>Hyderabad</li>
        <li>Ahmedabad</li>
      </ul>

      <p>
        We’re constantly growing — stay tuned for more local stores and experience centers.
      </p>
    </div>
  );
};

export default Offices;
