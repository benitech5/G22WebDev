(function () {
  if (!window.HOSPITAL_SESSION || !HOSPITAL_SESSION.requireAuth()) return;
  var name = HOSPITAL_SESSION.getAdmin();
  var el = document.getElementById("sideAdminName");
  if (el) el.textContent = name.charAt(0).toUpperCase() + name.slice(1);

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

  var modal = document.getElementById("modalCreate");
  function openM() {
    modal.classList.add("open");
  }
  function closeM() {
    modal.classList.remove("open");
  }

  document.getElementById("btnOpenCreate").addEventListener("click", openM);
  document.getElementById("closeCreate").addEventListener("click", closeM);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeM();
  });

  document.getElementById("formCreate").addEventListener("submit", function (e) {
    e.preventDefault();
    closeM();
    showToast("Contract draft generated and sent to practitioner (demo).");
  });

  document.getElementById("discardDraft").addEventListener("click", function () {
    closeM();
    showToast("Draft discarded.");
  });

  var emergencyModal = document.getElementById("modalEmergency");
  function openEmergency() {
    emergencyModal.classList.add("open");
  }
  function closeEmergency() {
    emergencyModal.classList.remove("open");
  }

  document.getElementById("btnEmergency").addEventListener("click", openEmergency);
  document.getElementById("btnPostAlert").addEventListener("click", openEmergency);
  document.getElementById("closeEmergency").addEventListener("click", closeEmergency);
  document.getElementById("cancelEmergency").addEventListener("click", closeEmergency);
  emergencyModal.addEventListener("click", function (e) {
    if (e.target === emergencyModal) closeEmergency();
  });

  document.getElementById("formEmergency").addEventListener("submit", function (e) {
    e.preventDefault();
    closeEmergency();
    showToast("Emergency alert posted to your practitioner roster.");
  });

  document.getElementById("btnBell").addEventListener("click", function () {
    showToast("2 new notifications (demo).");
  });

  document.getElementById("btnManagePrac").addEventListener("click", function () {
    window.location.href = "manage-practitioners.html";
  });

  document.getElementById("globalSearch").addEventListener("keydown", function (e) {
    if (e.key === "Enter") showToast('Search: "' + this.value + '"');
  });
})();
