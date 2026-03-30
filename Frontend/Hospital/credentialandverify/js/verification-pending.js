(function () {
  var name = "Healthcare Partner";
  try {
    name =
      sessionStorage.getItem("hl_hospital_fullName") ||
      localStorage.getItem("hl_hospital_reg_name") ||
      name;
  } catch (e) {}

  var welcome = document.getElementById("welcomeLine");
  if (welcome) {
    welcome.textContent =
      "Welcome, " +
      name +
      ". We're currently reviewing your hospital credentials to confirm your access to the network.";
  }

  var initials = "HP";
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
      window.location.href = "verification-success.html";
      return;
    }
    if (el) el.textContent = String(remaining);
    remaining -= 1;
    setTimeout(schedule, 1000);
  }

  schedule();
})();