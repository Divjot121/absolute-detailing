# Absolute Car Washing --- Landing Page Requirements

## 1. Project Overview

Build a high-converting, premium-but-accessible landing page for
**Absolute Car Wash & Detailing**.

The primary goal is to turn visitors into **confirmed booking
enquiries** through a simple, trustworthy booking form.

The business operates as a mobile detailing service and serves
**Brampton, Mississauga, Etobicoke, Milton, Bolton, Vaughan and
Georgetown**. The business phone number is **+1 437-988-5025** and
prices are in CAD with no tax added to the quoted price.

Source business information: the supplied Absolute service/pricing
document.

------------------------------------------------------------------------

## 2. Primary Conversion Goal

### Primary CTA

**Book Your Detail**

The CTA should open/scroll directly to the booking form.

### Secondary CTA

**Call +1 437-988-5025**

### Conversion principle

The page should make it possible for a visitor to:

1.  Understand what Absolute offers.
2.  See the available packages.
3.  Choose their vehicle type.
4.  Select a package.
5.  Enter their contact details.
6.  Submit a booking request.
7.  Receive a clear success confirmation.

The booking experience should require as little friction as possible.

------------------------------------------------------------------------

# 3. Brand & Visual Direction

Use the supplied Absolute Car Wash & Detailing design system as the
visual source of truth.

### Brand personality

-   Clean
-   Traditional corporate
-   Trust-first
-   Premium without looking luxurious or flashy
-   Professional
-   Automotive
-   Straightforward
-   Conversion-focused

The design system explicitly defines the direction as **"clean
traditional corporate, trust-first"** with the goal of directing
attention toward the CTA.

### Colours

Use only the established brand palette:

  Token        Hex         Usage
  ------------ ----------- -------------------------------
  Ink Navy     `#10263F`   Header, headlines, navigation
  Steel Grey   `#64707A`   Supporting text, dividers
  Brass        `#B08D3E`   Thin accent lines and badges
  Signal Red   `#D62828`   Primary CTAs only
  Off-White    `#F6F5F1`   Main page background
  Charcoal     `#1C1F22`   Body text

These values are locked in by the supplied design system.

### Typography

-   **Headings:** Domine, 600/700
-   **Body/UI:** Public Sans, 400/500/600/700

The design system specifies Domine for headlines and Public Sans for
readable supporting/UI copy.

### CTA rule

Signal Red must be reserved for the primary action. Do not use red as
decorative colour, headline colour, or general page accents.

------------------------------------------------------------------------

# 4. Page Structure

## Section 1 --- Sticky Header

### Desktop

Left: - Absolute logo / wordmark

Center/right: - Services - Packages - How It Works - Contact

Right: - **Book Your Detail** red CTA

### Mobile

-   Compact Absolute wordmark
-   Menu button
-   Persistent bottom conversion bar:
    -   **Book**
    -   **Call**

The supplied design system recommends keeping the header CTA visible
while scrolling and maintaining thumb-accessible contact actions on
mobile.

------------------------------------------------------------------------

# 5. Hero Section

## Objective

Immediately communicate:

**Professional car detailing, brought to you.**

### Suggested headline

> **A Cleaner Car. Without Leaving Home.**

### Supporting copy

> Professional mobile car washing and detailing across Brampton,
> Mississauga, Etobicoke, Milton, Bolton, Vaughan and Georgetown.

The supplied service document confirms the mobile-service proposition
and service area.

### Hero visual

Use a **realistic, high-quality photo of an actual detailed vehicle**.

Avoid: - Generic stock photography - Artificial-looking AI car imagery -
Overly dramatic supercars - Excessive visual effects

The design system specifically calls for real car/job photography as
visual proof of the detailing service.

### Hero CTAs

Primary: **Book Your Detail**

Secondary: **Call +1 437-988-5025**

### Trust microcopy

> Mobile service • Professional detailing • No tax

------------------------------------------------------------------------

# 6. Packages Section

## Heading

**Choose Your Detail**

Create four visually consistent package cards.

The customer-facing package names must be:

1.  **Interior Gold**
2.  **Interior**
3.  **Titanium Full Gold**
4.  **Full Titanium**

> Important: The exact mapping of these customer-facing names to the
> supplied Absolute Silver/Gold service definitions should be confirmed
> before publishing. Do not invent package inclusions or pricing where
> the supplied source does not explicitly establish the new names.

The supplied source currently documents: - Interior Silver - Interior
Gold - Full Detail Silver - Full Detail Gold

with separate Sedan/Hatchback and SUV/Van/Mini Truck pricing.

## Package card requirements

Each card should contain:

-   Package name
-   Short one-line description
-   Starting price or price by vehicle category
-   Approximate duration, if confirmed
-   4--6 key inclusions
-   "Choose This Package" CTA

