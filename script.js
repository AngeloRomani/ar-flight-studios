const BASE = new URL(".", window.location.href);
const url = path => new URL(path, BASE).toString();
const load = async path => {
  const response = await fetch(url(path), {cache:"no-store"});
  if (!response.ok) throw new Error(`Could not load ${path} (${response.status})`);
  return response.json();
};
const safe = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const setText = (id,value) => { const el=document.getElementById(id); if(el) el.textContent=value ?? ""; };
const setLink = (id,label,href) => { const el=document.getElementById(id); if(!el)return; el.href=href||"#"; const span=el.querySelector("span"); if(span)span.textContent=label||""; };
const setBg = (id,image) => { const el=document.getElementById(id); if(el)el.style.backgroundImage=`url("${String(image||"").replace(/"/g,"%22")}")`; };
let site={}, projects=[], categories=[], news=[], navigation=[], pages=[], activeFilter="All";
const filters = ["All","Aircraft","Liveries","Scenery","Utilities"];

function renderSite(){
  document.title = `${site.brand || "AR Flight Studios"} | Aerofly Add-ons`;
  setText("heroEyebrow",site.heroEyebrow); setText("heroLine1",site.heroLine1); setText("heroHighlight",site.heroHighlight); setText("heroText",site.heroText);
  setBg("heroBg",site.heroImage);
  setLink("heroPrimary",site.heroPrimaryLabel,site.heroPrimaryUrl); setLink("heroSecondary",site.heroSecondaryLabel,site.heroSecondaryUrl);
  ["categoriesEyebrow","categoriesLine1","categoriesHighlight","categoriesDescription","libraryEyebrow","libraryLine1","libraryHighlight","featuredEyebrow","featuredLine1","featuredHighlight","featuredText","newsEyebrow","newsLine1","newsHighlight","aboutEyebrow","aboutLine1","aboutHighlight","aboutText","discordEyebrow","discordLine1","discordHighlight","discordText","discordButtonLabel","footerDescription","copyright","disclaimer"].forEach(k=>setText(k,site[k]));
  setBg("featuredImage",site.featuredImage); setLink("featuredButton",site.featuredButtonLabel,site.featuredButtonUrl);
  ["discordButton","headerDiscord","drawerDiscord","suggestLink"].forEach(id=>{const e=document.getElementById(id);if(e)e.href=site.discordUrl||"https://discord.com/";});
  renderNavigation(); renderCategories(); renderNews(); renderFooterLinks();
}
function renderNavigation(){
  const links=navigation.filter(x=>x.enabled!==false);
  document.getElementById("mainNav").innerHTML=links.map(x=>`<a href="${safe(x.url)}">${safe(x.label)}</a>`).join("");
  const extra=pages.filter(p=>p.showInNav).map(p=>({label:p.navLabel||p.title,url:`?page=${encodeURIComponent(p.slug)}`}));
  document.getElementById("drawerNav").innerHTML=[...links,...extra].map(x=>`<a class="drawer-link" href="${safe(x.url)}">${safe(x.label)} <span>↗</span></a>`).join("");
  document.getElementById("drawerCategories").innerHTML=categories.filter(x=>x.enabled!==false).map(c=>`<a class="drawer-link" href="#library" data-filter-link="${safe(c.name)}">${safe(c.label||c.name)}</a>`).join("");
}
function renderCategories(){
  const visible=categories.filter(c=>c.enabled!==false);
  document.getElementById("categoryGrid").innerHTML=visible.map(c=>`<button class="category-card" data-category="${safe(c.name)}" style="background-image:url('${safe(c.image)}')"><span>${safe(c.number||c.name)}</span><strong>${safe(c.title||c.label||c.name).replace(/\s*&\s*/g,"&<br>")}</strong><b>↗</b></button>`).join("");
}
function renderNews(){
  document.getElementById("newsGrid").innerHTML=news.map((n,i)=>`<article class="news-card"><div class="news-number">${String(i+1).padStart(2,"0")}</div><div><label>${safe(n.label)}</label><h3>${safe(n.title)}</h3><p>${safe(n.text)}</p></div><span class="news-date">${safe(n.date)}</span></article>`).join("");
}
function renderFooterLinks(){
  document.getElementById("footerLinks").innerHTML=[...navigation.filter(x=>x.enabled!==false),{label:"Discord",url:site.discordUrl||"https://discord.com/"}].map(x=>`<a href="${safe(x.url)}">${safe(x.label)}</a>`).join("");
}
function renderFilters(){
  document.getElementById("filters").innerHTML=filters.map(f=>`<button class="filter ${activeFilter===f?"selected":""}" data-filter="${f}">${f==="All"?"ALL CONTENT":f.toUpperCase()}</button>`).join("");
}
function renderProducts(){
  const term=document.getElementById("search").value.trim().toLowerCase();
  const list=projects.filter(p=>p.published!==false&&(activeFilter==="All"||p.category===activeFilter)&&[p.title,p.category,p.description,p.tag].join(" ").toLowerCase().includes(term));
  setText("itemCount",String(list.length).padStart(2,"0"));
  document.getElementById("noResults").hidden=list.length!==0;
  document.getElementById("cards").innerHTML=list.map(p=>{
    const href=p.downloadFile||p.downloadUrl||"#";
    return `<article class="product"><div class="product-art" style="background-image:url('${safe(p.image)}')"><span class="tag">${safe(p.tag)}</span></div><div class="product-body"><span class="product-category">${safe(p.category)}</span><h3>${safe(p.title)}</h3><p>${safe(p.description)}</p><div class="product-bottom"><a class="download" href="${safe(href)}" ${href!=="#"?'target="_blank" rel="noopener"':""}>DOWNLOAD ↗</a><button class="details" data-details="${safe(p.id)}">DETAILS +</button><span class="version">${safe(p.version)}</span></div></div></article>`;
  }).join("");
}
function renderCustomPage(){
  const slug=new URLSearchParams(location.search).get("page");
  const page=pages.find(p=>p.slug===slug);
  if(!slug||!page)return false;
  document.getElementById("homePage").hidden=true;
  const main=document.getElementById("customPage"); main.hidden=false;
  document.getElementById("customPageContent").innerHTML=`<label>AR FLIGHT STUDIOS / INFORMATION</label><h1>${safe(page.title)}</h1><p class="page-intro">${safe(page.intro)}</p>${page.image?`<img class="page-image" src="${safe(page.image)}" alt="">`:""}<div class="page-body">${safe(page.body)}</div>`;
  document.title=`${page.title} | ${site.brand||"AR Flight Studios"}`;
  return true;
}
document.getElementById("filters").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;activeFilter=b.dataset.filter;renderFilters();renderProducts();});
document.getElementById("search").addEventListener("input",renderProducts);
document.getElementById("categoryGrid").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;activeFilter=b.dataset.category;renderFilters();renderProducts();document.getElementById("library").scrollIntoView();});
document.getElementById("drawerCategories").addEventListener("click",e=>{const a=e.target.closest("[data-filter-link]");if(!a)return;activeFilter=a.dataset.filterLink;renderFilters();renderProducts();closeDrawer();});
const dialog=document.getElementById("detailDialog");
document.getElementById("cards").addEventListener("click",e=>{
  const b=e.target.closest("[data-details]");if(!b)return;
  const p=projects.find(x=>x.id===b.dataset.details);if(!p)return;
  const href=p.downloadFile||p.downloadUrl||"#";
  document.getElementById("dialogContent").innerHTML=`<span class="product-category">${safe(p.category)} / ${safe(p.tag)}</span><div class="dialog-image" style="background-image:url('${safe(p.image)}')"></div><h2>${safe(p.title)}</h2><p>${safe(p.description)}</p><div class="dialog-meta">VERSION: ${safe(p.version)} &nbsp; / &nbsp; UPDATED: ${safe(p.updated)} &nbsp; / &nbsp; FILE SIZE: ${safe(p.fileSize)}</div><div class="dialog-install"><b>INSTALLATION NOTES</b><br>${safe(p.installation)}</div><a class="button gold" href="${safe(href)}" target="_blank" rel="noopener">DOWNLOAD PROJECT ↗</a>`;
  dialog.showModal();
});
document.getElementById("dialogClose").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close();});
const drawer=document.getElementById("drawer"),overlay=document.getElementById("overlay");
function openDrawer(){drawer.classList.add("visible");overlay.classList.add("visible");drawer.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";}
function closeDrawer(){drawer.classList.remove("visible");overlay.classList.remove("visible");drawer.setAttribute("aria-hidden","true");document.body.style.overflow="";}
document.getElementById("openMenu").addEventListener("click",openDrawer);
document.getElementById("closeMenu").addEventListener("click",closeDrawer);
overlay.addEventListener("click",closeDrawer);
drawer.addEventListener("click",e=>{if(e.target.closest("a")&&!e.target.closest("[data-filter-link]"))closeDrawer();});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeDrawer();if(dialog.open)dialog.close();}});

(async()=>{
 try{
  [site,projects,categories,news,navigation,pages]=await Promise.all([
   load("content/site.json"),load("content/projects.json"),load("content/categories.json"),load("content/news.json"),load("content/navigation.json"),load("content/pages.json")
  ]);
  renderSite();renderFilters();renderProducts();renderCustomPage();
 }catch(err){
  console.error(err);
  document.body.innerHTML=`<main style="max-width:760px;margin:12vh auto;padding:24px;color:#f4f4f4;font-family:Arial"><h1>AR Flight Studios</h1><p>The website content could not be loaded. Check that the content folder and JSON files were uploaded alongside index.html.</p><p style="color:#d8aa62">${safe(err.message)}</p></main>`;
 }
})();
