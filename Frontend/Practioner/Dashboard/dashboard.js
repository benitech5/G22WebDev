(function () {
  if (!window.PRACTITIONER_SESSION || !PRACTITIONER_SESSION.requireAuthOrRedirect()) {
    return;
  }

  var BACKEND_API = (function () {
    if (typeof window === 'undefined') return 'http://localhost:4000/api';
    if (window.BACKEND_API) return window.BACKEND_API;
    if (!window.location.hostname || window.location.protocol === 'file:') return 'http://localhost:4000/api';
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:4000/api';
    }
    return '/api';
  })();

  function getPractitionerToken() {
    try {
      return localStorage.getItem('hl_practitioner_token') || '';
    } catch (e) {
      return '';
    }
  }

  function getPractitionerProfileId() {
    try {
      return localStorage.getItem('hl_practitioner_profile_id') || '';
    } catch (e) {
      return '';
    }
  }

  async function backendFetch(path, options = {}) {
    try {
      const token = getPractitionerToken();
      const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      };
      if (token) headers.Authorization = `Bearer ${token}`;
      const response = await fetch(`${BACKEND_API}${path}`, {
        ...options,
        headers,
      });
      if (!response.ok) return null;
      return await response.json().catch(() => null);
    } catch (err) {
      return null;
    }
  }

  async function findNextShift(status) {
    const profileId = getPractitionerProfileId();
    if (!profileId) return null;
    const shifts = await backendFetch(`/shifts?practitionerId=${profileId}&status=${status}`);
    return Array.isArray(shifts) && shifts.length ? shifts[0] : null;
  }

  async function startShiftRecord() {
    const profileId = getPractitionerProfileId();
    if (!profileId) return null;
    const shift = await findNextShift('Upcoming');
    if (!shift) return null;
    return await backendFetch(`/practitioner/${profileId}/shift/${shift.id}/start`, {
      method: 'PATCH',
      body: JSON.stringify({}),
    });
  }

  async function endShiftRecord() {
    const profileId = getPractitionerProfileId();
    if (!profileId) return null;
    const shift = await findNextShift('Active');
    if (!shift) return null;
    return await backendFetch(`/practitioner/${profileId}/shift/${shift.id}/end`, {
      method: 'PATCH',
      body: JSON.stringify({ hoursLogged: 8 }),
    });
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
    document.getElementById("btnStartShift").addEventListener("click", async function () {
      const result = await startShiftRecord();
      if (result) {
        toast("Shift started.");
      } else {
        toast("Shift started (demo). Time logged.");
      }
    });

  document.getElementById("btnEndShift") &&
    document.getElementById("btnEndShift").addEventListener("click", async function () {
      const result = await endShiftRecord();
      if (result) {
        toast("Shift ended.");
      } else {
        toast("Shift ended (demo). Time logged.");
      }
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
