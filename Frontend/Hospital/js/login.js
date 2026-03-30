(function () {
  var BACKEND_API = (function () {
    if (typeof window === 'undefined') return 'http://localhost:4000/api';
    if (window.BACKEND_API) return window.BACKEND_API;
    if (!window.location.hostname || window.location.protocol === 'file:') return 'http://localhost:4000/api';
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:4000/api';
    }
    return '/api';
  })();

  function storeHospitalSession(data) {
    try {
      if (data.token) localStorage.setItem("hl_hospital_token", data.token)
      if (data.user) {
        localStorage.setItem("hl_hospital_admin_name", data.user.name || data.user.username || "Admin")
      }
      if (data.profile) {
        localStorage.setItem("hl_hospital_profile", JSON.stringify(data.profile))
        if (data.profile.id) localStorage.setItem("hl_hospital_id", data.profile.id)
      }
    } catch (err) {}
  }

  document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    var email = (document.getElementById("email").value || "").trim() || "admin@hospital.com";
    var password = (document.getElementById("password").value || "").trim();
    try {
      var response = await fetch(`${BACKEND_API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      })
      var data = await response.json().catch(() => ({}))
      if (response.ok && data.user) {
        storeHospitalSession(data)
        if (window.HOSPITAL_SESSION) {
          HOSPITAL_SESSION.setLoggedIn(data.user.name || data.user.username || email.split("@")[0])
        }
        window.location.href = "dashboard.html"
        return
      }
    } catch (err) {
      console.warn("Hospital backend login failed", err)
    }

    if (window.HOSPITAL_SESSION) {
      HOSPITAL_SESSION.setLoggedIn(email.split("@")[0] || "Admin")
    }
    window.location.href = "dashboard.html";
  });

  document.getElementById("togglePw").addEventListener("click", function () {
    var i = document.getElementById("password");
    i.type = i.type === "password" ? "text" : "password";
  });
})();
