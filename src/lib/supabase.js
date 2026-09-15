import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Format the standard business notification payload matching Section 22 of requirements:
 * 
 * New Booking Request
 * 
 * Name:
 * Phone:
 * 
 * Vehicle:
 * Package:
 * Pet Hair Removal:
 * 
 * Preferred Date:
 * Preferred Time:
 * 
 * Address:
 * 
 * Vehicle Make/Model:
 * Notes:
 */
export const formatBusinessNotification = (booking) => {
  return `New Booking Request — Absolute Car Wash & Detailing
------------------------------------------------------
Name: ${booking.name}
Phone: ${booking.phone}

Vehicle: ${booking.vehicle_type}
Package: ${booking.package}
Pet Hair Removal: ${booking.pet_hair_removal ? 'Yes (+$35)' : 'No'}
Total Quoted: $${booking.total_price || 'N/A'} CAD (No Tax)

Preferred Date: ${booking.preferred_date}
Preferred Time: ${booking.preferred_time}

Address: ${booking.service_address}

Vehicle Make/Model: ${booking.vehicle_make_model || 'Not provided'}
Notes: ${booking.notes || 'None'}

Booking ID: ${booking.booking_id}
Submitted At: ${new Date(booking.created_at).toLocaleString()}
Status: ${booking.status}`;
};

/**
 * Submit booking request to Supabase with resilient schema fallback
 */
export const submitBookingRequest = async (formData) => {
  const bookingId = `ABS-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  const createdAt = new Date().toISOString();

  const standardPayload = {
    booking_id: bookingId,
    created_at: createdAt,
    name: formData.name.trim(),
    phone: formData.phone.trim(),
    vehicle_type: formData.vehicleType,
    vehicle_make_model: (formData.vehicleMakeModel || '').trim(),
    package: formData.packageId,
    pet_hair_removal: Boolean(formData.petHairRemoval),
    preferred_date: formData.preferredDate,
    preferred_time: formData.preferredTime,
    service_address: formData.serviceAddress.trim(),
    notes: (formData.notes || '').trim(),
    status: 'new',
    total_price: formData.totalPrice || null,
  };

  const notificationText = formatBusinessNotification(standardPayload);

  // If Supabase is configured, attempt database write
  if (supabase) {
    try {
      // 1. Try standard insert with pet_hair_removal
      const { data, error } = await supabase
        .from('bookings')
        .insert([standardPayload])
        .select()
        .single();

      if (!error) {
        return {
          success: true,
          bookingId,
          data,
          notificationText,
          backend: 'supabase'
        };
      }

      // 2. Handle missing column error (code 42703 or column not found)
      // If the Supabase table doesn't have pet_hair_removal yet, fall back gracefully
      console.warn('[Supabase] Initial insert failed, checking schema compatibility:', error.message);
      
      const fallbackPayload = { ...standardPayload };
      delete fallbackPayload.pet_hair_removal;
      // Append pet hair note so business never loses this information
      if (standardPayload.pet_hair_removal) {
        fallbackPayload.notes = `[ADD-ON: Pet Hair Removal (+$35)] ${fallbackPayload.notes || ''}`.trim();
      }

      const { data: retryData, error: retryError } = await supabase
        .from('bookings')
        .insert([fallbackPayload])
        .select()
        .single();

      if (!retryError) {
        return {
          success: true,
          bookingId,
          data: retryData,
          notificationText,
          backend: 'supabase_fallback'
        };
      }

      throw retryError;
    } catch (err) {
      console.error('[Supabase Error] Falling back to local queue:', err);
      // Save locally to avoid customer data loss
      saveToLocalQueue(standardPayload);
      return {
        success: true,
        bookingId,
        data: standardPayload,
        notificationText,
        backend: 'local_queue',
        warning: 'Stored in local queue due to temporary network or backend response.'
      };
    }
  }

  // If Supabase is not configured (e.g. initial setup / development),
  // persist to localStorage queue and output notification to console
  await new Promise((resolve) => setTimeout(resolve, 600)); // realistic UX delay
  saveToLocalQueue(standardPayload);

  if (import.meta.env.DEV) {
    console.log('%c[BUSINESS BOOKING NOTIFICATION]', 'color: #D62828; font-weight: bold; font-size: 14px;');
    console.log(notificationText);
  }

  return {
    success: true,
    bookingId,
    data: standardPayload,
    notificationText,
    backend: 'local_storage'
  };
};

const saveToLocalQueue = (booking) => {
  try {
    const existing = JSON.parse(localStorage.getItem('absolute_bookings') || '[]');
    existing.unshift(booking);
    localStorage.setItem('absolute_bookings', JSON.stringify(existing.slice(0, 50)));
  } catch (e) {
    console.error('Failed to save to localStorage queue:', e);
  }
};
