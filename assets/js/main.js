var Coordinates = [];
var TravelDistance = 0;

function interval(){
    var div = document.getElementById("debug-Info");
    addDiv("travel distance "+TravelDistance ,div);
    TravelDistance++;
}

// window.setInterval(interval, 3000);
window.setInterval(interval, 30000);

  function addDiv(innerHTML, element){
    var newElement = document.createElement("div");
    newElement.innerHTML = innerHTML;
    element.appendChild(newElement);
  }