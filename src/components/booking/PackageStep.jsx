import React from 'react';
import { BUSINESS_CONFIG } from '../../config/businessConfig';
import { Check, ArrowLeft, ArrowRight } from 'lucide-react';

export const PackageStep = ({
  vehicleType,
  selectedPackageId,
  setSelectedPackageId,
  petHairRemoval,
  setPetHairRemoval,
  onNext,
  onPrev,
  error
}) => {
  return (
    <div className="booking-step-content" aria-labelledby="step-2-title">
      <div className="step-intro">
        <span className="step-badge">STEP 02 • PACKAGE</span>
        <h3 id="step-2-title" className="step-title">Choose your package &amp; add-ons.</h3>
        <p className="step-subtitle">
          Prices updated for <strong>{vehicleType === 'sedan' ? 'Sedan / Hatchback' : 'SUV / Van / Mini Truck'}</strong>. No tax added.
        </p>
      </div>

      {error && (
        <div className="step-validation-error" role="alert">
          {error}
        </div>
      )}

      <div className="package-step-grid">
        {BUSINESS_CONFIG.packages.map((pkg) => {
          const isSelected = selectedPackageId === pkg.id;
          const price = pkg.pricing[vehicleType] || pkg.pricing.sedan;

          return (
            <button
              key={pkg.id}
              type="button"
              className={`booking-package-card ${isSelected ? 'is-selected' : ''}`}
              onClick={() => setSelectedPackageId(pkg.id)}
              aria-pressed={isSelected}
            >
              <div className="bp-card-top">
                <div className="bp-badges">
                  {pkg.badge && <span className="badge-brass">{pkg.badge}</span>}
                  <span className="badge-steel">{pkg.tierLabel}</span>
                </div>
                <div className="bp-selector-circle">
                  {isSelected && (
                    <Check size={12} strokeWidth={3} aria-hidden="true" />
                  )}
                </div>
              </div>

              <h4 className="bp-title">{pkg.customerFacingName}</h4>
              <p className="bp-desc">{pkg.shortDescription}</p>

              <div className="bp-price-row">
                <span className="bp-price">${price}</span>
                <span className="bp-cur">CAD (No tax)</span>
                {pkg.duration && <span className="bp-duration">• {pkg.duration}</span>}
              </div>

              <div className="bp-inclusions-list">
                {pkg.inclusions.slice(0, 3).map((inc, i) => (
                  <div key={i} className="bp-inclusion-item">
                    <Check size={13} className="bp-check-icon" aria-hidden="true" />
                    <span>{inc}</span>
                  </div>
                ))}
                {pkg.inclusions.length > 3 && (
                  <div className="bp-more-note">
                    +{pkg.inclusions.length - 3} more detailed inclusions
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Pet Hair Add-on Checkbox */}
      <div className="pet-hair-addon-card">
        <label className="checkbox-custom-label" htmlFor="checkbox-pet-hair">
          <input
            type="checkbox"
            id="checkbox-pet-hair"
            className="visually-hidden"
            checked={petHairRemoval}
            onChange={(e) => setPetHairRemoval(e.target.checked)}
          />
          <span className={`custom-checkbox ${petHairRemoval ? 'is-checked' : ''}`} aria-hidden="true">
            {petHairRemoval && (
              <Check size={14} strokeWidth={3} aria-hidden="true" />
            )}
          </span>
          <div className="checkbox-text-wrap">
            <div className="checkbox-header-row">
              <span className="checkbox-title">Add pet hair removal</span>
              <span className="checkbox-price-tag">+$35 CAD</span>
            </div>
            <span className="checkbox-subtext">
              Specialized rubberized agitation brushes &amp; high-suction extraction for stubborn embedded pet hair.
            </span>
          </div>
        </label>
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
          id="btn-next-step-2"
        >
          <span>Continue to Details</span>
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
