const header = document.querySelector(".header");
const headerToggle = document.querySelector(".header__toggle");

const DESKTOP_BREAKPOINT = 1440;
const HEADER_COLLAPSE_HEIGHT = 53;

const onPageLoad = (evt) => {
  evt.preventDefault();
  header.classList.remove("header_nojs");
  header.classList.add("header_collapse");

  document.removeEventListener("DOMContentLoaded", onPageLoad);
};

const onHeaderToggleClick = (evt) => {
  evt.preventDefault();

  const headerStateIsDefault =
    header.classList.contains("header_collapse") &&
    !header.classList.contains("header_scroll");

  const headerStateIsScrolled = header.classList.contains("header_scroll");
  const pageOffsetIsLargerHeader = window.pageYOffset > HEADER_COLLAPSE_HEIGHT;

  const expandHeader = () => {
    header.classList.remove("header_collapse");
  };

  const collapseHeader = () => {
    header.classList.add("header_collapse");
  };

  if (headerStateIsDefault) {
    expandHeader();
  } else if (headerStateIsScrolled) {
    expandHeader();
    header.classList.remove("header_scroll");
  } else {
    collapseHeader();
    if (pageOffsetIsLargerHeader) {
      header.classList.add("header_scroll");
    }
  }
};

const onPageScroll = (evt) => {
  evt.preventDefault();

  const headerIsExpanded = header.classList.length == 1;
  const pageOffsetIsLargerHeader = window.pageYOffset > HEADER_COLLAPSE_HEIGHT;

  if (pageOffsetIsLargerHeader && !headerIsExpanded) {
    header.classList.add("header_scroll");
  }

  if (!pageOffsetIsLargerHeader) {
    header.classList.remove("header_scroll");
  }
};

document.addEventListener("DOMContentLoaded", onPageLoad);
window.addEventListener("scroll", onPageScroll);
headerToggle.addEventListener("click", onHeaderToggleClick);

window.addEventListener("resize", (evt) => {
  evt.preventDefault();
  if (
    !header.classList.contains("header_collapse") &&
    window.innerWidth > DESKTOP_BREAKPOINT
  ) {
    header.classList.add("header_collapse");
  }
});
