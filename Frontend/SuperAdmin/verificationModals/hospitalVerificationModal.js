(() => {
  const MODAL_ID = "hospitalVerificationModal";

  const asset = (name) => `../assets/${name}`;

  const icons = {
    shieldCheck: `<img src="${asset("Icon.png")}" alt="" />`,
    close: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.3 5.7a1 1 0 0 0-1.4 0L12 10.6L7.1 5.7a1 1 0 0 0-1.4 1.4l4.9 4.9l-4.9 4.9a1 1 0 1 0 1.4 1.4l4.9-4.9l4.9 4.9a1 1 0 0 0 1.4-1.4L13.4 12l4.9-4.9a1 1 0 0 0 0-1.4Z"/>
      </svg>
    `,
    check: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9.2 16.6 5.8 13.2a1 1 0 1 1 1.4-1.4l2 2l7.6-7.6a1 1 0 0 1 1.4 1.4l-9 9a1 1 0 0 1-1.4 0Z"/>
      </svg>
    `,
    x: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.3 5.7a1 1 0 0 0-1.4 0L12 10.6L7.1 5.7a1 1 0 0 0-1.4 1.4l4.9 4.9l-4.9 4.9a1 1 0 1 0 1.4 1.4l4.9-4.9l4.9 4.9a1 1 0 0 0 1.4-1.4L13.4 12l4.9-4.9a1 1 0 0 0 0-1.4Z"/>
      </svg>
    `,
    download: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3a1 1 0 0 1 1 1v8.6l2.3-2.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4L11 12.6V4a1 1 0 0 1 1-1Zm-7 15a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Z"/>
      </svg>
    `,
    file: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 2h7l5 5v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm7 1.5V8h4.5L14 3.5Z"/>
      </svg>
    `,
    gear: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19.4 13a7.8 7.8 0 0 0 0-2l2-1.5a1 1 0 0 0 .2-1.3l-2-3.5a1 1 0 0 0-1.2-.4l-2.3.9a7.2 7.2 0 0 0-1.7-1l-.3-2.5A1 1 0 0 0 13.1 1h-4.2a1 1 0 0 0-1 .8l-.3 2.5a7.2 7.2 0 0 0-1.7 1l-2.3-.9a1 1 0 0 0-1.2.4l-2 3.5a1 1 0 0 0 .2 1.3l2 1.5a7.8 7.8 0 0 0 0 2l-2 1.5a1 1 0 0 0-.2 1.3l2 3.5a1 1 0 0 0 1.2.4l2.3-.9a7.2 7.2 0 0 0 1.7 1l.3 2.5a1 1 0 0 0 1 .8h4.2a1 1 0 0 0 1-.8l.3-2.5a7.2 7.2 0 0 0 1.7-1l2.3.9a1 1 0 0 0 1.2-.4l2-3.5a1 1 0 0 0-.2-1.3l-2-1.5ZM11 15.5A3.5 3.5 0 1 1 11 8.5a3.5 3.5 0 0 1 0 7Z"/>
      </svg>
    `,
    star: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2l2.2 6.3H21l-5 3.7L18 20l-6-4l-6 4l2-8l-5-3.7h6.8L12 2Z"/>
      </svg>
    `,
  };

  const $ = (sel, root = document) => root.querySelector(sel);

  function ensureModal() {
    let dlg = document.getElementById(MODAL_ID);
    if (dlg) return dlg;

    dlg = document.createElement("dialog");
    dlg.id = MODAL_ID;
    dlg.className = "hvm";
    dlg.innerHTML = `
      <div class="hvm-card" role="document" aria-label="Hospital Verification">
        <div class="hvm-head">
          <div class="hvm-head-left">
            <div class="hvm-title">
              <span class="hvm-title-ico" aria-hidden="true">${icons.shieldCheck}</span>
              <span>Hospital Verification</span>
            </div>
            <div class="hvm-sub">Review facility details and documentation for approval</div>
          </div>
          <button class="hvm-close" type="button" data-hvm-close aria-label="Close">
            ${icons.close}
          </button>
        </div>
        <div class="hvm-divider"></div>
        <div class="hvm-body">
          <section class="hvm-section">
            <div class="hvm-section-title">Facility Information</div>
            <div class="hvm-grid" data-hvm-facility></div>
          </section>

          <section class="hvm-section">
            <div class="hvm-section-title">Core Departments</div>
            <div class="hvm-chips" data-hvm-depts></div>
          </section>

          <section class="hvm-section">
            <div class="hvm-section-title">Verification Documents</div>
            <div class="hvm-docs" data-hvm-docs></div>
          </section>
        </div>
        <div class="hvm-divider"></div>
        <div class="hvm-actions">
          <div class="hvm-actions-left">
            <button class="hvm-btn approve" type="button" data-hvm-approve>
              <span class="hvm-btn-ico" aria-hidden="true">${icons.check}</span>
              <span>Approve Hospital</span>
            </button>
            <button class="hvm-btn reject" type="button" data-hvm-reject>
              <span class="hvm-btn-ico" aria-hidden="true">${icons.x}</span>
              <span>Reject Hospital</span>
            </button>
          </div>
          <button class="hvm-btn secondary" type="button" data-hvm-close>Close</button>
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
    dlg.querySelectorAll("[data-hvm-close]").forEach((btn) => btn.addEventListener("click", close));

    $("[data-hvm-approve]", dlg).addEventListener("click", () => {
      const name = dlg.dataset.hospitalName || "Hospital";
      alert(`Approved: ${name}`);
      close();
    });
    $("[data-hvm-reject]", dlg).addEventListener("click", () => {
      const name = dlg.dataset.hospitalName || "Hospital";
      alert(`Rejected: ${name}`);
      close();
    });

    return dlg;
  }

  function chipIconFor(name) {
    const n = String(name || "").toLowerCase();
    if (n.includes("cardio")) return `<img src="${asset("cardiologyIcon.png")}" alt="" />`;
    if (n.includes("pediatric")) return `<img src="${asset("pediatricsIcon.png")}" alt="" />`;
    if (n.includes("diagnostic")) return `<img src="${asset("diagnosisimagingIcon.png")}" alt="" />`;
    if (n.includes("emergency")) return `<img src="${asset("Icon.png")}" alt="" />`;
    return `<img src="${asset("Icon.png")}" alt="" />`;
  }

  function renderFacility(dlg, facility) {
    const grid = $("[data-hvm-facility]", dlg);
    const rows = [
      ["Hospital Name", facility.name ?? "—"],
      ["Region", facility.region ?? "—"],
      ["Facility Type", facility.type ?? "Hospital"],
      ["Street Address", facility.address ?? "—"],
    ];

    grid.innerHTML = rows
      .map(
        ([k, v]) => `
        <div class="hvm-field">
          <div class="hvm-label">${k}</div>
          <div class="hvm-value">${v}</div>
        </div>
      `
      )
      .join("");
  }

  function renderDepts(dlg, depts) {
    const wrap = $("[data-hvm-depts]", dlg);
    const list = Array.isArray(depts) && depts.length
      ? depts
      : ["Cardiology", "Emergency", "Pediatrics", "Diagnostic Imaging"];

    wrap.innerHTML = list
      .map(
        (d) => `
        <span class="hvm-chip">
          <span aria-hidden="true">${chipIconFor(d)}</span>
          ${d}
        </span>
      `
      )
      .join("");
  }

  function renderDocs(dlg, docs) {
    const wrap = $("[data-hvm-docs]", dlg);
    const list = Array.isArray(docs) && docs.length
      ? docs
      : [
          { name: "Medical_License.pdf", size: "2.4 MB", uploaded: "Uploaded May 12", iconSrc: asset("docs.png") },
          { name: "Facility_Audit_2024.pdf", size: "1.8 MB", uploaded: "Uploaded June 05", iconSrc: asset("facultyaudit.png") },
        ];

    wrap.innerHTML = list
      .map(
        (d) => `
        <div class="hvm-doc">
          <div class="hvm-doc-ico" aria-hidden="true">
            <img src="${d.iconSrc || asset("docs.png")}" alt="" />
          </div>
          <div class="hvm-doc-meta">
            <div class="hvm-doc-name">${d.name}</div>
            <div class="hvm-doc-sub">${d.size} • ${d.uploaded}</div>
          </div>
          <button class="hvm-doc-dl" type="button" aria-label="Download ${d.name}" data-hvm-download="${encodeURIComponent(d.name)}">
            ${icons.download}
          </button>
        </div>
      `
      )
      .join("");

    wrap.querySelectorAll("[data-hvm-download]").forEach((btn) =>
      btn.addEventListener("click", () => {
        const filename = decodeURIComponent(btn.dataset.hvmDownload);
        alert(`Download placeholder: ${filename}`);
      })
    );
  }

  function openHospitalVerificationModal(data = {}) {
    const dlg = ensureModal();
    dlg.dataset.hospitalName = data.name || data.hospitalName || "";

    renderFacility(dlg, {
      name: data.name || data.hospitalName,
      region: data.region,
      type: data.facilityType || "Hospital",
      address: data.address || "East Legon",
    });
    renderDepts(dlg, data.departments);
    renderDocs(dlg, data.documents);

    dlg.showModal();
  }

  window.openHospitalVerificationModal = openHospitalVerificationModal;
})();

