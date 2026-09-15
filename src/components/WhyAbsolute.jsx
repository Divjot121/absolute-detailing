import React from 'react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { Car, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import './WhyAbsolute.css';

const BENEFIT_ICONS = [Car, ShieldCheck, Sparkles, MapPin];

export const WhyAbsolute = () => {
  return (
    <section id="why-absolute-section" className="section why-absolute-section" aria-labelledby="why-heading">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-eyebrow">FACTUAL BENEFITS</span>
          <h2 id="why-heading" className="section-title">Why Absolute</h2>
          <p className="section-subtitle">
            Reliable local service, honest pricing, and professional automotive care brought straight to your driveway.
          </p>
        </div>

        <div className="why-grid">
          {BUSINESS_CONFIG.whyAbsolute.map((benefit, index) => {
            const Icon = BENEFIT_ICONS[index] || ShieldCheck;

            return (
              <div key={index} className="why-card">
                <div className="why-card-top">
                  <div className="why-accent-rule" aria-hidden="true"></div>
                  <Icon size={18} className="why-lucide-icon" aria-hidden="true" />
                  <h3 className="why-card-title">{benefit.title}</h3>
                </div>
                <p className="why-card-desc">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        {/* Operational Trust Box */}
        <div className="trust-summary-banner">
          <div className="trust-banner-badge">Transparent Commitment</div>
          <p className="trust-banner-text">
            No unexpected checkout fees. No tax added on top of quoted pricing. What you see on this page is what you pay upon completion.
          </p>
        </div>
      </div>
    </section>
  );
};
