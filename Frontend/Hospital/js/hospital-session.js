/**
 * Hospital admin portal session (demo).
 */
(function (global) {
  var KEYS = {
    loggedIn: "hl_hospital_logged_in",
    adminName: "hl_hospital_admin_name",
    token: "hl_hospital_token",
    profile: "hl_hospital_profile",
    hospitalId: "hl_hospital_id",
  };

  var PATHS = {
    login: "Login.html",
    landing: "../index.html",
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

  function getToken() {
    try {
      return localStorage.getItem(KEYS.token) || "";
    } catch (e) {
      return "";
    }
  }

  function getProfile() {
    try {
      return JSON.parse(localStorage.getItem(KEYS.profile) || "null") || null;
    } catch (e) {
      return null;
    }
  }

  function getHospitalId() {
    try {
      return localStorage.getItem(KEYS.hospitalId) || "";
    } catch (e) {
      return "";
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
      localStorage.removeItem(KEYS.token);
      localStorage.removeItem(KEYS.profile);
      localStorage.removeItem(KEYS.hospitalId);
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
