const addButton = document.querySelector("#add");
const sortButton = document.querySelector("#sort");
const input = document.querySelector("#toDoItem");
const list = document.querySelector(".listt");

let empty = [];
let remove = [];
let checkboxes = [];
let strike = [];

addButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value) {
    empty.push(input.value);
    input.value = "";
  } else {
    alert("Please enter something!");
  }

  empty = [...new Set(empty)];

  yes();
});

function strikethrough() {
  checkboxes.forEach((item) => {
    item.addEventListener("click", () => {
      if (item.checked == true) {
        strike.forEach((item) => {
          item.style.textDecoration = "line-through";
        });
      } else {
        strike.forEach((item) => {
          item.style.textDecoration = "none";
        });
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

function uppercase() {
  empty += "";
  let array = empty.split("", 2);
  let character = array[0];
  console.log(character);
  let basic = character.charAt(0).toUpperCase();
  empty += basic;
  console.log(basic);
}

function yes() {
  list.innerHTML = "";
  empty.forEach((data) => {
   
    list.innerHTML += `
        <ul id="list">
        <li> <input type="checkbox" name="checkbox" id="checkItem"><span>${data}</span> <button id="exit">X</button></li>
        </ul>
        `;
        // uppercase();
  });
  strike = [...document.querySelectorAll("span")];
  checkboxes = [...document.querySelectorAll("#checkItem")];
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
  strikethrough();
}
