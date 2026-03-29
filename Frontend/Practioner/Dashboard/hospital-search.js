(function () {
  if (!window.PRACTITIONER_SESSION || !PRACTITIONER_SESSION.requireAuthOrRedirect()) return;

  var u = PRACTITIONER_SESSION.getDisplayUser();
  var sn = document.getElementById("sideName");
  var st = document.getElementById("sideTitle");
  var hun = document.getElementById("hsUserName");
  var hur = document.getElementById("hsUserRole");
  if (sn) sn.textContent = u.name;
  if (st) st.textContent = u.title;
  if (hun) hun.textContent = u.name;
  if (hur) hur.textContent = u.title;

  var toastEl = document.getElementById("toastPp");
  function toast(msg) {
    if (!toastEl) {
      alert(msg);
      return;
    }
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () {
      toastEl.classList.remove("show");
    }, 2600);
  }

  var HOSPITALS = [
    {
      id: "kb",
      name: "Korle Bu Teaching Hospital",
      addr: "Guggisberg Ave, Accra",
      region: "Greater Accra",
      type: "teaching",
      img: "assets/Hospital.png",
      rating: null,
      about: "Ghana's largest teaching hospital and referral centre.",
      tags: ["Emergency", "Surgery", "Pediatrics"],
      web: "korlebu.gov.gh",
      phone: "+233 30 266 6547",
      contracts: [
        { title: "Locum Cardiologist", pay: "GH₵ 4,500 / mo", desc: "Temporary 3-month contract for evening shifts (4 PM - 10 PM).", meta: "Part-time · 1 Position", primary: true },
        { title: "Resident Surgeon", pay: "Competitive Pay", desc: "Full-time resident position for general surgery department.", meta: "Full-time · 2 Positions", primary: false },
      ],
    },
    {
      id: "ka",
      name: "Komfo Anokye Teaching Hospital",
      addr: "Bantama, Kumasi",
      region: "Ashanti",
      type: "teaching",
      img: "assets/Hospital1.png",
      rating: null,
      about: "Major tertiary hospital in the Ashanti Region.",
      tags: ["Internal Medicine", "OBGYN"],
      web: "kath.gov.gh",
      phone: "+233 32 202 1111",
      contracts: [
        { title: "ICU Nurse", pay: "GH₵ 3,200 / mo", desc: "Night rotation ICU support.", meta: "Full-time · 3 Positions", primary: true },
      ],
    },
    {
      id: "ridge",
      name: "Greater Accra Regional Hospital (Ridge)",
      addr: "Ridge, Accra",
      region: "Greater Accra",
      type: "regional",
      img: "assets/Hospital2.png",
      rating: 4.9,
      about: "Regional referral hospital for Greater Accra.",
      tags: ["Radiology", "Cardiology"],
      web: "ghs.gov.gh",
      phone: "+233 30 222 0000",
      contracts: [
        { title: "General Practitioner", pay: "GH₵ 5,100 / mo", desc: "Clinic sessions weekdays.", meta: "Part-time · 2 Positions", primary: true },
      ],
    },
    {
      id: "37",
      name: "37 Military Hospital",
      addr: "Accra",
      region: "Greater Accra",
      type: "military",
      img: "assets/Hospital3.png",
      rating: null,
      about: "Military teaching hospital with public access.",
      tags: ["Orthopedics", "Rehab"],
      web: "37militaryhospital.org",
      phone: "+233 30 277 3506",
      contracts: [
        { title: "Physical Therapist", pay: "GH₵ 3,800 / mo", desc: "Outpatient rehabilitation.", meta: "Full-time · 1 Position", primary: true },
      ],
    },
    {
      id: "effia",
      name: "Effia Nkwanta Regional Hospital",
      addr: "Sekondi-Takoradi",
      region: "Western",
      type: "regional",
      img: "assets/Hospital4.png",
      rating: 4.2,
      about: "Regional facility serving the Western corridor.",
      tags: ["Emergency", "Dialysis"],
      web: "effiankwanta.gov.gh",
      phone: "+233 31 202 3344",
      contracts: [
        { title: "ER Physician", pay: "GH₵ 6,000 / mo", desc: "12-hour shifts, rotating roster.", meta: "Shift · 4 Positions", primary: true },
      ],
    },
  ];

  var PER_PAGE = 5;
  var currentPage = 1;
  var regionFilter = document.getElementById("regionFilter");
  var searchInput = document.getElementById("hospitalSearchInput");
  var grid = document.getElementById("hospitalGrid");
  var pageInfo = document.getElementById("pageInfo");
  var pager = document.getElementById("pager");
  var modal = document.getElementById("hospitalModal");

  function filtered() {
    var r = regionFilter.value;
    var q = (searchInput.value || "").toLowerCase().trim();
    return HOSPITALS.filter(function (h) {
      if (r !== "all" && h.region !== r) return false;
      if (!q) return true;
      return (h.name + " " + h.addr).toLowerCase().indexOf(q) !== -1;
    });
  }

  function render() {
    var list = filtered();
    var total = list.length;
    var pages = Math.max(1, Math.ceil(total / PER_PAGE));
    if (currentPage > pages) currentPage = pages;
    var start = (currentPage - 1) * PER_PAGE;
    var slice = list.slice(start, start + PER_PAGE);

    grid.innerHTML = "";
    slice.forEach(function (h) {
      var card = document.createElement("article");
      card.className = "hs-card";
      card.setAttribute("data-id", h.id);

      var badgeClass = h.type === "regional" ? "regional" : h.type === "military" ? "military" : "teaching";
      var badgeText =
        h.type === "regional" ? "REGIONAL HOSPITAL" : h.type === "military" ? "MILITARY HOSPITAL" : "TEACHING HOSPITAL";

      card.innerHTML =
        '<div class="hs-card-img">' +
        '<img src="' +
        h.img +
        '" alt=""/>' +
        '<span class="hs-badge ' +
        badgeClass +
        '">' +
        badgeText +
        "</span>" +
        (h.rating != null
          ? '<span class="hs-rating"><svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>' +
            h.rating +
            "</span>"
          : "") +
        "</div>" +
        '<div class="hs-card-body"><h3>' +
        h.name +
        '</h3><div class="addr">' +
        h.addr +
        "</div></div>";

      card.addEventListener("click", function () {
        openModal(h);
      });
      grid.appendChild(card);
    });

    var from = total === 0 ? 0 : start + 1;
    var to = Math.min(start + PER_PAGE, total);
    pageInfo.textContent = "Showing " + from + " to " + to + " of " + total + " establishments";

    pager.innerHTML = "";
    var prev = document.createElement("button");
    prev.type = "button";
    prev.textContent = "Prev";
    prev.disabled = currentPage <= 1;
    prev.addEventListener("click", function () {
      if (currentPage > 1) {
        currentPage--;
        render();
      }
    });
    pager.appendChild(prev);

    for (var p = 1; p <= pages && p <= 3; p++) {
      (function (pg) {
        var b = document.createElement("button");
        b.type = "button";
        b.textContent = String(pg);
        if (pg === currentPage) b.classList.add("active");
        b.addEventListener("click", function () {
          currentPage = pg;
          render();
        });
        pager.appendChild(b);
      })(p);
    }

    var nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.textContent = "Next";
    nextBtn.disabled = currentPage >= pages;
    nextBtn.addEventListener("click", function () {
      if (currentPage < pages) {
        currentPage++;
        render();
      }
    });
    pager.appendChild(nextBtn);
  }

  function openModal(h) {
    document.getElementById("modalHospitalName").textContent = h.name;
    document.getElementById("modalHospitalLoc").textContent = h.addr;
    document.getElementById("modalAbout").textContent = h.about;
    var tags = document.getElementById("modalTags");
    tags.innerHTML = "";
    h.tags.forEach(function (t) {
      var s = document.createElement("span");
      s.textContent = t;
      tags.appendChild(s);
    });
    var mw = document.getElementById("modalWeb");
    mw.textContent = h.web;
    mw.onclick = function (e) {
      e.preventDefault();
      toast("Opening " + h.web + " (demo).");
    };

    document.getElementById("modalPhone").textContent = h.phone;

    var n = h.contracts.length;
    document.getElementById("modalListingCount").textContent = n + " Active Listing" + (n === 1 ? "" : "s");

    var mc = document.getElementById("modalContracts");
    mc.innerHTML = "";
    h.contracts.forEach(function (c) {
      var div = document.createElement("div");
      div.className = "contract-item";
      div.innerHTML =
        '<div class="row1"><h4>' +
        c.title +
        '</h4><span class="pay ' +
        (c.primary ? "" : "muted") +
        '">' +
        c.pay +
        "</span></div>" +
        '<p class="desc">' +
        c.desc +
        "</p>" +
        '<div class="meta">' +
        c.meta +
        "</div>" +
        '<button type="button" class="apply ' +
        (c.primary ? "primary" : "secondary") +
        '" data-title="' +
        c.title +
        '">Apply Now</button>';
      mc.appendChild(div);
    });

    mc.querySelectorAll(".apply").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        toast('Application submitted for "' + btn.getAttribute("data-title") + '" (demo).');
        modal.classList.remove("open");
      });
    });

    modal.classList.add("open");
  }

  document.getElementById("modalClose").addEventListener("click", function () {
    modal.classList.remove("open");
  });
  modal.addEventListener("click", function (e) {
    if (e.target === modal) modal.classList.remove("open");
  });

  regionFilter.addEventListener("change", function () {
    currentPage = 1;
    render();
  });

  searchInput.addEventListener("input", function () {
    currentPage = 1;
    render();
  });

  document.getElementById("btnFilterPanel").addEventListener("click", function () {
    toast("More filters (public / private, specialty) — connect to backend later.");
  });

  document.getElementById("hsBell").addEventListener("click", function () {
    toast("1 unread message from City General (demo).");
  });

  document.getElementById("btnLogout") &&
    document.getElementById("btnLogout").addEventListener("click", function () {
      if (window.PRACTITIONER_SESSION) PRACTITIONER_SESSION.logout();
    });

  render();
})();
