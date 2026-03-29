(() => {
  const MODAL_ID = "paymentReleaseModal";
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
    dlg.className = "prm";
    dlg.innerHTML = `
      <div class="prm-card" role="document" aria-label="Payment Release Details">
        <div class="prm-head">
          <div class="prm-title">
            <span class="prm-ico" aria-hidden="true"><img src="${asset("Activitydetailsicon.png")}" alt="" /></span>
            <span>Payment Released</span>
          </div>
          <button class="prm-close" type="button" data-prm-close aria-label="Close">${closeSvg}</button>
        </div>
        <div class="prm-divider"></div>
        <div class="prm-body">
          <div class="prm-pill" data-prm-status>Released</div>
          <div class="prm-grid">
            <div class="prm-field"><div class="prm-k">From</div><div class="prm-v" data-prm-from>Escrow</div></div>
            <div class="prm-field"><div class="prm-k">Reference</div><div class="prm-v" data-prm-ref>—</div></div>
            <div class="prm-field"><div class="prm-k">Hospital</div><div class="prm-v" data-prm-hospital>—</div></div>
            <div class="prm-field"><div class="prm-k">Practitioner</div><div class="prm-v" data-prm-practitioner>—</div></div>
            <div class="prm-field"><div class="prm-k">Amount</div><div class="prm-v" data-prm-amount>—</div></div>
            <div class="prm-field"><div class="prm-k">Date &amp; Time</div><div class="prm-v" data-prm-dt>—</div></div>
          </div>
          <div class="prm-note" data-prm-note></div>
        </div>
        <div class="prm-divider"></div>
        <div class="prm-actions">
          <button class="prm-btn" type="button" data-prm-close>Close</button>
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
    dlg.querySelectorAll("[data-prm-close]").forEach((b) => b.addEventListener("click", close));

    return dlg;
  }

  function openPaymentReleaseModal(data = {}) {
    const dlg = ensureModal();
    const hospital = data.hospital || "Perfect Health and Wellness Centre";
    const practitioner = data.practitioner || "Dr. Kofi Mensah (Cardiology)";
    const amount = money(data.amount ?? 650, data.currency || "GHS");
    const dt = data.dateTime || "Oct 26, 2023, 04:05 PM";

    $("[data-prm-status]", dlg).textContent = data.status || "Released";
    $("[data-prm-from]", dlg).textContent = data.from || "Escrow";
    $("[data-prm-ref]", dlg).textContent = data.releaseRef || "REL-77014";
    $("[data-prm-hospital]", dlg).textContent = hospital;
    $("[data-prm-practitioner]", dlg).textContent = practitioner;
    $("[data-prm-amount]", dlg).textContent = amount;
    $("[data-prm-dt]", dlg).textContent = dt;
    $("[data-prm-note]", dlg).textContent =
      data.note ||
      "Escrow funds were released successfully based on the contract schedule and verification status of the facility.";

    dlg.showModal();
  }

  window.openPaymentReleaseModal = openPaymentReleaseModal;
})();

