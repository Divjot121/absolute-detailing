import React from 'react';
import { BookingCalendar } from './BookingCalendar';
import { Sunrise, Sun, Sunset, Clock, ArrowLeft, ArrowRight } from 'lucide-react';

const TIME_SLOTS = [
  { id: 'morning', label: 'Morning', window: '8:00 AM – 11:00 AM', Icon: Sunrise },
  { id: 'midday', label: 'Midday', window: '11:00 AM – 2:00 PM', Icon: Sun },
  { id: 'afternoon', label: 'Afternoon', window: '2:00 PM – 5:00 PM', Icon: Sunset },
  { id: 'evening', label: 'Early Evening', window: '5:00 PM – 7:00 PM', Icon: Clock }
];

export const ScheduleStep = ({
  formData,
  errors,
  onChangeField,
  onNext,
  onPrev
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="booking-step-content" aria-labelledby="step-4-title">
      <div className="step-intro">
        <span className="step-badge">STEP 04</span>
        <h3 id="step-4-title" className="step-title">Choose Date &amp; Arrival Window</h3>
        <p className="step-subtitle">
          Select your preferred appointment date and arrival window. We will verify technician scheduling for your slot.
        </p>
      </div>

      <div className="form-fields-stack">
        {/* Custom Accessible Calendar */}
        <div className="form-group">
          <label className="form-label">
            Preferred Service Date <span className="required-indicator" aria-hidden="true">*</span>
          </label>
          
          <BookingCalendar
            selectedDate={formData.preferredDate}
            onSelectDate={(dateStr) => onChangeField('preferredDate', dateStr)}
            minDate={todayStr}
          />

          {errors.preferredDate && (
            <span id="error-date" className="form-error" role="alert" style={{ marginTop: '8px' }}>
              {errors.preferredDate}
            </span>
          )}
        </div>

        {/* Preferred Time Window */}
        <div className="form-group">
          <label className="form-label">
            Preferred Arrival Window <span className="required-indicator" aria-hidden="true">*</span>
          </label>

          <div className="time-slots-grid" role="radiogroup" aria-label="Preferred arrival time window">
            {TIME_SLOTS.map((slot) => {
              const isSelected = formData.preferredTime === slot.window;
              const { Icon } = slot;

              return (
                <button
                  key={slot.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={`time-slot-card ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => onChangeField('preferredTime', slot.window)}
                >
                  <div className="time-slot-header">
                    <div className="time-slot-title-group">
                      <Icon size={16} className="time-slot-lucide-icon" aria-hidden="true" />
                      <span className="time-slot-name">{slot.label}</span>
                    </div>
                    <div className="slot-check-indicator" aria-hidden="true">
                      {isSelected ? (
                        <span className="indicator-check-box">✓</span>
                      ) : (
                        <span className="indicator-empty-box"></span>
                      )}
                    </div>
                  </div>
                  <span className="time-slot-hours">{slot.window}</span>
                </button>
              );
            })}
          </div>

          {errors.preferredTime && (
            <span className="form-error" role="alert" style={{ marginTop: '8px' }}>
              {errors.preferredTime}
            </span>
          )}
        </div>

        {/* Additional Notes (Optional) */}
        <div className="form-group">
          <label htmlFor="field-notes" className="form-label">
            Special Instructions or Notes <span className="text-muted">(Optional)</span>
          </label>
          <textarea
            id="field-notes"
            className="form-control"
            placeholder="e.g. Winter salt stains on front floorboards, driveway access gate, water hose bib located near side porch..."
            value={formData.notes}
            onChange={(e) => onChangeField('notes', e.target.value)}
            rows="3"
            maxLength={500}
          ></textarea>
          <span className="form-hint">
            Let us know if your vehicle requires special focus or if there are specific parking directions.
          </span>
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
          id="btn-next-step-4"
        >
          <span>Review Booking</span>
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
