const form = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");

const usernameError = document.getElementById("usernameError");
const passwordError = document.getElementById("passwordError");
const generalError = document.getElementById("generalError");

const DASHBOARD_URL = "../Dashboard/dashboard.html";

function validate() {
  let valid = true;

  usernameError.textContent = "";
  passwordError.textContent = "";
  generalError.textContent = "";

  if (usernameInput.value.trim() === "") {
    usernameError.textContent = "Username is required.";
    valid = false;
  }

  if (passwordInput.value.trim() === "") {
    passwordError.textContent = "Password is required.";
    valid = false;
  } else if (passwordInput.value.length < 8) {
    passwordError.textContent = "Password must be at least 8 characters.";
    valid = false;
  }

  return valid;
}

const BACKEND_API = (function () {
  if (typeof window === 'undefined') return 'http://localhost:4000/api';
  if (window.BACKEND_API) return window.BACKEND_API;
  if (!window.location.hostname || window.location.protocol === 'file:') return 'http://localhost:4000/api';
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:4000/api';
  }
  return '/api';
})();

function completeLoginDemo(username) {
  try {
    localStorage.setItem("hl_practitioner_logged_in", "1");
    localStorage.setItem("hl_practitioner_username", username);
    localStorage.setItem("hl_practitioner_fullName", username ? "Dr. " + username : "Dr. Kofi Mensah");
    localStorage.setItem("hl_practitioner_profession", "Senior Cardiologist");
  } catch (e) {}
  window.location.href = DASHBOARD_URL;
}

function storePractitionerSession(data) {
  try {
    localStorage.setItem("hl_practitioner_logged_in", "1");
    localStorage.setItem("hl_practitioner_token", data.token || "");
    localStorage.setItem("hl_practitioner_username", data.user.username || data.user.email || "");
    localStorage.setItem("hl_practitioner_fullName", data.user.name || "");
    localStorage.setItem("hl_practitioner_profession", (data.profile && data.profile.profession) || "Senior Cardiologist");
    localStorage.setItem("hl_practitioner_profile", JSON.stringify(data.profile || {}));
    if (data.profile && data.profile.id) {
      localStorage.setItem("hl_practitioner_profile_id", data.profile.id);
    }
  } catch (e) {}
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!validate()) return;

  loginBtn.disabled = true;
  loginBtn.textContent = "Logging in...";
  generalError.textContent = "";

  const username = usernameInput.value.trim();

  try {
    const response = await fetch(`${BACKEND_API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: passwordInput.value,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok && data.user) {
      storePractitionerSession(data);
      window.location.href = DASHBOARD_URL;
      return;
    }

    generalError.textContent = data.error || "Login failed. Falling back to demo mode.";
    completeLoginDemo(username);
    return;
  } catch (err) {
    generalError.textContent = "Backend unavailable — continuing with demo mode.";
    completeLoginDemo(username);
    return;
  } finally {
    loginBtn.disabled = false;
    loginBtn.textContent = "→  Login";
  }
});
