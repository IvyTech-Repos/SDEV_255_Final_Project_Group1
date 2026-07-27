document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutBtn");

    if (!logoutBtn) {
        return;
    }

    const token = localStorage.getItem("token");
    
    // Hide logout button if nobody is logged in
    if (!token) {
        logoutBtn.style.display = "none";
        return;
    }

    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        window.location.href = "login.html";

    });
});