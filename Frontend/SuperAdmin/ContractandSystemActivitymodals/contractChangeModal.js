(() => {
  const MODAL_ID = "contractChangeModal";
  const asset = (name) => `../assets/${name}`;
  const $ = (sel, root = document) => root.querySelector(sel);

  const closeSvg = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.3 5.7a1 1 0 0 0-1.4 0L12 10.6L7.1 5.7a1 1 0 0 0-1.4 1.4l4.9 4.9l-4.9 4.9a1 1 0 1 0 1.4 1.4l4.9-4.9l4.9 4.9a1 1 0 0 0 1.4-1.4L13.4 12l4.9-4.9a1 1 0 0 0 0-1.4Z"/>
    </svg>
  `;

  function ensureModal() {
    let dlg = document.getElementById(MODAL_ID);
    if (dlg) return dlg;

    dlg = document.createElement("dialog");
    dlg.id = MODAL_ID;
    dlg.className = "ccm";
    dlg.innerHTML = `
      <div class="ccm-card" role="document" aria-label="Contract Change Details">
        <div class="ccm-head">
          <div class="ccm-title">
            <span class="ccm-ico" aria-hidden="true"><img src="${asset("Activitydetailsicon.png")}" alt="" /></span>
            <span data-ccm-title>Contract Update</span>
          </div>
          <button class="ccm-close" type="button" data-ccm-close aria-label="Close">${closeSvg}</button>
        </div>
        <div class="ccm-divider"></div>
        <div class="ccm-body">
          <span class="ccm-pill extended" data-ccm-pill>Extended</span>

          <div class="ccm-grid">
            <div class="ccm-field"><div class="ccm-k">Hospital</div><div class="ccm-v" data-ccm-hospital>—</div></div>
            <div class="ccm-field"><div class="ccm-k">Practitioner</div><div class="ccm-v" data-ccm-practitioner>—</div></div>
            <div class="ccm-field"><div class="ccm-k">Initiated By</div><div class="ccm-v" data-ccm-initiated>—</div></div>
            <div class="ccm-field"><div class="ccm-k">Date &amp; Time</div><div class="ccm-v" data-ccm-dt>—</div></div>
            <div class="ccm-field"><div class="ccm-k">Previous End</div><div class="ccm-v" data-ccm-prev>—</div></div>
            <div class="ccm-field"><div class="ccm-k">New End</div><div class="ccm-v" data-ccm-new>—</div></div>
          </div>

          <div class="ccm-note" data-ccm-note></div>
        </div>
        <div class="ccm-divider"></div>
        <div class="ccm-actions">
          <button class="ccm-btn" type="button" data-ccm-close>Close</button>
        </div>
      </div>
    `;

    document.body.appendChild(dlg);

    const close = () => {
      if (dlg.open) dlg.close();
    };
    dlg.addEventListener("cancel", close);
    dlg.addEventListener("click", (e) => {
      if (e.target === dlg) close();
    });
    dlg.querySelectorAll("[data-ccm-close]").forEach((b) => b.addEventListener("click", close));

    return dlg;
  }

  function openContractChangeModal(data = {}) {
    const dlg = ensureModal();
    const isTerminated = data.type === "contract_terminated" || String(data.status || "").toLowerCase().includes("terminated");

    $("[data-ccm-title]", dlg).textContent = isTerminated ? "Contract Terminated" : "Contract Extended";
    const pill = $("[data-ccm-pill]", dlg);
    pill.textContent = isTerminated ? "Terminated" : "Extended";
    pill.classList.toggle("terminated", isTerminated);
    pill.classList.toggle("extended", !isTerminated);

    $("[data-ccm-hospital]", dlg).textContent = data.hospital || "Perfect Health and Wellness Centre";
    $("[data-ccm-practitioner]", dlg).textContent = data.practitioner || "Dr. Kofi Mensah (Cardiology)";
    $("[data-ccm-initiated]", dlg).textContent = data.initiatedBy || "Hospital";
    $("[data-ccm-dt]", dlg).textContent = data.dateTime || "Nov 01, 2023, 11:20 AM";
    $("[data-ccm-prev]", dlg).textContent = data.previousEnd || "Dec 31, 2023";
    $("[data-ccm-new]", dlg).textContent = data.newEnd || (isTerminated ? "—" : "Jun 30, 2024");
    $("[data-ccm-note]", dlg).textContent =
      data.reason ||
      (isTerminated
        ? "The contract has been terminated. Future payouts and releases will follow the platform’s settlement rules."
        : "The contract end date was extended. Service provision and payment schedules continue under the updated term.");

    dlg.showModal();
  }

  window.openContractChangeModal = openContractChangeModal;
})();

