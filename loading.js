
var countdown = 5;
var now = 5;


function countdown(){

  // Update the count down every 1 second
  var x = setInterval(function() {

    // Find the distance between now and the count down date
    var distance = countdown - now;

    // Display the result in the element with id="demo"
    document.getElementById("points").innerHTML = now;

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("points").innerHTML = "successful";
    }
    now--;
  }, 1000);

}
