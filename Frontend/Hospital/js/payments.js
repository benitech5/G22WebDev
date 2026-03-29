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

  var sn = document.getElementById("sideAdminName");
  if (sn) sn.textContent = HOSPITAL_SESSION.getAdmin();

  var modal = document.getElementById("modalDeposit");
  document.getElementById("btnOpenConfirm").addEventListener("click", function () {
    modal.classList.add("open");
  });
  document.getElementById("closeDep").addEventListener("click", function () {
    modal.classList.remove("open");
  });
  document.getElementById("depCancel").addEventListener("click", function () {
    modal.classList.remove("open");
  });
  modal.addEventListener("click", function (e) {
    if (e.target === modal) modal.classList.remove("open");
  });

  document.getElementById("depConfirm").addEventListener("click", function () {
    modal.classList.remove("open");
    showToast("Deposit of GH₵5,025.00 confirmed — funds moved to escrow (demo).");
    document.getElementById("depAmt").value = "";
    document.getElementById("depMemo").value = "";
  });

  document.getElementById("btnAuthorize").addEventListener("click", function () {
    showToast("Transfer authorized — payment queued for release (demo).");
  });

  document.getElementById("btnEmergency").addEventListener("click", function () {
    showToast("Emergency alert (demo).");
  });

  document.getElementById("btnTxFilter").addEventListener("click", function () {
    showToast("Filter panel (demo).");
  });

  document.getElementById("paySearch").addEventListener("keydown", function (e) {
    if (e.key === "Enter") showToast("Searching transactions…");
  });
})();
