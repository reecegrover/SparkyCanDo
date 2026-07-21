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

  // Gallery: fade/slide reveal as cards scroll into view
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in-view"));
  }

  // Gallery: click-to-enlarge lightbox
  const swatches = document.querySelectorAll(".swatch");
  if (swatches.length) {
    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML = `
      <button class="lightbox-close" aria-label="Close">&times;</button>
      <img src="" alt="" />
      <div class="lightbox-caption"></div>
    `;
    document.body.appendChild(lb);
    const lbImg = lb.querySelector("img");
    const lbCaption = lb.querySelector(".lightbox-caption");
    const lbClose = lb.querySelector(".lightbox-close");

    function openLightbox(imgEl, captionText) {
      lbImg.src = imgEl.src;
      lbImg.alt = imgEl.alt;
      lbCaption.textContent = captionText;
      lb.classList.add("open");
    }
    function closeLightbox() {
      lb.classList.remove("open");
    }

    swatches.forEach((swatch) => {
      const img = swatch.querySelector("img");
      const caption = swatch.querySelector("figcaption");
      if (!img) return;
      swatch.addEventListener("click", () =>
        openLightbox(img, caption ? caption.textContent : "")
      );
    });

    lbClose.addEventListener("click", closeLightbox);
    lb.addEventListener("click", (e) => {
      if (e.target === lb) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLightbox();
    });
  }
});
