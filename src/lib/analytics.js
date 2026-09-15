/**
 * Absolute Detailing — Conversion Analytics Bus
 * 
 * Lightweight event tracking utility targeting conversion funnel checkpoints.
 * Dispatches custom window events, logs to console in development,
 * and passes events to any configured window.dataLayer (e.g. Google Analytics / Meta Pixel).
 */

export const trackEvent = (eventName, payload = {}) => {
  const timestamp = new Date().toISOString();
  const eventData = {
    event: eventName,
    ...payload,
    timestamp,
    url: window.location.href,
  };

  // 1. Console visibility in dev
  if (import.meta.env.DEV) {
    console.groupCollapsed(`[Analytics Event] ${eventName}`);
    console.table(eventData);
    console.groupEnd();
  }

  // 2. Dispatch custom DOM event for decoupled integrations
  try {
    const customEvent = new CustomEvent('absolute_analytics', {
      detail: eventData
    });
    window.dispatchEvent(customEvent);
  } catch (e) {
    // Non-critical fallback
  }

  // 3. Forward to GTM / Meta Pixel dataLayer if present
  if (window.dataLayer && Array.isArray(window.dataLayer)) {
    window.dataLayer.push(eventData);
  }
};

// Convenience helpers
export const analytics = {
  pageView: () => trackEvent('page_view'),
  heroCtaClick: (ctaType) => trackEvent('hero_cta_click', { cta_type: ctaType }),
  packageView: (packageId, vehicleType) => trackEvent('package_view', { package_id: packageId, vehicle_type: vehicleType }),
  packageSelect: (packageId, vehicleType, price) => trackEvent('package_select', { package_id: packageId, vehicle_type: vehicleType, price }),
  bookingStart: (initialStep = '01_vehicle') => trackEvent('booking_start', { step: initialStep }),
  bookingStepComplete: (stepNumber, stepName, stepData = {}) => trackEvent('booking_step_complete', { step_number: stepNumber, step_name: stepName, ...stepData }),
  bookingSubmit: (bookingSummary) => trackEvent('booking_submit', bookingSummary),
  bookingSuccess: (bookingId, packageId, vehicleType, totalPrice) => trackEvent('booking_success', { booking_id: bookingId, package_id: packageId, vehicle_type: vehicleType, total_price: totalPrice }),
  phoneClick: (location = 'header') => trackEvent('phone_click', { click_location: location }),
  instagramClick: (location = 'header') => trackEvent('instagram_click', { click_location: location }),
};
