
var christmasWords = ['snowman', 'carol','reindeer', 'snowman', 'frosty','nutcracker',
'gifts', 'santa', 'mistletoe', 'lights', 'elves', 'eggnog', 'ornaments', 'snowflake', 
'rudolph', 'tinsel', 'joy'
];
var blanksAndSuccess = []; 
var blanks = 0; 
var currentWord = "";
var currentLetters = [];

var winCounter = 0;
var lossCounter = 0;
var numGuesses = 12;

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
  'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

var guessedLetter = [];
var correctLetter = [];
var incorrectGuess = [];

var buttons = function() {
  var myButtons = document.getElementById('alphabet-btns');
  var letters = document.createElement('ul');

  for (var i = 0; i < alphabet.length; i++) {
    let listItem = document.createElement('li');
    listItem = document.createElement('BUTTON');
    listItem.classList.add('btn-primary');

    listItem.innerHTML = alphabet[i];
    myButtons.appendChild(listItem);
    listItem.dataset.alphabet = alphabet[i];

    listItem.onclick = function() {
      var userGuess = listItem.dataset.alphabet;
  
      guessedLetter.push(userGuess);
      document.getElementById('guessed').innerHTML = "Letters Already Guessed: " + guessedLetter.join(" ");
      checkLetters(userGuess);  
  
      round();
      //  console.log(userGuess);
    }

  }
}

document.getElementById("gameStart").onclick = function() {buttons()};

function startGame() {
  numGuesses = 12;
  blanksAndSuccess = [];
  guessedLetter = [];
  incorrectGuess = [];

  currentWord = christmasWords[Math.floor(Math.random() * christmasWords.length)];

  currentLetters = currentWord.split("");

  blanks = currentLetters.length;
  for (var i = 0; i < blanks; i++) {
    blanksAndSuccess.push("_")
  }
  console.log(currentWord);
  document.getElementById('currentWord').innerHTML = "Current Word: " + blanksAndSuccess.join(" ");
  document.getElementById('guessesRemaining').innerHTML = "Number Of Guesses Remaining: " + numGuesses;
  document.getElementById('guessed').innerHTML = "Letters already guessed: "
}

function checkLetters(letter) {

  var letterInWord = false;
  
  for (var i = 0; i < blanks; i++) {
    if (currentWord[i] == letter) {
      letterInWord = true;
    }
  }
  if (letterInWord) {
    for (var i = 0; i < blanks; i++) {

      if (currentWord[i] == letter) {
        blanksAndSuccess[i] = letter
      }
    }
    console.log(blanksAndSuccess);

  } else {
    incorrectGuess.push(letter);
    numGuesses--;
    console.log("that was incorrect " + numGuesses + " are remaining");
  }

}

function round() {

  console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + " | NumGuesses: " + numGuesses);


  document.getElementById("guessesRemaining").innerHTML = "Number Of Guesses Remaining: " + numGuesses;
  document.getElementById("currentWord").innerHTML = "Current Word: " + blanksAndSuccess.join(" ");
  document.getElementById("guessed").innerHTML = "Letters already guessed: " + incorrectGuess.join(" ");

  if (currentLetters.toString() == blanksAndSuccess.toString()) {
    winCounter++; 
    document.getElementById("word").innerHTML = "The last word was: " + currentWord;
  
    document.getElementById("winCounter").innerHTML = "Wins: " + winCounter;
    startGame(); 

  }

  else if (numGuesses == 0) {
    lossCounter++; 
    document.getElementById("word").innerHTML = "The last word was: " + currentWord;

    document.getElementById("lossCounter").innerHTML = "Losses: " + lossCounter;
    startGame(); 
  }

}

startGame();