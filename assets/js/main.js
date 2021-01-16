var Coordinates = [];
var TravelDistance = 0;
var LastLocation;

function interval() {
  var div = document.getElementById("debug-Info");
  div.innerHTML = "";
  var currentLocPromise = GetCurrentLocation();
  currentLocPromise.then(function (currentLoc) {
    addDiv("travel distance " + TravelDistance, div);
    addDiv("loc  " + currentLoc, div);
    if (LastLocation) {
      var distance = getDistance(LastLocation, currentLoc);
      console.log("distance is " + distance);
      if (distance > 5) {
        LastLocation = currentLoc;
        TravelDistance = TravelDistance + distance;
        Coordinates.push(currentLoc);
      }
    } else {
      console.log("last location is null");
      LastLocation = currentLoc;
    }
  });
}

function getDistance(firstCoordinate, lastCoordinate) {
  var phi1 = (firstCoordinate[0] * Math.PI) / 180;
  var phi2 = (lastCoordinate[0] * Math.PI) / 180;
  var dLambda = ((firstCoordinate[1] - lastCoordinate[1]) * Math.PI) / 180;

  with (Spheroid.wgs84) var s = distance(phi1, phi2, dLambda);

  return s;
}
// window.setInterval(interval, 3000);
window.setInterval(interval, 30000);

function addDiv(innerHTML, element) {
  var newElement = document.createElement("div");
  newElement.innerHTML = innerHTML;
  element.appendChild(newElement);
}
