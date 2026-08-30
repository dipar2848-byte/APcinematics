/* =============================================================================
   App logic
   - Binds all content from SITE_CONFIG into the DOM
   - Cinematic reveals / parallax (IntersectionObserver + rAF)
   - Booking form validation -> pre-filled WhatsApp message (frontend only)
   ============================================================================= */

(function () {
  "use strict";
  var CFG = window.SITE_CONFIG;

  /* ------------------------------------------------------------------ *
   *  Small helpers
   * ------------------------------------------------------------------ */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function setText(attr, value) {
    $all("[" + attr + "]").forEach(function (el) { el.textContent = value; });
  }

  /* ------------------------------------------------------------------ *
   *  1. Bind content from config
   * ------------------------------------------------------------------ */
  function bindContent() {
    // Brand / nav
    setText("data-brand-name", CFG.brand.name);

    // Hero
    setText("data-hero-eyebrow", CFG.hero.eyebrow);
    setText("data-hero-supporting", CFG.hero.supporting);
    setText("data-hero-cta", CFG.hero.ctaLabel);
    setText("data-hero-scrollhint", CFG.hero.scrollHint);

    var heroImg = $("[data-hero-img]");
    if (heroImg) { heroImg.src = CFG.assets.heroPoster; heroImg.alt = CFG.brand.name + " — showreel poster"; }

    // Process
    setText("data-process-heading", CFG.process.heading);
    var list = $("[data-process-list]");
    if (list) {
      CFG.process.steps.forEach(function (step) {
        var li = document.createElement("li");
        li.className = "process__item reveal";
        li.innerHTML =
          '<span class="process__no">' + step.no + "</span>" +
          "<div>" +
          '<h3 class="process__title">' + step.title + "</h3>" +
          '<p class="process__text">' + step.text + "</p>" +
          "</div>";
        list.appendChild(li);
      });
    }

    // What we shoot
    setText("data-shoot-heading", CFG.whatWeShoot.heading);
    setText("data-shoot-text", CFG.whatWeShoot.text);

    // About
    setText("data-about-label", CFG.about.label);
    setText("data-about-name", CFG.about.name);
    setText("data-about-role", CFG.about.role);
    setText("data-about-body", CFG.about.body);
    var aboutImg = $("[data-about-img]");
    if (aboutImg) { aboutImg.src = CFG.assets.profile; aboutImg.alt = CFG.about.name; }

    // Booking
    setText("data-booking-heading", CFG.booking.heading);
    setText("data-booking-intro", CFG.booking.intro);
    setText("data-booking-submit", CFG.booking.submitLabel);

    var citySelect = $("#f-city");
    if (citySelect) {
      CFG.booking.cities.forEach(function (city) {
        var opt = document.createElement("option");
        opt.value = city;
        opt.textContent = city;
        citySelect.appendChild(opt);
      });
    }

    // Footer
    setText("data-footer-note", CFG.footer.note);
    setText("data-footer-copyright", CFG.footer.copyright);

    var ig = $("[data-footer-instagram]");
    if (ig) { ig.href = CFG.contact.instagram; }
    var wa = $("[data-footer-whatsapp]");
    if (wa) { wa.href = "https://wa.me/" + CFG.contact.whatsapp; }
    var em = $("[data-footer-email]");
    if (em) { em.href = "mailto:" + CFG.contact.email; em.textContent = CFG.contact.email; }

    // Page title
    document.title = CFG.brand.name + " — " + CFG.brand.tagline;
  }

  /* ------------------------------------------------------------------ *
   *  2. Reveal on scroll
   * ------------------------------------------------------------------ */
  function initReveals() {
    var els = $all(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          var el = entry.target;
          // gentle stagger for siblings entering together
          setTimeout(function () { el.classList.add("is-in"); }, Math.min(i * 80, 240));
          io.unobserve(el);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------------ *
   *  3. Hero entrance + parallax + nav state
   * ------------------------------------------------------------------ */
  function initMotion() {
    var hero = $(".hero");
    var heroImg = $("[data-hero-img]");
    var nav = $("#siteNav");
    var softImg = $("[data-parallax-soft]");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // entrance
    requestAnimationFrame(function () {
      if (hero) hero.classList.add("is-ready");
      // reveal hero content immediately after paint
      $all(".hero .reveal").forEach(function (el, i) {
        setTimeout(function () { el.classList.add("is-in"); }, 180 + i * 140);
      });
    });

    if (reduce) {
      if (nav) window.addEventListener("scroll", function () {
        nav.classList.toggle("is-scrolled", window.scrollY > 40);
      }, { passive: true });
      return;
    }

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY || window.pageYOffset;

        // hero parallax (image drifts slower than scroll)
        if (heroImg && y < window.innerHeight * 1.2) {
          heroImg.style.transform = "translateY(" + (y * 0.28) + "px) scale(1)";
        }

        // soft parallax for about image
        if (softImg) {
          var rect = softImg.getBoundingClientRect();
          var vh = window.innerHeight;
          if (rect.top < vh && rect.bottom > 0) {
            var progress = (vh - rect.top) / (vh + rect.height); // 0..1
            var shift = (progress - 0.5) * 40; // -20..20px
            softImg.style.transform = "translateY(" + shift + "px)";
          }
        }

        // nav state
        if (nav) nav.classList.toggle("is-scrolled", y > 40);

        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------------------------------ *
   *  4. Booking form -> WhatsApp
   * ------------------------------------------------------------------ */
  function initForm() {
    var form = $("#bookingForm");
    if (!form) return;
    var citySelect = $("#f-city");
    var addressField = $("#addressField");
    var addressInput = $("#f-address");

    // reveal full-address field once a city is chosen
    citySelect.addEventListener("change", function () {
      if (citySelect.value) {
        addressField.hidden = false;
        if (addressInput) addressInput.setAttribute("required", "required");
      }
    });

    function setError(name, msg) {
      var input = form.querySelector('[name="' + name + '"]');
      var wrap = input ? input.closest(".field") : null;
      var errEl = form.querySelector('[data-error-for="' + name + '"]');
      if (wrap) wrap.classList.toggle("has-error", !!msg);
      if (errEl) errEl.textContent = msg || "";
    }

    function validate(data) {
      var ok = true;
      [["name", "Please enter your name."],
       ["date", "Please choose a date."],
       ["phone", "Please enter your phone number."],
       ["city", "Please select a city."]
      ].forEach(function (pair) {
        if (!data[pair[0]]) { setError(pair[0], pair[1]); ok = false; }
        else { setError(pair[0], ""); }
      });

      // address required only once city chosen / field visible
      if (!addressField.hidden) {
        if (!data.address) { setError("address", "Please enter your full address."); ok = false; }
        else { setError("address", ""); }
      }
      return ok;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var data = {
        name:    (fd.get("name")    || "").toString().trim(),
        date:    (fd.get("date")    || "").toString().trim(),
        phone:   (fd.get("phone")   || "").toString().trim(),
        city:    (fd.get("city")    || "").toString().trim(),
        address: (fd.get("address") || "").toString().trim(),
        message: (fd.get("message") || "").toString().trim(),
      };

      if (!validate(data)) {
        var firstErr = form.querySelector(".has-error input, .has-error select");
        if (firstErr) firstErr.focus();
        return;
      }

      // Build a clean WhatsApp message
      var lines = [
        "New shoot enquiry",
        "",
        "Name: " + data.name,
        "Date: " + data.date,
        "Phone: " + data.phone,
        "City: " + data.city,
        "Address: " + data.address,
      ];
      if (data.message) lines.push("Message: " + data.message);

      var text = encodeURIComponent(lines.join("\n"));
      var url = "https://wa.me/" + CFG.contact.whatsapp + "?text=" + text;
      window.open(url, "_blank", "noopener");
    });
  }

  /* ------------------------------------------------------------------ *
   *  Init
   * ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", function () {
    bindContent();
    initReveals();
    initMotion();
    initForm();
  });
})();
