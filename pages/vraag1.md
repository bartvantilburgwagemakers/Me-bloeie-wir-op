---
layout: default
title: vraag1
description: This is just another page
answerBtn: test andwoord
---

## test vraag1 

<script>
function myfunction() {
    var answerBtn =document.getElementById('answer').value;
    console.log(answerBtn);
    if( "{{page.answerBtn}}" === answerBtn){
        alert("goed zo");
    }else{
        alert(answerBtn +" is fout");
    }
}

</script>

Test vraag:

<input type="text" id="answer" name="answer"/>

<button id="answerBtn">Click me</button>

[back](././)
<button onclick="onclick">Click me</button>

<script>
window.onload = function test(){
    var btn = document.getElementById("answerBtn");
    console.log(btn);
    btn.onclick = myfunction;
    
    // Get the input field
var input = document.getElementById("answer");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("answerBtn").click();
  }
});
}
</script>