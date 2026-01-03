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

  // ✅ FORZA 1 PAGINA (sempre)
  pageFlip = new St.PageFlip(bookEl, {
    width: 520,
    height: 740,
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


