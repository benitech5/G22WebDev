(() => {
  const MODAL_ID = "practitionerPayoutModal";
  const asset = (name) => `../assets/${name}`;
  const $ = (sel, root = document) => root.querySelector(sel);

  const closeSvg = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.3 5.7a1 1 0 0 0-1.4 0L12 10.6L7.1 5.7a1 1 0 0 0-1.4 1.4l4.9 4.9l-4.9 4.9a1 1 0 1 0 1.4 1.4l4.9-4.9l4.9 4.9a1 1 0 0 0 1.4-1.4L13.4 12l4.9-4.9a1 1 0 0 0 0-1.4Z"/>
    </svg>
  `;

  function money(n, currency = "GHS") {
    if (typeof n !== "number") return String(n ?? "—");
    return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(n);
  }

  function ensureModal() {
    let dlg = document.getElementById(MODAL_ID);
    if (dlg) return dlg;

    dlg = document.createElement("dialog");
    dlg.id = MODAL_ID;
    dlg.className = "ppm";
    dlg.innerHTML = `
      <div class="ppm-card" role="document" aria-label="Practitioner Payout Details">
        <div class="ppm-head">
          <div class="ppm-title">
            <span class="ppm-ico" aria-hidden="true"><img src="${asset("Activitydetailsicon.png")}" alt="" /></span>
            <span>Practitioner Payout</span>
          </div>
          <button class="ppm-close" type="button" data-ppm-close aria-label="Close">${closeSvg}</button>
        </div>
        <div class="ppm-divider"></div>
        <div class="ppm-body">
          <div class="ppm-pill" data-ppm-status>Completed</div>
          <div class="ppm-grid">
            <div class="ppm-field"><div class="ppm-k">Hospital</div><div class="ppm-v" data-ppm-hospital>—</div></div>
            <div class="ppm-field"><div class="ppm-k">Reference</div><div class="ppm-v" data-ppm-ref>—</div></div>
            <div class="ppm-field"><div class="ppm-k">Practitioner</div><div class="ppm-v" data-ppm-practitioner>—</div></div>
            <div class="ppm-field"><div class="ppm-k">Destination</div><div class="ppm-v" data-ppm-dest>—</div></div>
            <div class="ppm-field"><div class="ppm-k">Amount</div><div class="ppm-v" data-ppm-amount>—</div></div>
            <div class="ppm-field"><div class="ppm-k">Date &amp; Time</div><div class="ppm-v" data-ppm-dt>—</div></div>
          </div>
          <div class="ppm-note" data-ppm-note></div>
        </div>
        <div class="ppm-divider"></div>
        <div class="ppm-actions">
          <button class="ppm-btn" type="button" data-ppm-close>Close</button>
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
    dlg.querySelectorAll("[data-ppm-close]").forEach((b) => b.addEventListener("click", close));

    return dlg;
  }

  function openPractitionerPayoutModal(data = {}) {
    const dlg = ensureModal();
    const hospital = data.hospital || "Perfect Health and Wellness Centre";
    const practitioner = data.practitioner || "Dr. Kofi Mensah (Cardiology)";
    const amount = money(data.amount ?? 800, data.currency || "GHS");
    const dt = data.dateTime || "Oct 25, 2023, 09:15 AM";

    $("[data-ppm-status]", dlg).textContent = data.status || "Completed";
    $("[data-ppm-hospital]", dlg).textContent = hospital;
    $("[data-ppm-ref]", dlg).textContent = data.payoutRef || "PAY-44821";
    $("[data-ppm-practitioner]", dlg).textContent = practitioner;
    $("[data-ppm-dest]", dlg).textContent = data.destination || "Practitioner Account";
    $("[data-ppm-amount]", dlg).textContent = amount;
    $("[data-ppm-dt]", dlg).textContent = dt;
    $("[data-ppm-note]", dlg).textContent =
      data.note ||
      "This payout was initiated by the hospital and deposited into the practitioner's account in line with the active service contract.";

    dlg.showModal();
  }

  window.openPractitionerPayoutModal = openPractitionerPayoutModal;
})();

