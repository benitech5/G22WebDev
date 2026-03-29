const $ = (sel) => document.querySelector(sel);

const practitionerData = [
  { initials: "KM", name: "Dr. Kofi Mensah", specialization: "Cardiology", date: "Oct 12, 2023", status: "Pending" },
  { initials: "MT", name: "Mark Thompson", specialization: "Emergency Nursing", date: "Oct 14, 2023", status: "Verified" },
  { initials: "JW", name: "Dr. James Wilson", specialization: "Pediatrics", date: "Oct 15, 2023", status: "In Review" },
];

const hospitalDataAll = [
  { name: "Perfect Health and Wellness Centre", region: "Greater Accra", date: "Sep 28, 2023", status: "Active" },
  { name: "Central Care Clinic", region: "Ashanti", date: "Oct 05, 2023", status: "Pending" },
  { name: "Blue Ridge Hospital", region: "Eastern", date: "Oct 06, 2023", status: "Pending" },
  { name: "Sunrise Specialist Center", region: "Greater Accra", date: "Oct 07, 2023", status: "Active" },
  { name: "Northpoint Medical", region: "Northern", date: "Oct 09, 2023", status: "In Review" },
  { name: "Lakeside Community Hospital", region: "Volta", date: "Oct 10, 2023", status: "Active" },
];

let hospitalRenderCount = 2;

function statusClass(status) {
  const s = status.toLowerCase();
  if (s === "pending") return "pending";
  if (s === "verified") return "verified";
  if (s === "active") return "active";
  return "review";
}

function makePill(status) {
  const cls = statusClass(status);
  return `<span class="pill ${cls}"><span class="status-dot" aria-hidden="true"></span>${status}</span>`;
}

function makeActionLink(label, payload) {
  return `
    <a href="#" class="action-link" data-details='${encodeURIComponent(JSON.stringify(payload))}'>
      ${label}
      <span aria-hidden="true">→</span>
    </a>
  `;
}

function renderPractitioners(filterText = "") {
  const tbody = $("#practitionerTbody");
  const q = filterText.trim().toLowerCase();
  const filtered = practitionerData.filter((p) => {
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.specialization.toLowerCase().includes(q) ||
      p.status.toLowerCase().includes(q)
    );
  });

  const pendingCount = filtered.filter((p) => p.status.toLowerCase() === "pending").length;
  $("#pendingChip").textContent = `${pendingCount} Pending Requests`;

  tbody.innerHTML = filtered
    .map(
      (p) => `
      <tr class="js-practitioner-row" data-practitioner-details='${encodeURIComponent(JSON.stringify({ type: "Practitioner", ...p }))}'>
        <td data-label="Practitioner Name">
          <span class="name-cell">
            <span class="mono-pill" aria-hidden="true">${p.initials}</span>
            ${p.name}
          </span>
        </td>
        <td data-label="Specialization">${p.specialization}</td>
        <td data-label="Registration Date">${p.date}</td>
        <td data-label="Status">${makePill(p.status)}</td>
        <td data-label="Action" class="td-right">${makeActionLink("View Details", {
          type: "Practitioner",
          ...p,
        })}</td>
      </tr>
    `
    )
    .join("");
}

function renderHospitals(filterText = "") {
  const tbody = $("#hospitalTbody");
  const q = filterText.trim().toLowerCase();

  const filteredAll = hospitalDataAll.filter((h) => {
    if (!q) return true;
    return (
      h.name.toLowerCase().includes(q) ||
      h.region.toLowerCase().includes(q) ||
      h.status.toLowerCase().includes(q)
    );
  });

  const visible = filteredAll.slice(0, hospitalRenderCount);

  tbody.innerHTML = visible
    .map(
      (h) => `
      <tr class="js-hospital-row" data-hospital-details='${encodeURIComponent(JSON.stringify({ type: "Hospital", ...h }))}'>
        <td data-label="Hospital Name">${h.name}</td>
        <td data-label="Region">${h.region}</td>
        <td data-label="Registration Date">${h.date}</td>
        <td data-label="Status">${makePill(h.status === "In Review" ? "In Review" : h.status)}</td>
        <td data-label="Action" class="td-right">${makeActionLink("View Details", {
          type: "Hospital",
          ...h,
        })}</td>
      </tr>
    `
    )
    .join("");

  const btn = $("#loadMoreHospitals");
  const canLoadMore = visible.length < filteredAll.length && !q;
  btn.style.display = canLoadMore ? "inline-flex" : "none";
}

function wireTabs() {
  const tabs = Array.from(document.querySelectorAll(".tab"));
  const panels = {
    verification: $("#tab-verification"),
    activity: $("#tab-activity"),
  };

  tabs.forEach((t) =>
    t.addEventListener("click", () => {
      tabs.forEach((x) => x.classList.remove("is-active"));
      t.classList.add("is-active");
      const key = t.dataset.tab;
      Object.entries(panels).forEach(([k, el]) => {
        el.classList.toggle("is-active", k === key);
      });
    })
  );
}

