
const menuButton = document.querySelector("#menu-toggle");
const navigation = document.querySelector("#primary-nav");

if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {

        const isOpen =
            menuButton.getAttribute("aria-expanded") === "true";

        menuButton.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Open navigation menu" : "Close navigation menu"
        );

        navigation.classList.toggle("open", !isOpen);
    });

    window.addEventListener("resize", () => {

        if (window.matchMedia("(min-width: 700px)").matches) {

            navigation.classList.remove("open");

            menuButton.setAttribute("aria-expanded", "false");

            menuButton.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        }
    });
}
