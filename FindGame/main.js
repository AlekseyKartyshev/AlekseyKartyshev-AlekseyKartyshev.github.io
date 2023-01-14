let numbers = [];

function shuffle(arr) {
  var j, temp;
  for (var i = arr.length - 1; i > 0; i--) {
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
    let number = document.createElement("h5");
    number.classList.add("card-title");
    // number.textContent = i;
    card.append(number);
    cardMassive.card = card;
    cardMassive.numberArea = number;
    cardMassive.number = i;
    cardMassive.id = cardId;
    cardId++;
    arrayWithCards.push(cardMassive);
  }
  // console.log(arrayWithCards);
  return arrayWithCards;
}
function deleteCard(massive) {
  massive[0].numberArea.textContent = null;
  massive[1].numberArea.textContent = null;
}

function createWinButton() {
  let button = document.createElement("button");
  button.classList.add("win-btn", "btn");
  button.textContent = "Сыграть еще раз";
  button.addEventListener("click", () => {
    let app = document.querySelector("#app");
    app.replaceChildren();
    createApp(numbers);
  });
  return button;
}

function createApp(massive, title) {
  let container = document.querySelector("#app");
  let app = document.createElement("div");
  app.classList.add("app");
  let appTitle = createTitle(title);
  container.append(appTitle);

  let activeCardNumber = 0;
  let session = [];
  let id = 1;
  let activeCards = [];
  let = mass = [...massive, ...massive]
  let cards = createCards(mass);
  for (const item of cards) {
    let card = item.card;
    session.push({
      number: item.number,
      verificationCheck: false,
      id: id,
    });
    id++;

    card.addEventListener("click", function action() {
      // * Активируем карту
      for (const index of session) {
        if (item.id === index.id) {
          index.verificationCheck = true;
          item.numberArea.textContent = item.number;
        }
      }

      // * Проверяем активированность карты
      for (const ind of session) {
        if (ind.verificationCheck) {
          activeCards.push(item);
          if (activeCards.length == 2) {
            if (activeCards[0].number === activeCards[1].number) {
              if (activeCards[0].id === activeCards[1].id) {
                activeCards.pop();
              } else {
                activeCardNumber += 2;
                console.log(activeCardNumber);
                activeCards[0].card.classList.add("true");
                activeCards[1].card.classList.add("true");
                activeCards[0].card.removeEventListener("click", action);
                activeCards[1].card.removeEventListener("click", action);
                activeCards.pop();
                activeCards.pop();
              }
            } else {
              setTimeout(function () {
                activeCards[0].numberArea.textContent = null;
                activeCards[1].numberArea.textContent = null;
                activeCards.pop();
                activeCards.pop();
              }, 300);
            }
            for (const index of session) {
              index.verificationCheck = false;
            }
            if (session.length === activeCardNumber) {
              container.append(createWinButton());
            }
          }
        }
      }
    });
    app.append(card);
  }

  container.append(app);
  document.body.append(container);
}

function createForm() {
  let container = document.querySelector("#app");
  let title = createTitle()
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
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.input.value) {
      return;
    }

    numbers = input.value.split(' ')
    console.log(numbers)
    let app = document.querySelector("#app");
    app.replaceChildren();
    createApp(numbers)
  })
  form.append(input);
  form.append(button);
  container.append(title)
  container.append(form);
}

document.addEventListener("DOMContentLoaded", () => {
  createForm();
});
