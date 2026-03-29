(() => {
  const MODAL_ID = "activityDetailsModal";
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
    dlg.className = "adm";
    dlg.innerHTML = `
      <div class="adm-card" role="document" aria-label="Activity Details">
        <div class="adm-head">
          <div class="adm-title">
            <span class="adm-title-ico" aria-hidden="true">
              <img src="${asset("Activitydetailsicon.png")}" alt="" />
            </span>
            <span>Activity Details</span>
          </div>
          <button class="adm-close" type="button" data-adm-close aria-label="Close">
            ${closeSvg}
          </button>
        </div>
        <div class="adm-divider"></div>
        <div class="adm-body">
          <div class="adm-rows">
            <div class="adm-row">
              <div class="adm-k">Action Type</div>
              <div class="adm-v" data-adm-action>—</div>
            </div>
            <div class="adm-row">
              <div class="adm-k">User Involved</div>
              <div class="adm-v">
                <span class="adm-user-badge" data-adm-user-initials>—</span>
                <span data-adm-user>—</span>
              </div>
            </div>
            <div class="adm-row">
              <div class="adm-k">Date and Time</div>
              <div class="adm-v" data-adm-datetime>—</div>
            </div>
            <div class="adm-row">
              <div class="adm-k">Status</div>
              <div class="adm-v"><span class="adm-status-pill" data-adm-status>—</span></div>
            </div>
          </div>

          <div class="adm-section-title">Detailed Description</div>
          <div class="adm-desc" data-adm-desc>—</div>
        </div>
        <div class="adm-actions">
          <button class="adm-btn" type="button" data-adm-close>Close</button>
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
    dlg.querySelectorAll("[data-adm-close]").forEach((btn) => btn.addEventListener("click", close));

    return dlg;
  }

  function initialsFrom(name) {
    const parts = String(name || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    const a = parts[0]?.[0] || "U";
    const b = parts[1]?.[0] || parts[0]?.[1] || "I";
    return (a + b).toUpperCase();
  }

  function openActivityDetailsModal(data = {}) {
    const dlg = ensureModal();
    const action = data.actionType || "New Hospital Registration";
    const user = data.userInvolved || "Ridge Hospital Admin";
    const dt = data.dateTime || "Oct 24, 2023, 10:30 AM";
    const status = data.status || "Pending Verification";
    const desc =
      data.description ||
      "Hospital profile created and medical licenses uploaded for verification.\nSystem awaiting manual review of the submitted PDF documentation.";

    $("[data-adm-action]", dlg).textContent = action;
    $("[data-adm-user]", dlg).textContent = user;
    $("[data-adm-user-initials]", dlg).textContent = initialsFrom(user);
    $("[data-adm-datetime]", dlg).textContent = dt;
    $("[data-adm-status]", dlg).textContent = status;
    $("[data-adm-desc]", dlg).textContent = desc;

    dlg.showModal();
  }

  window.openActivityDetailsModal = openActivityDetailsModal;
})();

