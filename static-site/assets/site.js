(function () {
  var toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var el = document.documentElement;
      var next = el.getAttribute("data-theme") === "light" ? "dark" : "light";
      el.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  var menuToggle = document.getElementById("menu-toggle");
  var mobileNav = document.getElementById("mobile-nav");
  var mobileNavOverlay = document.getElementById("mobile-nav-overlay");
  if (menuToggle && mobileNav && mobileNavOverlay) {
    var closeMobileNav = function () {
      menuToggle.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
      mobileNav.classList.remove("open");
      mobileNavOverlay.classList.remove("open");
      document.body.style.overflow = "";
    };
    var openMobileNav = function () {
      menuToggle.classList.add("open");
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Close menu");
      mobileNav.classList.add("open");
      mobileNavOverlay.classList.add("open");
      document.body.style.overflow = "hidden";
    };
    menuToggle.addEventListener("click", function () {
      if (mobileNav.classList.contains("open")) closeMobileNav();
      else openMobileNav();
    });
    mobileNavOverlay.addEventListener("click", closeMobileNav);
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMobileNav);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMobileNav();
    });
  }

  var year = document.getElementById("footer-year");
  if (year) {
    year.textContent = "© " + new Date().getFullYear() + " NYU Ethical Tech CoLab";
  }

  // ---------- Portfolio explorer: tag filter + accordion ----------
  var explorer = document.querySelector(".explorer-wrap");
  if (explorer) {
    var activeTag = null;
    var chips = explorer.querySelectorAll(".chip[data-tag], .chip.all");
    var areas = explorer.querySelectorAll(".research-area");
    var emptyNote = explorer.querySelector(".empty-note");

    function applyFilter() {
      var visibleCount = 0;
      areas.forEach(function (area) {
        var tags = (area.getAttribute("data-tags") || "").split(",");
        var show = !activeTag || tags.indexOf(activeTag) !== -1;
        area.classList.toggle("hidden", !show);
        if (show) visibleCount++;
      });
      chips.forEach(function (chip) {
        var tag = chip.getAttribute("data-tag") || null;
        chip.classList.toggle("active", tag === activeTag);
      });
      if (emptyNote) emptyNote.style.display = visibleCount === 0 ? "block" : "none";
    }

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var tag = chip.getAttribute("data-tag") || null;
        activeTag = activeTag === tag ? null : tag;
        applyFilter();
      });
    });

    areas.forEach(function (area) {
      var toggleBtn = area.querySelector(".area-toggle");
      if (toggleBtn) {
        toggleBtn.addEventListener("click", function () {
          area.classList.toggle("open");
          toggleBtn.setAttribute("aria-expanded", area.classList.contains("open"));
        });
      }
    });

    applyFilter();
  }

  // ---------- Team page: cohort filter ----------
  var cohortSelect = document.getElementById("cohort-filter");
  if (cohortSelect) {
    var rows = document.querySelectorAll(".researcher-row");
    var countEl = document.getElementById("researchers-count");
    var emptyEl = document.getElementById("researchers-empty");

    function applyCohortFilter() {
      var term = cohortSelect.value;
      var visibleCount = 0;
      rows.forEach(function (row) {
        var show = row.getAttribute("data-term") === term;
        row.classList.toggle("hidden", !show);
        if (show) visibleCount++;
      });
      if (countEl) countEl.textContent = visibleCount + (visibleCount === 1 ? " researcher" : " researchers");
      if (emptyEl) emptyEl.style.display = visibleCount === 0 ? "block" : "none";
    }

    cohortSelect.addEventListener("change", applyCohortFilter);
    applyCohortFilter();
  }
})();
