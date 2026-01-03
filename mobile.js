const bookEl = document.getElementById("book");

function buildPages(total = 100) {
  const pages = [];
  for (let i = 1; i <= total; i++) {
    pages.push(`images/page-${String(i).padStart(4, "0")}.jpg`);
  }
  return pages;
}

let pageFlip;
let panzoom;

function initFlipbook() {
  bookEl.innerHTML = "";

  // 1 pagina sempre, dimensioni adattive
  const vw = Math.min(window.innerWidth, window.innerHeight);
  const pageW = Math.min(520, Math.max(320, vw - 24));
  const pageH = Math.round(pageW * 1.42);

  // wrapper per zoom
  const zoomWrap = document.createElement("div");
  zoomWrap.id = "zoomWrap";
  zoomWrap.style.width = "100%";
  zoomWrap.style.height = "100%";
  zoomWrap.style.display = "flex";
  zoomWrap.style.alignItems = "center";
  zoomWrap.style.justifyContent = "center";

  const inner = document.createElement("div");
  inner.id = "flipInner";
  zoomWrap.appendChild(inner);
  bookEl.appendChild(zoomWrap);

  zoomWrap.style.willChange = "transform";
inner.style.willChange = "transform";

  pageFlip = new St.PageFlip(inner, {
    width: pageW,
    height: pageH,
    size: "fixed",
    usePortrait: true,
    showCover: false,
    mobileScrollSupport: false,
    flippingTime: 650,
    maxShadowOpacity: 0.4,
  });

  pageFlip.loadFromImages(buildPages(100));

  // init Panzoom (da libs/panzoom.min.js)
  if (panzoom) panzoom.destroy();
  panzoom = Panzoom(zoomWrap, {
    maxScale: 4,
    minScale: 1,
    contain: "outside",
  });

  // Zoom con wheel (desktop) + pinch (mobile)
  zoomWrap.addEventListener("wheel", panzoom.zoomWithWheel);

  // doppio tap per zoom 2x / reset
  let lastTap = 0;
  zoomWrap.addEventListener("touchend", () => {
    const now = Date.now();
    if (now - lastTap < 300) {
      const s = panzoom.getScale();
      const rect = zoomWrap.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      panzoom.zoomTo(cx, cy, s > 1 ? 1 : 2);
    }
    lastTap = now;
  });
}

initFlipbook();

let t;
window.addEventListener("resize", () => {
  clearTimeout(t);
  t = setTimeout(initFlipbook, 250);
});
