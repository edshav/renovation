# Home Renovation: Implementation Plan & Checklist

Based on the architectural review, here is a structured task list to implement the recommended features. These tasks are organized by priority and potential impact.

---

## 🎯 Phase 1: High-ROI Conversion Features

- [ ] **Task 1.1: Implement "Request a Quote" Modal**
  - **Objective:** Lower the friction for new leads to contact you.
  - **Implementation Steps:**
    - Create a hidden `<dialog>` or `<div>` modal in `index.html`.
    - Build a Tailwind-styled form with inputs: `Name`, `Phone Number`, `Service Required`, and `Project Details / Zip Code`.
    - Write a small vanilla JavaScript function to toggle the model visibility.
    - Update the "Book Now" CTA buttons to trigger this modal instead of opening an email client.

- [ ] **Task 1.2: Build a Testimonials Section**
  - **Objective:** Establish social proof and trust before the user hits the CTA.
  - **Implementation Steps:**
    - Add a new `<section>` between "Why Choose Us" and the "Call-to-Action".
    - Design a 3-column CSS grid or a horizontal scrolling carousel.
    - Populate with 3-5 real client quotes, 5-star icons (`★`), and client names/locations.

---

## 🔍 Phase 2: Technical SEO & Discoverability

- [x] **Task 2.1: Enhance Global Meta Tags**
  - **Objective:** Improve search engine rankings and Click-Through Rate (CTR).
  - **Implementation Steps:**
    - Update the generically named `<title>` to something localized: e.g., `<title>Premium Home Renovation in [City] | Sharp Edge Exterior</title>`.
    - Add a meta description to `<head>`: `<meta name="description" content="Expert home renovation services. We specialize in flooring, drywall, painting, and tile installation across the [City] area. Request a free estimate today!" />`.

- [x] **Task 2.2: Implement OpenGraph (OG) Social Tags**
  - **Objective:** Ensure links shared in iMessage, Facebook, and WhatsApp render a beautiful preview card.
  - **Implementation Steps:**
    - Add `<meta property="og:title" content="...">`.
    - Add `<meta property="og:description" content="...">`.
    - Add `<meta property="og:image" content="/images/hero-kitchen.jpg">` so a thumbnail appears on social feeds.

- [x] **Task 2.3: Add Image `alt` Attributes**
  - **Objective:** Improve Web Accessibility (a11y) and Image-based SEO.
  - **Implementation Steps:**
    - Audit the 10 gallery images in the "Recent Projects" section.
    - Add descriptive, keyword-rich `alt` text to each (e.g., `alt="Modern kitchen backsplash tile installation"`).

---

## 🎨 Phase 3: UX & Interface Cleanup

- [x] **Task 3.1: Normalise Mobile Paddings**
  - **Objective:** Fix the excessive vertical white space on mobile screens caused by the recent git reversion.
  - **Implementation Steps:**
    - Audit all `<section>` tags.
    - Replace static `py-24` classes with responsive responsive variants: `py-16 md:py-24`.
    - Replace static `py-20` classes with responsive variants: `py-16 md:py-20`.

- [x] **Task 3.2: Optimize Render-Blocking Assets**
  - **Objective:** Speed up the First Contentful Paint (FCP) metric.
  - **Implementation Steps:**
    - Add `rel="preload"` to the external Google Fonts and Material Symbols links in the `<head>`.

- [x] **Task 3.3: Centralize Contact Data (Optional)**
  - **Objective:** Make future phone number or email updates painless.
  - **Implementation Steps:**
    - Create localized JavaScript constants at the bottom of the file (or in a separate `.js` file) and inject the email/phone text nodes to the DOM via `document.querySelectorAll()`. _(Only strictly necessary if scaling to multiple pages)._
