
var point=".";
setInterval(points_changing(),100);

function points_changing(){
  var points_changing = document.getElementById("points").innerHTML;
  points_changing = points_changing+point;
  document.getElementById("points").innerHTML=points_changing;
  //document.getElementById("points").innerHTML=document.getElementById("points").innerHTML+" ..";
  //return points_changing;

}
