const DEFAULT_PROJECTS = [
  {
    id: "demo-1",
    title: "Neon Gaming Montage",
    category: "video",
    description: "A high-energy gaming edit concept using dramatic pacing, neon graphics, speed ramps and punchy transitions.",
    mediaType: "image",
    media: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "demo-2",
    title: "Future Tech Poster",
    category: "graphics",
    description: "A futuristic promotional poster direction with bold type, layered lighting and clean visual hierarchy.",
    mediaType: "image",
    media: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "demo-3",
    title: "Creator Thumbnail",
    category: "thumbnail",
    description: "A high-contrast thumbnail layout designed to communicate the story quickly and attract attention.",
    mediaType: "image",
    media: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "demo-4",
    title: "Motion Identity",
    category: "branding",
    description: "A minimal visual identity concept built around glow, motion and modern digital aesthetics.",
    mediaType: "image",
    media: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "demo-5",
    title: "Cinematic Color Grade",
    category: "video",
    description: "A cinematic editing showcase focused on mood, contrast, color balance and storytelling.",
    mediaType: "image",
    media: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "demo-6",
    title: "Social Campaign",
    category: "graphics",
    description: "A cohesive social-media visual system designed for quick readability and premium brand consistency.",
    mediaType: "image",
    media: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80"
  }
];

function getProjects() {
  const raw = localStorage.getItem("khn_projects");
  if (!raw) {
    localStorage.setItem("khn_projects", JSON.stringify(DEFAULT_PROJECTS));
    return [...DEFAULT_PROJECTS];
  }
  try { return JSON.parse(raw); }
  catch {
    localStorage.setItem("khn_projects", JSON.stringify(DEFAULT_PROJECTS));
    return [...DEFAULT_PROJECTS];
  }
}

function saveProjects(projects) {
  localStorage.setItem("khn_projects", JSON.stringify(projects));
}
