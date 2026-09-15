import React from 'react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { analytics } from '../lib/analytics';
import { Phone, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import './Hero.css';

export const Hero = ({ onBookClick }) => {
  const handlePrimaryCta = () => {
    analytics.heroCtaClick('hero_primary');
    if (onBookClick) {
      onBookClick();
    } else {
      const el = document.getElementById('booking-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePhoneClick = () => {
    analytics.phoneClick('hero');
  };

  return (
    <section className="hero-section" aria-labelledby="hero-heading">
      <div className="container hero-container">
        {/* Left Column: Value Proposition & CTAs */}
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="eyebrow-rule" aria-hidden="true"></span>
            <span>MOBILE CAR WASH &amp; DETAILING • GTA</span>
          </div>

          <h1 id="hero-heading" className="hero-title">
            {BUSINESS_CONFIG.tagline}
          </h1>

          <p className="hero-subtitle">
            {BUSINESS_CONFIG.subheadline}
          </p>

          <div className="hero-cta-group">
            <button
              type="button"
              className="btn btn-primary hero-btn-main"
              onClick={handlePrimaryCta}
              id="hero-book-cta"
            >
              <span>Book Your Detail</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>

            <a
              href={BUSINESS_CONFIG.contact.phoneTel}
              className="btn btn-secondary hero-btn-phone"
              onClick={handlePhoneClick}
            >
              <Phone size={15} aria-hidden="true" />
              <span>Call {BUSINESS_CONFIG.contact.phoneDisplay}</span>
            </a>
          </div>

          {/* Editorial Trust Strip */}
          <div className="hero-trust-bar">
            <div className="trust-item">
              <span className="trust-dash" aria-hidden="true">—</span>
              <span>Mobile service to your driveway</span>
            </div>
            <div className="trust-item">
              <span className="trust-dash" aria-hidden="true">—</span>
              <span>Professional equipment &amp; craft</span>
            </div>
            <div className="trust-item">
              <span className="trust-dash" aria-hidden="true">—</span>
              <span className="trust-highlight">No tax added to quoted rates</span>
            </div>
          </div>
        </div>

        {/* Right Column: Architectural Photography Frame */}
        <div className="hero-visual">
          <div className="hero-image-frame">
            <img 
              src="/images/hero_detailing.jpg" 
              alt="Professional mobile car detailer hand-drying a customer's clean Honda sedan in a suburban Canadian driveway" 
              className="hero-image"
              width="800"
              height="450"
              fetchPriority="high"
            />
          </div>
          <div className="hero-caption-plate">
            <span className="caption-label">ON-SITE DETAIL</span>
            <span className="caption-text">Driveway service in Brampton, ON. Plush microfiber hand-drying to protect clearcoat.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