### Recommended hierarchy

-   Highlight the best-selling / recommended package.
-   Use a small **MOST POPULAR** brass badge.
-   Keep the package cards clean rather than overloaded with text.

------------------------------------------------------------------------

# 7. Vehicle Type Selector

The booking flow must distinguish between the two vehicle categories
documented by the business:

### Option 1

**Sedan / Hatchback**

Includes: - Sedans - Hatchbacks - Coupes

### Option 2

**SUV / Van / Mini Truck**

Includes: - SUVs - Vans - Minivans - Mini trucks - Pickups

These are the supplied vehicle categories.

### UX

Use large selectable cards/radio controls rather than a tiny dropdown.

When the user changes vehicle type, the displayed package price should
update dynamically if pricing is configured.

------------------------------------------------------------------------

# 8. Booking Form

## Heading

**Book Your Detail**

### Form fields

#### Required

1.  **Full Name**
    -   Text input
    -   Placeholder: `Your name`
2.  **Phone Number**
    -   Tel input
    -   Placeholder: `+1 (___) ___-____`
3.  **Vehicle Type**
    -   Required selection:
        -   Sedan / Hatchback
        -   SUV / Van / Mini Truck
4.  **Package**
    -   Required selection:
        -   Interior Gold
        -   Interior
        -   Titanium Full Gold
        -   Full Titanium
5.  **Preferred Date**
    -   Date picker
6.  **Preferred Time**
    -   Time selection
7.  **Service Address**
    -   Address input

### Optional

8.  **Vehicle Make & Model**
    -   Example: `2022 Honda Civic`
9.  **Additional Notes**
    -   Example: `Heavy pet hair / stains / child-seat area`
10. **Pet Hair Removal**

-   Checkbox:
    -   `Add pet hair removal (+$35)`

The supplied pricing document confirms pet hair removal at **+\$35 per
vehicle**, regardless of package or vehicle size.

### Service requirements acknowledgement

Display a small notice below the address field:

> We bring the full setup to you. We need access to a power outlet,
> water tap and enough space to work around the vehicle. If either power
> or water isn't available, let us know when booking.

These on-site requirements are explicitly documented by the business.

### Submit button

**Request My Booking**

Button must be Signal Red.

------------------------------------------------------------------------

# 9. Booking Form UX

The form should feel like a booking flow, not a long contact form.

### Recommended interaction

Use a progressive multi-step form:

**Step 1 --- Your Vehicle** - Vehicle type - Vehicle make/model

**Step 2 --- Your Package** - Package selection - Optional pet hair
removal

**Step 3 --- Your Details** - Name - Phone - Address

**Step 4 --- Schedule** - Preferred date - Preferred time - Notes

**Step 5 --- Review** - Vehicle - Package - Add-ons - Contact
information - Preferred appointment

Then:

**Request My Booking**

### UX requirements

-   Show progress indicator.
-   Preserve entered data between steps.
-   Allow going back without losing information.
-   Validate fields inline.
-   Clearly mark required fields.
-   Do not make users re-enter information.
-   Make the entire form fully usable on mobile.

------------------------------------------------------------------------

# 10. Booking Confirmation

After successful submission, show a dedicated success state.

### Heading

**Booking Request Received**

### Copy

