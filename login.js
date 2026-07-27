document.querySelector("#loginBtn").addEventListener("click", login);

async function login() {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    const response = await fetch("http://localhost:3000/api/login", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            username,
            password
        })
    });

    const data = await response.json();

    if(!response.ok){
        document.querySelector("#message").textContent = data.message;
        return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    if(data.role === "teacher"){
        window.location.href = "teacher-portal.html";
    }
    else{
        window.location.href = "student-portal.html";
    }
}