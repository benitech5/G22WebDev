(function () {
  if (!window.HOSPITAL_SESSION || !HOSPITAL_SESSION.requireAuth()) return;

  var practitioners = [
    {
      id: "pract1",
      name: "Dr. James Wilson",
      title: "Cardiologist",
      specialty: "Cardiology",
      status: "On Shift",
      statusClass: "active",
      location: "ER Wing",
      experience: "14 years",
      lastShift: "Today, 08:00 AM",
      contact: "+233 24 890 1234",
      email: "james.wilson@healthlinka.com",
      summary: "Senior cardiologist with exceptional emergency response experience in acute patient triage and ICU support.",
      focus: ["Rapid response", "Critical care", "Team leadership"],
      notes: "Recommended for urgent support in trauma and post-operative recovery units.",
      img: "../Practioner/Dashboard/assets/Profile.png",
    },
    {
      id: "pract2",
      name: "Dr. Sarah Chen",
      title: "General Surgeon",
      specialty: "Surgery",
      status: "Available",
      statusClass: "available",
      location: "Surgical Suites",
      experience: "10 years",
      lastShift: "Yesterday, 06:00 PM",
      contact: "+233 24 910 5621",
      email: "sarah.chen@healthlinka.com",
      summary: "Experienced surgical practitioner with a focus on high-acuity emergency operations and patient stabilization.",
      focus: ["Trauma care", "Surgical planning", "ICU consultation"],
      notes: "Available for immediate deployment to accident response and emergency surgery cases.",
      img: "../Practioner/Dashboard/assets/profile2.png",
    },
    {
      id: "pract3",
      name: "Dr. Marcus Lee",
      title: "ER Physician",
      specialty: "Emergency Medicine",
      status: "On Break",
      statusClass: "pause",
      location: "Accident and Emergency",
      experience: "8 years",
      lastShift: "Today, 04:30 AM",
      contact: "+233 24 710 3345",
      email: "marcus.lee@healthlinka.com",
      summary: "Acute care specialist with strong performance managing sudden patient surges and high-pressure treatment episodes.",
      focus: ["Rapid triage", "Resuscitation", "Patient flow"],
      notes: "Resting after a long shift; available for support in the next rotation.",
      img: "../Practioner/Dashboard/assets/profile3.png",
    },
    {
      id: "pract4",
      name: "Dr. Ama Boateng",
      title: "Pediatrician",
      specialty: "Pediatrics",
      status: "Available",
      statusClass: "available",
      location: "Children's Ward",
      experience: "9 years",
      lastShift: "Today, 09:45 AM",
      contact: "+233 24 555 9812",
      email: "ama.boateng@healthlinka.com",
      summary: "Pediatric specialist ready to support child patient surges and pediatric emergency admissions.",
      focus: ["Neonatal care", "Rapid assessment", "Family communication"],
      notes: "Can be deployed for pediatric emergency admissions and outpatient triage.",
      img: "../Practioner/Dashboard/assets/Profile.png",
    },
    {
      id: "pract5",
      name: "Dr. Kwame Asante",
      title: "Anaesthetist",
      specialty: "Anaesthesia",
      status: "On Shift",
      statusClass: "active",
      location: "Operating Theatres",
      experience: "11 years",
      lastShift: "Today, 07:15 AM",
      contact: "+233 24 444 6622",
      email: "kwame.asante@healthlinka.com",
      summary: "Specialised in emergency anaesthesia and perioperative stabilization during trauma cases.",
      focus: ["Airway management", "Sedation", "Monitoring"],
      notes: "Optimal for immediate surgical support in trauma and critical care settings.",
      img: "../Practioner/Dashboard/assets/Hospital1.png",
    },
  ];

  var grid = document.getElementById("practitionerGrid");
  var pageInfo = document.getElementById("mpPageInfo");
  var modal = document.getElementById("practitionerModal");
  var modalClose = document.getElementById("modalClosePract");

  function showToast(message) {
    var toast = document.getElementById("toastH");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.t);
    showToast.t = setTimeout(function () {
      toast.classList.remove("show");
    }, 2600);
  }

  function renderPractitioners(list) {
    grid.innerHTML = list
      .map(function (prac) {
        return (
          '<article class="mp-card" data-id="' + prac.id + '">' +
          '<div class="mp-card-img"><img src="' + prac.img + '" alt="' + prac.name + '" /></div>' +
          '<div class="mp-card-body"><h3>' + prac.name + '</h3>' +
          '<div class="mp-role">' + prac.title + '</div>' +
          '<div class="mp-meta"><span>' + prac.specialty + '</span><span>' + prac.location + '</span></div>' +
          '<button type="button" class="mp-btn-view">View Profile</button></div></article>'
        );
      })
      .join("");
    pageInfo.textContent = "Showing " + list.length + " practitioner profiles";
  }

  function updateModal(prac) {
    document.getElementById("modalPractName").textContent = prac.name;
    document.getElementById("modalPractTitle").textContent = prac.title;
    document.getElementById("modalPractImage").src = prac.img;
    document.getElementById("modalPractStatus").textContent = prac.status;
    document.getElementById("modalPractSpecialty").textContent = prac.specialty;
    document.getElementById("modalPractLocation").textContent = "Assigned to: " + prac.location;
    document.getElementById("modalPractExperience").textContent = prac.experience;
    document.getElementById("modalPractLastShift").textContent = prac.lastShift;
    document.getElementById("modalPractContact").textContent = prac.contact;
    document.getElementById("modalPractEmail").textContent = prac.email;
    document.getElementById("modalPractSummary").textContent = prac.summary;
    document.getElementById("modalPractNotes").textContent = prac.notes;
    var focusArea = document.getElementById("modalPractFocus");
    focusArea.innerHTML = prac.focus.map(function (item) {
      return '<span>• ' + item + '</span>';
    }).join("");
  }

  function openModal(pracId) {
    var prac = practitioners.find(function (item) {
      return item.id === pracId;
    });
    if (!prac) return;
    updateModal(prac);
    modal.classList.add("open");
  }

  function closeModal() {
    modal.classList.remove("open");
  }

  grid.addEventListener("click", function (event) {
    var card = event.target.closest(".mp-card");
    if (!card) return;
    openModal(card.dataset.id);
  });

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });

  document.getElementById("practitionerSearch").addEventListener("input", function (event) {
    var query = event.target.value.toLowerCase();
    var filtered = practitioners.filter(function (item) {
      return item.name.toLowerCase().includes(query) || item.specialty.toLowerCase().includes(query) || item.location.toLowerCase().includes(query);
    });
    renderPractitioners(filtered);
  });

  var bell = document.getElementById("btnBell");
  if (bell) {
    bell.addEventListener("click", function () {
      showToast("No new notifications right now.");
    });
  }

  var emergency = document.getElementById("btnEmergency");
  if (emergency) {
    emergency.addEventListener("click", function () {
      showToast("Emergency alert workflow is available from the Dashboard.");
    });
  }

  renderPractitioners(practitioners);
})();
