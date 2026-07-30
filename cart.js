async function loadCart() {
    const token = localStorage.getItem("token");
    const cartContainer = document.getElementById("cartContainer");

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

        if(cartItems.length === 0) {
            cartContainer.innerHTML = `
                <p>Your shopping cart is empty.</p>
            `;

            return;
        }

        cartContainer.innerHTML = "";

        cartItems.forEach(item => {
            const course = courses.find(
                course => course.id === item.courseId
            );

            if(course) {
                const cartItem = document.createElement("div");

                cartItem.innerHTML = `
                    <h4>
                        ${course.subject} ${course.number} - ${course.name}
                    </h4>

                    <p>Credits: ${course.credits}</p>

                    <button onclick="removeFromCart(${item.id})">Remove</button>

                    <hr>
                `;

                cartContainer.appendChild(cartItem);

            }
        });

    } catch(error) {
        console.error(error);

        cartContainer.innerHTML = "<p>Unable to load cart.</p>";

    }

}

async function removeFromCart(cartId) {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(
            `https://course-management-system-32f7.onrender.com/api/cart/${cartId}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if(response.ok) {
            loadCart();
        }

    } catch(error) {
        console.error(error);
    }

}

window.removeFromCart = removeFromCart;

loadCart();
