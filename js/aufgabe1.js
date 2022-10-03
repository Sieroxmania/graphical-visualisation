// START Aufgabe 1
let position = 0;

document.addEventListener('keyup', (e) => {
  if (e.keyCode === 82)    {
    position ++;
    if (position > 23) position = 0;
  }    
  else if (e.keyCode === 76){
    position --;
    if (position < 0) position = 23;
  }
  else if (e.keyCode === 65){
    circleSpriteAnimation();
    return;
  }
    rotateCircle();
});

function rotateCircle() {
    let cirleImages = document.getElementById("circleImages");
    switch (position) {
      case 0:
        cirleImages.src = "img/0.jpg";
        break;
      case 1:
        cirleImages.src = "img/15.jpg";
        break;
      case 2:
        cirleImages.src = "img/30.jpg";
        break;
      case 3:
        cirleImages.src = "img/45.jpg";
        break;
      case 4:
        cirleImages.src = "img/60.jpg";
        break;
      case 5:
        cirleImages.src = "img/75.jpg";
        break;
      case 6:
        cirleImages.src = "img/90.jpg";
        break;
      case 7:
        cirleImages.src = "img/105.jpg";
        break;
      case 8:
        cirleImages.src = "img/120.jpg";
        break;
      case 9:
        cirleImages.src = "img/135.jpg";
        break;
      case 10:
        cirleImages.src = "img/150.jpg";
        break;
      case 11:
        cirleImages.src = "img/165.jpg";
        break;
      case 12:
        cirleImages.src = "img/180.jpg";
        break;
      case 13:
        cirleImages.src = "img/195.jpg";
        break;
      case 14:
        cirleImages.src = "img/210.jpg";
        break;
      case 15:
        cirleImages.src = "img/225.jpg";
        break;
      case 16:
        cirleImages.src = "img/240.jpg";
        break;
      case 17:
        cirleImages.src = "img/255.jpg";
        break;
      case 18:
        cirleImages.src = "img/270.jpg";
        break;
      case 19:
        cirleImages.src = "img/285.jpg";
        break;
      case 20:
        cirleImages.src = "img/300.jpg";
        break;
      case 21:
        cirleImages.src = "img/315.jpg";
        break;
      case 22:
        cirleImages.src = "img/330.jpg";
        break;
	  case 23:
        cirleImages.src = "img/345.jpg";
        break;
    }
  }

  function circleSpriteAnimation(){
    let circleImages = document.getElementById("circleImages");
    let circleContainer = document.getElementById("circleContainer");
    if (circleContainer.classList.contains("spriteCircle")){
      circleContainer.classList.remove("spriteCircle");
      circleImages.style.display="inline-flex";
    }else {
      circleImages.style.display="none";
      circleContainer.classList.add('spriteCircle');
    }
  }
// END Aufgabe 1