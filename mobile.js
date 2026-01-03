const bookEl = document.getElementById("book");

function buildPages(total = 100) {
  const pages = [];
  for (let i = 1; i <= total; i++) {
    pages.push(`images/page-${String(i).padStart(4, "0")}.jpg`);
  }
  return pages;
}

let pageFlip;

function initFlipbook() {
  bookEl.innerHTML = "";

  // ✅ FORZA 1 PAGINA SEMPRE (mobile-first definitivo)
  // Niente cover => mai “copertina + pagina”
  const vw = Math.min(window.innerWidth, window.innerHeight);
  const pageW = Math.min(520, Math.max(320, vw - 24));
  const pageH = Math.round(pageW * 1.42);

  pageFlip = new St.PageFlip(bookEl, {
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
}

initFlipbook();

let t;
window.addEventListener("resize", () => {
  clearTimeout(t);
  t = setTimeout(initFlipbook, 250);
});
