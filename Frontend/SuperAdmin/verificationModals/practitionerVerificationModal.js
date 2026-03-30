(() => {
  const MODAL_ID = "practitionerVerificationModal";
  const asset = (name) => `../assets/${name}`;
  const $ = (sel, root = document) => root.querySelector(sel);

  const closeSvg = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.3 5.7a1 1 0 0 0-1.4 0L12 10.6L7.1 5.7a1 1 0 0 0-1.4 1.4l4.9 4.9l-4.9 4.9a1 1 0 1 0 1.4 1.4l4.9-4.9l4.9 4.9a1 1 0 0 0 1.4-1.4L13.4 12l4.9-4.9a1 1 0 0 0 0-1.4Z"/>
    </svg>
  `;

  const checkSvg = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9.2 16.6 5.8 13.2a1 1 0 1 1 1.4-1.4l2 2l7.6-7.6a1 1 0 0 1 1.4 1.4l-9 9a1 1 0 0 1-1.4 0Z"/>
    </svg>
  `;

  const xSvg = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.3 5.7a1 1 0 0 0-1.4 0L12 10.6L7.1 5.7a1 1 0 0 0-1.4 1.4l4.9 4.9l-4.9 4.9a1 1 0 1 0 1.4 1.4l4.9-4.9l4.9 4.9a1 1 0 0 0 1.4-1.4L13.4 12l4.9-4.9a1 1 0 0 0 0-1.4Z"/>
    </svg>
  `;

  function ensureModal() {
    let dlg = document.getElementById(MODAL_ID);
    if (dlg) return dlg;

    dlg = document.createElement("dialog");
    dlg.id = MODAL_ID;
    dlg.className = "pvm";
    dlg.innerHTML = `
      <div class="pvm-card" role="document" aria-label="Practitioner Verification">
        <div class="pvm-head">
          <div class="pvm-title">
            <img src="${asset("practionerverificationIcon.png")}" alt="" />
            <span>Practitioner Verification</span>
          </div>
          <button class="pvm-close" type="button" data-pvm-close aria-label="Close">${closeSvg}</button>
        </div>
        <div class="pvm-divider"></div>

        <div class="pvm-body">
          <div class="pvm-profile">
            <div class="pvm-avatar" aria-hidden="true">
              <img class="pvm-avatar-img" src="${asset("DRKofiMensahProfile.png")}" alt="" />
              <div class="pvm-avatar-initials" data-pvm-initials>KM</div>
              <div class="pvm-verified-dot" aria-hidden="true"></div>
            </div>
            <div class="pvm-name" data-pvm-name>Dr. Kofi Mensah</div>
            <div class="pvm-spec" data-pvm-spec>Cardiology Specialist</div>
          </div>

          <div class="pvm-section-title">Professional Credentials</div>
          <div class="pvm-cred">
            <div class="pvm-cred-row">
              <div class="pvm-cred-left">
                <img src="${asset("educationIcon.png")}" alt="" />
                <span>Education</span>
              </div>
              <div class="pvm-cred-val" data-pvm-edu>KNUST</div>
            </div>

            <div class="pvm-cred-row">
              <div class="pvm-cred-left">
                <img src="${asset("Licensenumbericon.png")}" alt="" />
                <span>License Number</span>
              </div>
              <div class="pvm-cred-val" data-pvm-license>LCN - 123 - 456</div>
            </div>

            <div class="pvm-cred-row" style="background:#f3f8ff;border-color:#dfebff;">
              <div class="pvm-cred-left">
                <img src="${asset("currentstatusIcon.png")}" alt="" />
                <span>Current Status</span>
              </div>
              <div class="pvm-status-pill" data-pvm-status>PENDING REVIEW</div>
            </div>
          </div>

          <div class="pvm-section-title">Uploaded Certificates</div>
          <div class="pvm-docs" data-pvm-docs></div>
        </div>

        <div class="pvm-divider"></div>
        <div class="pvm-actions">
          <button class="pvm-btn approve" type="button" data-pvm-approve>
            <span class="pvm-btn-ico" aria-hidden="true">${checkSvg}</span>
            <span>Approve</span>
          </button>
          <button class="pvm-btn reject" type="button" data-pvm-reject>
            <span class="pvm-btn-ico" aria-hidden="true">${xSvg}</span>
            <span>Reject</span>
          </button>
        </div>
        <div class="pvm-footer"><button type="button" data-pvm-close style="border:none;background:transparent;color:#9aaab8;font:inherit;cursor:pointer;">Close Review</button></div>
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
    dlg.querySelectorAll("[data-pvm-close]").forEach((b) => b.addEventListener("click", close));

    $("[data-pvm-approve]", dlg).addEventListener("click", async () => {
      const name = dlg.dataset.pvmName || "Practitioner";
      const id = dlg.dataset.pvmPractitionerId;
      const result = id ? await adminPatch(`/admin/practitioners/${id}/verify`, { status: 'Verified' }) : null;
      if (result) {
        alert(`Approved: ${name}`);
      } else {
        alert(`Approved locally: ${name}`);
      }
      close();
    });
    $("[data-pvm-reject]", dlg).addEventListener("click", async () => {
      const name = dlg.dataset.pvmName || "Practitioner";
      const id = dlg.dataset.pvmPractitionerId;
      const result = id ? await adminPatch(`/admin/practitioners/${id}/verify`, { status: 'Rejected' }) : null;
      if (result) {
        alert(`Rejected: ${name}`);
      } else {
        alert(`Rejected locally: ${name}`);
      }
      close();
    });

    return dlg;
  }

  function initialsFrom(name) {
    const parts = String(name || "")
      .replace("Dr.", "")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    const a = parts[0]?.[0] || "P";
    const b = parts[1]?.[0] || parts[0]?.[1] || "R";
    return (a + b).toUpperCase();
  }

  function renderDocs(dlg, docs) {
    const wrap = $("[data-pvm-docs]", dlg);
    const list = Array.isArray(docs) && docs.length
      ? docs
      : [
          { name: "Medical_Degree.pdf", size: "2.4 MB", iconSrc: asset("bluedocs.png") },
          { name: "Board_Cert.pdf", size: "1.8 MB", iconSrc: asset("bluedocs.png") },
        ];

    wrap.innerHTML = list
      .map(
        (d) => `
        <div class="pvm-doc">
          <div class="pvm-doc-top">
            <div class="pvm-doc-ico" aria-hidden="true"><img src="${d.iconSrc || asset("bluedocs.png")}" alt="" /></div>
            <div class="pvm-doc-meta">
              <div class="pvm-doc-name">${d.name}</div>
              <div class="pvm-doc-sub">${d.size}</div>
            </div>
          </div>
        </div>
      `
      )
      .join("");
  }

  function openPractitionerVerificationModal(data = {}) {
    const dlg = ensureModal();
    const name = data.name || "Dr. Kofi Mensah";
    const spec = data.specialization ? `${data.specialization} Specialist` : "Cardiology Specialist";

    dlg.dataset.pvmPractitionerId = data.id || data.practitionerId || '';
    dlg.dataset.pvmName = name;
    $("[data-pvm-name]", dlg).textContent = name;
    $("[data-pvm-spec]", dlg).textContent = spec;
    $("[data-pvm-initials]", dlg).textContent = data.initials || initialsFrom(name);
    $("[data-pvm-edu]", dlg).textContent = data.education || "KNUST";
    $("[data-pvm-license]", dlg).textContent = data.licenseNumber || "LCN - 123 - 456";
    $("[data-pvm-status]", dlg).textContent = (data.status || "Pending Review").toUpperCase();

    renderDocs(dlg, data.certificates);

    dlg.showModal();
  }

  window.openPractitionerVerificationModal = openPractitionerVerificationModal;
})();

