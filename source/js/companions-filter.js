const filters = document.querySelectorAll(".companions-filter__fieldset");

const onFieldsetToggleClick = function (event) {
  event.preventDefault();
  this.parentNode.classList.toggle("companions-filter__fieldset_collapse");
};

for (let i = 0; i < filters.length; i++) {
  filters[i].classList.add("companions-filter__fieldset_collapse");
  const toggle = filters[i].querySelector(
    ".companions-filter__fieldset-toggle"
  );
  toggle.addEventListener("click", onFieldsetToggleClick);
}