> Thanks, [Name](#name). We've received your booking request. We'll
> contact you to confirm availability, pricing and your preferred
> appointment time.

The supplied booking process states that the business confirms the price
and checks availability after receiving the vehicle/service details.

### Actions

-   **Call Absolute**
-   **Message on Instagram**
-   **Back to Home**

Do not falsely state that an appointment is confirmed unless the backend
actually confirms availability.

------------------------------------------------------------------------

# 11. How It Works

Keep this section extremely simple.

### 01 --- Choose Your Detail

Select the package that fits your vehicle.

### 02 --- Request Your Appointment

Tell us your vehicle, location and preferred time.

### 03 --- We Come To You

Our mobile detailing setup comes to your vehicle.

The supplied booking flow follows the same basic sequence: contact the
business, provide vehicle/service details, confirm price and
availability, then service is performed at the customer's location.

------------------------------------------------------------------------

# 12. Why Absolute

Create a compact trust section around factual benefits only.

Suggested points:

### Mobile Convenience

Professional detailing without taking your car to a shop.

### Straightforward Pricing

The quoted price is the price you pay --- no tax added.

### Professional Detail

Interior and exterior services designed for routine maintenance and
deeper cleaning.

### Local Service

Serving Brampton, Mississauga, Etobicoke, Milton, Bolton, Vaughan and
Georgetown.

The no-tax statement and service area are directly supported by the
supplied business document.

Avoid unsupported claims such as: - "#1 detailing company" - "Guaranteed
best" - "100% satisfaction" - "Certified technicians" - "Lifetime
protection"

unless the business confirms them.

------------------------------------------------------------------------

# 13. Service Area

Display the service locations clearly:

**Brampton • Mississauga • Etobicoke • Milton • Bolton • Vaughan •
Georgetown**

Possible copy:

> **Mobile detailing across the GTA**

Use a simple map/location visual if desired, but don't make the page
dependent on a map.

------------------------------------------------------------------------

# 14. Contact Section

### Heading

**Ready for a Cleaner Car?**

### Copy

> Request your detail online or call us directly.

### Primary CTA

**Book Your Detail**

### Secondary CTA

**+1 437-988-5025**

The supplied source identifies this number as the booking phone number.

------------------------------------------------------------------------

# 15. Footer

Include:

-   Absolute Car Wash & Detailing
-   Services
-   Packages
-   Book
-   Contact
-   Service area
-   Phone number
-   Instagram link
-   Copyright

Keep footer visually restrained.

------------------------------------------------------------------------

# 16. Mobile Requirements

Mobile is the highest-priority experience because the landing page will
likely receive traffic from social media ads.

### Requirements

-   Fully responsive from 320px upward.
-   Sticky header.
-   Persistent bottom CTA bar.
-   Booking CTA always easy to reach.
-   Minimum 48px touch target for buttons.
-   Large form controls.
-   No horizontal scrolling.
-   Package cards stack vertically.
-   Booking form becomes single-column.
-   Date/time controls must be thumb-friendly.

The design system requires buttons to be at least 48px tall on mobile.

------------------------------------------------------------------------

# 17. Desktop Requirements

### Layout

-   Max content width approximately 1100--1200px.
-   Generous whitespace.
-   Two-column hero.
-   Four-card package grid where space allows.
-   Booking form can use a two-column layout while keeping logical
    grouping clear.

Do not make the page feel like a generic SaaS landing page.

It should feel like a **credible local automotive service business**.

------------------------------------------------------------------------

# 18. Photography Direction

Photography is critical.

Use: - Real vehicles - Real detailing work - Close-ups of clean
interiors - Foam/wash/detailing shots - Clean finished vehicles -
Natural lighting - Realistic environments

Avoid: - Fake-looking AI renders - Exotic supercars unrelated to the
actual customer base - Excessive lens flares - Unrealistically perfect
studio shots - Generic corporate stock photos

The supplied design system explicitly says the hero should use real
car/job photography rather than stock photography.

------------------------------------------------------------------------

# 19. Accessibility

### Requirements

-   WCAG AA contrast where applicable.
-   Semantic HTML.
-   Proper form labels.
-   Keyboard navigable form.
-   Visible focus states.
-   Accessible error messages.
-   Do not rely on colour alone for selection/error states.
-   Minimum 48px touch targets.

The supplied design system confirms that Signal Red/white and Navy/white
combinations pass its stated contrast checks, while Brass should not be
used for normal text.

------------------------------------------------------------------------

# 20. Form Validation

### Name

-   Required
-   Minimum 2 characters

### Phone

-   Required
-   Validate Canadian/North American phone format where practical.

### Vehicle type

-   Required

### Package

-   Required

### Date

-   Required
-   Prevent past dates.

### Time

-   Required

### Address

-   Required

### Notes

-   Optional

Show clear inline errors such as:

> Please enter your name.

> Please enter a valid phone number.

Do not clear the user's other form data after a validation error.

------------------------------------------------------------------------

# 21. Backend / Data Requirements

The booking system should store:

``` text
booking_id
created_at
name
phone
vehicle_type
vehicle_make_model
package
pet_hair_removal
preferred_date
preferred_time
service_address
notes
status
```

### Status values

Recommended:

``` text
new
contacted
confirmed
completed
cancelled
```

### Important

The supplied source notes that the existing Supabase booking schema does
**not currently have a pet-hair column**, and tinting is not currently
represented in its service enum. If this landing page connects to that
existing backend, the schema must be updated before launch.

------------------------------------------------------------------------

# 22. Booking Notifications

On submission:

### Customer

Show the success confirmation immediately.

### Business

Send a notification containing:

``` text
New Booking Request

Name:
Phone:

Vehicle:
Package:
Pet Hair Removal:

Preferred Date:
Preferred Time:

Address:

Vehicle Make/Model:
Notes:
```

Do not tell the customer their booking is confirmed until the business
confirms availability.

------------------------------------------------------------------------

# 23. Pricing Logic

The source currently establishes:

  Existing service           Sedan / Hatchback   SUV / Van / Mini Truck
  ------------------------ ------------------- ------------------------
  Interior --- Silver                     \$80                    \$100
  Interior --- Gold                      \$100                    \$120
  Full Detail --- Silver                 \$110                    \$130
  Full Detail --- Gold                   \$130                    \$150
  Pet hair removal                       +\$35                    +\$35

All prices are CAD and the source states there is no tax.

### Launch requirement

Before development is considered complete, confirm how the requested
customer-facing package names map to these existing services:

-   Interior
-   Interior Gold
-   Titanium Full Gold
-   Full Titanium

Do not silently assume that "Titanium Full Gold" or "Full Titanium"
means one of the existing Silver/Gold services.

------------------------------------------------------------------------

# 24. SEO

### Suggested title

**Absolute Car Wash & Detailing \| Mobile Car Detailing**

### Suggested meta description

> Professional mobile car washing and detailing across Brampton,
> Mississauga, Etobicoke, Milton, Bolton, Vaughan and Georgetown. Book
> your detail today.

### SEO content

Naturally target: - Mobile car detailing - Car detailing Brampton - Car
wash Brampton - Mobile car wash - Interior car detailing - Full car
detailing - Car detailing near me

Do not keyword-stuff.

------------------------------------------------------------------------

# 25. Analytics

Track at minimum:

``` text
page_view
hero_cta_click
package_view
package_select
booking_start
booking_step_complete
booking_submit
booking_success
phone_click
instagram_click
```

Track the selected package and vehicle type with relevant events where
possible.

------------------------------------------------------------------------

# 26. Performance

Target:

-   Fast first load.
-   Optimized images.
-   Lazy-load below-the-fold photography.
-   Avoid unnecessary animation libraries.
-   Avoid heavy video backgrounds.
-   Keep mobile interaction instant.
-   Compress all image assets.

Animation should support hierarchy, not distract from booking.

------------------------------------------------------------------------

# 27. Design Rules --- Do / Don't

## Do

-   Use the approved Absolute logo.
-   Use the six approved brand colours.
-   Keep Signal Red exclusively for CTAs.
-   Use real automotive photography.
-   Keep copy direct and trustworthy.
-   Make booking accessible from every major section.
-   Keep the package selection visually clear.
-   Prioritize mobile conversion.
-   Maintain consistent CTA wording.

These rules align with the supplied design system.

## Don't

-   Don't introduce random accent colours.
-   Don't overuse brass.
-   Don't use red for decorative elements.
-   Don't use fake testimonials.
-   Don't invent certifications or guarantees.
-   Don't hide pricing behind unnecessary steps.
-   Don't create a complicated mega-menu.
-   Don't use "Book Now" if the action only submits an enquiry and does
    not actually confirm availability.
-   Don't claim an appointment is confirmed until the business confirms
    it.

------------------------------------------------------------------------

# 28. Recommended Conversion Flow

``` text
AD / SOCIAL TRAFFIC
        ↓
      HERO
        ↓
   BOOK CTA
        ↓
 PACKAGE SELECTION
        ↓
 VEHICLE TYPE
        ↓
 BOOKING FORM
        ↓
 REVIEW
        ↓
 REQUEST SUBMITTED
        ↓
 BUSINESS CONFIRMS
        ↓
 APPOINTMENT
```

The entire page should continuously guide the user toward this path.

------------------------------------------------------------------------

# 29. Definition of Done

The landing page is ready for launch when:

-   [ ] Brand design system is implemented.
-   [ ] Absolute logo is correctly represented.
-   [ ] Hero section is complete.
-   [ ] Realistic vehicle imagery is used.
-   [ ] All four requested package names are present.
-   [ ] Package pricing/inclusions have been confirmed.
-   [ ] Vehicle type selection works.
-   [ ] Booking form works end-to-end.
-   [ ] Name field works.
-   [ ] Phone field works.
-   [ ] Package selection works.
-   [ ] Vehicle type selection works.
-   [ ] Date/time selection works.
-   [ ] Address field works.
-   [ ] Pet hair add-on works.
-   [ ] Booking data reaches the backend.
-   [ ] Business receives a booking notification.
-   [ ] Customer sees a success state.
-   [ ] No false booking-confirmation language is displayed.
-   [ ] Phone CTA works on mobile.
-   [ ] Instagram CTA works.
-   [ ] Sticky mobile CTA works.
-   [ ] Responsive layouts work.
-   [ ] Accessibility checks pass.
-   [ ] Basic analytics are implemented.
-   [ ] SEO metadata is implemented.
-   [ ] Mobile performance is tested.
-   [ ] Final package naming/pricing has been approved by the business.

------------------------------------------------------------------------

# 30. Core Product Principle

**The website should feel less like a marketing website and more like
the easiest way to book a professional car detail.**

Every design and technical decision should support:

**See the service → trust the business → choose a package → request a
booking.**
