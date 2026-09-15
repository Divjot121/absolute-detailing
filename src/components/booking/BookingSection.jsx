import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BUSINESS_CONFIG } from '../../config/businessConfig';
import { BookingProgress } from './BookingProgress';
import { VehicleStep } from './VehicleStep';
import { PackageStep } from './PackageStep';
import { DetailsStep } from './DetailsStep';
import { ScheduleStep } from './ScheduleStep';
import { ReviewStep } from './ReviewStep';
import { BookingSuccess } from './BookingSuccess';
import { submitBookingRequest } from '../../lib/supabase';
import { analytics } from '../../lib/analytics';
import './Booking.css';

// Directional Motion Variants (Subtle, ~220ms, respects reduced motion)
const stepMotionVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 16 : -16,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.24,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: (direction) => ({
    x: direction > 0 ? -16 : 16,
    opacity: 0,
    transition: {
      duration: 0.18,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

export const BookingSection = ({
  initialVehicleType = 'sedan',
  initialPackageId = 'interior_gold',
  bookingStepTrigger
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [highestStepReached, setHighestStepReached] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [bookingResult, setBookingResult] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    vehicleType: initialVehicleType,
    vehicleMakeModel: '',
    packageId: initialPackageId,
    petHairRemoval: false,
    name: '',
    phone: '',
    serviceAddress: '',
    preferredDate: '',
    preferredTime: '',
    notes: '',
  });

  // Sync external package/vehicle selection if changed from services cards
  useEffect(() => {
    if (initialVehicleType) {
      setFormData(prev => ({ ...prev, vehicleType: initialVehicleType }));
    }
  }, [initialVehicleType]);

  useEffect(() => {
    if (initialPackageId) {
      setFormData(prev => ({ ...prev, packageId: initialPackageId }));
    }
  }, [initialPackageId]);

  // If user clicked a package card or book CTA from hero, scroll to booking section
  useEffect(() => {
    if (bookingStepTrigger) {
      const section = document.getElementById('booking-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [bookingStepTrigger]);

  // Validation Errors state
  const [errors, setErrors] = useState({});

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const selectedPackage = BUSINESS_CONFIG.packages.find(p => p.id === formData.packageId) || BUSINESS_CONFIG.packages[0];
  const selectedVehicleCategory = BUSINESS_CONFIG.vehicleCategories.find(c => c.id === formData.vehicleType) || BUSINESS_CONFIG.vehicleCategories[0];

  // Calculate Total Price
  const basePrice = selectedPackage ? (selectedPackage.pricing[formData.vehicleType] || selectedPackage.pricing.sedan) : 0;
  const petHairPrice = formData.petHairRemoval ? BUSINESS_CONFIG.addons.petHair.price : 0;
  const totalPrice = basePrice + petHairPrice;

  const goToStep = (step) => {
    setDirection(step > currentStep ? 1 : -1);
    setCurrentStep(step);
    if (step > highestStepReached) {
      setHighestStepReached(step);
    }
    const formTop = document.getElementById('booking-card-top');
    if (formTop) {
      formTop.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // Step 1 -> 2
  const handleNextStep1 = () => {
    analytics.bookingStepComplete(1, 'vehicle', { vehicle_type: formData.vehicleType });
    goToStep(2);
  };

  // Step 2 -> 3
  const handleNextStep2 = () => {
    if (!formData.packageId) {
      setErrors(prev => ({ ...prev, packageId: 'Please select a detailing package to continue.' }));
      return;
    }
    setErrors(prev => {
      const next = { ...prev };
      delete next.packageId;
      return next;
    });
    analytics.bookingStepComplete(2, 'package', { package_id: formData.packageId, pet_hair: formData.petHairRemoval });
    goToStep(3);
  };

  // Step 3 -> 4
  const handleNextStep3 = () => {
    const newErrors = {};
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name (minimum 2 characters).';
    }

    const digits = (formData.phone || '').replace(/\D/g, '');
    const cleanDigits = digits.startsWith('1') ? digits.substring(1) : digits;
    if (!formData.phone || cleanDigits.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit North American phone number.';
    }

    if (!formData.serviceAddress || formData.serviceAddress.trim().length < 5) {
      newErrors.serviceAddress = 'Please provide your full service address (street and city).';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    analytics.bookingStepComplete(3, 'details', { name: formData.name, city: formData.serviceAddress });
    goToStep(4);
  };

  // Step 4 -> 5
  const handleNextStep4 = () => {
    const newErrors = {};
    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select your preferred service date.';
    }
    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Please select a preferred arrival window.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    analytics.bookingStepComplete(4, 'schedule', { date: formData.preferredDate, time: formData.preferredTime });
    goToStep(5);
  };

  // Final Submission
  const handleSubmitBooking = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    analytics.bookingSubmit({
      vehicle_type: formData.vehicleType,
      package_id: formData.packageId,
      pet_hair: formData.petHairRemoval,
      total_price: totalPrice
    });

    try {
      const result = await submitBookingRequest({
        ...formData,
        totalPrice
      });

      if (result.success) {
        setBookingResult(result);
        analytics.bookingSuccess(result.bookingId, formData.packageId, formData.vehicleType, totalPrice);
        setDirection(1);
        setCurrentStep(6); // Success state
      } else {
        throw new Error(result.error || 'Unable to submit booking request. Please try again or call us directly.');
      }
    } catch (err) {
      console.error('Booking submission error:', err);
      setSubmitError(err.message || 'An unexpected issue occurred. Please check your connection or call +1 437-988-5025.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setBookingResult(null);
    setDirection(-1);
    setCurrentStep(1);
    setHighestStepReached(1);
    setFormData({
      vehicleType: 'sedan',
      vehicleMakeModel: '',
      packageId: 'interior_gold',
      petHairRemoval: false,
      name: '',
      phone: '',
      serviceAddress: '',
      preferredDate: '',
      preferredTime: '',
      notes: '',
    });
  };

  return (
    <section id="booking-section" className="section booking-section" aria-labelledby="booking-heading">
      <div className="container">
        <div id="booking-card-top" className="section-header text-center">
          <span className="section-eyebrow">DIRECT ONLINE BOOKING</span>
          <h2 id="booking-heading" className="section-title">Book Your Detail</h2>
          <p className="section-subtitle">
            Request an appointment in 60 seconds. We come directly to your driveway across the GTA.
          </p>
        </div>

        <div className="booking-card-container">
          {/* Progress Tracker (Steps 1 to 5) */}
          {currentStep <= 5 && (
            <BookingProgress
              currentStep={currentStep}
              highestStepReached={highestStepReached}
              onStepClick={goToStep}
            />
          )}

          {/* Directional Step Transitions via AnimatePresence */}
          <div className="booking-card-inner">
            <AnimatePresence mode="wait" custom={direction}>
              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  custom={direction}
                  variants={stepMotionVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <VehicleStep
                    vehicleType={formData.vehicleType}
                    setVehicleType={(val) => handleFieldChange('vehicleType', val)}
                    vehicleMakeModel={formData.vehicleMakeModel}
                    setVehicleMakeModel={(val) => handleFieldChange('vehicleMakeModel', val)}
                    onNext={handleNextStep1}
                  />
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  custom={direction}
                  variants={stepMotionVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <PackageStep
                    vehicleType={formData.vehicleType}
                    selectedPackageId={formData.packageId}
                    setSelectedPackageId={(val) => handleFieldChange('packageId', val)}
                    petHairRemoval={formData.petHairRemoval}
                    setPetHairRemoval={(val) => handleFieldChange('petHairRemoval', val)}
                    onNext={handleNextStep2}
                    onPrev={() => goToStep(1)}
                    error={errors.packageId}
                  />
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step-3"
                  custom={direction}
                  variants={stepMotionVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <DetailsStep
                    formData={formData}
                    errors={errors}
                    onChangeField={handleFieldChange}
                    onNext={handleNextStep3}
                    onPrev={() => goToStep(2)}
                  />
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step-4"
                  custom={direction}
                  variants={stepMotionVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <ScheduleStep
                    formData={formData}
                    errors={errors}
                    onChangeField={handleFieldChange}
                    onNext={handleNextStep4}
                    onPrev={() => goToStep(3)}
                  />
                </motion.div>
              )}

              {currentStep === 5 && (
                <motion.div
                  key="step-5"
                  custom={direction}
                  variants={stepMotionVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <ReviewStep
                    formData={formData}
                    pkg={selectedPackage}
                    vehicleCategory={selectedVehicleCategory}
                    totalPrice={totalPrice}
                    isSubmitting={isSubmitting}
                    onSubmit={handleSubmitBooking}
                    onPrev={() => goToStep(4)}
                    onEditStep={(stepNum) => goToStep(stepNum)}
                    submitError={submitError}
                  />
                </motion.div>
              )}

              {currentStep === 6 && (
                <motion.div
                  key="step-6"
                  custom={direction}
                  variants={stepMotionVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <BookingSuccess
                    bookingResult={bookingResult}
                    formData={formData}
                    pkg={selectedPackage}
                    vehicleCategory={selectedVehicleCategory}
                    totalPrice={totalPrice}
                    onReset={handleReset}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
};
