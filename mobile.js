// DEBUG: se vedi questa scritta, stai usando il codice nuovo
document.documentElement.setAttribute("data-build", "MOBILE-JS-1");

const bookEl = document.getElementById("book");

function buildPages(total = 100) {
  const pages = [];
  for (let i = 1; i <= total; i++) {
    pages.push(`images/page-${String(i).padStart(4, "0")}.jpg`);
  }
  return pages;
}

function isMobile() {
  const uaMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const touch = (navigator.maxTouchPoints || 0) > 0;
  const small = Math.min(window.innerWidth, window.innerHeight) <= 900;
  return uaMobile || (touch && small);
}

let pageFlip;

function init() {
  bookEl.innerHTML = "";

  const mobile = isMobile();

  // ✅ SU MOBILE: FORZO 1 PAGINA E NIENTE COVER
  // (questo elimina per sempre l’effetto “copertina + pagina”)
  const forceSingle = mobile;

  pageFlip = new St.PageFlip(bookEl, {
    width: 520,
    height: 740,
    size: "fixed",

    usePortrait: forceSingle,
    showCover: false,

    mobileScrollSupport: false,
    flippingTime: 650,
    maxShadowOpacity: 0.4,
  });

  pageFlip.loadFromImages(buildPages(100));
}

init();

let t;
window.addEventListener("resize", () => {
  clearTimeout(t);
  t = setTimeout(init, 250);
});
