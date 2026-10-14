const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

function clearSectionHash() {
  if (window.location.hash) {
    window.history.replaceState(
      window.history.state,
      "",
      window.location.pathname + window.location.search
    );
  }
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const section = document.getElementById(link.hash.slice(1));
    if (!section) return;

    event.preventDefault();
    section.scrollIntoView();
    if (!section.hasAttribute("tabindex")) {
      section.setAttribute("tabindex", "-1");
      section.addEventListener("blur", () => section.removeAttribute("tabindex"), { once: true });
    }
    section.focus({ preventScroll: true });
    clearSectionHash();
  });
});

function restoreSectionAndCleanAddress() {
  const section = document.getElementById(window.location.hash.slice(1));
  if (section) section.scrollIntoView();
  clearSectionHash();
}

// Existing bookmarked section links still open their section with a clean address.
window.addEventListener("load", restoreSectionAndCleanAddress, { once: true });
window.addEventListener("hashchange", restoreSectionAndCleanAddress);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
