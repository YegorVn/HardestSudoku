// cell, row, col are parameters and called so
//
class genGrid {
  static arr = [];

  static initField() {
    return "Hellow, owrld!";
  }

  static swapColumns(numbers) {
    let swapedNumbers = numbers
    let firstRowIdx = Math.floor(Math.random() * 8) 
    let secondRowIdx = 0
    switch(firstRowIdx % 3){
      case 0: secondRowIdx = firstRowIdx + Math.round(Math.random() + 1); break;
      case 1: secondRowIdx = firstRowIdx + ((Math.random() > 0.5) ? 1 : -1); break;
      case 2: secondRowIdx = firstRowIdx - Math.round(Math.random() + 1); break;
    }
    let savedRow = swapedNumbers[firstRowIdx]
    swapedNumbers[firstRowIdx] = swapedNumbers[secondRowIdx]
    swapedNumbers[secondRowIdx] = savedRow
    return swapedNumbers
  }

  static swapRows(numbers) {
    let swapedNumbers = numbers
    let firstRowIdx = Math.floor(Math.random() * 8) 
    let secondRowIdx = 0
    switch(firstRowIdx % 3){
      case 0: secondRowIdx = firstRowIdx + Math.round(Math.random() + 1); break;
      case 1: secondRowIdx = firstRowIdx + ((Math.random() > 0.5) ? 1 : -1); break;
      case 2: secondRowIdx = firstRowIdx - Math.round(Math.random() + 1); break;
    }
    let savedRow = swapedNumbers[firstRowIdx]
    swapedNumbers[firstRowIdx] = swapedNumbers[secondRowIdx]
    swapedNumbers[secondRowIdx] = savedRow
    return swapedNumbers
  }
  

  static swapRowAreas() {
  }
  static swapColumnAreas() {}

  static makeArr = (length) => {
    return Array.from({ length: length }, (_, i) => {
      return i + 1; 
    });
  };

  static initializeFieldNumbers() {
    let rowNumbers = this.makeArr(9);
    let numbers = [];

    for (let i = 0; i < 9; i++) {
      if (i % 3 === 0) {
        let defaultRowNumbers = this.makeArr(9);
        rowNumbers = defaultRowNumbers.concat(
          defaultRowNumbers.splice(0, i / 3)
        );
      }
      if (i % 3 !== 0) {
        rowNumbers = rowNumbers.concat(rowNumbers.splice(0, 3));
      }
      numbers.push([...rowNumbers]);
    }

    this.swapRows(numbers)

    return numbers;
  }

  static {
    this.arr = this.initializeFieldNumbers();
  }
}

console.log(genGrid.arr);

const createDomField = () => {
  const field = document.querySelector(".field");
  for (let i = 0; i < 9; i++) {
    const subfield = document.createElement("div");
    subfield.classList.add("subfield");
    field.appendChild(subfield);
    for (let n = 0; n < 9; n++) {
      const cellIdx =
        (n % 3) +
        9 * ((n - (n % 3)) / 3) +
        1 +
        i * 3 +
        18 * ((i - (i % 3)) / 3);
      const cell = document.createElement("input");
      cell.classList.add(
        "cell",
        `cell_${cellIdx}`,
        `row_${(n - (n % 3)) / 3 + 3 * ((i - (i % 3)) / 3) + 1}`,
        `col_${(n % 3) + 3 * (i % 3) + 1}`
      );
      cell.maxLength = "1";
      subfield.appendChild(cell);
    }
  }
};

createDomField();

const intDiv = (dividend, divider) => {
  return (dividend - (dividend % divider)) / divider;
};

const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

// const makeArr = (length) => {
//   return Array.from({ length: length }, (_, i) => {
//     return i + 1;
//   });
// };

let fieldNumbers = {
  solution: [],
  userNumbers: [],
  visibleNumbers: [],
};

const getNumberFromString = (string) => {
  const newString = string.replace(/[a-z, _]/gi, "");
  return newString;
};

const getRow = (e) => {
  let rowIdx = getParamFromString(e.target.classList.toString(), /row_[0-9]+/);
  Array.from(document.getElementsByClassName(`row_${rowIdx}`)).forEach(
    (cell) => (cell.style.backgroundColor = "whitesmoke")
  );
};

const getCol = (e) => {
  let colIdx = getParamFromString(e.target.classList.toString(), /col_[0-9]+/);
  Array.from(document.getElementsByClassName(`col_${colIdx}`)).forEach(
    (cell) => (cell.style.backgroundColor = "whitesmoke")
  );
};

const cleanField = () => {
  console.log();
  const arr = Array.from(document.getElementsByClassName("cell"));
  for (let i = 0; i < arr.length; i++) {
    arr[i].style.backgroundColor = "white";
  }
};

const getParamFromString = (string, param) => {
  let num = string
    .match(param, " ")
    .toString()
    .replace(/[a-z, _]/g, "");
  return num;
};

document.querySelector(".field").addEventListener("click", (e) => {
  cleanField();
  getCol(e);
  getRow(e);
  e.target.style.backgroundColor = "grey";
});
