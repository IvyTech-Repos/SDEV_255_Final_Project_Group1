function checkAuth(requiredRole) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

        if (!token) {
            window.location.href = "login.html";
            return;
        }

        if (role !== requiredRole) {
            alert("You do not have permission to access this page.");
            window.location.href = "index.html";
        }
    }