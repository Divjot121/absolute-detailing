import React from 'react';
import { motion } from 'framer-motion';
import { BUSINESS_CONFIG } from '../../config/businessConfig';
import { Check, Phone, Info } from 'lucide-react';
import { InstagramIcon } from '../icons/InstagramIcon';

export const BookingSuccess = ({
  bookingResult,
  formData,
  pkg,
  vehicleCategory,
  totalPrice,
  onReset
}) => {
  const bookingId = bookingResult ? bookingResult.bookingId : 'ABS-REQUEST';

  const handlePhoneCall = () => {
    analytics.phoneClick('success_screen');
  };

  const handleInstagramClick = () => {
    analytics.instagramClick('success_screen');
  };

  return (
    <motion.div 
      className="booking-success-wrapper" 
      role="status" 
      aria-live="polite"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Brand-Accurate Icon Badge: Ink Navy with Brass Accent (Zero Green) */}
      <div className="success-icon-badge-navy" aria-hidden="true">
        <Check size={28} className="success-brass-icon" strokeWidth={2.5} />
      </div>

      <span className="success-eyebrow">REQUEST TRANSMITTED</span>
      <h3 className="success-heading">Booking Request Received</h3>

      <p className="success-copy">
        Thanks, <strong>{formData.name}</strong>. We've received your appointment request. Our dispatch will review technician availability and contact you at <strong>{formData.phone}</strong> to confirm scheduling.
      </p>

      {/* Booking Summary Box */}
      <div className="success-receipt-card">
        <div className="receipt-header">
          <span className="receipt-tag">Booking Reference</span>
          <span className="receipt-id font-mono">{bookingId}</span>
        </div>

        <div className="receipt-grid">
          <div className="receipt-item">
            <span className="receipt-label">Service Package:</span>
            <span className="receipt-val">{pkg ? pkg.customerFacingName : formData.packageId}</span>
          </div>

          <div className="receipt-item">
            <span className="receipt-label">Vehicle Category:</span>
            <span className="receipt-val">{vehicleCategory ? vehicleCategory.label : formData.vehicleType}</span>
          </div>

          <div className="receipt-item">
            <span className="receipt-label">Preferred Date:</span>
            <span className="receipt-val">{formData.preferredDate}</span>
          </div>

          <div className="receipt-item">
            <span className="receipt-label">Arrival Window:</span>
            <span className="receipt-val">{formData.preferredTime}</span>
          </div>

          <div className="receipt-item">
            <span className="receipt-label">Service Location:</span>
            <span className="receipt-val">{formData.serviceAddress}</span>
          </div>

          <div className="receipt-item">
            <span className="receipt-label">Total Quoted:</span>
            <span className="receipt-val font-bold text-navy">${totalPrice} CAD (No tax)</span>
          </div>
        </div>
      </div>

      <div className="success-notice-strip">
        <Info size={16} aria-hidden="true" />
        <span>
          Note: This submission is an appointment request. Availability is confirmed when our dispatch contacts you.
        </span>
      </div>

      {/* Immediate Follow-Up Contact Actions */}
      <div className="success-actions-group">
        <a
          href={BUSINESS_CONFIG.contact.phoneTel}
          className="btn btn-secondary success-btn"
          onClick={handlePhoneCall}
        >
          <Phone size={15} aria-hidden="true" />
          <span>Call Absolute</span>
        </a>

        <a
          href={BUSINESS_CONFIG.contact.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline success-btn"
          onClick={handleInstagramClick}
        >
          <InstagramIcon size={15} />
          <span>Message on Instagram</span>
        </a>

        <button
          type="button"
          className="btn btn-primary success-btn"
          onClick={onReset}
        >
          <span>Back to Home</span>
        </button>
      </div>
    </motion.div>
  );
};
