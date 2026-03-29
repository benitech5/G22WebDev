const form = document.getElementById("loginForm");
const togglePass = document.getElementById("togglePass");
const passwordInput = document.getElementById("password");

togglePass.addEventListener("click", () => {
    const visible = passwordInput.type === "text";
    passwordInput.type = visible ? "password" : "text";
    togglePass.setAttribute("aria-label", visible ? "Show password" : "Hide password");
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = passwordInput.value.trim();
    if (!email || !password) {
        alert("Enter your email and password");
        return;
    }
    sessionStorage.setItem("superadmin_user", email);
    window.location.href = "../dashboard/dashboard.html";
});