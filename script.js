const bookEl = document.getElementById("book");

function isPhone() {
  return window.matchMedia("(max-width: 768px)").matches;
}

function buildPages(total = 100) {
  const pages = [];
  for (let i = 1; i <= total; i++) {
    pages.push(`images/page-${String(i).padStart(4, "0")}.jpg`); // page-0001.jpg
  }
  return pages;
}

let pageFlip;

function init() {
  // reset
  bookEl.innerHTML = "";

  pageFlip = new St.PageFlip(bookEl, {
    width: 720,
    height: 1020,
    size: "stretch",
    showCover: true,

    // ✅ telefono = 1 pagina (portrait), desktop = 2 pagine
    usePortrait: isPhone(),

    mobileScrollSupport: false,
    flippingTime: 650,
    maxShadowOpacity: 0.4,
  });

  pageFlip.loadFromImages(buildPages(100));
}

init();

// ✅ se ruoti il telefono o cambi dimensione, si ri-adatta
let t;
window.addEventListener("resize", () => {
  clearTimeout(t);
  t = setTimeout(init, 250);
});
