(function () {
  function getHospitalName() {
    try {
      return localStorage.getItem("hl_hospital_reg_name") || "";
    } catch (e) {
      return "";
    }
  }

  function initFullName() {
    var el = document.getElementById("fullName");
    if (!el) return;
    var name = getHospitalName();
    if (name) el.value = name;
  }

  function initProfessions() {
    var stored = localStorage.getItem("hl_hospital_professions");
    if (!stored) return;
    try {
      var list = JSON.parse(stored);
      if (!Array.isArray(list)) return;
      var checkboxes = document.querySelectorAll('input[name="professions"]');
      checkboxes.forEach(function (checkbox) {
        if (list.indexOf(checkbox.value) !== -1) {
          checkbox.checked = true;
        }
      });
    } catch (e) {
      /* ignore invalid data */
    }
  }

  function getSelectedProfessions() {
    var checked = document.querySelectorAll('input[name="professions"]:checked');
    return Array.prototype.slice.call(checked).map(function (checkbox) {
      return checkbox.value;
    });
  }

  function showFileName(file) {
    var fileNameEl = document.getElementById("fileName");
    if (!fileNameEl) return;
    if (!file) {
      fileNameEl.hidden = true;
      fileNameEl.textContent = "";
      return;
    }
    fileNameEl.hidden = false;
    fileNameEl.textContent = "Selected: " + file.name;
  }

  function safeSetItem(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      /* ignore storage errors */
    }
  }

  function setHospitalLoggedIn(adminName) {
    try {
      localStorage.setItem("hl_hospital_logged_in", "1");
      if (adminName) {
        localStorage.setItem("hl_hospital_admin_name", adminName);
      }
    } catch (e) {
      /* ignore storage errors */
    }
  }

  function getAdminName() {
    var name = getHospitalName() || "Admin";
    return (name.split(" ")[0] || "Admin");
  }

  initFullName();
  initProfessions();

  var form = document.getElementById("credentialsForm");
  var fileInput = document.getElementById("fileInput");
  var dropzone = document.getElementById("dropzone");

  var MAX_BYTES = 10 * 1024 * 1024;

  if (fileInput) {
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
  }

  if (dropzone) {
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
      try {
        fileInput.files = dt.files;
      } catch (err) {
        /* ignore unsupported file assignment */
      }
      fileInput.dispatchEvent(new Event("change", { bubbles: true }));
    });
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fullName = (document.getElementById("fullName").value || "").trim();
      var professions = getSelectedProfessions();
      var license = (document.getElementById("license").value || "").trim();
      var region = document.getElementById("region").value;

      if (!fullName || professions.length === 0 || !region) {
        alert("Please complete all required fields and choose at least one profession.");
        return;
      }

      safeSetItem("hl_hospital_fullName", fullName);
      safeSetItem("hl_hospital_professions", JSON.stringify(professions));
      safeSetItem("hl_hospital_license", license);
      safeSetItem("hl_hospital_region", region);
      safeSetItem("hl_hospital_credentials_submitted", "1");

      var hospitalName = getHospitalName();
      if (hospitalName) {
        safeSetItem("hl_hospital_name", hospitalName);
      }
      setHospitalLoggedIn(getAdminName());

      window.location.href = "verification-pending.html";
    });
  }
})();