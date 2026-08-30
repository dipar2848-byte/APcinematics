/* =============================================================================
   CENTRALIZED SITE CONFIGURATION
   -----------------------------------------------------------------------------
   Everything changeable lives here. Edit this file only — every section of the
   site reads its content and assets from this single object.

   To swap the poster / profile photo later, just replace the file at the path
   below (assets/hero-poster.jpg, assets/profile.jpg) OR point these values at
   a new URL. Nothing else needs to change.
   ============================================================================= */

const SITE_CONFIG = {

  /* ---- Brand / identity -------------------------------------------------- */
  brand: {
    name: "AARAV MEHTA",          // videographer / brand name (used as wordmark)
    tagline: "Films & Cinematic Storytelling",
    // No logo image supplied — the wordmark (brand.name) is used instead.
    // If you later get a logo, set logo to its path e.g. "assets/logo.png"
    // and the site will use the image in place of the text wordmark.
    logo: null,
  },

  /* ---- Core assets (replace these files to rebrand) ---------------------- */
  assets: {
    heroPoster: "assets/hero-poster.jpg", // clean full-screen hero background
    profile:    "assets/profile.jpg",     // professional photo for About
  },

  /* ---- Contact / social ------------------------------------------------- */
  contact: {
    // WhatsApp number in FULL international format, digits only (no +, spaces).
    // Example for India: 91 + 10-digit number.
    whatsapp: "919876543210",
    instagram: "https://instagram.com/",
    instagramHandle: "@aaravmehta.films",
    email: "hello@aaravmehta.films",
    baseLocation: "Navi Mumbai, India",
  },

  /* ---- Hero ------------------------------------------------------------- */
  hero: {
    eyebrow: "Cinematic Videography",
    supporting: "Weddings, brands and stories — captured with intention.",
    ctaLabel: "Book a Shoot",
    scrollHint: "Scroll",
  },

  /* ---- Section 2: Process ---------------------------------------------- */
  process: {
    heading: "How It Works",
    steps: [
      { no: "01", title: "Tell Us Your Vision", text: "Share the details of your shoot." },
      { no: "02", title: "We Create",           text: "We plan and capture it." },
      { no: "03", title: "Your Story",          text: "Get your final cinematic content." },
    ],
  },

  /* ---- Section 3: What We Shoot ---------------------------------------- */
  whatWeShoot: {
    heading: "What We Shoot",
    text: "All types of shoots available, tailored to your vision.",
  },

  /* ---- Section 4: About ------------------------------------------------ */
  about: {
    label: "About",
    name: "Aarav Mehta",
    role: "Cinematographer & Director",
    body: "I make films that feel like memories. For the last eight years I've been " +
          "behind the camera for weddings, brands and personal stories across Navi Mumbai — " +
          "chasing light, honest moments and the small details that make a story yours.",
  },

  /* ---- Section 5: Booking ---------------------------------------------- */
  booking: {
    heading: "Let's Create Something.",
    intro: "Tell me about your shoot and I'll get back to you on WhatsApp.",
    submitLabel: "Send on WhatsApp",
    // Cities shown in the required dropdown.
    cities: [
      "Kalamboli",
      "Kamothe",
      "Kharghar",
      "Panvel",
      "Khandeshwar",
      "Khanda Colony",
      "Taloja",
      "Navade",
      "Roadpali",
    ],
  },

  /* ---- Footer --------------------------------------------------------- */
  footer: {
    note: "Cinematic videography, Navi Mumbai.",
    copyright: "© " + new Date().getFullYear() + " Aarav Mehta. All rights reserved.",
  },
};

// Expose globally for the vanilla-JS app.
window.SITE_CONFIG = SITE_CONFIG;
