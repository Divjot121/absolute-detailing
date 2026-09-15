import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { BookingSection } from './components/booking/BookingSection';
import { HowItWorks } from './components/HowItWorks';
import { WhyAbsolute } from './components/WhyAbsolute';
import { ServiceArea } from './components/ServiceArea';
import { TintingSection } from './components/TintingSection';
import { ContactCTA } from './components/ContactCTA';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { analytics } from './lib/analytics';
import './styles/main.css';

export function App() {
  const [vehicleType, setVehicleType] = useState('sedan');
  const [selectedPackageId, setSelectedPackageId] = useState('interior_gold');
  const [bookingTrigger, setBookingTrigger] = useState(0);

  useEffect(() => {
    // Fire page_view on load
    analytics.pageView();
  }, []);

  const scrollToBooking = (pkgId = null) => {
    if (pkgId) {
      setSelectedPackageId(pkgId);
    }
    setBookingTrigger(prev => prev + 1);
    const bookingSection = document.getElementById('booking-section');
    if (bookingSection) {
      const headerOffset = 76;
      const elementPosition = bookingSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="app-layout">
      {/* Accessible Skip Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Sticky Header */}
      <Header onBookClick={() => scrollToBooking()} />

      <main id="main-content">
        {/* Hero Section */}
        <Hero onBookClick={() => scrollToBooking()} />

        {/* Services & Pricing Section */}
        <Services
          vehicleType={vehicleType}
          setVehicleType={setVehicleType}
          selectedPackageId={selectedPackageId}
          onSelectPackageAndProceed={(pkgId) => scrollToBooking(pkgId)}
        />

        {/* Main Interactive Booking Engine (5-Step Progressive Flow) */}
        <BookingSection
          initialVehicleType={vehicleType}
          initialPackageId={selectedPackageId}
          bookingStepTrigger={bookingTrigger}
        />

        {/* 3-Step How It Works */}
        <HowItWorks onBookClick={() => scrollToBooking()} />

        {/* Why Absolute Factual Trust Points */}
        <WhyAbsolute />

        {/* Geographic Coverage & Neighborhood Proof */}
        <ServiceArea />

        {/* Window Tinting Consultation Info */}
        <TintingSection />

        {/* Final Conversion Action */}
        <ContactCTA onBookClick={() => scrollToBooking()} />
      </main>

      {/* Restrained Brand Footer */}
      <Footer onBookClick={() => scrollToBooking()} />

      {/* Persistent Mobile Sticky Conversion Bar */}
      <MobileBottomBar onBookClick={() => scrollToBooking()} />
    </div>
  );
}

export default App;
