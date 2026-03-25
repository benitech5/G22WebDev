const form = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");

const usernameError = document.getElementById("usernameError");
const passwordError = document.getElementById("passwordError");
const generalError = document.getElementById("generalError");

function validate() {+
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

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!validate()) return;

  loginBtn.disabled = true;
  loginBtn.textContent = "Logging in...";

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: usernameInput.value.trim(),
        password: passwordInput.value
      })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "dashboard.html";
    } else {
      generalError.textContent = data.message || "Login failed. Try again.";
    }

  } catch (err) {
    generalError.textContent = "Network error. Please try again.";
  } finally {
    loginBtn.disabled = false;
    loginBtn.textContent = "→  Login";
  }
});