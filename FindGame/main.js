"use strict";
let numbers = [];

function shuffle(arr) {
  let j, temp;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

function createTitle(title = "Найди пару") {
  let createTitle = document.createElement("h1");
  createTitle.classList.add("title");
  createTitle.textContent = title;
  return createTitle;
}
function createCards(array) {
  let arrayWithCards = [];
  let shuffleMassive = shuffle(array);
  let cardId = 1;
  for (const i of shuffleMassive) {
    let cardMassive = {};
    let card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = cardId;
    let number = document.createElement("h5");
    number.classList.add("card-title");
    // number.textContent = i;
    card.append(number);
    cardMassive.card = card;
    cardMassive.numberArea = number;
    cardMassive.number = i;
    cardId++;
    arrayWithCards.push(cardMassive);
  }
  // console.log(arrayWithCards);
  return arrayWithCards;
}

function deleteCardnumberInMassive(massive) {
  massive.forEach((el) => {
    el.numberArea.textContent = null;
  });
}

function createGameOverButton(container) {
  let button = document.createElement("button");
  button.classList.add("win-btn", "btn");
  button.textContent = "Сыграть еще раз";
  button.addEventListener("click", () => {
    let app = document.querySelector("#app");
    app.replaceChildren();
    createApp(container, numbers);
  });
  return button;
}

function createForm(container) {
  let title = createTitle();
  let form = document.createElement("form");
  form.classList.add("form");
  let input = document.createElement("input");
  input.placeholder = "Символы в карточках";
  input.value = "1 2 3 4 5 6 7 8";
  input.classList.add("input");
  input.type = "text";
  input.id = "input";
  let button = document.createElement("button");
  button.textContent = "Начать игру";
  button.type = "submit";
  button.classList.add("btn", "form-btn");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.input.value) {
      return;
    }

    numbers = input.value.trim().split(" ");
    // console.log(numbers);
    let app = document.querySelector("#app");
    app.replaceChildren();
    createApp(container, numbers);
  });
  form.append(input);
  form.append(button);
  container.append(title);
  container.append(form);
}

function createApp(container, massive, title) {
  let app = document.createElement("div");
  app.classList.add("app");
  let appTitle = createTitle(title);
  container.append(appTitle);

  let timer = document.createElement("div");
  timer.classList.add("timer");
  timer.textContent = 60;
  let t = 59;
  let timerFunc = setInterval(function () {
    if (t <= 0) {
      t = 59;
      clearInterval(timerFunc);
      container.append(lose);
      container.append(createGameOverButton(container));
      timer.remove();
    } else {
      timer.textContent = t;
    }
    --t;
  }, 1000);

  let lose = document.createElement("div");
  lose.classList.add("text");
  lose.textContent = "Вы проиграли";
  let win = document.createElement("div");
  win.classList.add("text");
  win.textContent = "Вы выиграли";

  let massiveWithActiveCards = [];
  let numberOfActiveCards = 0;
  let cardMassive = createCards(massive.concat(massive));
  // console.log(cardMassive);
  cardMassive.forEach((el) => {
    let t = 60;
    let cardTimer = setInterval(function () {
      if (t <= 0) {
        // numberOfActiveCards = 0;
        t = 60;
        el.card.removeEventListener("click", click);
        clearInterval(cardTimer);
      }
      --t;
    }, 1000);

    function click() {
      this.classList.add("active");
      el.numberArea.textContent = el.number;
      massiveWithActiveCards.push(el);
      if (massiveWithActiveCards.length === 2) {
        if (
          massiveWithActiveCards[0].card.dataset.id ===
          massiveWithActiveCards[1].card.dataset.id
        ) {
          // console.log("Ты еблан и нажал два раза на одну карточку");
          massiveWithActiveCards.pop();
        } else {
          if (
            massiveWithActiveCards[0].numberArea.textContent ===
            massiveWithActiveCards[1].numberArea.textContent
          ) {
            massiveWithActiveCards[0].card.classList.remove("active");
            massiveWithActiveCards[1].card.classList.remove("active");
            massiveWithActiveCards[0].card.classList.add("true");
            massiveWithActiveCards[1].card.classList.add("true");
            massiveWithActiveCards[0].card.removeEventListener("click", click);
            massiveWithActiveCards[1].card.removeEventListener("click", click);
            massiveWithActiveCards.pop();
            massiveWithActiveCards.pop();
            numberOfActiveCards += 2;
          } else {
            setTimeout(() => {
              massiveWithActiveCards[0].card.classList.remove("active");
              massiveWithActiveCards[1].card.classList.remove("active");
              massiveWithActiveCards[0].numberArea.textContent = null;
              massiveWithActiveCards[1].numberArea.textContent = null;
              massiveWithActiveCards.pop();
              massiveWithActiveCards.pop();
            }, 300);
          }
        }
      }
      if (cardMassive.length === numberOfActiveCards) {
        numberOfActiveCards = 0;
        // container.removeChild(timer)

        clearInterval(timerFunc);
        clearInterval(cardTimer);
        timer.remove();
        container.append(win);
        container.append(createGameOverButton(container));
      }

      // console.log(massiveWithActiveCards);
    }
    el.card.addEventListener("click", click);
    app.append(el.card);
  });
  container.append(app);
  container.append(timer);
  document.body.append(container);
}

// console.log(createCards([1, 2, 3, 4, 5, 6, 7, 8]));

document.addEventListener("DOMContentLoaded", () => {
  let container = document.querySelector("#app");
  createForm(container);
});
