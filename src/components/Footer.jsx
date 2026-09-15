import React from 'react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { Phone } from 'lucide-react';
import { InstagramIcon } from './icons/InstagramIcon';
import './Footer.css';

export const Footer = ({ onBookClick }) => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      const headerOffset = 76;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top-row">
          {/* Brand Wordmark Lockup */}
          <div className="footer-brand-col">
            <div className="logo-lockup logo-dark">
              <span className="logo-word">ABSOLUTE</span>
              <span className="logo-rule"></span>
              <span className="logo-tagline">CAR WASH &amp; DETAILING</span>
            </div>
            <p className="footer-brand-bio">
              Professional mobile car washing and automotive detailing brought directly to your driveway across the Greater Toronto Area.
            </p>
            <div className="footer-meta-pill">
              <span>All prices in CAD • No tax added</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-nav-col">
            <h4 className="footer-heading">Services &amp; Packages</h4>
            <ul className="footer-links-list">
              <li><a href="#packages" onClick={(e) => handleLinkClick(e, 'packages-section')}>Choose Your Detail</a></li>
              <li><a href="#packages" onClick={(e) => handleLinkClick(e, 'packages-section')}>Interior Detailing</a></li>
              <li><a href="#packages" onClick={(e) => handleLinkClick(e, 'packages-section')}>Full In &amp; Out Detail</a></li>
              <li><a href="#services-tinting" onClick={(e) => handleLinkClick(e, 'services-tinting')}>Window Tinting Info</a></li>
              <li><a href="#booking" onClick={onBookClick}>Request an Appointment</a></li>
            </ul>
          </div>

          {/* Service Area */}
          <div className="footer-nav-col">
            <h4 className="footer-heading">Service Locations</h4>
            <ul className="footer-links-list footer-cities-list">
              {BUSINESS_CONFIG.serviceArea.locations.map((loc, i) => (
                <li key={i}>
                  <a href="#service-area" onClick={(e) => handleLinkClick(e, 'service-area-section')}>
                    {loc}, ON
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="footer-contact-col">
            <h4 className="footer-heading">Direct Contact</h4>
            <div className="footer-contact-items">
              <a 
                href={BUSINESS_CONFIG.contact.phoneTel} 
                className="footer-contact-item"
                onClick={() => analytics.phoneClick('footer')}
              >
                <Phone size={15} aria-hidden="true" />
                <span>{BUSINESS_CONFIG.contact.phoneDisplay}</span>
              </a>

              <a 
                href={BUSINESS_CONFIG.contact.instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-contact-item"
                onClick={() => analytics.instagramClick('footer')}
              >
                <InstagramIcon size={15} />
                <span>{BUSINESS_CONFIG.contact.instagramHandle}</span>
              </a>

              <div className="footer-hours">
                <span className="hours-title">Hours:</span>
                <span>{BUSINESS_CONFIG.contact.operatingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-row">
          <p className="copyright-text">
            &copy; {currentYear} {BUSINESS_CONFIG.name}. All rights reserved.
          </p>
          <div className="footer-bottom-meta">
            <span>Mobile Detailing Specialist</span>
            <span>•</span>
            <span>Ontario, Canada</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
