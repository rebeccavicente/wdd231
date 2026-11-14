
// Certificate courses
// Change completed to true when you have passed a course.

const courses = [
    {
        code: "CSE 110",
        title: "Introduction to Programming",
        credits: 2,
        completed: true
    },
    {
        code: "CSE 111",
        title: "Programming with Functions",
        credits: 2,
        completed: true
    },
    {
        code: "WDD 130",
        title: "Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        code: "WDD 131",
        title: "Dynamic Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        code: "WDD 231",
        title: "Web Frontend Development I",
        credits: 2,
        completed: false
    },
    {
        code: "CSE 210",
        title: "Programming with Classes",
        credits: 2,
        completed: true
    }
];

const courseList = document.querySelector("#course-list");
const creditTotal = document.querySelector("#credit-total");

const filterButtons = document.querySelectorAll(".filter-button");

// Display courses
function displayCourses(courseArray) {

    courseList.innerHTML = "";

    if (courseArray.length === 0) {
        courseList.textContent = "No courses found.";
    }

    courseArray.forEach((course) => {

        const card = document.createElement("article");

        card.classList.add("course-card");

        if (course.completed) {
            card.classList.add("completed");
        }

        const heading = document.createElement("h3");

        heading.textContent =
            `${course.code} — ${course.title}`;

        const credits = document.createElement("p");

        credits.textContent =
            `${course.credits} credits`;

        const status = document.createElement("p");

        status.textContent = course.completed
            ? "Completed"
            : "Not completed";

        card.append(heading, credits, status);

        courseList.appendChild(card);
    });

    // Calculate total credits using reduce()
    const totalCredits = courseArray.reduce(
        (total, course) => total + course.credits,
        0
    );

    creditTotal.textContent =
        `Total credits displayed: ${totalCredits}`;
}

// Filter courses
function filterCourses(filter) {

    let filteredCourses;

    if (filter === "ALL") {

        filteredCourses = courses;

    } else {

        filteredCourses = courses.filter((course) =>
            course.code.startsWith(filter)
        );
    }

    // Update active button
    filterButtons.forEach((button) => {

        const isActive =
            button.dataset.filter === filter;

        button.classList.toggle("active", isActive);

        button.setAttribute(
            "aria-pressed",
            String(isActive)
        );
    });

    displayCourses(filteredCourses);
}

// Listen for button clicks
filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        filterCourses(button.dataset.filter);

    });
});

// Display all courses when the page loads
displayCourses(courses);
