// Course Management System

let courses = [
    {
        id: 1,
        subject: "IVYT",
        number: "111",
        name: "Student Success",
        credits: 1,
        description: "A foundational course for academic planning and student success."
    },
    {
        id: 2,
        subject: "CPIN",
        number: "279",
        name: "Information Technology Capstone",
        credits: 1,
        description: "A project-based capstone course for IT students."
    },
    {
        id: 3,
        subject: "DBMS",
        number: "110",
        name: "Introduction to Data Analytics",
        credits: 3,
        description: "An introductory course in databases and data systems."
    }
];

function saveCourses() {
    localStorage.setItem("courseCatalog", JSON.stringify(courses));
}

function loadCourses() {
    const stored = localStorage.getItem("courseCatalog");
    if (stored) {
        courses = JSON.parse(stored);
    }
}

function refreshCourses() {
    loadCourses();
    displayCourses(courses);
}

function displayCourses(courseList = courses) {
    const tableBody = document.getElementById("courseTableBody");

    if (!tableBody) {
        return;
    }

    tableBody.innerHTML = "";

    courseList.forEach((course) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${course.id}</td>
            <td>${course.subject}</td>
            <td>${course.number}</td>
            <td>${course.name}</td>
            <td>${course.credits}</td>
            <td>
                <button onclick="viewCourse(${course.id})">View</button>
                <button onclick="editCourse(${course.id})">Edit</button>
                <button onclick="deleteCourse(${course.id})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function searchCourses() {
    const searchInput = document
        .getElementById("searchCourses")
        .value
        .toLowerCase();

    const filteredCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(searchInput) ||
        course.number.toLowerCase().includes(searchInput) ||
        course.subject.toLowerCase().includes(searchInput)
    );

    displayCourses(filteredCourses);
}

function viewCourse(id) {
    const course = courses.find((item) => item.id === id);

    if (!course) {
        return;
    }

    const tableBody = document.getElementById("courseTableBody");
    const existingRow = document.getElementById(`details-${id}`);

    if (existingRow) {
        existingRow.remove();
        return;
    }

    const detailsRow = document.createElement("tr");
    detailsRow.id = `details-${id}`;

    detailsRow.innerHTML = `
        <td colspan="6">
            <strong>${course.subject} ${course.number} - ${course.name}</strong><br>
            Credits: ${course.credits}<br><br>
            ${course.description}
        </td>
    `;

    tableBody.appendChild(detailsRow);
}

function editCourse(id) {
    window.location.href = `add-course.html?id=${id}`;
}

function deleteCourse(id) {
    const confirmed = confirm("Delete this course?");

    if (!confirmed) {
        return;
    }

    courses = courses.filter((course) => course.id !== id);
    saveCourses();
    refreshCourses();
}

window.viewCourse = viewCourse;
window.editCourse = editCourse;
window.deleteCourse = deleteCourse;
window.searchCourses = searchCourses;

refreshCourses();
