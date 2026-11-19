// ==========================================
// THANK YOU PAGE
// ==========================================

const params = new URLSearchParams(window.location.search);

const fields = ["fname", "lname", "email", "phone", "organization"];

// textContent (not innerHTML) so user input is never run as HTML
fields.forEach((name) => {
    const output = document.querySelector(`#out-${name}`);

    if (output) {
        output.textContent = params.get(name) || "Not provided";
    }
});

// Timestamp: format the ISO date for the reader
const timestampOutput = document.querySelector("#out-timestamp");

if (timestampOutput) {
    const raw = params.get("timestamp");
    const date = raw ? new Date(raw) : null;

    timestampOutput.textContent =
        date && !Number.isNaN(date.getTime())
            ? date.toLocaleString("en-US", {
                dateStyle: "long",
                timeStyle: "short"
            })
            : "Not provided";
}