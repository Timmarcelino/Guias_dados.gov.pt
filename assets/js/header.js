const controls = document.querySelectorAll("[data-menu-button]");

function closeAll(except = null) {
  controls.forEach((button) => {
    if (button === except) return;
    const id = button.getAttribute("aria-controls");
    const panel = id ? document.getElementById(id) : null;
    button.setAttribute("aria-expanded", "false");
    if (panel) panel.hidden = true;
  });
}

controls.forEach((button) => {
  const id = button.getAttribute("aria-controls");
  const panel = id ? document.getElementById(id) : null;
  if (!panel) return;

  button.addEventListener("click", () => {
    const open = button.getAttribute("aria-expanded") === "true";
    closeAll(button);
    button.setAttribute("aria-expanded", String(!open));
    panel.hidden = open;
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".portal-nav-menu")) closeAll();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeAll();
});

const headerSearch = document.querySelector("[data-header-search]");
headerSearch?.addEventListener("click", () => {
  const localSearch = document.getElementById("dg-query");
  localSearch?.focus();
  localSearch?.scrollIntoView({ behavior: "smooth", block: "center" });
});
