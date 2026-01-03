const bookEl = document.getElementById("book");

// Rilevamento robusto mobile (Safari, Telegram, ecc.)
function isMobile() {
  const uaMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const touch = navigator.maxTouchPoints && navigator.maxTouchPoints > 0;
  const smallScreen = Math.min(screen.width, screen.height) <= 900;
  const portrait = window.matchMedia("(orientation: portrait)").matches;

  return uaMobile || (touch && smallScreen) || portrait;
}

// Costruisce la lista delle pagine
function buildPages(total = 100) {
  const pages = [];
  for (let i = 1; i <= total; i++) {
    pages.push(`images/page-${String(i).padStart(4, "0")}.jpg`);
  }
  return pages;
}

let pageFlip;

function initFlipbook() {
  // reset totale
  bookEl.innerHTML = "";

  const mobile = isMobile();

  pageFlip = new St.PageFlip(bookEl, {
    width: 720,
    height: 1020,
    size: "stretch",

    // 🔑 CHIAVE
    // mobile = 1 pagina
    // desktop = 2 pagine
    usePortrait: mobile,

    // cover solo su desktop (su mobile dà fastidio)
    showCover: !mobile,

    mobileScrollSupport: false,
    flippingTime: 650,
    maxShadowOpacity: 0.4,
  });

  pageFlip.loadFromImages(buildPages(100));
}

// inizializza
initFlipbook();

// ricalcola se ruoti il telefono o cambi finestra
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(initFlipbook, 300);
});
