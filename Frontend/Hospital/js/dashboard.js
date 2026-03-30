(function () {
  if (!window.HOSPITAL_SESSION || !HOSPITAL_SESSION.requireAuth()) return;
  var BACKEND_API = (function () {
    if (typeof window === 'undefined') return 'http://localhost:4000/api';
    if (window.BACKEND_API) return window.BACKEND_API;
    if (!window.location.hostname || window.location.protocol === 'file:') return 'http://localhost:4000/api';
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:4000/api';
    }
    return '/api';
  })();
  var name = HOSPITAL_SESSION.getAdmin();
  var el = document.getElementById("sideAdminName");
  if (el) el.textContent = name.charAt(0).toUpperCase() + name.slice(1);

  var brandNameEl = document.querySelector('.hp-brand .name');
  if (brandNameEl) {
    var hospitalName = HOSPITAL_SESSION.getHospitalName ? HOSPITAL_SESSION.getHospitalName() : localStorage.getItem('hl_hospital_reg_name') || '';
    if (hospitalName) brandNameEl.textContent = hospitalName;
  }

  function getHospitalId() {
    return (window.HOSPITAL_SESSION && typeof HOSPITAL_SESSION.getHospitalId === 'function')
      ? HOSPITAL_SESSION.getHospitalId()
      : localStorage.getItem('hl_hospital_id') || '';
  }

  function getHospitalToken() {
    return (window.HOSPITAL_SESSION && typeof HOSPITAL_SESSION.getToken === 'function')
      ? HOSPITAL_SESSION.getToken()
      : localStorage.getItem('hl_hospital_token') || '';
  }

  async function backendFetch(path, options = {}) {
    try {
      const token = getHospitalToken();
      const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
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

  async function updateHospitalStats() {
    const hospitalId = getHospitalId();
    if (!hospitalId) return;
    const stats = await backendFetch(`/hospital/${hospitalId}/stats`);
    if (!stats) return;
    const cards = document.querySelectorAll('.hp-stat-grid .hp-stat-card .val');
    if (cards[0]) cards[0].textContent = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(stats.escrowBalance || 0);
    if (cards[1]) cards[1].textContent = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(stats.disbursedQuarter || 0);
    if (cards[2]) cards[2].textContent = `${stats.pendingReleases || 0} Pending Releases`;
  }

  async function refreshHospitalShifts() {
    const hospitalId = getHospitalId();
    if (!hospitalId) return;
    const shifts = await backendFetch(`/shifts?hospitalId=${hospitalId}`);
    if (!Array.isArray(shifts) || shifts.length === 0) return;
    const list = document.querySelector('.prac-list');
    if (!list) return;
    list.innerHTML = shifts.slice(0, 4).map(function (s) {
      var dotColor = '#d1d5db';
      if (s.status === 'Active') dotColor = '#22c55e';
      if (s.status === 'Upcoming') dotColor = '#f59e0b';
      return `
        <div class="prac-item">
          <img src="../Practioner/Dashboard/assets/Profile.png" alt="" />
          <div>
            <div class="pi-name">${s.title || 'Shift assignment'}</div>
            <div class="pi-sub">${s.status || 'Scheduled'} · ${s.startTime || ''}</div>
          </div>
          <span class="dot" style="background:${dotColor}"></span>
        </div>
      `;
    }).join('');
  }

  updateHospitalStats();
  refreshHospitalShifts();

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

  document.getElementById("formCreate").addEventListener("submit", async function (e) {
    e.preventDefault();
    closeM();

    var practName = document.getElementById("practName").value.trim();
    var spec = document.getElementById("spec").value;
    var dur = parseInt(document.getElementById("dur").value, 10) || 12;
    var stipend = document.getElementById("stipend").value.trim();
    var terms = document.getElementById("terms").value.trim();

    var amount = parseFloat(stipend.replace(/[^0-9.]/g, "")) || 0;
    var startDate = new Date();
    var endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + dur);

    var payload = {
      name: practName || `Contract for ${spec}`,
      department: spec,
      type: "Staffing",
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      value: amount,
      hospitalId: getHospitalId(),
    };

    var result = await backendFetch('/contracts', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (result && result.contract) {
      showToast('Contract created successfully and saved to the backend.');
      updateHospitalStats();
      return;
    }

    showToast('Contract draft generated and sent to practitioner (demo).');
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
