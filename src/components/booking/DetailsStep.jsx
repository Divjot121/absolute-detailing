import React from 'react';
import { BUSINESS_CONFIG } from '../../config/businessConfig';
import { Info, ArrowLeft, ArrowRight } from 'lucide-react';

export const DetailsStep = ({
  formData,
  errors,
  onChangeField,
  onNext,
  onPrev
}) => {
  const handlePhoneChange = (e) => {
    let input = e.target.value.replace(/\D/g, '');
    if (input.startsWith('1')) {
      input = input.substring(1);
    }
    input = input.substring(0, 10);

    let formatted = '';
    if (input.length === 0) {
      formatted = '';
    } else if (input.length <= 3) {
      formatted = `(${input}`;
    } else if (input.length <= 6) {
      formatted = `(${input.slice(0, 3)}) ${input.slice(3)}`;
    } else {
      formatted = `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6, 10)}`;
    }

    onChangeField('phone', formatted);
  };

  return (
    <div className="booking-step-content" aria-labelledby="step-3-title">
      <div className="step-intro">
        <span className="step-badge">STEP 03 • DETAILS</span>
        <h3 id="step-3-title" className="step-title">Where should we arrive?</h3>
        <p className="step-subtitle">
          We bring our mobile setup directly to your driveway across Brampton, Mississauga, Etobicoke, Milton, Bolton, Vaughan &amp; Georgetown.
        </p>
      </div>

      <div className="form-fields-stack">
        {/* Full Name */}
        <div className="form-group">
          <label htmlFor="field-name" className="form-label">
            Full Name <span className="required-indicator" aria-hidden="true">*</span>
          </label>
          <input
            type="text"
            id="field-name"
            className={`form-control ${errors.name ? 'has-error' : ''}`}
            placeholder="Your full name"
            value={formData.name}
            onChange={(e) => onChangeField('name', e.target.value)}
            autoComplete="name"
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'error-name' : undefined}
          />
          {errors.name && (
            <span id="error-name" className="form-error" role="alert">
              {errors.name}
            </span>
          )}
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label htmlFor="field-phone" className="form-label">
            Phone Number <span className="required-indicator" aria-hidden="true">*</span>
          </label>
          <input
            type="tel"
            id="field-phone"
            className={`form-control ${errors.phone ? 'has-error' : ''}`}
            placeholder="(437) 000-0000"
            value={formData.phone}
            onChange={handlePhoneChange}
            autoComplete="tel"
            aria-required="true"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'error-phone' : 'phone-hint'}
          />
          <span id="phone-hint" className="form-hint">
            We will call or SMS to confirm your arrival window and technician dispatch.
          </span>
          {errors.phone && (
            <span id="error-phone" className="form-error" role="alert">
              {errors.phone}
            </span>
          )}
        </div>

        {/* Service Address */}
        <div className="form-group">
          <label htmlFor="field-address" className="form-label">
            Service Address (Driveway / Street) <span className="required-indicator" aria-hidden="true">*</span>
          </label>
          <textarea
            id="field-address"
            className={`form-control ${errors.serviceAddress ? 'has-error' : ''}`}
            placeholder="Street address, City (e.g. 124 Main St, Brampton, ON)"
            value={formData.serviceAddress}
            onChange={(e) => onChangeField('serviceAddress', e.target.value)}
            autoComplete="street-address"
            rows="2"
            aria-required="true"
            aria-invalid={Boolean(errors.serviceAddress)}
            aria-describedby={errors.serviceAddress ? 'error-address' : undefined}
          ></textarea>
          {errors.serviceAddress && (
            <span id="error-address" className="form-error" role="alert">
              {errors.serviceAddress}
            </span>
          )}

          {/* Operational Requirements Information Card */}
          <div className="operational-notice-card" role="note">
            <Info size={18} className="op-notice-icon" aria-hidden="true" />
            <div className="op-notice-text">
              <strong>What we need on site:</strong>
              <p>{BUSINESS_CONFIG.operationalRequirements.notice}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="step-actions">
        <button
          type="button"
          className="btn btn-outline step-btn-prev"
          onClick={onPrev}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Back</span>
        </button>

        <button
          type="button"
          className="btn btn-primary step-btn-next"
          onClick={onNext}
          id="btn-next-step-3"
        >
          <span>Continue to Schedule</span>
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
