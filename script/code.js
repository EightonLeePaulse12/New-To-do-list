const addButton = document.querySelector("#add");
const sortButton = document.querySelector("#sort");
const input = document.querySelector("#toDoItem");
const list = document.querySelector(".listt");

let remove = [];
let checkboxes = [];
// let strike = [];
let span = [];
let edit = [];

let empty = JSON.parse(localStorage.getItem("data"))
  ? JSON.parse(localStorage.getItem("data"))
  : [];
// console.log(JSON.parse(localStorage.getItem("data")))

addButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value) {
    empty.push(input.value.charAt(0).toUpperCase() + input.value.slice(1));
    input.value = "";
    console.log(empty);
  } else {
    alert("Please enter something!");
  }

  empty = [...new Set(empty)];

  yes();
});

function strikethrough() {
  checkboxes = [...document.querySelectorAll("#checkItem")];
  span = [...document.querySelectorAll("span")];

  console.log(checkboxes);
  checkboxes.forEach((item) => {
    item.addEventListener("click", (event) => {
      console.log(event.target);
      console.log(checkboxes.indexOf(event.target));
      console.log(empty[checkboxes.indexOf(event.target)]);
      let box = span[checkboxes.indexOf(event.target)];
      console.log(box);
      console.log(typeof box);
      if (event.target.checked === true) {
        box.style.textDecoration = "line-through";
      } else {
        box.style.textDecoration = "none";
      }
    });
  });
}

sortButton.addEventListener("click", () => {
  console.log(empty);
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
        <li> <input type="checkbox" name="checkbox" id="checkItem"><span>${data}</span><button class="whyme">Edit</button> <button id="exit">X</button></li>
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

  console.log(edit);
  span = [...document.querySelectorAll("span")];

  edit.forEach((item) => {
    item.addEventListener("click", (e) => {
      console.log(item);
      let question = prompt("Edit...");
      let box = span[edit.indexOf(e.target)];
      box.textContent = question
      console.log(box);
      console.log(question);
    });
  });

  // editButton.addEventListener("click", (e) => {
  //   console.log(edit);
  //   let question = prompt("Edit...");
  //   console.log(question);
  //   console.log(empty[checkboxes.indexOf(e.target)]);
}

let removeFunction = () => {
  remove = [...document.querySelectorAll("#exit")];
  remove.forEach((item) => {
    item.addEventListener("click", (e) => {
      console.log(e.target);
      console.log(parseInt(remove.indexOf(e.target)));
      console.log(empty[parseInt(remove.indexOf(e.target))]);
      empty.splice(parseInt(remove.indexOf(e.target)), 1);
      yes();
    });
  });
};
yes();
