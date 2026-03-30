(function () {
  if (window.PRACTITIONER_SESSION) {
    var u = "";
    try {
      u = localStorage.getItem("hl_signup_username") || localStorage.getItem("hl_practitioner_username") || "";
    } catch (e) {}
    window.PRACTITIONER_SESSION.setLoggedIn(u);
    window.PRACTITIONER_SESSION.setOnboardingComplete();
  }

  var fullName = "Dr. Kofi Mensah";
  var profession = "Senior Cardiologist";
  try {
    var n = sessionStorage.getItem("hl_practitioner_fullName");
    var p = sessionStorage.getItem("hl_practitioner_profession");
    if (n) fullName = n;
    if (p) profession = p;
  } catch (e) {}

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  var certName = document.getElementById("certName");
  if (certName) certName.textContent = fullName;

  var desc = document.getElementById("certDesc");
  if (desc) {
    desc.innerHTML =
      "This certifies that the named practitioner is verified as a <strong>" +
      escapeHtml(profession) +
      "</strong> in good standing with the Ghana Health Service and is authorized to practice within the scope of their registration.";
  }

  function toast(msg) {
    alert(msg);
  }

  var dl = document.getElementById("btnDownload");

  if (dl) {
    dl.addEventListener("click", function () {
      window.print();
    });
  }

  var share = document.getElementById("cardShare");
  if (share) {
    share.addEventListener("click", function () {
      toast("Share link: feature coming with backend integration.");
    });
  }

  var hist = document.getElementById("cardHistory");
  if (hist) {
    hist.addEventListener("click", function () {
      toast("Renewal history: feature coming with backend integration.");
    });
  }
})();
