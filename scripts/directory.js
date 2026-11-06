
// MOBILE NAVIGATION

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.textContent = isOpen ? "✕" : "☰";
});


// FOOTER DATES

document.querySelector("#current-year").textContent =
    new Date().getFullYear();

document.querySelector("#last-modified").textContent =
    document.lastModified;


// MEMBER DIRECTORY

const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");


// FETCH JSON USING ASYNC/AWAIT

async function getMembers() {

    try {

        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not load member data.");
        }

        const members = await response.json();

        displayMembers(members);

    } catch (error) {

        console.error("Error loading members:", error);

        membersContainer.innerHTML =
            "<p>Sorry, the member directory could not be loaded.</p>";

    }

}


// DISPLAY MEMBERS

function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach((member) => {

        const card = document.createElement("article");

        card.classList.add("member-card");

        card.innerHTML = `
            <h2>${member.name}</h2>

            <p class="tagline">${member.tagline}</p>

            <div class="member-details">

                <img
                    src="images/members/${member.image}"
                    alt="${member.name} logo"
                    loading="lazy"
                >

                <div class="member-info">

                    <p>
                        <strong>ADDRESS:</strong>
                        ${member.address}
                    </p>

                    <p>
                        <strong>PHONE:</strong>
                        ${member.phone}
                    </p>

                    <p>
                        <strong>URL:</strong>
                        <a href="${member.website}"
                           target="_blank"
                           rel="noopener noreferrer">
                            Visit Website
                        </a>
                    </p>

                    <p class="membership">
                        Membership Level: ${member.membership}
                    </p>

                    <p>${member.description}</p>

                </div>

            </div>
        `;

        membersContainer.appendChild(card);

    });

}


// GRID VIEW

gridButton.addEventListener("click", () => {

    membersContainer.classList.add("members-grid");
    membersContainer.classList.remove("members-list");

    gridButton.classList.add("selected");
    listButton.classList.remove("selected");

    gridButton.setAttribute("aria-pressed", "true");
    listButton.setAttribute("aria-pressed", "false");

});


// LIST VIEW

listButton.addEventListener("click", () => {

    membersContainer.classList.add("members-list");
    membersContainer.classList.remove("members-grid");

    listButton.classList.add("selected");
    gridButton.classList.remove("selected");

    listButton.setAttribute("aria-pressed", "true");
    gridButton.setAttribute("aria-pressed", "false");

});


// START DIRECTORY

getMembers();
