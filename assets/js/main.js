var Coordinates = [];
var TravelDistance = 0;
var LastTravelDistance = 0;
var LastLocation;
var QuestionsDone = [];

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
      NextQuestion();
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

function Answer() {
  var answerBtn = document.getElementById("answer");
  if (answerBtn) {
    var answerBtn = answerBtn.value;
    console.log(answerBtn);
    if ("{{page.answerBtn}}" === answerBtn) {
      alert("goed zo");
    } else {
      alert(answerBtn + " is fout");
    }
  }
}

function NextQuestion(){
  console.log("NextQuestion");
  var questionDiv = document.getElementById("question");
  questionDiv.style.visibility = "visible";
  document.getElementById("questionTest").innerHTML="dit is een vraag";

}
