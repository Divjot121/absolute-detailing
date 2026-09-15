import React from 'react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { Check, Phone, Info } from 'lucide-react';
import { InstagramIcon } from './icons/InstagramIcon';
import './TintingSection.css';

export const TintingSection = () => {
  const { tinting } = BUSINESS_CONFIG;

  const handleTintInquire = () => {
    analytics.phoneClick('tinting_section');
  };

  return (
    <section id="services-tinting" className="section tinting-section" aria-labelledby="tinting-heading">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-eyebrow">AUTOMOTIVE GLASS PROTECTION</span>
          <h2 id="tinting-heading" className="section-title">{tinting.title}</h2>
          <p className="section-subtitle">{tinting.subtitle}</p>
        </div>

        <div className="tinting-grid">
          {tinting.options.map((option) => (
            <div key={option.id} className="tinting-card">
              {option.badge && (
                <div className="tinting-badge-top">
                  <span className="badge-brass">{option.badge}</span>
                </div>
              )}

              <h3 className="tinting-card-title">{option.name}</h3>

              <div className="tinting-pricing-row">
                <div className="tint-price-item">
                  <span className="tint-price-label">Sedan / Coupe</span>
                  <span className="tint-price-val">${option.pricing.sedan} <small>CAD</small></span>
                </div>
                <div className="tint-price-item">
                  <span className="tint-price-label">SUV / Truck</span>
                  <span className="tint-price-val">${option.pricing.suv} <small>CAD</small></span>
                </div>
              </div>

              <div className="tinting-divider"></div>

              <ul className="tinting-features-list">
                {option.features.map((feat, i) => (
                  <li key={i} className="tinting-feature-item">
                    <Check size={14} className="tint-check" aria-hidden="true" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Responsible Verification / Consultation Note */}
        <div className="tinting-consultation-box">
          <div className="consultation-header">
            <Info size={16} aria-hidden="true" />
            <strong>Consultation &amp; Window Coverage Details</strong>
          </div>
          <p>
            {tinting.notice} We ensure all window film applications comply with Ontario Highway Traffic Act visibility requirements.
          </p>
          <div className="consultation-actions">
            <a 
              href={BUSINESS_CONFIG.contact.phoneTel} 
              className="btn btn-secondary"
              onClick={handleTintInquire}
            >
              <Phone size={15} aria-hidden="true" />
              <span>Call to Inquire: {BUSINESS_CONFIG.contact.phoneDisplay}</span>
            </a>
            <a 
              href={BUSINESS_CONFIG.contact.instagramUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-outline"
              onClick={() => analytics.instagramClick('tinting_section')}
            >
              <InstagramIcon size={15} />
              <span>DM on Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
