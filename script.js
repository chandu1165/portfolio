const root = document.documentElement;
const cursor = document.querySelector(".cursor");
const searchToggle = document.querySelector("#searchToggle");
const themeToggle = document.querySelector("#themeToggle");
const palette = document.querySelector("#commandPalette");
const commandInput = document.querySelector("#commandInput");
const commandButtons = Array.from(document.querySelectorAll("[data-target]"));
const revealItems = Array.from(document.querySelectorAll(".reveal"));
const caseStudy = document.querySelector("#caseStudy");
const caseStudyOpen = document.querySelector("#caseStudyOpen");
const caseStudyClose = document.querySelector("#caseStudyClose");

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") {
  root.classList.remove("dark");
} else {
  root.classList.add("dark");
}

window.addEventListener("mousemove", (event) => {
  if (!cursor) return;
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
});

document.querySelectorAll("a, button").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    if (!cursor) return;
    cursor.style.width = "34px";
    cursor.style.height = "34px";
  });
  item.addEventListener("mouseleave", () => {
    if (!cursor) return;
    cursor.style.width = "18px";
    cursor.style.height = "18px";
  });
});

themeToggle?.addEventListener("click", () => {
  root.classList.toggle("dark");
  localStorage.setItem("portfolio-theme", root.classList.contains("dark") ? "dark" : "light");
});

function openPalette() {
  palette?.classList.add("open");
  palette?.setAttribute("aria-hidden", "false");
  document.body.classList.add("palette-open");
  commandInput?.focus();
}

function closePalette() {
  palette?.classList.remove("open");
  palette?.setAttribute("aria-hidden", "true");
  document.body.classList.remove("palette-open");
  commandInput.value = "";
  commandButtons.forEach((button) => {
    button.hidden = false;
  });
}

function openCaseStudy() {
  caseStudy?.classList.add("open");
  caseStudy?.setAttribute("aria-hidden", "false");
  document.body.classList.add("palette-open");
  caseStudyClose?.focus();
}

function closeCaseStudy() {
  caseStudy?.classList.remove("open");
  caseStudy?.setAttribute("aria-hidden", "true");
  document.body.classList.remove("palette-open");
  caseStudyOpen?.focus();
}

searchToggle?.addEventListener("click", openPalette);
caseStudyOpen?.addEventListener("click", openCaseStudy);
caseStudyClose?.addEventListener("click", closeCaseStudy);

palette?.addEventListener("click", (event) => {
  if (event.target === palette) {
    closePalette();
  }
});

caseStudy?.addEventListener("click", (event) => {
  if (event.target === caseStudy) {
    closeCaseStudy();
  }
});

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if ((event.ctrlKey || event.metaKey) && key === "k") {
    event.preventDefault();
    openPalette();
  }

  if (event.key === "Escape" && palette?.classList.contains("open")) {
    closePalette();
  }

  if (event.key === "Escape" && caseStudy?.classList.contains("open")) {
    closeCaseStudy();
  }
});

commandInput?.addEventListener("input", () => {
  const query = commandInput.value.trim().toLowerCase();
  commandButtons.forEach((button) => {
    button.hidden = !button.textContent.toLowerCase().includes(query);
  });
});

commandButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.target);
    closePalette();
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => observer.observe(item));
