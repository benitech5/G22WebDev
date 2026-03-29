(() => {
  const MODAL_ID = "escrowPaymentModal";
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
    dlg.className = "epm";
    dlg.innerHTML = `
      <div class="epm-card" role="document" aria-label="Escrow Payment Details">
        <div class="epm-head">
          <div class="epm-title">
            <span class="epm-ico" aria-hidden="true"><img src="${asset("Activitydetailsicon.png")}" alt="" /></span>
            <span>Payment into Escrow</span>
          </div>
          <button class="epm-close" type="button" data-epm-close aria-label="Close">${closeSvg}</button>
        </div>
        <div class="epm-divider"></div>
        <div class="epm-body">
          <span class="epm-pill" data-epm-status>Verification Pending</span>

          <div class="epm-grid">
            <div class="epm-field"><div class="epm-k">Hospital</div><div class="epm-v" data-epm-hospital>—</div></div>
            <div class="epm-field"><div class="epm-k">Escrow ID</div><div class="epm-v" data-epm-escrow>—</div></div>
            <div class="epm-field"><div class="epm-k">Amount</div><div class="epm-v" data-epm-amount>—</div></div>
            <div class="epm-field"><div class="epm-k">Date &amp; Time</div><div class="epm-v" data-epm-dt>—</div></div>
            <div class="epm-field"><div class="epm-k">Beneficiary</div><div class="epm-v" data-epm-practitioner>—</div></div>
            <div class="epm-field"><div class="epm-k">Method</div><div class="epm-v" data-epm-method>—</div></div>
          </div>

          <div class="epm-note" data-epm-note></div>
        </div>
        <div class="epm-divider"></div>
        <div class="epm-actions">
          <button class="epm-btn" type="button" data-epm-close>Close</button>
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
    dlg.querySelectorAll("[data-epm-close]").forEach((b) => b.addEventListener("click", close));

    return dlg;
  }

  function openEscrowPaymentModal(data = {}) {
    const dlg = ensureModal();
    const hospital = data.hospital || "Perfect Health and Wellness Centre";
    const practitioner = data.practitioner || "Dr. Kofi Mensah (Cardiology)";
    const amount = money(data.amount ?? 1200, data.currency || "GHS");
    const dt = data.dateTime || "Oct 24, 2023, 10:30 AM";

    $("[data-epm-status]", dlg).textContent = data.status || "Verification Pending";
    $("[data-epm-hospital]", dlg).textContent = hospital;
    $("[data-epm-escrow]", dlg).textContent = data.escrowId || "ESC-10294";
    $("[data-epm-amount]", dlg).textContent = amount;
    $("[data-epm-dt]", dlg).textContent = dt;
    $("[data-epm-practitioner]", dlg).textContent = practitioner;
    $("[data-epm-method]", dlg).textContent = data.method || "Bank Transfer";
    $("[data-epm-note]", dlg).textContent =
      data.note ||
      "Funds are held securely in escrow while the hospital verification is pending. Once verified, payouts and releases can proceed based on the contract terms.";

    dlg.showModal();
  }

  window.openEscrowPaymentModal = openEscrowPaymentModal;
})();

