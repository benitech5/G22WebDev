(function () {
  if (!window.PRACTITIONER_SESSION || !PRACTITIONER_SESSION.requireAuthOrRedirect()) return;

  var u = PRACTITIONER_SESSION.getDisplayUser();
  var sn = document.getElementById("sideName");
  var st = document.getElementById("sideTitle");
  if (sn) sn.textContent = u.name;
  if (st) st.textContent = u.title;

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

  var CONTRACT_TITLES = {
    cn8821: "Senior Nurse Practitioner — City General",
    icu902: "ICU Specialist — St. Jude's Medical",
  };

  var cdModal = document.getElementById("contractDetailModal");
  var termModal = document.getElementById("termModal");
  var cdTitle = document.getElementById("cdTitle");

  function openContractModal(id) {
    cdTitle.textContent = CONTRACT_TITLES[id] || "Contract details";
    cdModal.classList.add("open");
  }

  function closeContractModal() {
    cdModal.classList.remove("open");
  }

  document.querySelectorAll(".view[data-open]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openContractModal(btn.getAttribute("data-open"));
    });
  });

  document.getElementById("cdClose").addEventListener("click", closeContractModal);
  cdModal.addEventListener("click", function (e) {
    if (e.target === cdModal) closeContractModal();
  });

  document.getElementById("btnTerminateOpen").addEventListener("click", function () {
    termModal.classList.add("open");
  });

  document.getElementById("termCancel").addEventListener("click", function () {
    termModal.classList.remove("open");
  });

  termModal.addEventListener("click", function (e) {
    if (e.target === termModal) termModal.classList.remove("open");
  });

  document.getElementById("termSubmit").addEventListener("click", function () {
    var ta = document.getElementById("termReason");
    var reason = (ta && ta.value.trim()) || "";
    if (!reason) {
      toast("Please enter a reason for termination.");
      return;
    }
    termModal.classList.remove("open");
    closeContractModal();
    toast("Termination request submitted. HR will contact you within 30 days.");
    ta.value = "";
  });

  document.getElementById("btnExtend").addEventListener("click", function () {
    toast("Extension request sent to facility administrator (demo).");
  });

  document.getElementById("viewDisburse").addEventListener("click", function () {
    toast("Disbursement schedule: next release scheduled for Friday (demo).");
  });

  document.getElementById("supportReply").addEventListener("click", function () {
    toast("Opening message thread with Admin Support…");
  });

  document.querySelectorAll(".mc-tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      var name = tab.getAttribute("data-tab");
      document.querySelectorAll(".mc-tab").forEach(function (t) {
        t.classList.toggle("active", t === tab);
        t.setAttribute("aria-selected", t === tab ? "true" : "false");
      });
      document.getElementById("panel-active").hidden = name !== "active";
      document.getElementById("panel-pending").hidden = name !== "pending";
      document.getElementById("panel-term").hidden = name !== "term";
    });
  });

  document.querySelectorAll(".mc-card .start:not(.disabled)").forEach(function (btn) {
    btn.addEventListener("click", function () {
      toast("Shift clock-in recorded (demo).");
    });
  });

  document.querySelectorAll(".mc-card .end:not(.disabled)").forEach(function (btn) {
    btn.addEventListener("click", function () {
      toast("Shift ended and submitted for payroll (demo).");
    });
  });

  document.querySelector(".btn-pending-view") &&
    document.querySelector(".btn-pending-view").addEventListener("click", function () {
      toast("Application #APP-441: Under hospital review (demo).");
    });

  document.getElementById("mcBell").addEventListener("click", function () {
    toast("No new alerts (demo).");
  });

  document.getElementById("mcSettings").addEventListener("click", function () {
    toast("Settings (demo).");
  });

  document.getElementById("mcSearch").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      toast('Searching contracts for: "' + this.value + '"');
    }
  });

  document.getElementById("btnLogout") &&
    document.getElementById("btnLogout").addEventListener("click", function () {
      if (window.PRACTITIONER_SESSION) PRACTITIONER_SESSION.logout();
    });
})();
