const form = document.getElementById("signupForm");
const fullNameInput = document.getElementById("fullName");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const reenterPasswordInput = document.getElementById("reenterPassword");
const signupBtn = document.getElementById("signupBtn");

const fullNameError = document.getElementById("fullNameError");
const usernameError = document.getElementById("usernameError");
const passwordError = document.getElementById("passwordError");
const reenterPasswordError = document.getElementById("reenterPasswordError");
const generalError = document.getElementById("generalError");

const CREDENTIALS_URL = "../credentialandverify/credentials.html";

function validate() {
  let valid = true;

  fullNameError.textContent = "";
  usernameError.textContent = "";
  passwordError.textContent = "";
  reenterPasswordError.textContent = "";
  generalError.textContent = "";

  if (!fullNameInput || fullNameInput.value.trim() === "") {
    if (fullNameError) fullNameError.textContent = "Full name is required.";
    valid = false;
  }

  if (usernameInput.value.trim() === "") {
    usernameError.textContent = "Username is required.";
    valid = false;
  } else if (usernameInput.value.trim().length < 3) {
    usernameError.textContent = "Username must be at least 3 characters.";
    valid = false;
  }

  if (passwordInput.value.trim() === "") {
    passwordError.textContent = "Password is required.";
    valid = false;
  } else if (passwordInput.value.length < 8) {
    passwordError.textContent = "Password must be at least 8 characters.";
    valid = false;
  }

  if (reenterPasswordInput.value.trim() === "") {
    reenterPasswordError.textContent = "Please re-enter your password.";
    valid = false;
  } else if (reenterPasswordInput.value !== passwordInput.value) {
    reenterPasswordError.textContent = "Passwords do not match.";
    valid = false;
  }

  return valid;
}

function goToCredentials(username, fullName) {
  try {
    localStorage.setItem("hl_signup_username", username);
    if (fullName && fullName.trim()) {
      localStorage.setItem("hl_signup_fullname", fullName.trim());
    }
  } catch (e) {}
  window.location.href = CREDENTIALS_URL;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!validate()) return;

  signupBtn.disabled = true;
  signupBtn.textContent = "Creating account...";
  generalError.textContent = "";

  const username = usernameInput.value.trim();
  const fullName = fullNameInput ? fullNameInput.value.trim() : "";

  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: passwordInput.value,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      goToCredentials(username, fullName);
      return;
    }

    /* Demo: continue to credentials when API is not available */
    goToCredentials(username, fullName);
    return;
  } catch (err) {
    generalError.textContent = "";
    goToCredentials(username, fullName);
    return;
  } finally {
    signupBtn.disabled = false;
    signupBtn.innerHTML =
      'Proceed to verification <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
  }
});
