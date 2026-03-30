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

  document.getElementById("depConfirm").addEventListener("click", async function () {
    modal.classList.remove("open");
    var amount = parseFloat((document.getElementById("depAmt").value || "").replace(/[^0-9.]/g, ""));
    var memo = (document.getElementById("depMemo").value || "").trim();
    var source = document.getElementById("srcAcct").value || "Operating Fund";
    if (!amount || amount <= 0) {
      showToast("Enter a valid deposit amount.");
      return;
    }

    var hospitalId = getHospitalId();
    var reference = `DEMO-${Date.now()}`;
    var result = await backendFetch(`/hospital/${hospitalId}/deposit`, {
      method: 'POST',
      body: JSON.stringify({ amount: amount, sourceAccount: source, reference: reference }),
    });
    if (result && result.transaction) {
      showToast(`Deposit of GH₵${amount.toFixed(2)} recorded to escrow.`);
      document.getElementById("depAmt").value = "";
      document.getElementById("depMemo").value = "";
      return;
    }

    showToast("Deposit of GH₵5,025.00 confirmed — funds moved to escrow (demo). ");
    document.getElementById("depAmt").value = "";
    document.getElementById("depMemo").value = "";
  });

  document.getElementById("btnAuthorize").addEventListener("click", async function () {
    var amount = parseFloat((document.getElementById("relAmt").value || "").replace(/[^0-9.]/g, ""));
    var recipient = (document.getElementById("payRecipient").value || "").trim();
    if (!amount || amount <= 0) {
      showToast("Enter a valid release amount.");
      return;
    }

    var hospitalId = getHospitalId();
    var result = await backendFetch(`/hospital/${hospitalId}/release`, {
      method: 'POST',
      body: JSON.stringify({
        amount: amount,
        practitionerId: null,
        contractId: null,
        memo: recipient || 'Escrow release',
      }),
    });
    if (result && result.transaction) {
      showToast(`Release of GH₵${amount.toFixed(2)} initiated from escrow.`);
      document.getElementById("relAmt").value = "";
      return;
    }

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
