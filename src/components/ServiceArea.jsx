import React from 'react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { MapPin, Wrench } from 'lucide-react';
import './ServiceArea.css';

export const ServiceArea = () => {
  const { serviceArea } = BUSINESS_CONFIG;

  return (
    <section id="service-area-section" className="section service-area-section" aria-labelledby="area-heading">
      <div className="container">
        <div className="service-area-layout">
          {/* Left Column: Locations & Proposition */}
          <div className="area-content">
            <span className="section-eyebrow">COVERAGE RADIUS</span>
            <h2 id="area-heading" className="section-title">{serviceArea.heading}</h2>
            <p className="section-subtitle">
              We travel directly to your residence, apartment building, or workplace across the Greater Toronto Area. No shop drop-off required.
            </p>

            <div className="locations-grid">
              {serviceArea.locations.map((city, idx) => (
                <div key={idx} className="location-pill">
                  <MapPin size={13} className="location-pin-icon" aria-hidden="true" />
                  <span>{city}</span>
                </div>
              ))}
            </div>

            <div className="mobile-prep-reminder">
              <div className="prep-icon" aria-hidden="true">
                <Wrench size={16} />
              </div>
              <p>
                Equipped with professional mobile extraction, pressure wash lines, and power extension gear. All we need on arrival is access to a standard residential electrical outlet and garden water tap.
              </p>
            </div>
          </div>

          {/* Right Column: Local Residential Detailing Proof */}
          <div className="area-visual">
            <div className="area-image-card">
              <img 
                src="/images/finished_suv.jpg" 
                alt="Toyota RAV4 parked in a Mississauga driveway after a complete exterior and interior detail"
                loading="lazy"
                width="800"
                height="450"
              />
              <div className="area-image-overlay">
                <span className="overlay-city">Mississauga, ON</span>
                <span className="overlay-desc">Full Titanium Detail on Customer Toyota RAV4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
