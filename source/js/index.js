const header = document.querySelector(".header");
const headerToggle = document.querySelector(".header__toggle");

const profileModal = document.querySelector(".profile-modal");
const profileButton = document.querySelector(".profile__button");
const profileModalButton = document.querySelector(".profile-modal__button");

const HEADER_COLLAPSE_HEIGHT = 53;
const HEADER_SCROLL_HEIGHT = 76;

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

const onProfileButtonClick = (evt) => {
  evt.preventDefault();
  profileModal.classList.remove("profile-modal_hidden");

  const onProfileModalButtonClick = () => {
    evt.preventDefault();
    profileModal.classList.add("profile-modal_hidden");
    profileModalButton.removeEventListener("click", onProfileModalButtonClick);
  };

  profileModalButton.addEventListener("click", onProfileModalButtonClick);
};

document.addEventListener("DOMContentLoaded", onPageLoad);
window.addEventListener("scroll", onPageScroll);
headerToggle.addEventListener("click", onHeaderToggleClick);
profileButton.addEventListener("click", onProfileButtonClick);

window.addEventListener("resize", (evt) => {
  evt.preventDefault();
  if (
    !header.classList.contains("header_collapse") &&
    window.innerWidth > 1320
  ) {
    header.classList.add("header_collapse");
  }
});
