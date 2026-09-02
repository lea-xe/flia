const menuButtons = document.querySelectorAll(".menu-btn");
const mobileMenus = document.querySelectorAll(".mobile-menu");

menuButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        mobileMenus[index].classList.toggle("hidden");
    });
});

const packageDialog = document.querySelector("[data-package-dialog]");
const packagePanels = packageDialog?.querySelectorAll("[data-package-panel]");

document.querySelectorAll("[data-package]").forEach((packageButton) => {
    packageButton.addEventListener("click", () => {
        packagePanels?.forEach((panel) => {
            panel.classList.toggle("hidden", panel.dataset.packagePanel !== packageButton.dataset.package);
        });
        packageDialog?.showModal();
    });
});

document.querySelector("[data-close-dialog]")?.addEventListener("click", () => {
    packageDialog?.close();
});

packageDialog?.addEventListener("click", (event) => {
    if (event.target === packageDialog) packageDialog.close();
});