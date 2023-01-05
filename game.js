function nextSequence() {
	var count = 0;
	level++;
	$("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
	randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);
	playSound(gamePattern[level-1]);
	$("#" + gamePattern[level-1]).fadeOut(100).fadeIn(100);
	/*while(count < level){
		setTimeout(function (){playSound(gamePattern[count]);}, 1000);
		setTimeout(function (){$("#" + gamePattern[count]).fadeOut(100).fadeIn(100)}, 1000);
		count++;
	}
	count = 0;*/
}

function playSound(colour) {
  if (colour == "blue") {
    blueSound.play();
  } else if (colour == "green") {
    greendSound.play();
  } else if (colour == "red") {
    redSound.play();
  } else if (colour == "yellow") {
    yellowSound.play();
  }
}

function checkAnswer(currentLevel){
	var flag = 0;
	if(pressIndex<currentLevel){
		if(userClickedPattern[pressIndex] == gamePattern[pressIndex]){
			$("#gdbad").text("good " + pressIndex);
		}else{
			$("#gdbad").text("bad " + pressIndex);
			wrongSound.play();
			$("body").addClass("game-over");
			setTimeout(function (){ $("body").removeClass("game-over")},200);
			$("h1").text('Game Over, Press "Khloe" button to Restart');
			//$(".btn").hide();
			$("#startBtn").show();
			
			flag = 1;
		}
		pressIndex++;
	}
	if(pressIndex == currentLevel && flag != 1){
		pressIndex = 0;
		userClickedPattern = [];
		setTimeout(nextSequence,1000);
	}
	/*$("#pressIndex").text("pressIndex = "+pressIndex);
	$("#level").text("level = "+level);
	$("#userClickedPattern").text(userClickedPattern);
	$("#gamePattern").text(gamePattern);*/
	
}
//function go above
var blueSound = new Audio("sounds/blue.mp3");
var greendSound = new Audio("sounds/green.mp3");
var redSound = new Audio("sounds/red.mp3");
var wrongSound = new Audio("sounds/wrong.mp3");
var yellowSound = new Audio("sounds/yellow.mp3");
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var level = 0;
var pressIndex = 0;
//declare go above

$("#startBtn").click(function () {//To sttart the game
  $("#startBtn").hide();
	level = 0;
	gamePattern = [];
	userClickedPattern = [];
	setTimeout(function (){nextSequence()}, 500);
  //$("#" + randomChosenColour).fadeOut(100).fadeIn(100); //to flash
  //playSound(randomChosenColour);
})
$(".btn").click(function () {//What happen when the btn clicked
  var userChosenColour = this.getAttribute("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  $("#" + userChosenColour).fadeOut(100).fadeIn(100);
	checkAnswer(level);
})


