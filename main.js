console.log("#3");
const container = document.querySelector("#container");

function createField() {
  const field = document.createElement("div");
  field.className = "field";
  return field;
}

function createRow() {
  const row = document.createElement("div");
  row.className = "row";
  return row;
}

function createGrid(gridSize) {
  for (let i = 0; i < gridSize; i++) {
    let row = createRow();
    for (let j = 0; j < gridSize; j++) {
      row.appendChild(createField());
    }
    container.appendChild(row);
  }
}

createGrid(16);
