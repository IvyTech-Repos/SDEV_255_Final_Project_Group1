// Course Management System

let courses = [];

async function refreshCourses() {
    try {
        const response = await fetch("/api/courses");
        courses = await response.json();
        displayCourses(courses);
    } catch (error) {
        console.error("Unable to load courses", error);
    }
}

// Display Courses in Table
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

// Search Courses
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

    displayFilteredCourses(filteredCourses);
}

// Display Search Results
function displayFilteredCourses(courseList) {
    displayCourses(courseList);
}

// Page Load
refreshCourses();

// View Course Button
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

    const response = await fetch(`/api/courses/${id}`, { method: "DELETE" });

    if (response.ok || response.status === 204) {
        await refreshCourses();
    }
}

window.viewCourse = viewCourse;
window.editCourse = editCourse;
window.deleteCourse = deleteCourse;
