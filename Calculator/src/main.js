"use strict";

function resultWrite() {
  let buttonContainer = document.querySelector(".button-container");
  let clear = document.querySelector("#clear");
  let equals = document.querySelector("#equals");
  buttonContainer.addEventListener("click", (e) => {
    if (e.target !== buttonContainer) {
      if (e.target.textContent !== "C") {
        if (e.target.textContent !== "=") {
          let button = e.target;
          let result = document.querySelector(".result");
          result.textContent += button.textContent;
        }
      }
    }
  });

  clear.addEventListener("click", (e) => {
    let result = document.querySelector(".result");
    result.textContent = null;
  });

  equals.addEventListener("click", (e) => {
    let result = document.querySelector(".result");
    result.textContent = eval(result.textContent);
  });
}

document.addEventListener('DOMContentLoaded', () =>{
    resultWrite();
})