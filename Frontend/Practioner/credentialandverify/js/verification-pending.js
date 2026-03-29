(function () {
  var name = "Dr. Kofi Mensah";
  try {
    var stored = sessionStorage.getItem("hl_practitioner_fullName");
    if (stored) name = stored;
  } catch (e) {}

  var welcome = document.getElementById("welcomeLine");
  if (welcome) {
    welcome.textContent =
      "Welcome, " +
      name +
      ". We're currently reviewing your professional credentials to ensure the highest standard of patient care.";
  }

  var initials = "KM";
  var parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    initials = (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  } else if (parts.length === 1 && parts[0].length >= 2) {
    initials = parts[0].slice(0, 2).toUpperCase();
  }
  var av = document.getElementById("userAvatar");
  if (av) av.textContent = initials;

  var el = document.getElementById("countdownSec");
  var remaining = 3;

  function schedule() {
    if (remaining <= 0) {
      try {
        sessionStorage.setItem("hl_verification_approved", "1");
      } catch (e) {}
      window.location.href = "verification-success.html";
      return;
    }
    if (el) el.textContent = String(remaining);
    remaining -= 1;
    setTimeout(schedule, 1000);
  }

  schedule();
})();
