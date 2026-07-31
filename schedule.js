async function loadSchedule() {
    const token = localStorage.getItem("token");
    const scheduleContainer = document.getElementById("scheduleContainer");

    if (!scheduleContainer) {
        return;
    }

    try {
        const cartResponse = await fetch(
            "https://course-management-system-32f7.onrender.com/api/cart",
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const cartItems = await cartResponse.json();

        const coursesResponse = await fetch(
            "https://course-management-system-32f7.onrender.com/api/courses"
        );

        const courses = await coursesResponse.json();

        if (cartItems.length === 0) {
            scheduleContainer.innerHTML = `
                <p>No classes are in your schedule yet.</p>
            `;

            return;
        }

        scheduleContainer.innerHTML = "";

        cartItems.forEach((item) => {
            const course = courses.find((entry) => entry.id === item.courseId);

            if (!course) {
                return;
            }

            const scheduleItem = document.createElement("div");

            scheduleItem.innerHTML = `
                <h4>${course.subject} ${course.number} - ${course.name}</h4>
                <p>Credits: ${course.credits}</p>
                <hr>
            `;

            scheduleContainer.appendChild(scheduleItem);
        });
    } catch (error) {
        console.error(error);
        scheduleContainer.innerHTML = "<p>Unable to load schedule.</p>";
    }
}

loadSchedule();