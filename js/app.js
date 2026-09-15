const grid = document.getElementById("portfolioGrid");
const emptyState = document.getElementById("emptyState");
const filterBar = document.getElementById("filterBar");
const modal = document.getElementById("projectModal");
const modalMedia = document.getElementById("modalMedia");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
let activeFilter = "all";

const labels = {
  video: "Video Editing",
  graphics: "Graphic Design",
  thumbnail: "Thumbnail",
  branding: "Branding"
};

function mediaMarkup(project) {
  if (project.mediaType === "video") {
    return `<div class="media-fallback">PLAY ▶</div>`;
  }
  if (!project.media) return `<div class="media-fallback">KHN</div>`;
  return `<img src="${project.media}" alt="${escapeHtml(project.title)}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=&quot;media-fallback&quot;>KHN</div>'">`;
}

function renderProjects() {
  const projects = getProjects();
  const filtered = activeFilter === "all" ? projects : projects.filter(p => p.category === activeFilter);
  grid.innerHTML = "";
  emptyState.classList.toggle("hidden", filtered.length !== 0);

  filtered.forEach(project => {
    const card = document.createElement("article");
    card.className = "project-card reveal";
    card.innerHTML = `
      <div class="project-media">${mediaMarkup(project)}</div>
      <div class="project-info">
        <div>
          <p>${labels[project.category] || project.category}</p>
          <h3>${escapeHtml(project.title)}</h3>
        </div>
        <button class="open-project" aria-label="Open project">↗</button>
      </div>
    `;
    card.querySelector(".open-project").addEventListener("click", () => openModal(project));
    card.querySelector(".project-media").addEventListener("click", () => openModal(project));
    grid.appendChild(card);
  });

  requestAnimationFrame(setupReveal);
}

function escapeHtml(value="") {
  return value.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));
}

function openModal(project) {
  modalCategory.textContent = labels[project.category] || project.category;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;

  if (project.mediaType === "video") {
    if (project.media && (project.media.includes("youtube.com") || project.media.includes("youtu.be"))) {
      let url = project.media;
      if (url.includes("watch?v=")) url = url.replace("watch?v=", "embed/");
      if (url.includes("youtu.be/")) url = url.replace("youtu.be/", "youtube.com/embed/");
      modalMedia.innerHTML = `<iframe src="${url}" allowfullscreen></iframe>`;
    } else if (project.media) {
      modalMedia.innerHTML = `<video src="${project.media}" controls autoplay></video>`;
    } else {
      modalMedia.innerHTML = `<div class="media-fallback" style="min-height:320px">VIDEO PREVIEW</div>`;
    }
  } else {
    modalMedia.innerHTML = project.media
      ? `<img src="${project.media}" alt="${escapeHtml(project.title)}">`
      : `<div class="media-fallback" style="min-height:320px">KHN</div>`;
  }

  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
  modalMedia.innerHTML = "";
  document.body.style.overflow = "";
}

filterBar.addEventListener("click", e => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  activeFilter = btn.dataset.filter;
  renderProjects();
});

document.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

document.querySelector(".nav-toggle").addEventListener("click", function() {
  const nav = document.querySelector(".site-nav");
  nav.classList.toggle("open");
  this.setAttribute("aria-expanded", nav.classList.contains("open"));
});
document.querySelectorAll(".site-nav a").forEach(a => a.addEventListener("click", () => document.querySelector(".site-nav").classList.remove("open")));

function setupReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .1 });

  document.querySelectorAll(".reveal:not(.visible)").forEach(el => observer.observe(el));
}

document.getElementById("year").textContent = new Date().getFullYear();
renderProjects();
setupReveal();
