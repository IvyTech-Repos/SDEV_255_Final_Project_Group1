// Course Management System
let courses = [];

async function loadCourses() {

    try {
        const response = await fetch(
            "http://localhost:3000/api/courses"
        );

        if (!response.ok) {
            throw new Error("Failed to load courses");
        }

        courses = await response.json();

        displayCourses();

    } catch (error) {
        console.error(error);
    }
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

async function deleteCourse(id) {

    const confirmed = confirm("Delete this course?");

    if (!confirmed) {
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:3000/api/courses/${id}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Failed to delete course");
        }

        await response.json();

        // Reload courses from backend
        loadCourses();

    } catch (error) {

        console.error(error);
        alert("Unable to delete course.");

    }
}

window.viewCourse = viewCourse;
window.editCourse = editCourse;
window.deleteCourse = deleteCourse;
window.searchCourses = searchCourses;

loadCourses();
