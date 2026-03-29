(function () {
  try {
    var n = localStorage.getItem("hl_hospital_reg_name");
    if (n) {
      var el = document.getElementById("hname2");
      if (el) el.value = n;
    }
  } catch (e) {}

  document.getElementById("regForm2").addEventListener("submit", function (e) {
    e.preventDefault();
    var p1 = document.getElementById("pw1b").value;
    var p2 = document.getElementById("pw2b").value;
    if (p1 !== p2) {
      alert("Passwords do not match.");
      return;
    }
    if (window.HOSPITAL_SESSION) {
      HOSPITAL_SESSION.setLoggedIn(
        (document.getElementById("hname2").value || "Admin").split(" ")[0]
      );
    }
    window.location.href = "dashboard.html";
  });
})();
