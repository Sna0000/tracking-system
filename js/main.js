/* ============ SCTTS — shared behaviour (theme, nav, toasts, reveal, counters) ============ */

/* ---------- Theme (persisted) ---------- */
(function initTheme() {
  var saved = localStorage.getItem("sctts-theme");
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.setAttribute("data-theme", saved || (prefersDark ? "dark" : "light"));
})();

function toggleTheme() {
  var html = document.documentElement;
  var next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  localStorage.setItem("sctts-theme", next);
  syncThemeIcon();
  toast(next === "dark" ? "Dark mode on" : "Light mode on");
}

function syncThemeIcon() {
  var dark = document.documentElement.getAttribute("data-theme") === "dark";
  document.querySelectorAll("[data-theme-icon]").forEach(function (el) {
    el.className = dark ? "fa-solid fa-sun" : "fa-solid fa-moon";
  });
}

/* ---------- Toasts ---------- */
function toast(message, description) {
  var box = document.getElementById("toasts");
  if (!box) return;
  var el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = "<strong>" + message + "</strong>" + (description ? "<small>" + description + "</small>" : "");
  box.appendChild(el);
  setTimeout(function () {
    el.classList.add("out");
    setTimeout(function () { el.remove(); }, 250);
  }, 3200);
}

/* ---------- Navbar ---------- */
document.addEventListener("DOMContentLoaded", function () {
  syncThemeIcon();

  var nav = document.querySelector(".navbar");
  var onScroll = function () {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll);

  var burger = document.querySelector(".burger");
  var menu = document.querySelector(".mobile-menu");
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("open");
        burger.classList.remove("open");
      });
    });
  }

  document.querySelectorAll("[data-theme-toggle]").forEach(function (b) {
    b.addEventListener("click", toggleTheme);
  });

  /* highlight the current page link */
  var file = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-menu a").forEach(function (a) {
    if (a.getAttribute("href") === file) a.classList.add("active");
  });

  /* buttons that only show a message (upcoming features) */
  document.querySelectorAll("[data-toast]").forEach(function (b) {
    b.addEventListener("click", function () {
      toast(b.getAttribute("data-toast"), b.getAttribute("data-toast-desc") || "");
    });
  });

  /* ---------- Reveal on scroll ---------- */
  var revealables = document.querySelectorAll(".reveal");
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("shown");
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  revealables.forEach(function (el) { revealObserver.observe(el); });

  /* ---------- Count-up statistics ---------- */
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    var statObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        countUp(e.target);
        statObserver.unobserve(e.target);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { statObserver.observe(el); });
  }
});

function countUp(el) {
  var target = Number(el.getAttribute("data-count"));
  var suffix = el.getAttribute("data-suffix") || "";
  var frame = 0;
  var total = 60;
  var id = setInterval(function () {
    frame += 1;
    var progress = 1 - Math.pow(1 - frame / total, 3);
    el.textContent = Math.round(target * progress).toLocaleString() + suffix;
    if (frame >= total) clearInterval(id);
  }, 16);
}