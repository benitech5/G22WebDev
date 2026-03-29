(function () {
  if (!window.HOSPITAL_SESSION || !HOSPITAL_SESSION.requireAuth()) return;
  var toast = document.getElementById("toastH");
  function showToast(msg) {
    if (!toast) {
      alert(msg);
      return;
    }
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(showToast.t);
    showToast.t = setTimeout(function () {
      toast.classList.remove("show");
    }, 2600);
  }

  var n = HOSPITAL_SESSION.getAdmin();
  var sn = document.getElementById("sideAdminName");
  if (sn) sn.textContent = n;

  document.querySelectorAll(".tab-h").forEach(function (tab) {
    tab.addEventListener("click", function () {
      var name = tab.getAttribute("data-tab");
      document.querySelectorAll(".tab-h").forEach(function (t) {
        t.classList.toggle("active", t === tab);
      });
      document.getElementById("panel-all").classList.toggle("panel-hidden", name !== "all");
      document.getElementById("panel-all").classList.toggle("active", name === "all");
      document.getElementById("panel-app").classList.toggle("panel-hidden", name !== "app");
      document.getElementById("panel-ext").classList.toggle("panel-hidden", name !== "ext");
    });
  });

  var modalApp = document.getElementById("modalApplicant");
  document.querySelectorAll(".link-view").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      var id = a.getAttribute("data-app");
      if (id === "kwame") {
        document.getElementById("appName").textContent = "Dr. Kwame Asante";
        document.getElementById("appSummary").textContent =
          "General practice background with focus on community health initiatives.";
      } else {
        document.getElementById("appName").textContent = "Dr. Yaa Offin";
        document.getElementById("appSummary").textContent =
          "Experienced in non-invasive cardiology and team leadership. Previously directed regional outreach programs and maintains active board certification.";
      }
      modalApp.classList.add("open");
    });
  });

  document.getElementById("closeApp").addEventListener("click", function () {
    modalApp.classList.remove("open");
  });
  modalApp.addEventListener("click", function (e) {
    if (e.target === modalApp) modalApp.classList.remove("open");
  });

  document.getElementById("btnReject").addEventListener("click", function () {
    modalApp.classList.remove("open");
    showToast("Application rejected (demo).");
  });
  document.getElementById("btnInterview").addEventListener("click", function () {
    showToast("Interview request sent to practitioner (demo).");
  });
  document.getElementById("btnApprove").addEventListener("click", function () {
    modalApp.classList.remove("open");
    showToast("Contract sent for e-signature (demo).");
  });

  var modalCreate = document.getElementById("modalCreateDup");
  document.getElementById("btnNewContract").addEventListener("click", function () {
    modalCreate.classList.add("open");
  });
  document.getElementById("closeCreateDup").addEventListener("click", function () {
    modalCreate.classList.remove("open");
  });
  modalCreate.addEventListener("click", function (e) {
    if (e.target === modalCreate) modalCreate.classList.remove("open");
  });
  document.getElementById("btnQuickSend").addEventListener("click", function () {
    modalCreate.classList.remove("open");
    showToast("Contract generated for " + (document.getElementById("quickPract").value || "practitioner") + " (demo).");
  });

  document.getElementById("btnExport").addEventListener("click", function () {
    showToast("Export started — CSV download (demo).");
  });

  document.getElementById("btnEmergency").addEventListener("click", function () {
    showToast("Emergency alert (demo).");
  });

  document.querySelector(".ca-update").addEventListener("click", function (e) {
    e.preventDefault();
    showToast("Opening insurance update workflow…");
  });
  document.querySelector(".ca-review").addEventListener("click", function (e) {
    e.preventDefault();
    showToast("Opening applicant verification queue…");
  });

  document.getElementById("linkReviewTerm").addEventListener("click", function (e) {
    e.preventDefault();
    showToast("Termination queue (demo).");
  });
})();
