<?php
session_start();
if (!isset($_SESSION["usuario"])) {
    header("Location: /plataformaEducativa/frontend/vistas/login.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Atrapa Fruta - Juego Educativo</title>
    <link rel="stylesheet" href="../../css/componentes/atrapaFruta.css">
</head>
<body>
    <div id="startScreen" class="start-screen">
        <h1>Atrapa Fruta</h1>
        <p>¡Mueve la canasta con el ratón para atrapar las frutas!</p>
        <button id="startButton">Comenzar Juego</button>
    </div>

    <div id="gameContainer" class="game-container" style="display: none;">
        <div class="score-container">Puntos: <span id="score">0</span></div>
        <div class="lives">Vidas: <span id="lives-hearts">❤❤❤</span></div>
        
        <div id="basket" class="basket"></div>
        <div id="fruitName" class="fruit-name"></div>
    </div>

    <div id="gameOverScreen" class="game-over" style="display: none;">
        <h2>¡Juego Terminado!</h2>
        <p>Tu puntuación final: <span id="finalScore">0</span></p>
        <button id="restartButton">Jugar de Nuevo</button>
    </div>

    <script src="../../javaScript/componentes/atrapaFruta.js"></script>
</body>
</html>