function createAppTitle(title) {
  let appTitle = document.createElement("h4");
  appTitle.classList.add("logo");
  appTitle.innerHTML = title;
  return appTitle;
}

function createAppForm() {
  let form = document.createElement("form");
  let input = document.createElement("input");
  let button = document.createElement("button");
  let img = document.createElement("img");
  let buttonWrapper = document.createElement("div");

  form.classList.add("form");
  input.classList.add("input");
  input.placeholder = "Задача";
  button.classList.add("form-btn", "btn");
  img.classList.add("btn-img");
  img.src = "img/plus.svg";

  button.append(img);
  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);

  return { form, input, buttonWrapper };
}

function createTODOList() {
  let list = document.createElement("ul");
  list.classList.add("list");
  return list;
}

function createTODOItem(name) {
  let item = document.createElement("li");
  let buttonGroup = document.createElement("div");
  let deleteButton = document.createElement("button");
  let doneButton = document.createElement("button");
  let doneImg = document.createElement("img");
  let deleteImg = document.createElement("img");

  item.classList.add("item");
  item.textContent = name;
  buttonGroup.classList.add("buttons");
  doneButton.classList.add("done-btn", "btn");
  doneImg.classList.add("btn-img");
  doneImg.src = "img/arrow.svg";
  deleteButton.classList.add("delete-btn", "btn");
  deleteImg.classList.add("btn-img");
  deleteImg.src = "img/minus.svg";

  doneButton.append(doneImg);
  deleteButton.append(deleteImg);
  buttonGroup.append(doneButton);
  buttonGroup.append(deleteButton);
  item.append(buttonGroup);

  return { item, doneButton, deleteButton };
}

function addTodoItemFromMassive(massiveWithItems) {
  let massive = [];
  for (let i of massiveWithItems) {
    let massiveItem = createTODOItem(i.name);
    if (i.done) {
      massiveItem.item.classList.add("done");
    }
    massiveItem.doneButton.addEventListener("click", function () {
      massiveItem.item.classList.toggle("done");
      let text = massiveItem.item.textContent;
      let session = JSON.parse(localStorage.getItem("session"));
      // console.log(localSession);
      for (let i of session) {
        // console.log(i.name);
        if (i.name === text) {
          if (i.done) {
            i.done = false;
            localStorage.setItem("session", JSON.stringify(session));
          } else {
            i.done = true;
            localStorage.setItem("session", JSON.stringify(session));
          }
        }
      }
      // console.log(session);
    });
    massiveItem.deleteButton.addEventListener("click", function () {
      if (confirm("Вы уверены?")) {
        let text = massiveItem.item.textContent;
        let session = JSON.parse(localStorage.getItem("session"));
        for (let id in session) {
          console.log(id)
          if (session[id].name === text) {
            session.splice(id, 1);
            console.log(session);
            localStorage.setItem("session", JSON.stringify(session));
          }
        }
        massiveItem.item.remove();
      }
    });
    massive.push(massiveItem);
  }
  return massive;
}

function createTODOApp(massive, app, title = "Список дел") {
  let apptitle = createAppTitle(title);
  let appForm = createAppForm();
  let appList = createTODOList();

  app.append(apptitle);
  app.append(appForm.form);
  app.append(appList);

  let defaultMassive = addTodoItemFromMassive(massive);

  for (let item of defaultMassive) {
    appList.append(item.item);
  }

  appForm.form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!appForm.input.value) {
      return;
    }

    let sessionLocal = JSON.parse(localStorage.getItem("session"));
    sessionLocal.push({ name: appForm.input.value, done: false });

    localStorage.setItem("session", JSON.stringify(sessionLocal));

    let appItem = createTODOItem(appForm.input.value);

    appItem.doneButton.addEventListener("click", function () {
      appItem.item.classList.toggle("done");
      let text = appItem.item.textContent;
      let session = JSON.parse(localStorage.getItem("session"));
      console.log(session);
      for (let i of session) {
        console.log(i.name);
        if (i.name === text) {
          if (i.done) {
            i.done = false;
            localStorage.setItem("session", JSON.stringify(session));
          } else {
            i.done = true;
            localStorage.setItem("session", JSON.stringify(session));
          }
        }
      }
    });
    appItem.deleteButton.addEventListener("click", function () {
      if (confirm("Вы уверены?")) {
        appItem.item.remove();
        let text = appItem.item.textContent;
        let session = JSON.parse(localStorage.getItem("session"));
        for (let id in session) {
          if (session[id].name === text) {
            session.splice(id,1);
            console.log(session);
            localStorage.setItem("session", JSON.stringify(session));
          }
        }
      }
    });
    appList.append(appItem.item);
    appForm.input.value = "";
  });
}

window.createTodoApp = createTODOApp;
