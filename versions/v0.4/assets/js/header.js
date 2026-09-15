const menuControls = document.querySelectorAll("[data-menu-button]");
const portalHeader = document.querySelector(".portal-header");
const mobileToggle = document.querySelector("[data-mobile-nav-toggle]");
const primaryNav = document.getElementById("portal-primary-nav");

function closeMenus(except = null) {
  menuControls.forEach((button) => {
    if (button === except) return;

    const id = button.getAttribute("aria-controls");
    const panel = id ? document.getElementById(id) : null;

    button.setAttribute("aria-expanded", "false");
    if (panel) panel.hidden = true;
  });
}

menuControls.forEach((button) => {
  const id = button.getAttribute("aria-controls");
  const panel = id ? document.getElementById(id) : null;
  if (!panel) return;

  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const open = button.getAttribute("aria-expanded") === "true";

    closeMenus(button);
    button.setAttribute("aria-expanded", String(!open));
    panel.hidden = open;
  });
});

function closeMobileNavigation() {
  if (!portalHeader || !mobileToggle) return;
  portalHeader.dataset.mobileOpen = "false";
  mobileToggle.setAttribute("aria-expanded", "false");
}

mobileToggle?.addEventListener("click", () => {
  if (!portalHeader) return;

  const open = portalHeader.dataset.mobileOpen === "true";
  portalHeader.dataset.mobileOpen = String(!open);
  mobileToggle.setAttribute("aria-expanded", String(!open));

  if (open) closeMenus();
});

primaryNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileNavigation);
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".portal-nav-menu")) closeMenus();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  closeMenus();
  closeMobileNavigation();
  mobileToggle?.focus();
});

const headerSearch = document.querySelector("[data-header-search]");
headerSearch?.addEventListener("click", () => {
  const localSearch = document.getElementById("dg-query");
  localSearch?.scrollIntoView({ behavior: "smooth", block: "center" });
  window.setTimeout(() => localSearch?.focus(), 250);
});
