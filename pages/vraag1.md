---
layout: default
title: vraag1
description: This is just another page
---

## test vraag1 

<script>
function myfunction() {
    var test =document.getElementById('name').value;
    console.log(test);
    alert(" test : "+ test);
}

</script>

Test vraag:

<input type="text" id="name" name="name"/>

<button id="ansor">Click me</button>

<script>
window.onload = function test(){
    var btn = document.getElementById("ansor");
    console.log(btn);
    btn.onclick = myfunction; 
}
</script>