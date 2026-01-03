const bookEl = document.getElementById("book");

function buildPages(total = 100) {
  const pages = [];
  for (let i = 1; i <= total; i++) {
    pages.push(`images/page-${String(i).padStart(4, "0")}.jpg`);
  }
  return pages;
}

let pageFlip;
let zoomed = false;

function initFlipbook() {
  bookEl.innerHTML = "";

  const vw = Math.min(window.innerWidth, window.innerHeight);
  const pageW = Math.min(720, Math.max(360, vw - 24));
  const pageH = Math.round(pageW * 1.42);

  pageFlip = new St.PageFlip(bookEl, {
    width: pageW,
    height: pageH,
    size: "fixed",
    usePortrait: true,
    showCover: false,
    renderDensity: window.devicePixelRatio || 2,
    mobileScrollSupport: false,
    flippingTime: 650,
    maxShadowOpacity: 0.4,

  });

  pageFlip.loadFromImages(buildPages(100));

  // zoom con doppio tap sulla pagina
  bookEl.addEventListener("touchend", handleDoubleTap);
}

function handleDoubleTap(e) {
  if (e.touches && e.touches.length > 0) return;

  const now = Date.now();
  if (!handleDoubleTap.last) handleDoubleTap.last = now;
  if (now - handleDoubleTap.last < 300) {
    toggleZoom();
  }
  handleDoubleTap.last = now;
}

function toggleZoom() {
  const page = document.querySelector(".stf__item--active img, .stf__item--active canvas");
  if (!page) return;

  zoomed = !zoomed;

  page.style.transition = "transform 0.25s ease";
  page.style.transformOrigin = "center center";
  page.style.transform = zoomed ? "scale(2)" : "scale(1)";
}

initFlipbook();

let t;
window.addEventListener("resize", () => {
  clearTimeout(t);
  t = setTimeout(initFlipbook, 250);
});

