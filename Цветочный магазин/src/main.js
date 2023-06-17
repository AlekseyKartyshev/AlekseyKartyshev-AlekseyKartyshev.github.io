"use srict";

const mySiema = new Siema({
  selector: ".slider__wrapper",
  duration: 500,
  easing: "ease-out",
  perPage: 1,
  startIndex: 0,
  draggable: false,
  multipleDrag: true,
  threshold: 20,
  loop: true,
  rtl: false,
  onInit: () => {},
  onChange: () => {},
});

setInterval(() => mySiema.next(), 10000);

document.addEventListener('DOMContentLoaded', () => {
 let bugs = document.querySelectorAll('.catalogue__add')
 let count = 0

 bugs.forEach((el) => {
  el.addEventListener('click', () => {
    count++
    if (count > 0) {
      let bag = document.querySelector('.header-container__bag')
      let domCount = document.createElement('div')
      domCount.classList.add('count')
      domCount.textContent = count
      bag.append(domCount)
    }
  })
 })
})