(function () {
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var email = (document.getElementById("email").value || "").trim() || "admin@hospital.com";
    if (window.HOSPITAL_SESSION) {
      HOSPITAL_SESSION.setLoggedIn(email.split("@")[0] || "Admin");
    }
    window.location.href = "dashboard.html";
  });

  document.getElementById("togglePw").addEventListener("click", function () {
    var i = document.getElementById("password");
    i.type = i.type === "password" ? "text" : "password";
  });
})();
