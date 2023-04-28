"use strict";

function modalWindow(container, text) {
  const modalWindow = document.createElement("div");
  const okButton = document.createElement("button");

  modalWindow.classList.add("modal");
  modalWindow.textContent = text;

  okButton.textContent = "OK";
  okButton.classList.add("modal-btn");

  okButton.addEventListener("click", () => {
    container.removeChild(modalWindow);
  });

  modalWindow.appendChild(okButton);
  container.appendChild(modalWindow);
}

function fieldset(type, text) {
  const fieldset = document.createElement("fieldset");
  const input = document.createElement("input");
  const legend = document.createElement("legend");

  input.type = type;

  legend.textContent = text;

  fieldset.appendChild(legend);
  fieldset.appendChild(input);

  return fieldset;
}

function booking(container) {
  const modalForm = document.createElement("div");
  const okButton = document.createElement("input");
  const cancelButton = document.createElement("button");
  const bookingForm = document.createElement("form");

  modalForm.classList.add("modal-form");

  okButton.classList.add("form-btn");
  okButton.type = "submit";
  okButton.value = "Далее";

  cancelButton.textContent = "Отмена";
  cancelButton.classList.add("cancel-btn");

  cancelButton.addEventListener('click', () => {
    container.removeChild(modalForm);
  })
  
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(bookingForm.children[0].lastChild.value);
    if (
      bookingForm.children[0].lastChild.value &&
      bookingForm.children[1].lastChild.value &&
      bookingForm.children[2].lastChild.value
    ) {
      container.removeChild(modalForm);
      modalWindow(container, "Спасибо, что выбрали нас. Мы скоро свяжемся с вами чтобы уточнить детали");
    } else {
      alert("Заполните поля со звездочкой");
    }
  });

  bookingForm.appendChild(fieldset("number", "Количество гостей*"));
  bookingForm.appendChild(fieldset("number", "Ваш номер телефона*"));
  bookingForm.appendChild(fieldset("date", "Дата мероприятия*"));

  bookingForm.appendChild(okButton);
  bookingForm.appendChild(cancelButton);
  modalForm.appendChild(bookingForm);
  container.appendChild(modalForm);
}

document.addEventListener("DOMContentLoaded", () => {
  const bookingButton = document.querySelector("#booking");
  const logo = document.querySelector("#logo");

  bookingButton.addEventListener("click", () => {
    booking(document.body);
  });

  logo.addEventListener("click", (e) => {
    e.preventDefault();
    document.body.classList.toggle("white");
  });
});
