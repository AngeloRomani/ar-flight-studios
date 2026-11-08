// CONTENT CONFIGURATION
// Replace the sample projects below with your real Aerofly FS releases.
// For large files, use GitHub Releases and paste the direct asset download URL.

const projects = [
  {
    id: "a320-community-mod", title: "A320 Community Mod", category: "Aircraft",
    tag: "AIRCRAFT MOD", description: "A sample aircraft modification listing. Replace this copy with an overview of your project, its features and compatibility.",
    version: "v1.0.0", updated: "2026-11-08", size: "—",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1000&q=85",
    download: "https://github.com/AngeloRomani/AR-Flight-Studios/releases",
    install: "Add your installation instructions here. Include the destination folder, any required dependencies and simulator version compatibility.",
    featured: true
  },
  {
    id: "european-airline-pack", title: "European Airline Pack", category: "Liveries",
    tag: "LIVERY PACK", description: "A sample collection of airline liveries. Add the included operators, aircraft variants and installation details.",
    version: "v1.0.0", updated: "2026-11-08", size: "—",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=1000&q=85",
    download: "https://github.com/AngeloRomani/AR-Flight-Studios/releases",
    install: "Add the livery installation steps here, including the correct Aerofly aircraft folder.",
    featured: true
  },
  {
    id: "regional-airport-project", title: "Regional Airport Project", category: "Scenery",
    tag: "SCENERY", description: "A sample airport or scenery release. Describe the location, custom objects and visual improvements.",
    version: "Coming soon", updated: "TBA", size: "—",
    image: "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&w=1000&q=85",
    download: "https://github.com/AngeloRomani/AR-Flight-Studios/releases",
    install: "Installation instructions will be published with the release.",
    featured: false
  },
  {
    id: "flight-utility-pack", title: "Flight Utility Pack", category: "Utilities",
    tag: "UTILITY", description: "A sample tool or simulator enhancement. Add supported features, requirements and usage notes.",
    version: "v1.0.0", updated: "2026-11-08", size: "—",
    image: "https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&w=1000&q=85",
    download: "https://github.com/AngeloRomani/AR-Flight-Studios/releases",
    install: "Add setup instructions and any prerequisites here.",
    featured: false
  }
];

const cards = document.getElementById("cards");
const search = document.getElementById("search");
const itemCount = document.getElementById("itemCount");
const noResults = document.getElementById("noResults");
const dialog = document.getElementById("detailDialog");
const dialogContent = document.getElementById("dialogContent");
let currentFilter = "All";

function safeText(value) {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
function render() {
  const query = search.value.trim().toLowerCase();
  const list = projects.filter(p => (currentFilter === "All" || p.category === currentFilter) &&
    [p.title,p.category,p.description,p.tag].join(" ").toLowerCase().includes(query));
  itemCount.textContent = String(list.length).padStart(2,"0");
  noResults.hidden = list.length !== 0;
  cards.innerHTML = list.map(p => `
    <article class="product">
      <div class="product-art" style="background-image:url('${p.image}')"><span class="tag">${safeText(p.tag)}</span></div>
      <div class="product-body"><span class="product-category">${safeText(p.category)}</span>
        <h3>${safeText(p.title)}</h3><p>${safeText(p.description)}</p>
        <div class="product-bottom"><a class="download" href="${p.download}" target="_blank" rel="noopener">DOWNLOAD ↗</a>
        <button class="details" data-details="${safeText(p.id)}">DETAILS +</button><span class="version">${safeText(p.version)}</span></div>
      </div>
    </article>`).join("");
}
function setFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll(".filter").forEach(b => b.classList.toggle("selected", b.dataset.filter === filter));
  render();
}
document.querySelectorAll(".filter").forEach(b => b.addEventListener("click", () => setFilter(b.dataset.filter)));
document.querySelectorAll("[data-category]").forEach(b => b.addEventListener("click", () => { setFilter(b.dataset.category); document.getElementById("library").scrollIntoView(); }));
document.querySelectorAll("[data-filter-link]").forEach(a => a.addEventListener("click", () => setFilter(a.dataset.filterLink)));
search.addEventListener("input", render);
cards.addEventListener("click", event => {
  const button = event.target.closest("[data-details]");
  if (!button) return;
  const p = projects.find(project => project.id === button.dataset.details);
  if (!p) return;
  dialogContent.innerHTML = `<span class="product-category">${safeText(p.category)} / ${safeText(p.tag)}</span>
    <div class="dialog-image" style="background-image:url('${p.image}')"></div>
    <h2>${safeText(p.title)}</h2><p>${safeText(p.description)}</p>
    <div class="dialog-meta">VERSION: ${safeText(p.version)} &nbsp; / &nbsp; UPDATED: ${safeText(p.updated)} &nbsp; / &nbsp; FILE SIZE: ${safeText(p.size)}</div>
    <div class="dialog-install"><b>INSTALLATION NOTES</b><br>${safeText(p.install)}</div>
    <a class="button gold" href="${p.download}" target="_blank" rel="noopener">DOWNLOAD PROJECT ↗</a>`;
  dialog.showModal();
});
document.getElementById("dialogClose").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", e => { if (e.target === dialog) dialog.close(); });

const drawer = document.getElementById("drawer"), overlay = document.getElementById("overlay");
function openDrawer(){drawer.classList.add("visible");overlay.classList.add("visible");drawer.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";}
function closeDrawer(){drawer.classList.remove("visible");overlay.classList.remove("visible");drawer.setAttribute("aria-hidden","true");document.body.style.overflow="";}
document.getElementById("openMenu").addEventListener("click",openDrawer);
document.getElementById("closeMenu").addEventListener("click",closeDrawer);
overlay.addEventListener("click",closeDrawer);
drawer.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeDrawer));
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeDrawer();if(dialog.open)dialog.close();}});
render();
