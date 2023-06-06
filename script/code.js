const addButton = document.querySelector("#add");
const sortButton = document.querySelector("#sort");
const input = document.querySelector("#toDoItem");
const list = document.querySelector(".listt");

let empty = [];
let remove = [];
let checkboxes = [];
let strike = [];  

empty = JSON.parse(localStorage.getItem('data')) != undefined ? JSON.parse(localStorage.getItem('data')) : [];
console.log(JSON.parse(localStorage.getItem("data")))

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

// function uppercase() {
//   empty += "";
//   let array = empty.split("", 2);
//   let character = array[0];
//   console.log(character);
//   let basic =
//   empty += basic;
//   console.log(basic);
// }

function yes() {
  list.innerHTML = "";
  empty.forEach((data) => {
    list.innerHTML += `
        <ul id="list">
        <li> <input type="checkbox" name="checkbox" id="checkItem"><span>${data}</span> <button id="exit">X</button></li>
        </ul>
        `
  });

  localStorage.setItem('data',  JSON.stringify(empty))

  strike = [...document.querySelectorAll("span")];
  checkboxes = [...document.querySelectorAll("#checkItem")];
  strikethrough();
  removeFunction()
}

let removeFunction = ()=>{
  remove = [...document.querySelectorAll("#exit")];
  remove.forEach((item) => {
    item.addEventListener("click", (e) => {
      console.log(e.target);
      console.log(parseInt(remove.indexOf(e.target)));
      console.log(empty[parseInt(remove.indexOf(e.target))]);
      empty.splice(parseInt(remove.indexOf(e.target)), 1);
      // localStorage.setItem('moreData',(empty.splice(parseInt(remove.indexOf(e.target)),1)))
      yes();
    });
  });
}
yes();

 