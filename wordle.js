


var height =4;
var width =4;
var row =0;
var col =0;
var gameOver = false;
var word = "";


window.onload = function(){
  createGrid();
}
function createGrid(){
  for(let r=0; r<height;r++) {
    for(let c=0; c<width; c++){

      let tile = document.createElement("span");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.innerText = "";
      document.getElementById("grid").appendChild(tile);


    }
  }
}


var getWord = {word:'', hint: ''};

const listOfWords = async () => {
  const res = await fetch("https://api.masoudkf.com/v1/wordle", {
    headers: {
      "x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",
    },
  });
  let json = await res.json();
  let {dictionary}=json;
  getWord = dictionary[Math.floor(Math.random()*dictionary.length)];
  getWord.word = getWord.word.toUpperCase()
  getWord.hint = getWord.hint
  return getWord.word
}

listOfWords().then((words) => {
  console.log(words);
  console.log(getWord.hint); // Log the hint to the console
  word = words;
});

// Listen for Hint button click
document.getElementById("btn2").addEventListener("click", () => {
  document.getElementById("hint").innerHTML = getWord.hint;
  document.getElementById("btn2").blur(); // remove focus from the button
});





// Listen for Key Press
document.addEventListener("keyup", (e) => {
  if (gameOver) return;

  if ("KeyA" <= e.code && e.code <= "KeyZ") {
    if (col < width) {
      let currTile = document.getElementById(row.toString() + '-' + col.toString());
      if (currTile.innerText == "") {
        currTile.innerText = e.code[3];
        col += 1;
      }
    }
  } else if (e.code == "Backspace") {
    if (0 < col && col <= width) {
      col -=1;
    }
    let currTile = document.getElementById(row.toString() + '-' + col.toString());
    currTile.innerText = "";
  } else if (e.code == "Enter") {
    update();
    row += 1; //start new row
    col = 0; //start at 0 for new row
  }
});


function update() {
  let correct = 0;
  let enteredWord = "";
  for (let c = 0; (c < width); c++) {
    let currTile = document.getElementById(row.toString() + '-' + c.toString());
    let letter = currTile.innerText;

    // Check if the letter is empty
    if (letter.trim() === "") {
      alert("Enter a full word, you missed 1 chance.");
      return;
    }

    enteredWord += letter;

    //Is it in the correct position?
    if (word[c] == letter) {
      currTile.classList.add("correct");
      correct += 1;
    } // Is it in the word?
    else if (word.includes(letter)) {
      currTile.classList.add("present");
    } // Not in the word
    else {
      currTile.classList.add("absent");
    }

    
    
    if (enteredWord === word) {
    let congratsImg = document.getElementById("congrats-img");
    congratsImg.src = "https://res.cloudinary.com/mkf/image/upload/v1675467141/ENSF-381/labs/congrats_fkscna.gif";
    congratsImg.style.display = "block";
    } 
    else if ((c===(width-1)) && (row === 3) && (gameOver === false)){
        gameOver = true;
        alert("YOU LOST THE GAME THE CORRECT WORD WAS" + " " + getWord.word);
        
    }
  }
}





document.querySelector(".start-over").addEventListener("click", function() {
  let tiles = document.querySelectorAll(".tile");
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].innerText = "";
    tiles[i].classList.remove("correct");
    tiles[i].classList.remove("present");
    tiles[i].classList.remove("absent");
  }
  row = 0;
  col = 0;
  gameOver = false;
  let hintElem = document.getElementById("hint");
  hintElem.innerHTML = ""; // Clear the hint
  let congratsImg = document.getElementById("congrats-img");
  congratsImg.src = ""; // Hide the image
  listOfWords().then((words) => {
    console.log(words);
    word = words;
  this.blur();
  });
});


document.getElementById('In').addEventListener('click', function() {
  var instructionsList = document.getElementById('instructions-list');
  instructionsList.style.display = (instructionsList.style.display === 'none') ? 'block' : 'none';
  this.blur();
});

