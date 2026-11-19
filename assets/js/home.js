const nav = document.querySelector("#site-nav");
const navToggle = nav.querySelector("button");
const visibleLinks = nav.querySelector(".visible-links");
const overflowLinks = document.querySelector("#more-navigation");
const navItems = Array.from(visibleLinks.children);

function setNavOpen(open) {
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.classList.toggle("close", open);
  overflowLinks.classList.toggle("hidden", !open);
}

function fitNavigation() {
  const wasOpen = navToggle.getAttribute("aria-expanded") === "true";
  visibleLinks.replaceChildren(...navItems);
  navToggle.classList.remove("hidden");

  // Reserve the space occupied by the overflow button and its gap.
  const availableWidth = nav.clientWidth - navToggle.offsetWidth - 14;
  while (visibleLinks.offsetWidth > availableWidth && visibleLinks.children.length > 1) {
    overflowLinks.prepend(visibleLinks.lastElementChild);
  }

  const hasOverflow = overflowLinks.children.length > 0;
  navToggle.classList.toggle("hidden", !hasOverflow);
  setNavOpen(wasOpen && hasOverflow);
}

navToggle.addEventListener("click", () => {
  setNavOpen(navToggle.getAttribute("aria-expanded") !== "true");
});

overflowLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setNavOpen(false);
  }
});

const profileToggle = document.querySelector(".author__urls-wrapper button");

function setProfileOpen(open) {
  profileToggle.setAttribute("aria-expanded", String(open));
  profileToggle.classList.toggle("open", open);
}

profileToggle.addEventListener("click", () => {
  setProfileOpen(profileToggle.getAttribute("aria-expanded") !== "true");
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  if (profileToggle.getAttribute("aria-expanded") === "true") {
    setProfileOpen(false);
    profileToggle.focus();
  } else if (navToggle.getAttribute("aria-expanded") === "true") {
    setNavOpen(false);
    navToggle.focus();
  }
});

fitNavigation();
new ResizeObserver(fitNavigation).observe(nav);
