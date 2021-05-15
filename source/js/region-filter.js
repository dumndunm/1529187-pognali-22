const regionFilter = document.querySelector(".region-filter");
const regionFilterButton = regionFilter.querySelector(".region-filter__button");
const regionFilterButtonFolded = regionFilter.querySelector(
  ".region-filter__button-folded"
);

const onFilterButtonClick = (evt) => {
  evt.preventDefault();
  regionFilter.classList.toggle("region-filter_collapse");
  regionFilterButtonFolded.addEventListener("click", onFoldedButtonClick);
};

const onFoldedButtonClick = (evt) => {
  evt.preventDefault();
  regionFilter.classList.add("region-filter_collapse");
  regionFilterButtonFolded.removeEventListener("click", onFoldedButtonClick);
};

regionFilter.classList.add("region-filter_collapse");
regionFilterButton.addEventListener("click", onFilterButtonClick);
