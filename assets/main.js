document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector("nav.links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("open"))
    );
  }

  // Contact form — replace YOUR_FORM_ID in index.html with a real Formspree ID.
  // Until then, this just shows a friendly note instead of silently failing.
  const form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      if (form.action.includes("YOUR_FORM_ID")) {
        e.preventDefault();
        alert(
          "This form isn't wired up yet — see the README for the 2-minute Formspree setup. For now, use the email link below!"
        );
      }
    });
  }
});
