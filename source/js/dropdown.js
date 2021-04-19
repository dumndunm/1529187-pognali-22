const country = document.querySelector(".country_null");
const countryButtonChoose = country.querySelector(".country__button-choose");
const countryDropDown = country.querySelector(".choose-country");
const dropdownButtonClose = countryDropDown.querySelector(
  ".choose-country__close"
);

const showDropDown = (evt) => {
  evt.preventDefault();

  country.classList.add("country_dropdown");
  countryDropDown.classList.add("choose-country_active");

  dropdownButtonClose.addEventListener("click", closeDropDown);
};

const closeDropDown = (evt) => {
  evt.preventDefault();

  country.classList.remove("country_dropdown");
  countryDropDown.classList.remove("choose-country_active");

  dropdownButtonClose.removeEventListener("click", closeDropDown);
};

countryButtonChoose.addEventListener("click", showDropDown);
