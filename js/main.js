// Hydrates every page from window.SITE and powers theme, nav, forms, and Edit mode.
(function () {
  "use strict";

  var STORE_KEY = "neman-content-overrides";
  var THEME_KEY = "neman-theme";

  // ---- data helpers -------------------------------------------------------
  function getPath(obj, path) {
    return path.split(".").reduce(function (o, k) {
      return o == null ? undefined : o[k];
    }, obj);
  }

  function setPath(obj, path, value) {
    var keys = path.split(".");
    var last = keys.pop();
    var target = keys.reduce(function (o, k) {
      if (o[k] == null) o[k] = {};
      return o[k];
    }, obj);
    target[last] = value;
  }

  function loadOverrides() {
    try {
      return JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
    } catch (e) {
      return {};
    }
  }

  function saveOverrides(map) {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(map));
    } catch (e) {}
  }

  var overrides = loadOverrides();
  var SITE = window.SITE || {};
  Object.keys(overrides).forEach(function (p) {
    setPath(SITE, p, overrides[p]);
  });

  // ---- icons --------------------------------------------------------------
  var ICONS = {
    implant:
      '<path d="M12 2c-2 3-3 5-3 8a3 3 0 0 0 6 0c0-3-1-5-3-8Z"/><path d="M10 13v8M14 13v8M8 17h8"/>',
    veneer:
      '<path d="M7 3c3-1 7-1 10 0 1 5-1 12-5 18C8 15 6 8 7 3Z"/><path d="M8 8h8"/>',
    whitening:
      '<path d="M12 3v3M4.2 6.2l2.1 2.1M3 13h3M19.8 6.2l-2.1 2.1M21 13h-3"/><path d="M12 9a5 5 0 0 0-3 9c0 1 1 3 3 3s3-2 3-3a5 5 0 0 0-3-9Z"/>',
    makeover:
      '<path d="M12 3l2.2 4.8L19 9l-4 3.6L16 18l-4-2.4L8 18l1-5.4L5 9l4.8-1.2Z"/>',
    pain:
      '<path d="M12 2c-2 3-3 5-3 8a3 3 0 0 0 6 0c0-3-1-5-3-8Z"/><path d="M9 20l1.5-4 1 2 1-3 1.5 5"/>',
    align:
      '<rect x="3" y="4" width="18" height="7" rx="3"/><rect x="5" y="13" width="14" height="7" rx="3"/><path d="M8 4v7M12 4v7M16 4v7"/>',
    phone:
      '<path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L18 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 4 6a2 2 0 0 1 0-2Z"/>',
    pin: '<path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"/><circle cx="12" cy="10" r="2.6"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    insta:
      '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>',
    fb: '<path d="M14 9h3V6h-3c-2 0-3 1-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9Z"/>',
  };

  function svg(name, cls) {
    var body = ICONS[name] || "";
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"' +
      (cls ? ' class="' + cls + '"' : "") +
      ">" +
      body +
      "</svg>"
    );
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function telHref(phone) {
    return "tel:" + String(phone || "").replace(/[^\d+]/g, "");
  }

  // ---- shared chrome (header / footer / book modal) -----------------------
  function navItems() {
    return [
      { label: "Home", href: "index.html", page: "home" },
      { label: "About", href: "about.html", page: "about" },
      { label: "Services", href: "services.html", page: "services" },
      { label: "Testimonials", href: "testimonials.html", page: "testimonials" },
      { label: "Contact", href: "contact.html", page: "contact" },
    ];
  }

  function brandMark() {
    return (
      '<svg class="mark" viewBox="0 0 48 48" fill="none" aria-hidden="true">' +
      '<circle cx="24" cy="24" r="22" stroke="currentColor" stroke-opacity=".25" stroke-width="2"/>' +
      '<path d="M24 11c-4 6-6 9-6 14a6 6 0 0 0 12 0c0-5-2-8-6-14Z" fill="var(--gold)"/>' +
      '<path d="M20 30v7M28 30v7" stroke="var(--gold)" stroke-width="2.4" stroke-linecap="round"/>' +
      "</svg>"
    );
  }

  function buildHeader(current) {
    var mount = document.getElementById("header-mount");
    if (!mount) return;
    var links = navItems()
      .map(function (n) {
        var active = n.page === current ? ' aria-current="page"' : "";
        return '<li><a href="' + n.href + '"' + active + ">" + n.label + "</a></li>";
      })
      .join("");

    mount.innerHTML =
      '<header class="site-header"><div class="wrap nav">' +
      '<a class="brand" href="index.html">' +
      brandMark() +
      '<span data-content="shortName"></span></a>' +
      '<ul class="nav-links" id="nav-links">' +
      links +
      "</ul>" +
      '<div class="nav-actions">' +
      '<button class="icon-btn theme-toggle" id="theme-toggle" aria-label="Toggle dark mode" title="Toggle dark mode">' +
      svg("whitening", "sun") +
      '<svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/></svg>' +
      "</button>" +
      '<a class="btn book-btn" href="#book" data-book>' +
      '<span data-content="cta.book"></span></a>' +
      '<button class="icon-btn nav-toggle" id="nav-toggle" aria-label="Menu" aria-expanded="false">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' +
      "</button>" +
      "</div></div></header>";
  }

  function buildFooter() {
    var mount = document.getElementById("footer-mount");
    if (!mount) return;
    var locs = (getPath(SITE, "locations.items") || [])
      .map(function (l, i) {
        return (
          '<div><div class="loc-name" data-content="locations.items.' +
          i +
          '.name"></div>' +
          '<a class="loc-phone" href="' +
          telHref(l.phone) +
          '" data-content="locations.items.' +
          i +
          '.phone"></a></div>'
        );
      })
      .join("");

    var navLinks = navItems()
      .map(function (n) {
        return '<li><a href="' + n.href + '">' + n.label + "</a></li>";
      })
      .join("");

    var patientLinks = [
      { label: "Savings Plan", href: "savings.html" },
      { label: "Patient Resources", href: "coming-soon.html?t=Patient+Resources" },
      { label: "Safety", href: "coming-soon.html?t=Safety" },
      { label: "Blog", href: "coming-soon.html?t=Blog" },
    ]
      .map(function (n) {
        return '<li><a href="' + n.href + '">' + n.label + "</a></li>";
      })
      .join("");

    mount.innerHTML =
      '<footer class="site-footer"><div class="wrap">' +
      '<div class="footer-top">' +
      '<div class="footer-brand">' +
      '<a class="brand" href="index.html">' +
      brandMark() +
      '<span data-content="shortName"></span></a>' +
      '<p data-content="footer.blurb"></p>' +
      '<div class="socials">' +
      '<a class="icon-btn" href="' +
      esc(getPath(SITE, "social.instagram")) +
      '" aria-label="Instagram">' +
      svg("insta") +
      "</a>" +
      '<a class="icon-btn" href="' +
      esc(getPath(SITE, "social.facebook")) +
      '" aria-label="Facebook">' +
      svg("fb") +
      "</a></div></div>" +
      '<div><h4>Explore</h4><ul class="footer-links">' +
      navLinks +
      "</ul></div>" +
      '<div><h4>Patients</h4><ul class="footer-links">' +
      patientLinks +
      "</ul></div>" +
      '<div><h4>Locations</h4><div class="footer-links">' +
      locs +
      "</div></div>" +
      "</div>" +
      '<div class="footer-bottom"><span>&copy; ' +
      new Date().getFullYear() +
      ' <span data-content="practiceName"></span></span>' +
      "<span>Demo redesign &middot; not the live site</span></div>" +
      "</div></footer>";
  }

  function buildModal() {
    if (document.getElementById("book-modal")) return;
    var locOpts = (getPath(SITE, "locations.items") || [])
      .map(function (l) {
        return '<option value="' + esc(l.name) + '">' + esc(l.name) + "</option>";
      })
      .join("");
    var svcOpts = (getPath(SITE, "services.items") || [])
      .map(function (s) {
        return '<option value="' + esc(s.name) + '">' + esc(s.name) + "</option>";
      })
      .join("");

    var el = document.createElement("div");
    el.className = "modal";
    el.id = "book-modal";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.innerHTML =
      '<div class="modal-card">' +
      '<div class="modal-head"><div><span class="kicker">Appointments</span>' +
      "<h3>Request a visit</h3></div>" +
      '<button class="modal-close" aria-label="Close" data-close>&times;</button></div>' +
      '<form id="book-form" novalidate>' +
      '<div class="form-grid">' +
      field("bk-name", "Full name", '<input id="bk-name" name="name" autocomplete="name" required>') +
      field("bk-phone", "Phone", '<input id="bk-phone" name="phone" inputmode="tel" required>') +
      "</div>" +
      field("bk-loc", "Location", '<select id="bk-loc" name="location">' + locOpts + "</select>") +
      field("bk-svc", "Reason for visit", '<select id="bk-svc" name="service">' + svcOpts + "</select>") +
      field("bk-date", "Preferred date", '<input id="bk-date" name="date" type="date">') +
      '<button class="btn" type="submit" style="width:100%;margin-top:6px">Request appointment</button>' +
      '<p class="form-note">Demo form — no appointment is actually booked.</p>' +
      '<div class="form-success" id="book-success">' +
      svg("check") +
      "<div><strong>Request received.</strong><br>We would call to confirm within one business day.</div></div>" +
      "</form></div>";
    document.body.appendChild(el);
  }

  function field(id, label, control) {
    return (
      '<div class="field" data-field>' +
      '<label for="' +
      id +
      '">' +
      label +
      "</label>" +
      control +
      '<span class="err">Please complete this field.</span></div>'
    );
  }

  // ---- renderers for collection sections ----------------------------------
  function renderServices() {
    var host = document.querySelector('[data-render="services"]');
    if (!host) return;
    host.innerHTML = (getPath(SITE, "services.items") || [])
      .map(function (s, i) {
        var base = "services.items." + i;
        return (
          '<article class="card reveal">' +
          '<div class="ic">' +
          svg(s.icon) +
          "</div>" +
          '<h3 data-content="' +
          base +
          '.name"></h3>' +
          '<p data-content="' +
          base +
          '.blurb"></p></article>'
        );
      })
      .join("");
  }

  function renderTeam() {
    var host = document.querySelector('[data-render="team"]');
    if (!host) return;
    host.innerHTML = (getPath(SITE, "team.members") || [])
      .map(function (m, i) {
        var base = "team.members." + i;
        return (
          '<article class="card team-card reveal">' +
          '<div class="avatar" data-content="' +
          base +
          '.initials"></div>' +
          '<h3 data-content="' +
          base +
          '.name"></h3>' +
          '<div class="role" data-content="' +
          base +
          '.role"></div>' +
          '<p data-content="' +
          base +
          '.bio"></p></article>'
        );
      })
      .join("");
  }

  function renderTestimonials() {
    var host = document.querySelector('[data-render="testimonials"]');
    if (!host) return;
    host.innerHTML = (getPath(SITE, "testimonials.items") || [])
      .map(function (t, i) {
        var base = "testimonials.items." + i;
        return (
          '<article class="card quote-card reveal">' +
          '<blockquote data-content="' +
          base +
          '.quote"></blockquote>' +
          '<div class="author" data-content="' +
          base +
          '.author"></div></article>'
        );
      })
      .join("");
  }

  function renderLocations() {
    var host = document.querySelector('[data-render="locations"]');
    if (!host) return;
    host.innerHTML = (getPath(SITE, "locations.items") || [])
      .map(function (l, i) {
        var base = "locations.items." + i;
        var rows = (l.hours || [])
          .map(function (h, j) {
            return (
              "<tr><td data-content='" +
              base +
              ".hours." +
              j +
              ".day'></td><td data-content='" +
              base +
              ".hours." +
              j +
              ".time'></td></tr>"
            );
          })
          .join("");
        return (
          '<article class="card loc-card reveal">' +
          '<h3 data-content="' +
          base +
          '.name"></h3>' +
          '<div class="addr" data-content="' +
          base +
          '.address"></div>' +
          '<a class="phone" href="' +
          telHref(l.phone) +
          '">' +
          svg("phone") +
          '<span data-content="' +
          base +
          '.phone"></span></a>' +
          '<table class="hours"><tbody>' +
          rows +
          "</tbody></table></article>"
        );
      })
      .join("");
  }

  function renderHeroCard() {
    var host = document.querySelector('[data-render="hero-locations"]');
    if (!host) return;
    host.innerHTML = (getPath(SITE, "locations.items") || [])
      .map(function (l, i) {
        var base = "locations.items." + i;
        return (
          '<div class="loc-row"><div>' +
          '<div class="loc-name" data-content="' +
          base +
          '.name"></div>' +
          '<div class="loc-sub" data-content="' +
          base +
          '.address"></div></div>' +
          '<a class="loc-phone" href="' +
          telHref(l.phone) +
          '" data-content="' +
          base +
          '.phone"></a></div>'
        );
      })
      .join("");
  }

  // ---- hydration ----------------------------------------------------------
  function hydrate() {
    document.querySelectorAll("[data-content]").forEach(function (el) {
      var val = getPath(SITE, el.getAttribute("data-content"));
      if (val != null) el.textContent = val;
    });
  }

  // ---- theme --------------------------------------------------------------
  function initTheme() {
    var saved = null;
    try {
      saved = localStorage.getItem(THEME_KEY);
    } catch (e) {}
    if (saved) document.documentElement.setAttribute("data-theme", saved);

    document.addEventListener("click", function (e) {
      var btn = e.target.closest("#theme-toggle");
      if (!btn) return;
      var root = document.documentElement;
      var isDark =
        root.getAttribute("data-theme") === "dark" ||
        (!root.getAttribute("data-theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);
      var next = isDark ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (e2) {}
    });
  }

  // ---- mobile nav ---------------------------------------------------------
  function initNav() {
    document.addEventListener("click", function (e) {
      var toggle = e.target.closest("#nav-toggle");
      var links = document.getElementById("nav-links");
      if (toggle && links) {
        var open = links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
        return;
      }
      if (e.target.closest("#nav-links a") && links) {
        links.classList.remove("open");
      }
    });
  }

  // ---- forms --------------------------------------------------------------
  function validate(form) {
    var ok = true;
    form.querySelectorAll("[required]").forEach(function (input) {
      var field = input.closest("[data-field]") || input.closest(".field");
      var val = (input.value || "").trim();
      var bad = !val;
      if (input.type === "email") bad = bad || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val);
      if (field) field.classList.toggle("invalid", bad);
      if (bad) ok = false;
    });
    return ok;
  }

  function wireForm(formId, successId) {
    var form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate(form)) return;
      var success = document.getElementById(successId);
      form.querySelectorAll(".field, [data-field]").forEach(function (f) {
        f.style.display = "none";
      });
      form.querySelectorAll('button[type="submit"], .form-note').forEach(function (b) {
        b.style.display = "none";
      });
      if (success) success.classList.add("show");
    });
    form.addEventListener("input", function (e) {
      var field = e.target.closest("[data-field]") || e.target.closest(".field");
      if (field) field.classList.remove("invalid");
    });
  }

  // ---- book modal ---------------------------------------------------------
  function initModal() {
    document.addEventListener("click", function (e) {
      if (e.target.closest("[data-book]")) {
        e.preventDefault();
        openModal();
      }
      if (e.target.closest("[data-close]") || e.target.id === "book-modal") {
        closeModal();
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeModal();
    });
    wireForm("book-form", "book-success");
  }

  function openModal() {
    var m = document.getElementById("book-modal");
    if (m) m.classList.add("open");
  }
  function closeModal() {
    var m = document.getElementById("book-modal");
    if (m) m.classList.remove("open");
  }

  // ---- reveal on scroll ---------------------------------------------------
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(function (el) {
        el.classList.add("in");
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach(function (el) {
      io.observe(el);
    });
  }

  // ---- edit mode ----------------------------------------------------------
  function initEditMode() {
    var bar = document.createElement("div");
    bar.className = "edit-bar";
    bar.innerHTML =
      '<span class="status"><span class="dot"></span><span id="edit-label">Edit mode off</span></span>' +
      '<button id="edit-toggle" class="primary">Edit mode</button>' +
      '<button id="edit-export" class="hidden">Export content.js</button>' +
      '<button id="edit-reset" class="hidden">Reset</button>';
    document.body.appendChild(bar);

    var toast = document.createElement("div");
    toast.className = "toast";
    toast.id = "toast";
    document.body.appendChild(toast);

    document.getElementById("edit-toggle").addEventListener("click", toggleEdit);
    document.getElementById("edit-export").addEventListener("click", exportContent);
    document.getElementById("edit-reset").addEventListener("click", resetContent);
  }

  function toggleEdit() {
    var on = document.body.classList.toggle("editing");
    document.getElementById("edit-label").textContent = on
      ? "Editing — click any text"
      : "Edit mode off";
    document.getElementById("edit-toggle").textContent = on ? "Done" : "Edit mode";
    document.getElementById("edit-export").classList.toggle("hidden", !on);
    document.getElementById("edit-reset").classList.toggle("hidden", !on);

    document.querySelectorAll("[data-content]").forEach(function (el) {
      if (on) {
        el.setAttribute("contenteditable", "true");
        el.addEventListener("input", onEdit);
      } else {
        el.removeAttribute("contenteditable");
        el.removeEventListener("input", onEdit);
      }
    });
    if (!on) showToast("Saved — your changes persist on this device");
  }

  function onEdit(e) {
    var el = e.currentTarget;
    var path = el.getAttribute("data-content");
    var val = el.textContent;
    setPath(SITE, path, val);
    overrides[path] = val;
    saveOverrides(overrides);
  }

  function exportContent() {
    var json = JSON.stringify(SITE, null, 2);
    var file =
      "// Single source of truth for all site copy. Edit a value, refresh, it updates.\n" +
      "window.SITE = " +
      json +
      ";\n";
    var blob = new Blob([file], { type: "text/javascript" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "content.js";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast("Downloaded content.js — commit it to publish");
  }

  function resetContent() {
    overrides = {};
    saveOverrides(overrides);
    showToast("Reset — reloading");
    setTimeout(function () {
      location.reload();
    }, 600);
  }

  function showToast(msg) {
    var t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(t._timer);
    t._timer = setTimeout(function () {
      t.classList.remove("show");
    }, 2600);
  }

  // ---- boot ---------------------------------------------------------------
  function boot() {
    var page = document.body.getAttribute("data-page") || "home";
    buildHeader(page);
    buildFooter();
    renderServices();
    renderTeam();
    renderTestimonials();
    renderLocations();
    renderHeroCard();
    buildModal();
    hydrate();
    initTheme();
    initNav();
    initModal();
    initReveal();
    initEditMode();
    wireForm("contact-form", "contact-success");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
