// START Aufgabe 1
let position = 0;
let animationRunning = 0;

document.addEventListener('keyup', (e) => {
  if (e.key === 'r')    {
    position ++;
  }    
  else if (e.key === 'l'){
    position --;
  }
  else if (e.key === 'a'){
    if (animationRunning === 0){
      animationRunning = setInterval(animateImage, 600);
    } else if(animationRunning > 0) {
      endAnimation();
    } 
    return;
  }
    endAnimation();
    checkPositionLimit();
    outputImage(position);
});

function animateImage() {
  let cirleImages = document.getElementById("circleImages");
  position++;
  checkPositionLimit();
  cirleImages.src = "img/"+position+".jpg";
 }

 function endAnimation(){
  clearInterval(animationRunning); 
      animationRunning=0;
}

function checkPositionLimit(){
  if (position >23 ) position = 0;
  else if (position < 0 )position = 23;
}

function outputImage(){
  let cirleImages = document.getElementById("circleImages");
      cirleImages.src = "img/"+position+".jpg";
}
// END Aufgabe 1
