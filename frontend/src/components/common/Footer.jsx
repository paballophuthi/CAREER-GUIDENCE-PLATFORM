import React from "react";

const Footer = () => {
  return (
    <footer className="footer mt-5 py-4 bg-card">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5 className="text-white fw-bold">Career Guidance Platform</h5>
            <p className="text-c7c9d3 mb-2">
              Empowering students and graduates in Lesotho with education and career opportunities.
            </p>
            <div className="social-links">
              <a href="#" className="text-c7c9d3 me-3">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-c7c9d3 me-3">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-c7c9d3 me-3">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-c7c9d3">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          <div className="col-md-2 mb-3">
            <h6 className="text-white fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="text-c7c9d3 footer-link">Home</a></li>
              <li><a href="/about" className="text-c7c9d3 footer-link">About</a></li>
              <li><a href="/contact" className="text-c7c9d3 footer-link">Contact</a></li>
              <li><a href="/help" className="text-c7c9d3 footer-link">Help Center</a></li>
            </ul>
          </div>
          
          <div className="col-md-3 mb-3">
            <h6 className="text-white fw-bold">For Students</h6>
            <ul className="list-unstyled">
              <li><a href="/courses" className="text-c7c9d3 footer-link">Find Courses</a></li>
              <li><a href="/scholarships" className="text-c7c9d3 footer-link">Scholarships</a></li>
              <li><a href="/career-tips" className="text-c7c9d3 footer-link">Career Tips</a></li>
              <li><a href="/events" className="text-c7c9d3 footer-link">Events</a></li>
            </ul>
          </div>
          
          <div className="col-md-3 mb-3">
            <h6 className="text-white fw-bold">Contact Info</h6>
            <ul className="list-unstyled text-c7c9d3">
              <li className="mb-2">
                <i className="fas fa-map-marker-alt me-2"></i>
                Limkokwing University, Lesotho
              </li>
              <li className="mb-2">
                <i className="fas fa-phone me-2"></i>
                +266 1234 5678
              </li>
              <li className="mb-2">
                <i className="fas fa-envelope me-2"></i>
                info@careerguidance.ls
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="my-4 border-secondary" />
        
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="text-c7c9d3 mb-0">
              &copy; 2024 Career Guidance Platform. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <a href="/privacy" className="text-c7c9d3 footer-link me-3">Privacy Policy</a>
            <a href="/terms" className="text-c7c9d3 footer-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
