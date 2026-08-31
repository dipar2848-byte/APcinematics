/* =============================================================================
   AP CINEMATIC — CENTRALIZED CONFIGURATION
   -----------------------------------------------------------------------------
   Every editable piece of business information lives HERE and only here.
   Change the WhatsApp number, swap an image, edit copy or the city list in
   this one file and it updates everywhere on the site automatically.

   To replace an image: overwrite the file in /assets keeping the same name,
   OR point the value below at a new path / URL.
   ============================================================================= */

const SITE_CONFIG = {

  /* ---- Brand -------------------------------------------------------------- */
  brand: {
    name: "AP CINEMATIC",
    // No standalone logo file supplied — the wordmark (brand.name) is used as
    // the logo. If you get a logo image later, set `logo` to its path
    // (e.g. "assets/logo.png") and it will be used in place of the text.
    logo: null,
    tagline: "Social media video creator",
  },

  /* ---- Core assets (replace these files to rebrand) ---------------------- */
  assets: {
    poster:  "assets/poster.jpg",   // the campaign poster (shown in its own section)
    profile: "assets/profile.jpg",  // portrait of the creator (About section)
  },

  /* ---- Contact / social ------------------------------------------------- */
  contact: {
    // Full international format, digits only (no +, spaces or dashes).
    // India example: 91 + 10-digit number.
    whatsapp: "919876543210",
    instagram: "https://instagram.com/",
    instagramHandle: "@apcinematic",
    email: "hello@apcinematic.in",
    baseLocation: "Navi Mumbai, India",
  },

  /* ---- Hero ------------------------------------------------------------- */
  hero: {
    headline: "YOUR STORY. YOUR FRAME.",
    supporting: "Social media video creator.",
    ctaPrimary: "Book a Shoot",
    ctaSecondary: "Instagram",
    scrollHint: "Scroll",
  },

  /* ---- Poster section --------------------------------------------------- */
  poster: {
    kicker: "The Campaign",
    caption: "AP Cinematic — 2026",
  },

  /* ---- Process ---------------------------------------------------------- */
  process: {
    heading: "The Process",
    steps: [
      { no: "01", title: "SHARE YOUR VISION", text: "Tell us what you want to create." },
      { no: "02", title: "WE SHOOT",          text: "We capture your idea with a cinematic approach." },
      { no: "03", title: "GET YOUR CONTENT",  text: "Receive content ready to use and share." },
    ],
  },

  /* ---- What we shoot ---------------------------------------------------- */
  whatWeShoot: {
    heading: "WHAT WE SHOOT",
    text: "All types of shoots available, tailored to your vision.",
  },

  /* ---- About ------------------------------------------------------------ */
  about: {
    brandLine: "AP CINEMATIC",
    name: "PRANIL AHER",
    role: "Creator & Cinematographer",
    body: "I'm a social-media video creator making scroll-stopping, cinematic " +
          "content across Navi Mumbai. From reels to campaigns, I turn everyday " +
          "moments into stories worth sharing.",
  },

  /* ---- Booking ---------------------------------------------------------- */
  booking: {
    heading: "LET'S CREATE SOMETHING.",
    intro: "Tell me about your shoot and I'll reply on WhatsApp.",
    submitLabel: "BOOK VIA WHATSAPP",
    // Service locations — this is the ONLY list the dropdown uses.
    cities: [
      "Navade",
      "Panvel",
      "Kalamboli",
      "Kamothe",
      "Kharghar",
      "Roadpali",
      "Khandeshwar",
      "Khanda Colony",
    ],
  },

  /* ---- Footer ----------------------------------------------------------- */
  footer: {
    note: "Cinematic social-media content. Navi Mumbai.",
    copyright: "© " + new Date().getFullYear() + " AP Cinematic. All rights reserved.",
  },
};

window.SITE_CONFIG = SITE_CONFIG;
