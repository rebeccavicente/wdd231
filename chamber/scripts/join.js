// ==========================================
// JOIN PAGE
// ==========================================

// Timestamp: the date and time the form was loaded
const timestampField = document.querySelector("#timestamp");

if (timestampField) {
    timestampField.value = new Date().toISOString();
}

// Modals: open from each card link
document.querySelectorAll("[data-modal]").forEach((link) => {

    link.addEventListener("click", (event) => {
        event.preventDefault();

        const modal = document.getElementById(link.dataset.modal);

        if (modal) {
            modal.showModal();
        }
    });
});

// Modals: close with the button or by clicking the backdrop
document.querySelectorAll("dialog").forEach((modal) => {

    modal.querySelector(".modal-close").addEventListener("click", () => {
        modal.close();
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
});