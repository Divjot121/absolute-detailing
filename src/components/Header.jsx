import React, { useState, useEffect } from 'react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { analytics } from '../lib/analytics';
import { Phone, Menu, X, ArrowRight } from 'lucide-react';
import './Header.css';

export const Header = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 76;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleCtaClick = () => {
    setMobileMenuOpen(false);
    analytics.heroCtaClick('header_nav');
    if (onBookClick) {
      onBookClick();
    } else {
      const element = document.getElementById('booking-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handlePhoneClick = () => {
    analytics.phoneClick('header');
  };

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-container">
        {/* Left: Brand Wordmark */}
        <a 
          href="#" 
          className="logo-lockup" 
          aria-label={`${BUSINESS_CONFIG.name} — Home`}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span className="logo-word">ABSOLUTE</span>
          <span className="logo-rule"></span>
          <span className="logo-tagline">CAR WASH &amp; DETAILING</span>
        </a>

        {/* Center: Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <a href="#packages" onClick={(e) => handleNavClick(e, 'packages-section')}>Packages</a>
          <a href="#how-it-works" onClick={(e) => handleNavClick(e, 'how-it-works-section')}>How It Works</a>
          <a href="#why-absolute" onClick={(e) => handleNavClick(e, 'why-absolute-section')}>Why Absolute</a>
          <a href="#service-area" onClick={(e) => handleNavClick(e, 'service-area-section')}>Service Area</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact-section')}>Contact</a>
        </nav>

        {/* Right: Actions */}
        <div className="header-actions">
          <a 
            href={BUSINESS_CONFIG.contact.phoneTel} 
            className="header-phone-link"
            onClick={handlePhoneClick}
            aria-label={`Call Absolute at ${BUSINESS_CONFIG.contact.phoneDisplay}`}
          >
            <Phone size={14} className="header-phone-icon" aria-hidden="true" />
            <span>{BUSINESS_CONFIG.contact.phoneDisplay}</span>
          </a>

          {/* Primary Signal Red CTA */}
          <button 
            type="button" 
            className="btn btn-primary header-cta-btn"
            onClick={handleCtaClick}
            id="header-book-cta"
          >
            <span>Book Your Detail</span>
            <ArrowRight size={14} aria-hidden="true" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div 
        id="mobile-nav-drawer"
        className={`mobile-drawer ${mobileMenuOpen ? 'is-open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <nav className="mobile-drawer-nav" aria-label="Mobile Navigation">
          <a href="#packages" onClick={(e) => handleNavClick(e, 'packages-section')}>Packages &amp; Pricing</a>
          <a href="#how-it-works" onClick={(e) => handleNavClick(e, 'how-it-works-section')}>How It Works</a>
          <a href="#why-absolute" onClick={(e) => handleNavClick(e, 'why-absolute-section')}>Why Absolute</a>
          <a href="#service-area" onClick={(e) => handleNavClick(e, 'service-area-section')}>Service Area</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact-section')}>Contact</a>
          
          <div className="mobile-drawer-actions">
            <button 
              type="button" 
              className="btn btn-primary btn-block"
              onClick={handleCtaClick}
            >
              <span>Book Your Detail</span>
              <ArrowRight size={15} aria-hidden="true" />
            </button>
            <a 
              href={BUSINESS_CONFIG.contact.phoneTel} 
              className="btn btn-secondary btn-block"
              onClick={handlePhoneClick}
            >
              <Phone size={15} aria-hidden="true" />
              <span>Call {BUSINESS_CONFIG.contact.phoneDisplay}</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};
