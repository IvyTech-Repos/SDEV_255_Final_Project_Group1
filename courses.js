// Course Management System

// Course Data Array

const courses = [
    {
        id: 1,
        subject: "IVYT",
        number: "111",
        name: "Student Success",
        credits: 1,
        description: "This course provides students with an overview of skills and strategies necessary to successfully complete a degree or certificate from Ivy Tech Community College and/or to transfer to a four-year institution. Students focus on developing an individualized plan focused on reaching their educational, career, and life objectives."
    },
    {
        id: 2,
        subject: "CPIN",
        number: "279",
        name: "Information Technology Capstone",
        credits: 1,
        description: "Prepares students for entry into the information world. Reviews procedures for researching a career; preparing a resume and a portfolio; interviewing; team participation; and ethical/productive job performance."
    },
    {
        id: 3,
        subject: "DBMS",
        number: "110",
        name: "Introduction to Data Analytics",
        credits: 3,
        description: "Introduces students to the basic concepts of databases including the types of databases, the general database environment, and the importance of data to the business world."
    }
    // Additional courses will go here
];

// Display Courses in Table

function displayCourses() {
    const tableBody = document.getElementById("courseTableBody");

    if (!tableBody) {
        return;
    }

    tableBody.innerHTML = "";

    courses.forEach(course => {
        
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

    const filteredCourses = courses.filter(course =>
        course.name.toLowerCase().includes(searchInput) ||
        course.number.toLowerCase().includes(searchInput) ||
        course.subject.toLowerCase().includes(searchInput)
    );

    displayFilteredCourses(filteredCourses);
}

//Display Search Results

function displayFilteredCourses(courseList) {

    const tableBody = document.getElementById("courseTableBody");

    tableBody.innerHTML = "";

    courseList.forEach(course => {
        
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${course.id}</td>
            <td>${course.subject}</td>
            <td>${course.number}</td>
            <td>${course.name}</td>
            <td>${course.credits}</td>
            <td>
                <button>View</button>
            </td>
        `;

        tableBody.appendChild(row);

    });
}

//Page Load

displayCourses();

// View Course Button

function viewCourse(id) {

    const course = courses.find(course => course.id === id);

    if (course) {
        alert(
            `Course: ${course.name}\n` +
            `Subject: ${course.subject}\n` +
            `Number: ${course.number}\n` +
            `Credits: ${course.credits}\n\n` +
            `${course.description}`
        );
    }

}

