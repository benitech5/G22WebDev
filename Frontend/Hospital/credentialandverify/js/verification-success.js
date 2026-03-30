(function () {
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function ensureHospitalLoggedIn() {
    try {
      if (localStorage.getItem("hl_hospital_logged_in") !== "1") {
        localStorage.setItem("hl_hospital_logged_in", "1");
      }
      if (!localStorage.getItem("hl_hospital_admin_name")) {
        var hospitalName = getHospitalName();
        var adminName = (hospitalName.split(" ")[0] || "Admin");
        localStorage.setItem("hl_hospital_admin_name", adminName);
      }
    } catch (e) {
      /* ignore storage errors */
    }
  }

  function getHospitalName() {
    try {
      return (
        localStorage.getItem("hl_hospital_reg_name") ||
        localStorage.getItem("hl_hospital_name") ||
        "Verified Hospital"
      );
    } catch (e) {
      return "Verified Hospital";
    }
  }

  function getSelectedProfessions() {
    try {
      var raw = localStorage.getItem("hl_hospital_professions");
      if (!raw) return [];
      var list = JSON.parse(raw);
      if (!Array.isArray(list)) return [];
      return list;
    } catch (e) {
      return [];
    }
  }

  ensureHospitalLoggedIn();
  var hospitalName = getHospitalName();
  var professions = getSelectedProfessions();
  var certName = document.getElementById("certName");
  if (certName) certName.textContent = hospitalName;

  var desc = document.getElementById("certDesc");
  if (desc) {
    var servicesText = "key hospital services";
    if (professions.length > 0) {
      servicesText = professions.join(", ").replace(/, ([^,]*)$/, " and $1");
    }
    desc.innerHTML =
      "This certifies that <strong>" +
      escapeHtml(hospitalName) +
      "</strong> is verified as a registered facility offering <strong>" +
      escapeHtml(servicesText) +
      "</strong> and is authorized to operate within the HealthLinka network.";
  }

  function toast(msg) {
    alert(msg);
  }

  var dl = document.getElementById("btnDownload");
  if (dl) {
    dl.addEventListener("click", function () {
      window.print();
    });
  }

  var share = document.getElementById("cardShare");
  if (share) {
    share.addEventListener("click", function () {
      toast("Share link: feature coming with backend integration.");
    });
  }

  var hist = document.getElementById("cardHistory");
  if (hist) {
    hist.addEventListener("click", function () {
      toast("Verification history: feature coming with backend integration.");
    });
  }
})();