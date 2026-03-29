(function () {
  var dropdown = document.getElementById("portalDropdown");
  var triggers = [
    document.getElementById("btnNavLogin"),
    document.getElementById("btnNavStart"),
    document.getElementById("btnHeroStart"),
  ].filter(Boolean);

  function setOpen(open) {
    if (!dropdown) return;
    if (open) {
      dropdown.classList.add("is-open");
      dropdown.setAttribute("aria-hidden", "false");
      triggers.forEach(function (b) {
        b.setAttribute("aria-expanded", "true");
      });
    } else {
      dropdown.classList.remove("is-open");
      dropdown.setAttribute("aria-hidden", "true");
      triggers.forEach(function (b) {
        b.setAttribute("aria-expanded", "false");
      });
    }
  }

  function toggleMenu() {
    if (!dropdown) return;
    setOpen(!dropdown.classList.contains("is-open"));
  }

  triggers.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleMenu();
    });
  });

  document.addEventListener("click", function () {
    setOpen(false);
  });

  if (dropdown) {
    dropdown.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });
})();
