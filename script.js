// Dark/Light Theme Toggle
const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  toggleBtn.textContent = document.body.classList.contains("dark-theme") ? "☀️" : "🌙";
});

// About Me Edit (fixed with localStorage)
const editBtn = document.getElementById("edit-btn");
const aboutText = document.getElementById("about-text");

// Load saved text if it exists
if (localStorage.getItem("aboutText")) {
  aboutText.innerHTML = localStorage.getItem("aboutText");
}

editBtn.addEventListener("click", () => {
  if (editBtn.textContent === "Edit") {
    aboutText.contentEditable = "true";
    aboutText.focus();
    editBtn.textContent = "Save";
    editBtn.style.background = "var(--accent-color)";
    editBtn.style.color = "#fff";
  } else {
    aboutText.contentEditable = "false";
    editBtn.textContent = "Edit";
    editBtn.style.background = "transparent";
    editBtn.style.color = "var(--accent-color)";
    // Save changes
    localStorage.setItem("aboutText", aboutText.innerHTML);
  }
});

// Scroll Fade-in
const faders = document.querySelectorAll(".fade-in");
const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver(function(entries, observer){
  entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add("visible"); observer.unobserve(entry.target); } });
}, appearOptions);
faders.forEach(fader => appearOnScroll.observe(fader));

// Back to Top
const backBtn = document.getElementById("back-to-top");
window.addEventListener("scroll", () => { backBtn.style.display = window.scrollY > 300 ? "flex" : "none"; });
backBtn.addEventListener("click", () => window.scrollTo({ top:0, behavior:"smooth" }));

// Navbar Active on Scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => { const sectionTop = section.offsetTop-150; if(pageYOffset >= sectionTop){ current = section.getAttribute("id"); } });
  navLinks.forEach(link => { link.classList.remove("active"); if(link.getAttribute("href") === "#" + current){ link.classList.add("active"); } });
});

// Certificate Modal
const modal = document.getElementById("cert-modal");
const modalImg = document.getElementById("modal-img");
const modalCaption = document.getElementById("modal-caption");
const certImages = document.querySelectorAll(".cert-img");
const modalClose = document.querySelector(".modal-close");

certImages.forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;
    modalCaption.textContent = img.nextElementSibling.textContent;
  });
});

modalClose.addEventListener("click", () => { modal.style.display = "none"; });
modal.addEventListener("click", e => { if(e.target===modal) modal.style.display="none"; });
