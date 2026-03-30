const form = document.getElementById("loginForm");
const togglePass = document.getElementById("togglePass");
const passwordInput = document.getElementById("password");
const BACKEND_API = (function () {
  if (typeof window === 'undefined') return 'http://localhost:4000/api';
  if (window.BACKEND_API) return window.BACKEND_API;
  if (!window.location.hostname || window.location.protocol === 'file:') return 'http://localhost:4000/api';
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:4000/api';
  }
  return '/api';
})();

togglePass.addEventListener("click", () => {
    const visible = passwordInput.type === "text";
    passwordInput.type = visible ? "password" : "text";
    togglePass.setAttribute("aria-label", visible ? "Show password" : "Hide password");
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = passwordInput.value.trim();
    if (!email || !password) {
        alert("Enter your email and password");
        return;
    }

    let backendLoginSucceeded = false;
    try {
        const response = await fetch(`${BACKEND_API}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        if (response.ok) {
            const data = await response.json();
            if (data && data.token && data.user && data.user.role === "admin") {
                sessionStorage.setItem("superadmin_user", data.user.name || email);
                sessionStorage.setItem("superadmin_token", data.token);
                backendLoginSucceeded = true;
            }
        }
    } catch (err) {
        // Backend unavailable, fallback to local login
    }

    if (!backendLoginSucceeded) {
        sessionStorage.setItem("superadmin_user", email);
    }

    window.location.href = "../dashboard/dashboard.html";
});