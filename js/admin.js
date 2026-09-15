const form = document.getElementById("projectForm");
const list = document.getElementById("adminProjectList");
const idInput = document.getElementById("projectId");
const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("category");
const descriptionInput = document.getElementById("description");
const mediaTypeInput = document.getElementById("mediaType");
const imageFileInput = document.getElementById("imageFile");
const mediaUrlInput = document.getElementById("mediaUrl");
const saveBtn = document.getElementById("saveBtn");
const cancelEdit = document.getElementById("cancelEdit");

const labels = {
  video: "Video Editing",
  graphics: "Graphic Design",
  thumbnail: "Thumbnail",
  branding: "Branding"
};

function escapeHtml(value="") {
  return value.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));
}

function renderList() {
  const projects = getProjects();
  list.innerHTML = "";

  if (!projects.length) {
    list.innerHTML = `<p style="color:var(--muted)">No projects yet.</p>`;
    return;
  }

  projects.forEach(project => {
    const row = document.createElement("article");
    row.className = "admin-project";
    row.innerHTML = `
      <div class="admin-project-thumb">
        ${project.mediaType === "image" && project.media
          ? `<img src="${project.media}" alt="${escapeHtml(project.title)}">`
          : `<div class="media-fallback" style="font-size:12px">KHN</div>`}
      </div>
      <div class="admin-project-meta">
        <h3>${escapeHtml(project.title)}</h3>
        <p>${labels[project.category] || project.category}</p>
      </div>
      <div class="admin-project-actions">
        <button class="mini-btn edit">Edit</button>
        <button class="mini-btn delete">Delete</button>
      </div>
    `;
    row.querySelector(".edit").addEventListener("click", () => beginEdit(project.id));
    row.querySelector(".delete").addEventListener("click", () => removeProject(project.id));
    list.appendChild(row);
  });
}

function readImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const current = getProjects();
  const editingId = idInput.value;
  const existing = current.find(p => p.id === editingId);

  let media = mediaUrlInput.value.trim();
  const file = imageFileInput.files[0];

  if (file) {
    if (file.size > 2.5 * 1024 * 1024) {
      alert("For this browser-preview version, please use an image smaller than 2.5 MB.");
      return;
    }
    media = await readImageFile(file);
  } else if (!media && existing) {
    media = existing.media;
  }

  const project = {
    id: editingId || `project-${Date.now()}`,
    title: titleInput.value.trim(),
    category: categoryInput.value,
    description: descriptionInput.value.trim(),
    mediaType: mediaTypeInput.value,
    media
  };

  const next = editingId
    ? current.map(p => p.id === editingId ? project : p)
    : [project, ...current];

  try {
    saveProjects(next);
  } catch (err) {
    alert("Browser storage is full. Use smaller images or connect Firebase storage.");
    return;
  }

  resetForm();
  renderList();
});

function beginEdit(id) {
  const project = getProjects().find(p => p.id === id);
  if (!project) return;
  idInput.value = project.id;
  titleInput.value = project.title;
  categoryInput.value = project.category;
  descriptionInput.value = project.description;
  mediaTypeInput.value = project.mediaType;
  mediaUrlInput.value = project.media && !project.media.startsWith("data:") ? project.media : "";
  saveBtn.textContent = "Save Changes";
  cancelEdit.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function removeProject(id) {
  if (!confirm("Delete this project?")) return;
  saveProjects(getProjects().filter(p => p.id !== id));
  if (idInput.value === id) resetForm();
  renderList();
}

function resetForm() {
  form.reset();
  idInput.value = "";
  saveBtn.textContent = "Add Project";
  cancelEdit.classList.add("hidden");
}

cancelEdit.addEventListener("click", resetForm);

document.getElementById("resetProjects").addEventListener("click", () => {
  if (!confirm("Reset the portfolio to the original demo projects?")) return;
  saveProjects(DEFAULT_PROJECTS);
  resetForm();
  renderList();
});

renderList();
