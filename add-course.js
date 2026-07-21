const form = document.getElementById("courseForm");
const pageTitle = document.getElementById("pageTitle");
const hiddenId = document.getElementById("courseId");

function getCourseIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
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


// Load existing course when editing
async function populateFormIfEditing() {

    const id = getCourseIdFromUrl();

    if (!id) {
        return;
    }

    pageTitle.textContent = "Edit Course";

    try {

        const response = await fetch(
            `http://localhost:3000/api/courses/${id}`
        );

        if (!response.ok) {
            throw new Error("Course not found");
        }

        const course = await response.json();

        hiddenId.value = course.id;
        document.getElementById("subject").value = course.subject;
        document.getElementById("number").value = course.number;
        document.getElementById("name").value = course.name;
        document.getElementById("credits").value = course.credits;
        document.getElementById("description").value = course.description;

    } catch (error) {

        setStatus(error.message, true);

    }
}


if (form) {

    form.addEventListener("submit", async (event) => {

        event.preventDefault();


        const payload = {

            subject: document.getElementById("subject").value,
            number: document.getElementById("number").value,
            name: document.getElementById("name").value,
            credits: Number(document.getElementById("credits").value),
            description: document.getElementById("description").value

        };


        if (
            !payload.subject ||
            !payload.number ||
            !payload.name ||
            !payload.description
        ) {

            setStatus(
                "Please fill in the required course fields before saving.",
                true
            );

            return;

        }


        try {

            const id = hiddenId.value;

            let url = "http://localhost:3000/api/courses";
            let method = "POST";


            // Editing existing course
            if (id) {

                url = `http://localhost:3000/api/courses/${id}`;
                method = "PUT";

            }


            const response = await fetch(
                url,
                {
                    method: method,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                }
            );


            if (!response.ok) {

                throw new Error("Failed to save course");

            }


            await response.json();


            setStatus("Course saved successfully.");


            setTimeout(() => {

                window.location.href = "courses.html";

            }, 500);



        } catch (error) {

            setStatus(error.message, true);

        }

    });

}


populateFormIfEditing();