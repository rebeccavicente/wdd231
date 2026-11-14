
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

// Display current year
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Display last modification date
if (lastModified) {
    lastModified.textContent = document.lastModified;
}
