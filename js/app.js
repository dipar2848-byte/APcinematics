/* =============================================================================
   AP CINEMATIC — app logic
   - Binds all content from SITE_CONFIG
   - Cinematic entrance + scroll reveals + gentle parallax (rAF)
   - Booking form validation -> pre-filled WhatsApp message (frontend only)
   ============================================================================= */

(function () {
  "use strict";
  var CFG = window.SITE_CONFIG;

  function $(s, r) { return (r || document).querySelector(s); }
  function $all(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function setText(attr, val) { $all("[" + attr + "]").forEach(function (el) { el.textContent = val; }); }

  /* ------------------------------------------------------------------ *
   *  1. Bind content
   * ------------------------------------------------------------------ */
  function bindContent() {
    setText("data-brand-name", CFG.brand.name);

    // Hero
    var parts = CFG.hero.headline.split(/\s+(?=[^\s]+$)/); // split into two lines if possible
    if (parts.length === 2) {
      setText("data-hero-line1", parts[0]);
      setText("data-hero-line2", parts[1]);
    } else {
      // fallback: split on the middle space
      var words = CFG.hero.headline.split(" ");
      var mid = Math.ceil(words.length / 2);
      setText("data-hero-line1", words.slice(0, mid).join(" "));
      setText("data-hero-line2", words.slice(mid).join(" "));
    }
    setText("data-hero-supporting", CFG.hero.supporting);
    setText("data-hero-cta1", CFG.hero.ctaPrimary);
    setText("data-hero-cta2", CFG.hero.ctaSecondary);
    setText("data-hero-scrollhint", CFG.hero.scrollHint);
    var cta2 = $("[data-hero-cta2]");
    if (cta2) cta2.href = CFG.contact.instagram;

    // Poster
    setText("data-poster-kicker", CFG.poster.kicker);
    setText("data-poster-caption", CFG.poster.caption);
    var pimg = $("[data-poster-img]");
    if (pimg) { pimg.src = CFG.assets.poster; pimg.alt = CFG.brand.name + " poster"; }

    // Process
    setText("data-process-heading", CFG.process.heading);
    var list = $("[data-process-list]");
    if (list) {
      CFG.process.steps.forEach(function (s) {
        var li = document.createElement("li");
        li.className = "process__item reveal";
        li.innerHTML =
          '<span class="process__no">' + s.no + "</span>" +
          "<div><h3 class='process__title'>" + s.title + "</h3>" +
          "<p class='process__text'>" + s.text + "</p></div>";
        list.appendChild(li);
      });
    }

    // What we shoot
    setText("data-shoot-heading", CFG.whatWeShoot.heading);
    setText("data-shoot-text", CFG.whatWeShoot.text);

    // About
    setText("data-about-brand", CFG.about.brandLine);
    setText("data-about-name", CFG.about.name);
    setText("data-about-role", CFG.about.role);
    setText("data-about-body", CFG.about.body);
    var aimg = $("[data-about-img]");
    if (aimg) { aimg.src = CFG.assets.profile; aimg.alt = CFG.about.name; }

    // Booking
    setText("data-booking-heading", CFG.booking.heading);
    setText("data-booking-intro", CFG.booking.intro);
    setText("data-booking-submit", CFG.booking.submitLabel);
    var sel = $("#f-city");
    if (sel) {
      CFG.booking.cities.forEach(function (c) {
        var o = document.createElement("option");
        o.value = c; o.textContent = c; sel.appendChild(o);
      });
    }

    // Footer
    setText("data-footer-note", CFG.footer.note);
    setText("data-footer-copyright", CFG.footer.copyright);
    var ig = $("[data-footer-instagram]"); if (ig) ig.href = CFG.contact.instagram;
    var wa = $("[data-footer-whatsapp]"); if (wa) wa.href = "https://wa.me/" + CFG.contact.whatsapp;
    var em = $("[data-footer-email]"); if (em) { em.href = "mailto:" + CFG.contact.email; em.textContent = CFG.contact.email; }

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
          setTimeout(function () { el.classList.add("is-in"); }, Math.min(i * 70, 210));
          io.unobserve(el);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------------ *
   *  3. Entrance + parallax + nav state
   * ------------------------------------------------------------------ */
  function initMotion() {
    var nav = $("#nav");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // hero entrance (staggered)
    requestAnimationFrame(function () {
      $all(".hero .reveal").forEach(function (el, i) {
        setTimeout(function () { el.classList.add("is-in"); }, 140 + i * 120);
      });
    });

    var softs = $all("[data-parallax-soft]");
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY || window.pageYOffset;
        if (nav) nav.classList.toggle("is-scrolled", y > 40);

        if (!reduce) {
          var vh = window.innerHeight;
          softs.forEach(function (img) {
            var r = img.getBoundingClientRect();
            if (r.top < vh && r.bottom > 0) {
              var progress = (vh - r.top) / (vh + r.height); // 0..1
              var shift = (progress - 0.5) * 34;
              img.style.transform = "translateY(" + shift.toFixed(1) + "px)";
            }
          });
        }
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------------------------------ *
   *  4. Booking -> WhatsApp
   * ------------------------------------------------------------------ */
  function initForm() {
    var form = $("#bookingForm");
    if (!form) return;
    var citySelect = $("#f-city");
    var addressField = $("#addressField");
    var addressInput = $("#f-address");

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
      ].forEach(function (p) {
        if (!data[p[0]]) { setError(p[0], p[1]); ok = false; } else { setError(p[0], ""); }
      });
      // address required (revealed after city choice)
      if (!addressField.hidden) {
        if (!data.address) { setError("address", "Please enter your full address."); ok = false; }
        else { setError("address", ""); }
      } else if (data.city) {
        // city chosen but field somehow hidden -> reveal and require
        addressField.hidden = false;
        setError("address", "Please enter your full address."); ok = false;
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
        var first = form.querySelector(".has-error input, .has-error select");
        if (first) first.focus();
        return;
      }

      var lines = [
        CFG.brand.name + " — shoot enquiry",
        "",
        "Name: " + data.name,
        "Date: " + data.date,
        "Phone: " + data.phone,
        "City: " + data.city,
        "Full address: " + data.address,
      ];
      if (data.message) lines.push("Message: " + data.message);

      var url = "https://wa.me/" + CFG.contact.whatsapp + "?text=" + encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank", "noopener");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    bindContent();
    initReveals();
    initMotion();
    initForm();
  });
})();
