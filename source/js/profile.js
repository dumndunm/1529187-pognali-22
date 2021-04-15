const profileModal = document.querySelector(".profile-modal");
const profileButton = document.querySelector(".profile__button");
const profileModalButton = document.querySelector(".profile-modal__button");

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

profileButton.addEventListener("click", onProfileButtonClick);
