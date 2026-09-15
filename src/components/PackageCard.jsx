import React from 'react';
import { Check, Clock } from 'lucide-react';
import './PackageCard.css';

export const PackageCard = ({
  pkg,
  vehicleType,
  isSelected,
  onSelectPackage,
}) => {
  const price = pkg.pricing[vehicleType] || pkg.pricing.sedan;
  const isGold = pkg.isPopular;

  const handleSelect = () => {
    onSelectPackage(pkg.id);
  };

  return (
    <article 
      className={`package-card ${isGold ? 'is-recommended' : ''} ${isSelected ? 'is-selected' : ''}`}
      aria-label={`${pkg.customerFacingName} package`}
    >
      {/* Brass Most Popular Badge (Reserved ONLY for recommended tiers) */}
      {pkg.badge && (
        <div className="package-badge-wrapper">
          <span className="badge-brass">{pkg.badge}</span>
        </div>
      )}

      <div className="package-card-header">
        <div className="package-tier-label">{pkg.tierLabel}</div>
        <h3 className="package-title">{pkg.customerFacingName}</h3>
        <p className="package-desc">{pkg.shortDescription}</p>
      </div>

      <div className="package-pricing-block">
        <div className="price-row">
          <span className="price-currency">$</span>
          <span className="price-number">{price}</span>
          <span className="price-period">CAD</span>
        </div>
        <div className="price-metadata">
          <span className="no-tax-pill">No tax added</span>
          {pkg.duration && (
            <span className="duration-pill">
              <Clock size={12} aria-hidden="true" />
              <span>{pkg.duration}</span>
            </span>
          )}
        </div>
        <div className="vehicle-rate-indicator">
          Price for {vehicleType === 'sedan' ? 'Sedan / Hatchback' : 'SUV / Van / Mini Truck'}
        </div>
      </div>

      {/* Thin Brass Separator */}
      <div className="package-divider"></div>

      {/* Inclusions */}
      <div className="package-inclusions">
        <div className="inclusions-title">Package Inclusions:</div>
        <ul className="inclusions-list">
          {pkg.inclusions.map((item, idx) => (
            <li key={idx} className="inclusion-item">
              <Check size={14} className="check-icon" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {pkg.perfectFor && (
        <div className="perfect-for-box">
          <strong>Ideal for:</strong> {pkg.perfectFor}
        </div>
      )}

      {/* Action CTA */}
      <div className="package-footer">
        <button
          type="button"
          className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'} btn-block package-cta-btn`}
          onClick={handleSelect}
        >
          {isSelected ? 'Selected — Proceed to Booking' : 'Choose This Package'}
        </button>
      </div>
    </article>
  );
};
