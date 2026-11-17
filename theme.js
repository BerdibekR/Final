document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("themeToggle");

    const savedTheme = localStorage.getItem("rmMuseumTheme");
    const initialTheme = savedTheme || "dark";

    function applyTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("rmMuseumTheme", theme);

        if (themeToggle) {
            themeToggle.checked = theme === "light";
        }
    }

    applyTheme(initialTheme);

    if (themeToggle) {
        themeToggle.addEventListener("change", function () {
            const selectedTheme = themeToggle.checked
                ? "light"
                : "dark";

            applyTheme(selectedTheme);
        });
    }
});