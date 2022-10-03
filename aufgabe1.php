<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aufgabe 1</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
  </head>
  <body>
  <?php include '_includes/header.php';?>

  <div class="container">
  <div class="row my-5 align-items-center">
    <div class="col-md-6 my-5 text-center">
    <div id="circleContainer">
        <img id="circleImages" class="img-fluid" src="img/0.jpg" width="400px" height="400px">
    </div>
    </div>
    <div class="col-md-6 my-5 text-center">
    <div id="spriteContainer" class="d-inline-flex">
        <div id="spriteFlame">
    </div>
    <div>
        <a href="https://www.freepik.com/free-vector/set-medieval-sprite-torches-with-burning-fire-sequence-animation-ancient-wooden-brands-with-flame-cartoon-elements-pc-game-flaming-torchlight-lighting-flambeau-isolated-vector-icons_20903013.htm#query=animation%20sprite&position=1&from_view=keyword" target="_blank">Image by upklyak</a> on Freepik

</div>
    
  </div>
    </div>
    <div class="row my-5 align-items-center">
    <div class="col-md-12 my-1 text-center">
  <p>Auf den Tastendruck 'l' oder 'r' soll sich die Scheibe augenscheinlich ein Stück nach links beziehungsweise nach rechts drehen. Zum Drehen muss man wiederholt drücken. <br>Die Scheibe dreht sich automatisch mit Taste "a", dazu muss diese kontinuierlich animiert werden.</p>
</div>
  </div>


  <div class="container">
<footer class="py-3 my-4">
<?php include '_includes/footer.php';?>
<script type="text/javascript" src="js/aufgabe1.js"></script>
</footer>
</div>
  </body>
</html>

