(function () {
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

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var fullName = (document.getElementById("fullName").value || "").trim();
    var profession = document.getElementById("profession").value;
    var license = (document.getElementById("license").value || "").trim();
    var region = document.getElementById("region").value;

    if (!fullName || !profession || !region) {
      alert("Please complete all required fields.");
      return;
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
