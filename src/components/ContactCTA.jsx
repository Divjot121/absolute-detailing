import React from 'react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { analytics } from '../lib/analytics';
import { ArrowRight, Phone } from 'lucide-react';
import './ContactCTA.css';

export const ContactCTA = ({ onBookClick }) => {
  const handlePrimaryClick = () => {
    analytics.heroCtaClick('closing_cta');
    if (onBookClick) {
      onBookClick();
    } else {
      const el = document.getElementById('booking-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePhoneClick = () => {
    analytics.phoneClick('closing_cta');
  };

  return (
    <section id="contact-section" className="section contact-cta-section section-dark" aria-labelledby="cta-heading">
      <div className="container text-center">
        <span className="section-eyebrow">CONVENIENT MOBILE CARE</span>
        <h2 id="cta-heading" className="cta-title">Ready for a Cleaner Car?</h2>
        <p className="cta-subtitle">
          Request your detail online in 60 seconds or call us directly. We come straight to your location across the GTA.
        </p>

        <div className="cta-buttons-row">
          <button
            type="button"
            className="btn btn-primary cta-btn-main"
            onClick={handlePrimaryClick}
            id="closing-book-cta"
          >
            <span>Book Your Detail</span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>

          <a
            href={BUSINESS_CONFIG.contact.phoneTel}
            className="btn btn-secondary-light cta-btn-phone"
            onClick={handlePhoneClick}
          >
            <Phone size={15} aria-hidden="true" />
            <span>Call {BUSINESS_CONFIG.contact.phoneDisplay}</span>
          </a>
        </div>

        <div className="cta-guarantee-note">
          <span>No tax added • Clear upfront pricing • We bring power &amp; water lines</span>
        </div>
      </div>
    </section>
  );
};
