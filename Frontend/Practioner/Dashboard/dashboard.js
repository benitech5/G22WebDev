(function () {
  if (!window.PRACTITIONER_SESSION || !PRACTITIONER_SESSION.requireAuthOrRedirect()) {
    return;
  }

  var u = PRACTITIONER_SESSION.getDisplayUser();
  var nameEl = document.getElementById("sideName");
  var titleEl = document.getElementById("sideTitle");
  var welcome = document.getElementById("dashWelcome");
  if (nameEl) nameEl.textContent = u.name;
  if (titleEl) titleEl.textContent = u.title;
  if (welcome) {
    var short = u.name.replace(/^Dr\.\s*/i, "Dr. ").split(" ").slice(0, 2).join(" ");
    welcome.textContent =
      "Welcome back, " + short + ". Here's your practice summary for today.";
  }

  var toastEl = document.getElementById("toastPp");
  function toast(msg) {
    if (!toastEl) {
      alert(msg);
      return;
    }
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () {
      toastEl.classList.remove("show");
    }, 2600);
  }

  document.getElementById("btnNotifDash") &&
    document.getElementById("btnNotifDash").addEventListener("click", function () {
      toast("You have 2 new notifications (demo).");
    });

  document.getElementById("btnSettingsDash") &&
    document.getElementById("btnSettingsDash").addEventListener("click", function () {
      toast("Settings panel opens here.");
    });

  document.getElementById("btnCompleteProfile") &&
    document.getElementById("btnCompleteProfile").addEventListener("click", function () {
      window.location.href = "../credentialandverify/credentials.html";
    });

  document.getElementById("globalSearch") &&
    document.getElementById("globalSearch").addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        toast('Search: "' + this.value + '" (connect to backend later).');
      }
    });

  document.querySelectorAll(".btn-shift-details").forEach(function (btn) {
    btn.addEventListener("click", function () {
      toast("Shift details: " + (btn.getAttribute("data-shift") || "") + " — modal would open here.");
    });
  });

  document.getElementById("btnStartShift") &&
    document.getElementById("btnStartShift").addEventListener("click", function () {
      toast("Shift started (demo). Time logged.");
    });

  document.getElementById("btnEndShift") &&
    document.getElementById("btnEndShift").addEventListener("click", function () {
      toast("Shift ended (demo). Pending supervisor approval.");
    });

  document.querySelectorAll(".quick-card[data-href]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      window.location.href = btn.getAttribute("data-href");
    });
  });

  document.getElementById("quickLogShifts") &&
    document.getElementById("quickLogShifts").addEventListener("click", function () {
      toast("Shift log: redirect or modal in a future iteration.");
    });

  document.getElementById("quickProfile") &&
    document.getElementById("quickProfile").addEventListener("click", function () {
      toast("Profile settings (demo).");
    });

  document.getElementById("btnExplore") &&
    document.getElementById("btnExplore").addEventListener("click", function () {
      window.location.href = "hospital-search.html";
    });

  document.getElementById("btnLogout") &&
    document.getElementById("btnLogout").addEventListener("click", function () {
      if (window.PRACTITIONER_SESSION) PRACTITIONER_SESSION.logout();
    });
})();
