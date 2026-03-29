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

  document.getElementById("btnEmergency").addEventListener("click", function () {
    showToast("Emergency alert workflow would open (demo).");
  });

  document.getElementById("btnPostAlert").addEventListener("click", function () {
    showToast("Facility-wide emergency alert posted (demo).");
  });

  document.getElementById("btnBell").addEventListener("click", function () {
    showToast("2 new notifications (demo).");
  });

  document.getElementById("btnManagePrac").addEventListener("click", function () {
    showToast("Practitioner roster (demo).");
  });

  document.getElementById("globalSearch").addEventListener("keydown", function (e) {
    if (e.key === "Enter") showToast('Search: "' + this.value + '"');
  });
})();
