import React from 'react';

export default function Footer() {
    return (
      <footer className="footer">
        <div id="about-us" className="footer-section">
          <h2>About Us</h2>
          <p>
            Welcome to our blog! We are dedicated to bringing you the latest news, insightful articles, and in-depth reviews.
          </p>
          <p>
            Our team of experienced writers and industry experts are passionate about sharing their knowledge and expertise with our readers.
          </p>
        </div>
        <div id="contact-us" className="footer-section">
          <h2>Contact Us</h2>
          <p><strong>Address:</strong> 123 Blog St, Blogtown, BL 12345</p>
          <p><strong>Email:</strong> contact@ourblog.com</p>
          <p><strong>Phone:</strong> (123) 456-7890</p>
        </div>
      </footer>
    );
  }