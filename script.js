const bookEl = document.getElementById("book");

function buildPages(total = 100) {
  const pages = [];
  for (let i = 1; i <= total; i++) {
    pages.push(`images/page-${String(i).padStart(4, "0")}.jpg`);
  }
  return pages;
}

function isPortrait() {
  return window.matchMedia("(orientation: portrait)").matches;
}

function isTouch() {
  return (navigator.maxTouchPoints || 0) > 0;
}

let pageFlip;

function initFlipbook() {
  bookEl.innerHTML = "";

  const portrait = isPortrait();
  const mobileMode = isTouch() && portrait; // ✅ iPhone in verticale = 1 pagina

  // Calcolo dimensioni pagina in base allo schermo (molto importante su iPhone)
  const vw = Math.min(window.innerWidth, window.innerHeight);
  const pageW = Math.min(520, Math.max(320, vw - 24)); // larghezza pagina “comoda”
  const pageH = Math.round(pageW * 1.42);              // rapporto A4 circa

  pageFlip = new St.PageFlip(bookEl, {
    // ✅ su mobile fissiamo le dimensioni, così NON passa a due pagine
    width: mobileMode ? pageW : 720,
    height: mobileMode ? pageH : 1020,
    size: mobileMode ? "fixed" : "stretch",

    // ✅ 1 pagina su iPhone portrait
    usePortrait: mobileMode,

    // cover su mobile spesso crea effetti strani
    showCover: !mobileMode,

    mobileScrollSupport: false,
    flippingTime: 650,
    maxShadowOpacity: 0.4,
  });

  pageFlip.loadFromImages(buildPages(100));
}

initFlipbook();

let t;
window.addEventListener("resize", () => {
  clearTimeout(t);
  t = setTimeout(initFlipbook, 250);
});

