document.addEventListener("DOMContentLoaded", async () => {

    const response = await fetch("http://localhost:3000/api/songs");

    const songs = await response.json();

    const list = document.getElementById("songs");

    for (const song of songs) {
        list.innerHTML += `
            <li>
                <strong>${song.title}</strong><br>
                ${song.artist}
            </li>
        `;
    }

});