function wireHospitalRowOpen() {
  const tbody = $("#hospitalTbody");
  tbody.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a) return; // keep link behavior handled elsewhere
    const row = e.target.closest("tr.js-hospital-row");
    if (!row) return;
    const payload = JSON.parse(decodeURIComponent(row.dataset.hospitalDetails));
    if (typeof window.openHospitalVerificationModal === "function") {
      window.openHospitalVerificationModal({
        ...payload,
        facilityType: "Hospital",
        address: payload.address || "East Legon",
        departments: ["Cardiology", "Emergency", "Pediatrics", "Diagnostic Imaging"],
        documents: [
          { name: "Medical_License.pdf", size: "2.4 MB", uploaded: "Uploaded May 12", iconSrc: "../assets/docs.png" },
          { name: "Facility_Audit_2024.pdf", size: "1.8 MB", uploaded: "Uploaded June 05", iconSrc: "../assets/facultyaudit.png" },
        ],
      });
    }
  });
}

function wirePractitionerRowOpen() {
  const tbody = $("#practitionerTbody");
  tbody.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a) return; // keep link behavior handled elsewhere
    const row = e.target.closest("tr.js-practitioner-row");
    if (!row) return;
    const payload = JSON.parse(decodeURIComponent(row.dataset.practitionerDetails));
    if (typeof window.openPractitionerVerificationModal === "function") {
      window.openPractitionerVerificationModal({
        ...payload,
        education: payload.education || "KNUST",
        licenseNumber: payload.licenseNumber || "LCN - 123 - 456",
        certificates: [
          { name: "Medical_Degree.pdf", size: "2.4 MB", iconSrc: "../assets/bluedocs.png" },
          { name: "Board_Cert.pdf", size: "1.8 MB", iconSrc: "../assets/bluedocs.png" },
        ],
        status: payload.status || "Pending Review",
      });
    }
  });
}

function wireSearch() {
  const input = $("#searchInput");
  input.addEventListener("input", () => {
    const q = input.value;
    renderPractitioners(q);
    renderHospitals(q);
  });
}

function wireLoadMore() {
  $("#loadMoreHospitals").addEventListener("click", () => {
    hospitalRenderCount = Math.min(hospitalRenderCount + 2, hospitalDataAll.length);
    renderHospitals($("#searchInput").value);
  });
}

function wireDetailsModal() {
  const dlg = $("#detailsModal");
  const close = () => {
    if (dlg.open) dlg.close();
  };

  $("#closeModal").addEventListener("click", close);
  $("#modalOk").addEventListener("click", close);
  dlg.addEventListener("cancel", close);
  dlg.addEventListener("click", (e) => {
    if (e.target === dlg) close();
  });

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-details]");
    if (!a) return;
    e.preventDefault();
    const payload = JSON.parse(decodeURIComponent(a.dataset.details));

    if (payload.type === "Hospital" && typeof window.openHospitalVerificationModal === "function") {
      window.openHospitalVerificationModal({
        ...payload,
        facilityType: "Hospital",
        address: payload.address || "East Legon",
        departments: ["Cardiology", "Emergency", "Pediatrics", "Diagnostic Imaging"],
        documents: [
          { name: "Medical_License.pdf", size: "2.4 MB", uploaded: "Uploaded May 12", iconSrc: "../assets/docs.png" },
          { name: "Facility_Audit_2024.pdf", size: "1.8 MB", uploaded: "Uploaded June 05", iconSrc: "../assets/facultyaudit.png" },
        ],
      });
      return;
    }

    if (payload.type === "Practitioner" && typeof window.openPractitionerVerificationModal === "function") {
      window.openPractitionerVerificationModal({
        ...payload,
        education: payload.education || "KNUST",
        licenseNumber: payload.licenseNumber || "LCN - 123 - 456",
        certificates: [
          { name: "Medical_Degree.pdf", size: "2.4 MB", iconSrc: "../assets/bluedocs.png" },
          { name: "Board_Cert.pdf", size: "1.8 MB", iconSrc: "../assets/bluedocs.png" },
        ],
        status: payload.status || "Pending Review",
      });
      return;
    }

    $("#modalTitle").textContent = `${payload.type} Details`;

    const fields = payload.type === "Practitioner"
      ? [
          ["Name", payload.name],
          ["Initials", payload.initials],
          ["Specialization", payload.specialization],
          ["Registration Date", payload.date],
          ["Status", payload.status],
        ]
      : [
          ["Hospital Name", payload.name],
          ["Region", payload.region],
          ["Registration Date", payload.date],
          ["Status", payload.status],
        ];

    $("#modalBody").innerHTML = `
      <dl>
        ${fields.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("")}
      </dl>
    `;

    dlg.showModal();
  });
}

function init() {
  wireTabs();
  wireSearch();
  wireLoadMore();
  wireDetailsModal();
  wireHospitalRowOpen();
  wirePractitionerRowOpen();

  renderPractitioners("");
  renderHospitals("");

  $("#notifBtn").addEventListener("click", () => {
    alert("Notifications placeholder");
  });

}

init();

