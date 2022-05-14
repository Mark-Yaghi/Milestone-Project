
/* This page was created as a place to store code which is used identically across all site pages, rather than re-writing
the code on every page repeatedly. The code below runs the clock that's in the header of each page. */

setInterval(myTimer, 1000);

function myTimer()
{
  const date = new Date();
  document.getElementById("clock").innerHTML = date.toLocaleTimeString();
}


