(function () {
  const BACKEND_API = (function () {
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
      return localStorage.getItem("hl_practitioner_token") || ""
    } catch (e) {
      return ""
    }
  }

  function getSignupUserId() {
    try {
      return localStorage.getItem("hl_practitioner_userId") || localStorage.getItem("hl_signup_userId") || ""
    } catch (e) {
      return ""
    }
  }

  function sendCredentialsToBackend(payload) {
    const token = getPractitionerToken()
    return fetch(`${BACKEND_API}/auth/credentials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json().catch(() => ({})))
  }

  (function initFullName() {
    var el = document.getElementById("fullName");
    if (!el) return;
    var name = "";
    try {
      name = localStorage.getItem("hl_signup_fullname") || "";
      if (!name) name = localStorage.getItem("hl_hospital_reg_name") || "";
    } catch (e) {}
    if (name) el.value = name;
  })();

  var form = document.getElementById("credentialsForm");
  var fileInput = document.getElementById("fileInput");
  var dropzone = document.getElementById("dropzone");
  var fileNameEl = document.getElementById("fileName");

  var MAX_BYTES = 10 * 1024 * 1024;

  function showFileName(file) {
    if (!file) {
      fileNameEl.hidden = true;
      fileNameEl.textContent = "";
      return;
    }
    fileNameEl.hidden = false;
    fileNameEl.textContent = "Selected: " + file.name;
  }

  fileInput.addEventListener("change", function () {
    var f = fileInput.files && fileInput.files[0];
    if (f && f.size > MAX_BYTES) {
      alert("File exceeds 10MB. Please choose a smaller file.");
      fileInput.value = "";
      showFileName(null);
      return;
    }
    showFileName(f || null);
  });

  ["dragenter", "dragover", "dragleave", "drop"].forEach(function (ev) {
    dropzone.addEventListener(ev, function (e) {
      e.preventDefault();
      e.stopPropagation();
    });
  });

  dropzone.addEventListener("dragover", function () {
    dropzone.classList.add("dragover");
  });

  dropzone.addEventListener("dragleave", function () {
    dropzone.classList.remove("dragover");
  });

  dropzone.addEventListener("drop", function (e) {
    dropzone.classList.remove("dragover");
    var dt = e.dataTransfer;
    if (!dt || !dt.files || !dt.files[0]) return;
    fileInput.files = dt.files;
    fileInput.dispatchEvent(new Event("change", { bubbles: true }));
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    var fullName = (document.getElementById("fullName").value || "").trim();
    var profession = document.getElementById("profession").value;
    var license = (document.getElementById("license").value || "").trim();
    var region = document.getElementById("region").value;

    if (!fullName || !profession || !region) {
      alert("Please complete all required fields.");
      return;
    }

    var payload = {
      fullName: fullName,
      profession: profession,
      licenseNumber: license,
      region: region,
    }
    var userId = getSignupUserId()
    if (userId) payload.userId = userId

    try {
      const response = await sendCredentialsToBackend(payload)
      if (response && response.practitionerId) {
        sessionStorage.setItem("hl_practitioner_profile_id", response.practitionerId)
      }
    } catch (err) {
      console.warn("Credential backend failed", err)
    }

    try {
      sessionStorage.setItem("hl_practitioner_fullName", fullName);
      sessionStorage.setItem("hl_practitioner_profession", profession);
      sessionStorage.setItem("hl_practitioner_license", license);
      sessionStorage.setItem("hl_practitioner_region", region);
      sessionStorage.setItem("hl_credentials_submitted", "1");
    } catch (err) {
      /* ignore storage errors */
    }

    window.location.href = "verification-pending.html";
  });
})();
