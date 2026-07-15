const form = document.getElementById("courseForm");
const pageTitle = document.getElementById("pageTitle");
const hiddenId = document.getElementById("courseId");

function getCourseIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function loadCourses() {
    const stored = localStorage.getItem("courseCatalog");
    return stored ? JSON.parse(stored) : [];
}

function saveCourses(courses) {
    localStorage.setItem("courseCatalog", JSON.stringify(courses));
}

function setStatus(message, isError = false) {
    let status = document.getElementById("saveStatus");
    if (!status) {
        status = document.createElement("p");
        status.id = "saveStatus";
        status.style.marginTop = "1rem";
        status.style.fontWeight = "bold";
        form.appendChild(status);
    }
    status.textContent = message;
    status.style.color = isError ? "#b91c1c" : "#166534";
}

function populateFormIfEditing() {
    const id = getCourseIdFromUrl();

    if (!id) {
        return;
    }

    pageTitle.textContent = "Edit Course";
    const courses = loadCourses();
    const course = courses.find((item) => item.id === Number(id));

    if (!course) {
        setStatus("The selected course could not be found.", true);
        return;
    }

    hiddenId.value = course.id;
    document.getElementById("subject").value = course.subject || "";
    document.getElementById("number").value = course.number || "";
    document.getElementById("name").value = course.name || "";
    document.getElementById("credits").value = course.credits || "";
    document.getElementById("description").value = course.description || "";
}

if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const payload = {
            subject: document.getElementById("subject")?.value || "",
            number: document.getElementById("number")?.value || "",
            name: document.getElementById("name")?.value || "",
            credits: Number(document.getElementById("credits")?.value || 0),
            description: document.getElementById("description")?.value || ""
        };

        if (!payload.subject || !payload.number || !payload.name || !payload.description) {
            setStatus("Please fill in the required course fields before saving.", true);
            return;
        }

        const id = hiddenId.value;
        const courses = loadCourses();

        if (id) {
            const index = courses.findIndex((course) => course.id === Number(id));
            if (index !== -1) {
                courses[index] = { ...courses[index], ...payload, id: Number(id) };
            }
        } else {
            const newId = courses.length ? Math.max(...courses.map((course) => course.id)) + 1 : 1;
            courses.push({ id: newId, ...payload });
        }

        saveCourses(courses);
        setStatus("Course saved successfully.");
        window.setTimeout(() => {
            window.location.href = "courses.html";
        }, 300);
    });
}

populateFormIfEditing();
