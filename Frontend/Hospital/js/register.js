(function () {
  document.getElementById("regForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var p1 = document.getElementById("pw1").value;
    var p2 = document.getElementById("pw2").value;
    if (p1 !== p2) {
      alert("Passwords do not match.");
      return;
    }
    try {
      localStorage.setItem("hl_hospital_reg_name", document.getElementById("hname").value);
      localStorage.setItem("hl_portal_type", "hospital");
    } catch (err) {}
    window.location.href = "../Practioner/credentialandverify/credentials.html";
  });
})();
