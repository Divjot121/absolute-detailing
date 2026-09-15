import React from 'react';
import { BUSINESS_CONFIG } from '../../config/businessConfig';
import { Edit2, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';

export const ReviewStep = ({
  formData,
  pkg,
  vehicleCategory,
  totalPrice,
  isSubmitting,
  onSubmit,
  onPrev,
  onEditStep,
  submitError
}) => {
  const basePrice = pkg ? (pkg.pricing[formData.vehicleType] || pkg.pricing.sedan) : 0;
  const petHairPrice = formData.petHairRemoval ? BUSINESS_CONFIG.addons.petHair.price : 0;

  return (
    <div className="booking-step-content" aria-labelledby="step-5-title">
      <div className="step-intro">
        <span className="step-badge">STEP 05</span>
        <h3 id="step-5-title" className="step-title">Review Your Booking Request</h3>
        <p className="step-subtitle">
          Please confirm all details before submitting. We will review availability and contact you promptly.
        </p>
      </div>

      {submitError && (
        <div className="step-validation-error" role="alert">
          {submitError}
        </div>
      )}

      <div className="review-cards-stack">
        {/* Section 1: Vehicle & Model */}
        <div className="review-card">
          <div className="review-card-header">
            <h4 className="review-card-title">Vehicle Information</h4>
            {onEditStep && (
              <button
                type="button"
                className="review-edit-btn"
                onClick={() => onEditStep(1)}
                aria-label="Edit vehicle selection"
              >
                <Edit2 size={13} aria-hidden="true" />
                <span>Edit</span>
              </button>
            )}
          </div>
          
          <div className="review-row">
            <span className="review-label">Vehicle Category:</span>
            <span className="review-val font-bold">
              {vehicleCategory ? vehicleCategory.label : formData.vehicleType}
            </span>
          </div>

          <div className="review-row">
            <span className="review-label">Vehicle Make &amp; Model:</span>
            <span className="review-val">
              {formData.vehicleMakeModel || <span className="text-muted">Not specified</span>}
            </span>
          </div>
        </div>

        {/* Section 2: Selected Package & Add-ons */}
        <div className="review-card">
          <div className="review-card-header">
            <h4 className="review-card-title">Package &amp; Add-ons</h4>
            {onEditStep && (
              <button
                type="button"
                className="review-edit-btn"
                onClick={() => onEditStep(2)}
                aria-label="Edit package and add-ons"
              >
                <Edit2 size={13} aria-hidden="true" />
                <span>Edit</span>
              </button>
            )}
          </div>

          <div className="review-row">
            <span className="review-label">Package:</span>
            <span className="review-val font-bold">
              {pkg ? pkg.customerFacingName : formData.packageId}
            </span>
          </div>

          <div className="review-row">
            <span className="review-label">Estimated Service Duration:</span>
            <span className="review-val text-muted">
              {pkg ? pkg.duration : 'Standard duration'}
            </span>
          </div>

          <div className="review-row">
            <span className="review-label">Pet Hair Removal:</span>
            <span className="review-val">
              {formData.petHairRemoval ? 'Included (+$35 CAD)' : 'Not requested'}
            </span>
          </div>

          <div className="review-pricing-divider"></div>

          {/* Pricing Ledger */}
          <div className="pricing-ledger">
            <div className="ledger-row">
              <span>{pkg ? pkg.customerFacingName : 'Package rate'}:</span>
              <span>${basePrice} CAD</span>
            </div>

            {formData.petHairRemoval && (
              <div className="ledger-row">
                <span>Pet Hair Removal:</span>
                <span>+${petHairPrice} CAD</span>
              </div>
            )}

            <div className="ledger-row tax-exempt-row">
              <span>HST / Tax:</span>
              <span className="text-navy font-bold">$0.00 (No tax added)</span>
            </div>

            <div className="ledger-total-row">
              <span className="total-title">Total Quoted:</span>
              <span className="total-amount">${totalPrice} CAD</span>
            </div>
            <span className="total-subtext">The price quoted is the price you pay. No hidden fees or taxes.</span>
          </div>
        </div>

        {/* Section 3: Contact & Service Address */}
        <div className="review-card">
          <div className="review-card-header">
            <h4 className="review-card-title">Contact &amp; Location</h4>
            {onEditStep && (
              <button
                type="button"
                className="review-edit-btn"
                onClick={() => onEditStep(3)}
                aria-label="Edit contact and address"
              >
                <Edit2 size={13} aria-hidden="true" />
                <span>Edit</span>
              </button>
            )}
          </div>

          <div className="review-row">
            <span className="review-label">Full Name:</span>
            <span className="review-val font-bold">{formData.name}</span>
          </div>

          <div className="review-row">
            <span className="review-label">Phone Number:</span>
            <span className="review-val font-mono">{formData.phone}</span>
          </div>

          <div className="review-row">
            <span className="review-label">Service Address:</span>
            <span className="review-val">{formData.serviceAddress}</span>
          </div>
        </div>

        {/* Section 4: Appointment Schedule */}
        <div className="review-card">
          <div className="review-card-header">
            <h4 className="review-card-title">Appointment Schedule</h4>
            {onEditStep && (
              <button
                type="button"
                className="review-edit-btn"
                onClick={() => onEditStep(4)}
                aria-label="Edit appointment schedule"
              >
                <Edit2 size={13} aria-hidden="true" />
                <span>Edit</span>
              </button>
            )}
          </div>

          <div className="review-row">
            <span className="review-label">Preferred Date:</span>
            <span className="review-val font-bold">{formData.preferredDate}</span>
          </div>

          <div className="review-row">
            <span className="review-label">Arrival Window:</span>
            <span className="review-val font-bold">{formData.preferredTime}</span>
          </div>

          {formData.notes && (
            <div className="review-row notes-row">
              <span className="review-label">Additional Notes:</span>
              <span className="review-val italic">{formData.notes}</span>
            </div>
          )}
        </div>
      </div>

      {/* Reassuring Submission Notice */}
      <div className="submission-disclaimer">
        <AlertCircle size={18} aria-hidden="true" />
        <span>
          Submitting this form sends a booking <strong>request</strong>. We will contact you at <strong>{formData.phone}</strong> to confirm technician availability and pricing.
        </span>
      </div>

      <div className="step-actions">
        <button
          type="button"
          className="btn btn-outline step-btn-prev"
          onClick={onPrev}
          disabled={isSubmitting}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Back</span>
        </button>

        <button
          type="button"
          className="btn btn-primary step-btn-submit"
          onClick={onSubmit}
          disabled={isSubmitting}
          id="btn-submit-booking"
        >
          {isSubmitting ? (
            <span className="btn-loading-state">
              <span className="spinner" aria-hidden="true"></span>
              <span>Submitting Request...</span>
            </span>
          ) : (
            <span className="btn-normal-state">
              <span>Request My Booking</span>
              <ArrowRight size={16} aria-hidden="true" />
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
