"use strict";
function burger() {
  let burger = document.querySelector(".header-container__burger");
  // console.log(burgerImg.src)
  burger.addEventListener("click", () => {
    let burgerImg = document.querySelector(".header-container__burger-img");
    let dropdownMenu = document.querySelector(
      ".header-container__dropdown-menu"
    );
    if (dropdownMenu.datasetOpen) {
      dropdownMenu.datasetOpen = false
      dropdownMenu.classList.remove("open");
      dropdownMenu.classList.add("close");
    } else {
      dropdownMenu.datasetOpen = true
      dropdownMenu.classList.add("open");
      dropdownMenu.classList.remove("close");
    }

    console.log(burgerImg.src.split("/")[burgerImg.src.split("/").length - 1]);
    if (
      burgerImg.src.split("/")[burgerImg.src.split("/").length - 1] ===
      "burger.svg"
    ) {
      burgerImg.src = "img/burger-close.svg";
    } else {
      burgerImg.src = "img/burger.svg";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  burger();
});
