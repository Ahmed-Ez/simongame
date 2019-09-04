var gameColor = ["red", "yellow", "green", "blue"];
var gamePattern = [];
var level = 1;
var started = false;
var currentMove = 0;


$(document).keypress(function() {
  if (!started) {
    started = true;
    setTitle("Level 1");
    generateSeq();
  }
});



$(".btn").on("click", function(event) {
  validateMove($(this).attr("id"));
  if (started) {
    $("#" + $(this).attr("id")).fadeIn(100).fadeOut(100).fadeIn(100);
    playAudio($(this).attr("id"));
  }
});

// function validateMove(pressedKey) {
//   if (currentMove < gamePattern.length - 1) {
//     if (pressedKey == gamePattern[currentMove]) {
//       currentMove++;
//     } else {
//       gameOver();
//       reset();
//     }
//   } else {
//     setTimeout(function() {
//       newLevel();
//     }, 1000);
//   }
// }

function validateMove(pressedKey) {
  if (pressedKey == gamePattern[currentMove]) {
    if ((currentMove >= gamePattern.length - 1)) {
      setTimeout(function() {
        newLevel();
      }, 1000);
    }
    currentMove++;
  } else {
    gameOver();
    reset();
  }
}


function newLevel() {
  level++;
  currentMove = 0;
  setTitle("Level " + level);
  generateSeq();
}

function gameOver() {
  playAudio("wrong");
  $("body").addClass("game-over");
  $("h1").text("Game Over, Press Any Key to Restart");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
}

function reset() {
  started = false;
  level = 1;
  gamePattern = [];
  currentMove = 0;
}


function generateSeq() {
  var randomColor = Math.floor(Math.random() * 4);
  gamePattern.push(gameColor[randomColor]);
  $("#" + gameColor[randomColor]).fadeOut().fadeIn();
  playAudio(gameColor[randomColor]);
}

function setTitle(title) {
  $("h1").text(title);
}

function playAudio(audioName) {
  var audio = new Audio("sounds/" + audioName + ".mp3");
  audio.play();
}
