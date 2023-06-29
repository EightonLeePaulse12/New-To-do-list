const addButton = document.querySelector("#add");
const sortButton = document.querySelector("#sort");
const input = document.querySelector("#toDoItem");
const list = document.querySelector(".listt");

let remove = [];
let checkboxes = [];

let span = [];
let edit = [];

let empty = JSON.parse(localStorage.getItem("data"))
  ? JSON.parse(localStorage.getItem("data"))
  : [];

addButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value) {
    empty.push(input.value.charAt(0).toUpperCase() + input.value.slice(1));
    input.value = "";
  } else {
    alert("Please enter something!");
  }

  empty = [...new Set(empty)];

  yes();
});

function strikethrough() {
  checkboxes = [...document.querySelectorAll("#checkItem")];
  span = [...document.querySelectorAll("span")];

  checkboxes.forEach((item) => {
    item.addEventListener("click", (event) => {
      let box = span[checkboxes.indexOf(event.target)];
      if (event.target.checked === true) {
        box.style.textDecoration = "line-through";
      } else {
        box.style.textDecoration = "none";
      }
    });
  });
}

sortButton.addEventListener("click", () => {
  empty.sort((a, b) => {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    }
    return 0;
  });
  yes();
});

function yes() {
  list.innerHTML = "";
  empty.forEach((data) => {
    list.innerHTML += `
        <ul id="list">
        <li> <input type="checkbox" name="checkbox" id="checkItem"><span>${data}</span><button id="exit">X</button><button class="whyme">Edit</button></li>
        </ul>
        `;
  });

  localStorage.setItem("data", JSON.stringify(empty));

  strike = [...document.querySelectorAll("span")];
  checkboxes = [...document.querySelectorAll("#checkItem")];
  strikethrough();
  removeFunction();
  editMe();
}

let editButton = document.querySelectorAll(".whyme");

function editMe() {
  edit = [...document.querySelectorAll(".whyme")];

  span = [...document.querySelectorAll("span")];

  edit.forEach((item) => {
    item.addEventListener("click", (e) => {
      let question = prompt("Edit...");
      let box = span[edit.indexOf(e.target)];
      let i = edit.indexOf(e.target);
      empty[i] = question;
      box.textContent = question;
      localStorage.setItem("data", JSON.stringify(empty));
    });
  });
}

let removeFunction = () => {
  remove = [...document.querySelectorAll("#exit")];
  remove.forEach((item) => {
    item.addEventListener("click", (e) => {
      empty.splice(parseInt(remove.indexOf(e.target)), 1);
      yes();
    });
  });
};
yes();
