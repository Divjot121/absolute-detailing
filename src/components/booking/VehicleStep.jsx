import React from 'react';
import { VehicleSelector } from '../VehicleSelector';
import { ArrowRight } from 'lucide-react';

export const VehicleStep = ({
  vehicleType,
  setVehicleType,
  vehicleMakeModel,
  setVehicleMakeModel,
  onNext
}) => {
  return (
    <div className="booking-step-content" aria-labelledby="step-1-title">
      <div className="step-intro">
        <span className="step-badge">STEP 01 • VEHICLE</span>
        <h3 id="step-1-title" className="step-title">Let's start with your car.</h3>
        <p className="step-subtitle">
          Our pricing depends strictly on vehicle category. Choose the category that best fits your vehicle.
        </p>
      </div>

      <div className="step-body">
        <VehicleSelector
          selectedType={vehicleType}
          onSelectType={setVehicleType}
          label=""
        />

        <div className="form-group" style={{ maxWidth: '640px', margin: '24px auto 0' }}>
          <label htmlFor="vehicle-make-model" className="form-label">
            Vehicle Year, Make &amp; Model <span className="text-muted">(Optional)</span>
          </label>
          <input
            type="text"
            id="vehicle-make-model"
            className="form-control"
            placeholder="e.g. 2022 Honda Civic, 2021 Toyota RAV4"
            value={vehicleMakeModel}
            onChange={(e) => setVehicleMakeModel(e.target.value)}
            maxLength={60}
          />
          <span className="form-hint">
            Helps our mobile technicians prepare the proper equipment and supplies before arrival.
          </span>
        </div>
      </div>

      <div className="step-actions">
        <div></div>
        <button
          type="button"
          className="btn btn-primary step-btn-next"
          onClick={onNext}
          id="btn-next-step-1"
        >
          <span>Continue to Package</span>
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
