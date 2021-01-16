var Coordinates = [];
var TravelDistance = 0;
var LastTravelDistance = 0;
var LastLocation;
var QuestionsDone = [];
var Answer;
var Questions;
var QuestionIndex = 0;

function interval() {
  var div = document.getElementById("debug-Info");
  div.innerHTML = "";
  var currentLocPromise = GetCurrentLocation();
  currentLocPromise.then(function (currentLoc) {
    addDiv("travel distance " + TravelDistance, div);
    addDiv("loc  " + currentLoc, div);
    if (LastLocation) {
      var distance = getDistance(LastLocation, currentLoc);
      addDiv("distance is   " + distance, div);
      console.log("distance is " + distance);
      if (distance > 25) {
        LastLocation = currentLoc;
        TravelDistance = TravelDistance + distance;
        Coordinates.push(currentLoc);
      }
    } else {
      console.log("last location is null");
      LastLocation = currentLoc;
    }
  });
  if(LastTravelDistance != TravelDistance){
    var diff = TravelDistance - LastTravelDistance;
    console.log("diff in travalDist "+diff);
    if(diff>200){
      NextQuestion(QuestionIndex);
      LastTravelDistance = TravelDistance;
    }
  }else if(LastTravelDistance == 0){
    LastTravelDistance = TravelDistance;
  }
  }

function getDistance(firstCoordinate, lastCoordinate) {
  var phi1 = (firstCoordinate[0] * Math.PI) / 180;
  var phi2 = (lastCoordinate[0] * Math.PI) / 180;
  var dLambda = ((firstCoordinate[1] - lastCoordinate[1]) * Math.PI) / 180;

  with (Spheroid.wgs84) {
    var s = distance(phi1, phi2, dLambda);
  }

  return s;
}
// window.setInterval(interval, 3000);
window.setInterval(interval, 30000);

function addDiv(innerHTML, element) {
  var newElement = document.createElement("div");
  newElement.innerHTML = innerHTML;
  element.appendChild(newElement);
}

function NextQuestion(index){
  console.log("NextQuestion with "+index);

  var question = Questions[index];
  var vraag = "dit is een vraag";
  var questionDiv = document.getElementById("question");
  questionDiv.style.visibility = "visible";
  document.getElementById("infoText").style.visibility = "hidden";
  document.getElementById("questionTest").innerHTML= question.Vraag;
  Answer = question.Antwoord;

  if(question.media){
    document.getElementById("media").innerHTML=question.media;
  }
}

function validateAnswer(){
    // Get the input field
    var input = document.getElementById("answer").value;
    console.log("input "+input);
    if(input){
      if( Answer.toLowerCase() === input.toLowerCase()){
        alert("goed gedaan");
        QuestionIndex++;
        var questionDiv = document.getElementById("question");
        questionDiv.style.visibility = "hidden";
        document.getElementById("answer").value ="";

      }else{
        alert("Helaas probeer het nog eens");
      }

    }
}

window.onload = function answerFunction() {
  var btn = document.getElementById("answerBtn");
  btn.onclick = validateAnswer;

  var input = document.getElementById("answer");
  // Execute a function when the user releases a key on the keyboard
  input.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("answerBtn").click();
    }
  });

  Questions = GetQuestions();
};