import React, { useState } from 'react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { PackageCard } from './PackageCard';
import { VehicleSelector } from './VehicleSelector';
import { analytics } from '../lib/analytics';
import './Services.css';

export const Services = ({
  vehicleType,
  setVehicleType,
  selectedPackageId,
  onSelectPackageAndProceed
}) => {
  const [filterCategory, setFilterCategory] = useState('all');

  const handleVehicleChange = (newType) => {
    setVehicleType(newType);
    analytics.packageView(selectedPackageId || 'all', newType);
  };

  const handlePackageClick = (pkgId) => {
    const pkg = BUSINESS_CONFIG.packages.find(p => p.id === pkgId);
    const price = pkg ? pkg.pricing[vehicleType] : 0;
    analytics.packageSelect(pkgId, vehicleType, price);
    onSelectPackageAndProceed(pkgId);
  };

  const filteredPackages = filterCategory === 'all'
    ? BUSINESS_CONFIG.packages
    : BUSINESS_CONFIG.packages.filter(p => p.category === filterCategory);

  return (
    <section id="packages-section" className="section packages-section" aria-labelledby="packages-heading">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-eyebrow">PACKAGES &amp; PRICING</span>
          <h2 id="packages-heading" className="section-title">Choose Your Detail</h2>
          <p className="section-subtitle">
            All rates quoted in CAD. No tax added at checkout. Select your vehicle category to view confirmed rates.
          </p>
        </div>

        {/* Dynamic Vehicle Selector */}
        <div className="services-vehicle-selector">
          <VehicleSelector
            selectedType={vehicleType}
            onSelectType={handleVehicleChange}
            label="1. Select Vehicle Category to Update Rates:"
          />
        </div>

        {/* Editorial Category Tab Switcher */}
        <div className="category-tabs-wrapper">
          <div className="category-tabs-list" role="tablist" aria-label="Filter packages by service category">
            <button
              type="button"
              role="tab"
              aria-selected={filterCategory === 'all'}
              className={`category-tab ${filterCategory === 'all' ? 'is-active' : ''}`}
              onClick={() => setFilterCategory('all')}
            >
              All Packages (4)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filterCategory === 'interior'}
              className={`category-tab ${filterCategory === 'interior' ? 'is-active' : ''}`}
              onClick={() => setFilterCategory('interior')}
            >
              Interior Only (2)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filterCategory === 'full'}
              className={`category-tab ${filterCategory === 'full' ? 'is-active' : ''}`}
              onClick={() => setFilterCategory('full')}
            >
              Full Detail — In &amp; Out (2)
            </button>
          </div>
        </div>

        {/* Package Cards Grid */}
        <div className="packages-grid">
          {filteredPackages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              vehicleType={vehicleType}
              isSelected={selectedPackageId === pkg.id}
              onSelectPackage={handlePackageClick}
            />
          ))}
        </div>

        {/* Add-on Banner: Pet Hair Removal */}
        <div className="addon-banner">
          <div className="addon-content">
            <div className="addon-badge">OPTIONAL ADD-ON</div>
            <h4 className="addon-title">{BUSINESS_CONFIG.addons.petHair.name} (+$35)</h4>
            <p className="addon-desc">{BUSINESS_CONFIG.addons.petHair.description}</p>
          </div>
          <div className="addon-action">
            <span className="addon-price">+$35 CAD</span>
            <span className="addon-note">Selectable in booking form</span>
          </div>
        </div>

        {/* Detailing Craftsmanship Evidence Gallery */}
        <div className="craftsmanship-gallery">
          <div className="gallery-card">
            <div className="gallery-img-wrapper">
              <img 
                src="/images/interior_detailing.jpg" 
                alt="Meticulously vacuumed carpets and conditioned charcoal leather seats" 
                loading="lazy"
                width="600"
                height="338"
              />
            </div>
            <div className="gallery-caption">
              <strong>Interior Deep Extraction</strong>
              <span>Steam shampoo for carpets and seats, crevice detailing, and leather conditioning.</span>
            </div>
          </div>
          <div className="gallery-card">
            <div className="gallery-img-wrapper">
              <img 
                src="/images/wheel_wash.jpg" 
                alt="Detailer foaming and agitating wheels and tires with specialized brush" 
                loading="lazy"
                width="600"
                height="338"
              />
            </div>
            <div className="gallery-caption">
              <strong>Wheel &amp; Rim Care</strong>
              <span>Brake dust removal, tire degreasing, and protective high-gloss tire shine.</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
