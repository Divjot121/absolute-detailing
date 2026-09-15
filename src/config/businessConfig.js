/**
 * Absolute Car Wash & Detailing — Central Business Configuration
 * 
 * Single source of truth for:
 * - Brand identity and contact channels
 * - Service areas across GTA
 * - Vehicle categories
 * - Package pricing & inclusions
 * - Add-on definitions
 * - Operational notices
 */

export const BUSINESS_CONFIG = {
  name: 'Absolute Car Wash & Detailing',
  shortName: 'Absolute',
  legalName: 'Absolute Car Wash & Detailing',
  tagline: 'A Cleaner Car. Without Leaving Home.',
  subheadline: 'Professional mobile car washing and detailing across Brampton, Mississauga, Etobicoke, Milton, Bolton, Vaughan and Georgetown.',
  trustMicrocopy: 'Mobile service • Professional detailing • No tax',
  
  contact: {
    phone: '+1 437-988-5025',
    phoneDisplay: '+1 437-988-5025',
    phoneTel: 'tel:+14379885025',
    instagramHandle: '@absolutcardetailngs',
    instagramUrl: 'https://www.instagram.com/absolutcardetailngs/',
    operatingHours: 'Monday – Sunday: 8:00 AM – 7:00 PM',
  },

  serviceArea: {
    heading: 'Mobile detailing across the GTA',
    summary: 'We come directly to your driveway, home, or workplace in any of our GTA service zones.',
    locations: [
      'Brampton',
      'Mississauga',
      'Etobicoke',
      'Milton',
      'Bolton',
      'Vaughan',
      'Georgetown'
    ],
  },

  pricingNotice: 'All prices in CAD. No tax — the price quoted is the price you pay.',

  operationalRequirements: {
    title: 'On-Site Requirements',
    notice: 'We bring the full setup to you. We need access to a power outlet, water tap and enough space to work around the vehicle. If either power or water isn\'t available, let us know when booking.'
  },

  vehicleCategories: [
    {
      id: 'sedan',
      label: 'Sedan / Hatchback',
      includes: 'Sedans, hatchbacks, coupes',
      examples: 'e.g. Honda Civic, Toyota Corolla, BMW 3 Series, Tesla Model 3',
    },
    {
      id: 'suv',
      label: 'SUV / Van / Mini Truck',
      includes: 'SUVs, vans, minivans, mini trucks, pickups',
      examples: 'e.g. Toyota RAV4, Honda CR-V, Ford F-150, Dodge Grand Caravan',
    }
  ],

  /**
   * Packages
   * Note on mappings:
   * Underlying business documents establish Interior Silver ($80/$100), Interior Gold ($100/$120),
   * Full Detail Silver ($110/$130), Full Detail Gold ($130/$150).
   * Customer-facing names requested:
   * 1. Interior Gold (Mapped to Interior Gold - Confirmed)
   * 2. Interior (Mapped to Interior Silver - Confirmed)
   * 3. Titanium Full Gold (Mapped to Full Detail Gold - Configurable mapping)
   * 4. Full Titanium (Mapped to Full Detail Silver - Configurable mapping)
   */
  packages: [
    {
      id: 'interior_gold',
      customerFacingName: 'Interior Gold',
      underlyingService: 'Interior — Gold',
      isPopular: true,
      badge: 'MOST POPULAR',
      tierLabel: 'Deep Restoration',
      duration: 'approx. 2 hours 30 mins',
      shortDescription: 'Deep steam shampoo, leather treatment, and comprehensive crevice restoration for a new car feel.',
      pricing: {
        sedan: 100,
        suv: 120
      },
      inclusions: [
        'Thorough vacuuming of carpets, seating, and trunk',
        '1-stage deep steam shampoo for carpets, seats & floor mats',
        'Leather seat treatment, conditioning & UV protection',
        'Removal of winter road salt crust and stubborn soil stains',
        'Precision detailing of all crevices, air vents, buttons & cup holders',
        'Streak-free crystal cleaning of interior windows, mirrors & screens'
      ],
      perfectFor: 'New car feel · Seasonal detail · First professional detail',
      category: 'interior',
      confirmedStatus: 'confirmed'
    },
    {
      id: 'interior',
      customerFacingName: 'Interior',
      underlyingService: 'Interior — Silver',
      isPopular: false,
      badge: null,
      tierLabel: 'Regular Upkeep',
      duration: 'approx. 1 hour',
      shortDescription: 'Essential interior cleaning when the outside is fine and the cabin needs a fast, professional refresh.',
      pricing: {
        sedan: 80,
        suv: 100
      },
      inclusions: [
        'Vacuum complete interior seating, mats and floorboards',
        'Wipe down and disinfect all interior surfaces & center console',
        'Streak-free cleaning of all interior windows & mirrors',
        'Clean sensitive infotainment touchscreen displays carefully'
      ],
      perfectFor: 'Light clean · Routine monthly maintenance',
      category: 'interior',
      confirmedStatus: 'confirmed'
    },
    {
      id: 'titanium_full_gold',
      customerFacingName: 'Titanium Full Gold',
      underlyingService: 'Full Detail — Gold',
      isPopular: true,
      badge: 'MOST POPULAR',
      tierLabel: 'Complete In & Out',
      duration: 'approx. 2 hours 30 mins',
      shortDescription: 'Our signature complete detail combining high-gloss exterior wax with a deep interior steam restoration.',
      pricing: {
        sedan: 130,
        suv: 150
      },
      inclusions: [
        'Gentle hand wash & hand dry with plush microfiber towels',
        'Thorough wheel, rim & tire degrease + protective tire shine',
        'Apply high-gloss protective spray wax to all painted surfaces',
        '1-stage deep steam shampoo for interior carpets, seats & mats',
        'Leather seat conditioning & complete crevice steam sanitization',
        'Remove stubborn road salt stains, soil stains & door jamb grime'
      ],
      perfectFor: 'Complete vehicle reset · Seasonal transition · Selling your vehicle',
      category: 'full',
      confirmedStatus: 'configurable_mapping'
    },
    {
      id: 'full_titanium',
      customerFacingName: 'Full Titanium',
      underlyingService: 'Full Detail — Silver',
      isPopular: false,
      badge: null,
      tierLabel: 'Essential Full Detail',
      duration: 'approx. 1 hour 20 mins',
      shortDescription: 'Full exterior wash, microfiber hand dry, tire shine, and a complete essential interior vacuum & wipe-down.',
      pricing: {
        sedan: 110,
        suv: 130
      },
      inclusions: [
        'Complete exterior hand wash and scratch-free microfiber hand dry',
        'Clean wheels and tires + apply deep black tire shine',
        'Clean all exterior door jambs and windows',
        'Vacuum interior seating, carpets, and trunk area',
        'Wipe down all interior surfaces, console, and dash',
        'Clean interior screens and mirrors carefully'
      ],
      perfectFor: 'Routine full-vehicle upkeep · Regular maintenance wash & detail',
      category: 'full',
      confirmedStatus: 'configurable_mapping'
    }
  ],

  addons: {
    petHair: {
      id: 'pet_hair',
      name: 'Pet hair removal',
      price: 35,
      label: 'Add pet hair removal (+$35)',
      description: 'Per vehicle flat rate. Special rubberized agitation tools and high-suction extraction for pet hair embedded in carpets and seats. Applicable on any vehicle size.',
    }
  },

  tinting: {
    title: 'Window Tinting',
    subtitle: 'High-performance heat and UV rejection film. Inquire directly for window coverage and mobile scheduling options.',
    notice: 'Pricing based on client verbal schedule. Coverage options, shade darkness (VLT), and mobile dust-controlled setup requirements are confirmed during appointment consultation.',
    options: [
      {
        id: 'ceramic',
        name: 'Ceramic Tint',
        pricing: { sedan: 99, suv: 110 },
        features: [
          'Blocks up to 99% of harmful UV rays',
          'Significant infrared heat rejection for cooler cabin',
          'Non-metallic: zero interference with GPS, cellular, or radio',
          'Reduces bright sun and headlight glare',
          'Resistant to bubbling and purple fading'
        ]
      },
      {
        id: 'nano_ceramic',
        name: 'Nano Ceramic Tint',
        pricing: { sedan: 150, suv: 179 },
        badge: 'PREMIUM FILM',
        features: [
          'Densely packed nano-ceramic particles for highest heat rejection',
          'Noticeably cooler cabin in peak summer heat',
          'Sharpest optical clarity with minimal night haze',
          'Maximum UV protection for interior upholstery',
          'Longest-lasting color stability and heat performance'
        ]
      }
    ]
  },

  whyAbsolute: [
    {
      title: 'Mobile Convenience',
      description: 'Professional detailing delivered right to your home driveway or workplace. No dropping off or waiting in shop lobbies.'
    },
    {
      title: 'Straightforward Pricing',
      description: 'The quoted price is exactly what you pay. All prices are in CAD with no tax added at checkout.'
    },
    {
      title: 'Professional Detailing',
      description: 'Careful hand-washing, microfiber drying, deep steam extraction, and leather conditioning for real everyday vehicles.'
    },
    {
      title: 'Local Service',
      description: 'Proudly serving Brampton, Mississauga, Etobicoke, Milton, Bolton, Vaughan, and Georgetown.'
    }
  ],

  howItWorks: [
    {
      step: '01',
      title: 'Choose Your Detail',
      description: 'Select the interior or full detail package that matches your vehicle category and condition.'
    },
    {
      step: '02',
      title: 'Request Your Appointment',
      description: 'Tell us your vehicle details, service address, and preferred date and time in under 60 seconds.'
    },
    {
      step: '03',
      title: 'We Come To You',
      description: 'Our mobile detailing setup arrives at your location with all equipment to restore your vehicle.'
    }
  ]
};
