const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
