

document.addEventListener("DOMContentLoaded", function () {

  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");


  if (filterButtons.length === 0) {
    return;
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const chosen = button.getAttribute("data-filter");

      filterButtons.forEach(function (btn) {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      projectCards.forEach(function (card) {
        const category = card.getAttribute("data-category");
        const show = chosen === "all" || category === chosen;
        card.hidden = !show;
      });
    });
  });

});
