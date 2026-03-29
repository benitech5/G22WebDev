/**
 * Hospital admin portal session (demo).
 */
(function (global) {
  var KEYS = { loggedIn: "hl_hospital_logged_in", adminName: "hl_hospital_admin_name" };

  var PATHS = {
    login: "Login.html",
    landing: "../Landingpage.html",
    dashboard: "dashboard.html",
    contracts: "contracts.html",
    payments: "payments.html",
    register: "register.html",
  };

  function isLoggedIn() {
    try {
      return localStorage.getItem(KEYS.loggedIn) === "1";
    } catch (e) {
      return false;
    }
  }

  function setLoggedIn(name) {
    try {
      localStorage.setItem(KEYS.loggedIn, "1");
      if (name) localStorage.setItem(KEYS.adminName, name);
    } catch (e) {}
  }

  function logout() {
    try {
      localStorage.removeItem(KEYS.loggedIn);
      localStorage.removeItem(KEYS.adminName);
    } catch (e) {}
    window.location.href = PATHS.landing;
  }

  function requireAuth() {
    if (!isLoggedIn()) {
      window.location.href = PATHS.login;
      return false;
    }
    return true;
  }

  function getAdmin() {
    try {
      var n = localStorage.getItem(KEYS.adminName);
      return n || "Admin User";
    } catch (e) {
      return "Admin User";
    }
  }

  global.HOSPITAL_SESSION = {
    KEYS: KEYS,
    PATHS: PATHS,
    isLoggedIn: isLoggedIn,
    setLoggedIn: setLoggedIn,
    logout: logout,
    requireAuth: requireAuth,
    getAdmin: getAdmin,
  };

  function bindHospitalLogout() {
    var btn = document.getElementById("btnLogout");
    if (btn && btn.addEventListener) {
      btn.addEventListener("click", logout);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindHospitalLogout);
  } else {
    bindHospitalLogout();
  }
})(window);
