
// SELECT HTML ELEMENTS

const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");


// FETCH MEMBER DATA

async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load member data.");
        }

        const members = await response.json();

        displayMembers(members);

    } catch (error) {
        console.error("Error:", error);
        membersContainer.innerHTML =
            "<p>Unable to load the business directory.</p>";
    }
}


// DISPLAY MEMBER CARDS

function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach((member) => {

        const card = document.createElement("article");
        card.classList.add("member-card");

        const membershipName = {
            1: "Member",
            2: "Silver Member",
            3: "Gold Member"
        };

        card.innerHTML = `
            <h2>${member.name}</h2>

            <p class="member-tagline">${member.tagline}</p>

            <div class="member-content">

                <img
                    src="images/members/${member.image}"
                    alt="${member.name} logo"
                    loading="lazy"
                    width="120"
                    height="120"
                >

                <div class="member-information">

                    <p><strong>Address:</strong> ${member.address}</p>

                    <p><strong>Phone:</strong> ${member.phone}</p>

                    <p>
                        <strong>Website:</strong>
                        <a href="${member.website}"
                           target="_blank"
                           rel="noopener noreferrer">
                           Visit Website
                        </a>
                    </p>

                    <p class="member-level">
                        ${membershipName[member.membership] || "Member"}
                    </p>

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

    gridButton.classList.add("active");
    listButton.classList.remove("active");

    gridButton.setAttribute("aria-pressed", "true");
    listButton.setAttribute("aria-pressed", "false");

});


// LIST VIEW

listButton.addEventListener("click", () => {

    membersContainer.classList.add("members-list");
    membersContainer.classList.remove("members-grid");

    listButton.classList.add("active");
    gridButton.classList.remove("active");

    listButton.setAttribute("aria-pressed", "true");
    gridButton.setAttribute("aria-pressed", "false");

});


// INITIALIZE DIRECTORY

getMembers();
