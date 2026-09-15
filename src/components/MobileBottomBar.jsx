import React from 'react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { analytics } from '../lib/analytics';
import { Phone, Calendar } from 'lucide-react';
import './MobileBottomBar.css';

export const MobileBottomBar = ({ onBookClick }) => {
  const handleBookClick = () => {
    analytics.heroCtaClick('mobile_bottom_bar');
    if (onBookClick) {
      onBookClick();
    } else {
      const el = document.getElementById('booking-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCallClick = () => {
    analytics.phoneClick('mobile_bottom_bar');
  };

  return (
    <aside className="mobile-bottom-bar" aria-label="Quick conversion actions">
      <div className="mobile-bar-grid">
        {/* Call Action */}
        <a
          href={BUSINESS_CONFIG.contact.phoneTel}
          className="mobile-bar-btn mobile-call-btn"
          onClick={handleCallClick}
          aria-label={`Call ${BUSINESS_CONFIG.contact.phoneDisplay}`}
        >
          <Phone size={16} aria-hidden="true" />
          <span>CALL</span>
        </a>

        {/* Primary Signal Red Booking Action */}
        <button
          type="button"
          className="mobile-bar-btn mobile-book-btn"
          onClick={handleBookClick}
          id="mobile-bottom-book-cta"
        >
          <Calendar size={16} aria-hidden="true" />
          <span>BOOK DETAIL</span>
        </button>
      </div>
    </aside>
  );
};
