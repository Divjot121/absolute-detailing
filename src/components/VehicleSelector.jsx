import React from 'react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import './VehicleSelector.css';

export const VehicleSelector = ({ selectedType, onSelectType, label = "Select Your Vehicle Type:" }) => {
  return (
    <div className="vehicle-selector-wrapper" role="radiogroup" aria-label="Select Vehicle Category">
      {label && <div className="vehicle-selector-title">{label}</div>}

      <div className="vehicle-grid">
        {BUSINESS_CONFIG.vehicleCategories.map((category) => {
          const isSelected = selectedType === category.id;

          return (
            <button
              key={category.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`vehicle-card ${isSelected ? 'is-selected' : ''}`}
              onClick={() => onSelectType(category.id)}
            >
              <div className="vehicle-card-header">
                <div className="vehicle-icon-badge">
                  {category.id === 'sedan' ? (
                    // Clean Sedan SVG silhouette
                    <svg width="28" height="20" viewBox="0 0 32 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 14h24M5 14l3-6h13l4 6M6 14a2 2 0 1 0 4 0M21 14a2 2 0 1 0 4 0M1 14h3M28 14h3"></path>
                    </svg>
                  ) : (
                    // Clean SUV / Truck SVG silhouette
                    <svg width="28" height="20" viewBox="0 0 32 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M2 14h27M4 14l2-8h16l5 8M7 14a2.5 2.5 0 1 0 5 0M21 14a2.5 2.5 0 1 0 5 0M1 14h3M28 14h3"></path>
                      <path d="M7 6V4h14v2"></path>
                    </svg>
                  )}
                </div>

                <div className="selection-indicator" aria-hidden="true">
                  {isSelected ? (
                    <div className="indicator-checked">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  ) : (
                    <div className="indicator-empty"></div>
                  )}
                </div>
              </div>

              <div className="vehicle-card-body">
                <div className="vehicle-name-row">
                  <span className="vehicle-label">{category.label}</span>
                  {isSelected && <span className="selected-tag">Selected</span>}
                </div>
                <p className="vehicle-includes">{category.includes}</p>
                <span className="vehicle-examples">{category.examples}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
