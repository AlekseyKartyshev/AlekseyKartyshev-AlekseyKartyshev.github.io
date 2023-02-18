"use strict";
function burger() {
  let burger = document.querySelector(".header-container__burger");
  // console.log(burgerImg.src)
  burger.addEventListener("click", () => {
    let burgerImg = document.querySelector(".header-container__burger-img");
    let dropdownMenu = document.querySelector(
      ".header-container__dropdown-menu"
    );
    dropdownMenu.classList.toggle("open");
    
    console.log(burgerImg.src)
    if (burgerImg.src !== "img/burger.svg") {
      burgerImg.src = "img/burger-close.svg";
    }else{
      burgerImg.src = "img/burger.svg";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  burger();
});
