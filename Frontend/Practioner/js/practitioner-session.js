/**
 * Front-end session for practitioner portal (demo / until backend wired).
 * Login sets hl_practitioner_logged_in; verification success also sets it.
 */
(function (global) {
  var KEYS = {
    loggedIn: "hl_practitioner_logged_in",
    username: "hl_practitioner_username",
    onboarding: "hl_onboarding_complete",
  };

  var PATHS = {
    login: "../PractionerLogin/Login.html",
    landing: "../../Landingpage.html",
    dashboard: "dashboard.html",
    contracts: "my-contracts.html",
    hospitals: "hospital-search.html",
    payments: "../Mypayments/index.html",
  };

  function isLoggedIn() {
    try {
      return localStorage.getItem(KEYS.loggedIn) === "1";
    } catch (e) {
      return false;
    }
  }

  function setLoggedIn(username) {
    try {
      localStorage.setItem(KEYS.loggedIn, "1");
      if (username) localStorage.setItem(KEYS.username, username);
    } catch (e) {}
  }

  function setOnboardingComplete() {
    try {
      localStorage.setItem(KEYS.onboarding, "1");
    } catch (e) {}
  }

  function logout() {
    try {
      localStorage.removeItem(KEYS.loggedIn);
      localStorage.removeItem(KEYS.username);
      localStorage.removeItem(KEYS.onboarding);
    } catch (e) {}
    window.location.href = PATHS.landing;
  }

  /** Call from Dashboard/* pages (same folder as dashboard.html). */
  function requireAuthOrRedirect() {
    if (!isLoggedIn()) {
      window.location.href = PATHS.login;
      return false;
    }
    return true;
  }

  /** From Mypayments folder */
  function requireAuthFromPayments() {
    if (!isLoggedIn()) {
      window.location.href = "../PractionerLogin/Login.html";
      return false;
    }
    return true;
  }

  function getDisplayUser() {
    var name = "";
    var title = "";
    try {
      name = sessionStorage.getItem("hl_practitioner_fullName") || "";
      title = sessionStorage.getItem("hl_practitioner_profession") || "";
    } catch (e) {}
    if (!name) {
      try {
        name = localStorage.getItem("hl_signup_fullname") || "";
      } catch (e) {}
    }
    if (!name) {
      try {
        var u = localStorage.getItem(KEYS.username) || "";
        name = u ? "Dr. " + u.charAt(0).toUpperCase() + u.slice(1) : "Dr. Kofi Mensah";
      } catch (e) {
        name = "Dr. Kofi Mensah";
      }
    }
    if (!title) title = "Senior Cardiologist";
    return { name: name, title: title };
  }

  global.PRACTITIONER_SESSION = {
    KEYS: KEYS,
    PATHS: PATHS,
    isLoggedIn: isLoggedIn,
    setLoggedIn: setLoggedIn,
    setOnboardingComplete: setOnboardingComplete,
    logout: logout,
    requireAuthOrRedirect: requireAuthOrRedirect,
    requireAuthFromPayments: requireAuthFromPayments,
    getDisplayUser: getDisplayUser,
  };
})(window);
