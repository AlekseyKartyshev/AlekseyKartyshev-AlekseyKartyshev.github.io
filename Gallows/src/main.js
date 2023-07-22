"use strict";

function gallows(word) {
  console.log(word);
  const text = document.querySelector(".text");
  const img = document.querySelector("img");
  let keyboardButtons = document.querySelectorAll(".line > .letter");
  let letterCounter = 0;

  let divMassive = [];

  word = word.toUpperCase();

  //! Разбиваем слово по буквам и выыводим ячейки с буквами на экран
  word.split("").forEach((e) => {
    let letter = document.createElement("div");
    letter.classList.add("letter");

    letter.textContent = "";

    divMassive.push(letter);
    text.append(letter);
  });

  //! Ищем 1 букву в слове и если они ести выводим их на экран
  let indices = [];
  let idx = word.indexOf(word[0]);

  while (idx != -1) {
    indices.push(idx);
    idx = word.indexOf(word[0], idx + 1);
  }

  indices.forEach((e) => {
    divMassive[e].textContent = word[0];
  });

  //! Красим первую букву на клавиатуре
  keyboardButtons.forEach((el) => {
    if (word[0] === el.textContent.toUpperCase()) {
      el.classList.add("used");
    }
  });

  //! Проигрыш
  function lose() {
    let lose = document.querySelector(".lose");
    let keyboard = document.querySelector(".keyboard");

    lose.classList.remove("none");
    keyboard.classList.add("none");

    word.split("").forEach((e) => {
      let indices = [];
      let idx = word.indexOf(e);
      while (idx != -1) {
        indices.push(idx);
        idx = word.indexOf(e, idx + 1);
      }

      indices.forEach((el) => {
        divMassive[el].textContent = e;
      });
    });
  }

  //! Выигрыш
  function win() {
    let usedLetter = [];

    divMassive.forEach((e) => {
      usedLetter.push(e.textContent.toUpperCase());
    });

    if (usedLetter.join("") === word) {
      let win = document.querySelector(".win");
      let keyboard = document.querySelector(".keyboard");

      win.classList.remove("none");
      keyboard.classList.add("none");
    }
  }

  //! Нажатие кнопки на клавиатуре
  document.addEventListener("keydown", (e) => {
    let index = word.split("").indexOf(e.key.toUpperCase(), 0);

    //! Красим букву на клавиатуре
    keyboardButtons.forEach((el) => {
      if (e.key.toUpperCase() === el.textContent.toUpperCase()) {
        el.classList.add("used");
      }
    });

    if (index == -1) {
      if (letterCounter < 10) {
        letterCounter += 1;
        img.src = "img/" + letterCounter + ".png";
      }
      if (letterCounter == 10) {
        setTimeout(lose(), 100);
      }
    } else {
      let indices = [];
      let idx = word.indexOf(e.key.toUpperCase());
      while (idx != -1) {
        indices.push(idx);
        idx = word.indexOf(word[index], idx + 1);
      }

      indices.forEach((el) => {
        divMassive[el].textContent = e.key.toUpperCase();
      });
      win();
    }
  });

  //! Нажатие кнопки на вирт. клавиатуре
  keyboardButtons.forEach((e) => {
    e.onclick = () => {
      e.classList.add("used");
      let index = word.split("").indexOf(e.textContent.toUpperCase(), 0);

      if (index == -1) {
        if (letterCounter < 10) {
          letterCounter += 1;
          img.src = "img/" + letterCounter + ".png";
        }
        if (letterCounter == 10) {
          setTimeout(lose(), 100);
        }
      } else {
        let indices = [];
        let idx = word.indexOf(e.textContent.toUpperCase());
        while (idx != -1) {
          indices.push(idx);
          idx = word.indexOf(word[index], idx + 1);
        }

        indices.forEach((el) => {
          divMassive[el].textContent = e.textContent.toUpperCase();
        });
        win();
      }
    };
  });

  let endGameBtn = document.querySelectorAll(".end-game-button");
  endGameBtn.forEach((e) => {
    e.addEventListener("click", () => {
      location.reload()
    });
  });
}

async function getWords(JSONURL) {
  const response = await fetch(JSONURL);
  const wordsMassive = await response.json();

  return wordsMassive;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

async function startGame() {
  let words = await getWords("https://alekseykartyshev.github.io/Gallows/src/summary.json");
  gallows(words[getRandomInt(words.length)].word);
}

document.addEventListener("DOMContentLoaded", () => {
  startGame();
});
