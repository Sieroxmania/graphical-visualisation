/*
Aufgabenstellung: Implementieren Sie eine sich drehende 2D-Scheibe aus Einzelbildern, welche Sie mit JavaScript laden und in einem <img> Image-Element zeigen (nicht im Canvas). 
Die Einzelbilder sollen, ähnlich wie bei einer Sprite-Sheet-Animation ode einem Animationsfilm, so ausgetauscht und eingeblendet werden, dass visuell 
der Eindruck einer Rotation entsteht. Auf jedem Einzelbild ist ein Rotationszustand der Scheibe zu sehen, z.B.: 0°, 15°, 30°,...  

Es ist Ihnen überlassen, ob sie die Bilder auf mehrere Dateien verteilen, oder alle Bilder der Animation als Sprite-Sheet also in einer Datei anordnen.

Interaktion: Auf den Tastendruck 'l' oder 'r' soll sich die Scheibe augenscheinlich ein Stück nach links beziehungsweise nach rechts drehen. Zum Drehen muss man wiederholt drücken. 

Hinweise: Sie können über die css Eigenschaften clip, backgroundPosition und andere, einen Bildausschnitt wählen, z.B. clip: rect(10px, 20px, 30px, 40px);. 

Erweiterungen: 

Außer einer Scheibe kreieren und animieren Sie noch ein anderes Objekt Ihrer Wahl als Sprite-Sheet, z.B einen hüpfenden Hasen.
Die Scheibe dreht sich automatisch mit Taste "a", dazu muss diese kontinuierlich animiert werden.
*/


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
      circleImages.style.display="block";
    }else {
      circleImages.style.display="none";
      circleContainer.classList.add('spriteCircle');
    }
  }
