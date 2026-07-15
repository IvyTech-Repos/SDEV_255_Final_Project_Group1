const form = document.getElementById("courseForm");
const pageTitle = document.getElementById("pageTitle");
const hiddenId = document.getElementById("courseId");

function getCourseIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

async function populateFormIfEditing() {
    const id = getCourseIdFromUrl();

    if (!id) {
        return;
    }

    pageTitle.textContent = "Edit Course";

    const response = await fetch(`/api/courses/${id}`);
    const course = await response.json();

    if (!course) {
        return;
    }

    hiddenId.value = course.id;
    document.getElementById("subject").value = course.subject;
    document.getElementById("number").value = course.number;
    document.getElementById("name").value = course.name;
    document.getElementById("credits").value = course.credits;
    document.getElementById("description").value = course.description;
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const payload = {
        subject: document.getElementById("subject").value,
        number: document.getElementById("number").value,
        name: document.getElementById("name").value,
        credits: Number(document.getElementById("credits").value),
        description: document.getElementById("description").value
    };

    const id = hiddenId.value;
    const method = id ? "PUT" : "POST";
    const url = id ? `/api/courses/${id}` : "/api/courses";

    const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        window.location.href = "courses.html";
    }
});

populateFormIfEditing();
