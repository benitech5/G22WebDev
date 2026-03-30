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

  async function backendFetch(path, options) {
    try {
      const token = getPractitionerToken();
      const headers = {
        'Content-Type': 'application/json',
        ...(options && options.headers ? options.headers : {}),
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

  function statusClass(status) {
    const s = String(status || '').toLowerCase();
    if (s.includes('active')) return 'active';
    if (s.includes('pending')) return 'pending';
    if (s.includes('verified')) return 'verified';
    return 'review';
  }

  function formatContractDate(value) {
    if (!value) return '';
    var d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function renderContractCard(contract) {
    var active = String(contract.status || '').toLowerCase() === 'active';
    var pending = /pending/i.test(contract.status);
    var cardImage = contract.image || 'assets/Hospital1.png';
    var hospitalName = contract.hospitalName || contract.unit || contract.department || 'Healthcare Facility';
    var dateRange = formatContractDate(contract.startDate) + ' – ' + formatContractDate(contract.endDate);
    return `
      <article class="mc-card ${active ? '' : 'pending'}" data-contract="${contract.id}">
        <img src="${cardImage}" alt="${hospitalName}" />
        <div class="mc-card-body">
          <div class="mc-badge-row">
            <span class="mc-badge ${statusClass(contract.status)}">${(contract.status || 'Pending').toUpperCase()}</span>
            <span class="mc-id">#${contract.id}</span>
          </div>
          <h3>${contract.name || 'Contract Assignment'}</h3>
          <div class="hosp">${hospitalName}</div>
          <div class="meta">${contract.unitSub || contract.department || 'General Ward'} · ${dateRange}</div>
          <div class="mc-actions">
            <button type="button" class="view" data-open="${contract.id}">View Details</button>
            <button type="button" class="start ${active ? '' : 'disabled'}" ${active ? '' : 'disabled'}>Start Shift</button>
            <button type="button" class="end ${active ? '' : 'disabled'}" ${active ? '' : 'disabled'}>End Shift</button>
          </div>
        </div>
      </article>
    `;
  }

  function renderContractPanels(contracts) {
    var activeParent = document.querySelector('#panel-active .mc-cards');
    var pendingParent = document.querySelector('#panel-pending .mc-cards');
    if (!activeParent || !pendingParent) return;

    var activeContracts = contracts.filter(function (c) {
      return String(c.status || '').toLowerCase().includes('active');
    });
    var pendingContracts = contracts.filter(function (c) {
      return /pending/i.test(c.status) || String(c.status || '').toLowerCase().includes('review');
    });

    if (activeContracts.length) {
      activeParent.innerHTML = activeContracts.map(renderContractCard).join('');
    }
    if (pendingContracts.length) {
      pendingParent.innerHTML = pendingContracts.map(renderContractCard).join('');
    }

    wireContractButtons();
  }

  async function loadContracts() {
    var profileId = getPractitionerProfileId();
    if (!profileId) return;
    var contracts = await backendFetch(`/contracts?practitionerId=${profileId}`);
    if (!Array.isArray(contracts) || contracts.length === 0) return;
    renderContractPanels(contracts);
  }

  function wireContractButtons() {
    document.querySelectorAll('.mc-card .start:not(.disabled)').forEach(function (btn) {
      btn.removeEventListener('click', toast);
      btn.addEventListener('click', function () {
        toast('Shift clock-in recorded (demo).');
      });
    });

    document.querySelectorAll('.mc-card .end:not(.disabled)').forEach(function (btn) {
      btn.removeEventListener('click', toast);
      btn.addEventListener('click', function () {
        toast('Shift ended and submitted for payroll (demo).');
      });
    });
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

  wireContractButtons();
  loadContracts();

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
