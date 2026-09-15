import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import './Booking.css';

const STEPS = [
  { num: '01', key: 'vehicle', label: 'Vehicle' },
  { num: '02', key: 'package', label: 'Package' },
  { num: '03', key: 'details', label: 'Details' },
  { num: '04', key: 'schedule', label: 'Schedule' },
  { num: '05', key: 'review', label: 'Review' },
];

export const BookingProgress = ({ currentStep, onStepClick, highestStepReached }) => {
  const currentStepObj = STEPS[currentStep - 1] || STEPS[0];
  const progressPercent = Math.min(100, Math.max(0, (currentStep / STEPS.length) * 100));

  return (
    <nav className="booking-progress-container" aria-label="Booking steps">
      {/* Mobile Step Counter & Label */}
      <div className="mobile-progress-header">
        <div className="mobile-progress-badge">
          <span className="mobile-step-cur">{currentStepObj.num}</span>
          <span className="mobile-step-sep">/</span>
          <span className="mobile-step-total">05</span>
        </div>
        <span className="mobile-step-title">{currentStepObj.label}</span>
      </div>

      {/* Desktop Linear Steps */}
      <ol className="desktop-steps-list">
        {STEPS.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isCompleted = currentStep > stepNumber;
          const isClickable = stepNumber <= highestStepReached;

          return (
            <li
              key={step.key}
              className={`booking-step-item ${isActive ? 'is-active' : ''} ${isCompleted ? 'is-completed' : ''}`}
              aria-current={isActive ? 'step' : undefined}
            >
              <button
                type="button"
                className="step-button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick(stepNumber)}
                aria-label={`Step ${step.num}: ${step.label} ${isCompleted ? '(Completed)' : isActive ? '(Current)' : ''}`}
              >
                <span className="step-number-wrap">
                  {isCompleted ? (
                    <Check size={12} strokeWidth={3} aria-hidden="true" />
                  ) : (
                    <span className="step-num">{step.num}</span>
                  )}
                </span>
                <span className="step-label">{step.label}</span>
              </button>
              {index < STEPS.length - 1 && <span className="step-connector-dash" aria-hidden="true">—</span>}
            </li>
          );
        })}
      </ol>

      {/* Animated Subtle Progress Bar */}
      <div className="progress-bar-track" aria-hidden="true">
        <motion.div
          className="progress-bar-fill"
          initial={false}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </nav>
  );
};
