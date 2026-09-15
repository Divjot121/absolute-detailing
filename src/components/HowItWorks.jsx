import React from 'react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { ArrowRight } from 'lucide-react';
import './HowItWorks.css';

export const HowItWorks = ({ onBookClick }) => {
  return (
    <section id="how-it-works-section" className="section how-it-works-section" aria-labelledby="how-heading">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-eyebrow">SIMPLE 3-STEP PROCESS</span>
          <h2 id="how-heading" className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Getting your car washed and detailed shouldn't require rearranging your schedule or waiting in a lobby.
          </p>
        </div>

        <div className="how-grid">
          {BUSINESS_CONFIG.howItWorks.map((item) => (
            <div key={item.step} className="how-step-card">
              <div className="how-step-num-wrap">
                <span className="how-num">{item.step}</span>
                <span className="how-rule"></span>
              </div>
              <h3 className="how-step-title">{item.title}</h3>
              <p className="how-step-desc">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="how-action-row text-center">
          <button
            type="button"
            className="btn btn-primary"
            onClick={onBookClick}
          >
            <span>Start Your Booking Request</span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};
