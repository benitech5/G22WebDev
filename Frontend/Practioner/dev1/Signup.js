const form = document.getElementById("signupForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const reenterPasswordInput = document.getElementById("reenterPassword");
const signupBtn = document.getElementById("signupBtn");

const usernameError = document.getElementById("usernameError");
const passwordError = document.getElementById("passwordError");
const reenterPasswordError = document.getElementById("reenterPasswordError");
const generalError = document.getElementById("generalError");

function validate() {
  let valid = true;

  usernameError.textContent = "";
  passwordError.textContent = "";
  reenterPasswordError.textContent = "";
  generalError.textContent = "";

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

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!validate()) return;

  signupBtn.disabled = true;
  signupBtn.textContent = "Creating account...";

  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: usernameInput.value.trim(),
        password: passwordInput.value
      })
    });

    const data = await response.json();

    if (response.ok) {
      window.location.href = "certification.html";
    } else {
      generalError.textContent = data.message || "Signup failed. Try again.";
    }

  } catch (err) {
    generalError.textContent = "Network error. Please try again.";
  } finally {
    signupBtn.disabled = false;
    signupBtn.textContent = "Provide Certification \u00a0 →";
  }
});