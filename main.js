const container = document.querySelector("#container");
const buttons = document.querySelectorAll("li > button");
const rainbow = document.querySelector("#rainbow");
const colorElement = document.querySelector("#color");
const size = document.querySelector("#size");

let color = rgb();
let mousedown = false;
let mode = null;
let gridSize = 16;
let border = "field";
let fields = [];

rainbow.style.background = color;
colorElement.style.background = color;

function createField() {
  const field = document.createElement("div");
  field.className = border;
  field.addEventListener("mouseup", () => {
    mousedown = false;
  });
  field.addEventListener("mousedown", (event) => {
    mousedown = !mousedown;
    draw(event);
  });
  field.addEventListener("mouseover", draw);
  return field;
}

function createRow() {
  const row = document.createElement("div");
  row.className = "row";
  return row;
}

function createGrid(gridSize) {
  fields = [];
  for (let i = 0; i < gridSize; i++) {
    let row = createRow();
    for (let j = 0; j < gridSize; j++) {
      let field = createField();
      row.appendChild(field);
      fields.push(field);
    }
    container.appendChild(row);
  }
}

function draw(event) {
  if (mousedown) {
    const field = event.target;
    if (mode === "rainbow") {
      color = rgb();
      rainbow.style.background = color;
    }
    field.style.background = color;
  }
}
function rgb() {
  let createNum = () => {
    return Math.round(Math.random() * 255);
  };
  return `rgba(${createNum()},${createNum()},${createNum()})`;
}
function chooseMode(event) {
  const button = event.target;
  mode = button.textContent.toLowerCase();
  if (mode === "black") {
    color = "black";
  } else if (mode === "eraser") {
    color = "white";
  } else if (mode === "color") {
    color = rgb();
    colorElement.style.background = color;
  } else if (mode === "new grid") {
    gridSize = size.value > 64 ? 64 : size.value;
    container.innerHTML = "";
    createGrid(gridSize);
  } else if (mode === "clear") {
    clear();
  } else if (mode === "border") {
    border = border === "field" ? "field-no-border" : "field";
    changeBorder(border);
  }
}
function clear() {
  fields.forEach((field) => {
    field.style.background = "white";
  });
}
function changeBorder(className) {
  fields.forEach((field) => {
    field.className = className;
  });
}

buttons.forEach((button) => {
  button.addEventListener("click", chooseMode);
});
createGrid(16);
