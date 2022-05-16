
/* This page was created as a place to store code which is used identically across all site pages, rather than re-writing
the code on every page repeatedly. The code below runs the clock that's in the header of each page as well as the menu*/

setInterval(headerClock, 1000);

function headerClock()
{
  const date = new Date();
  document.getElementById("clock").innerHTML = date.toLocaleTimeString();
}

function showMenu() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}


