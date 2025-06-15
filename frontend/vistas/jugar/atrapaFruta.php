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
    <div class="game-wrapper">
        <!-- Pantalla de inicio -->
        <div id="startScreen" class="screen">
            <h1>Atrapa Fruta</h1>
            <p>¡Atrapa las frutas con la canasta y aprende sus nombres!</p>
            <button id="startButton" class="btn">Comenzar Juego</button>
        </div>

        <!-- Contenedor principal del juego -->
        <div id="gameContainer" class="game-container">
            <!-- Canasta para atrapar frutas -->
            <div id="basket" class="basket"></div>
            
            <!-- Elemento para mostrar el nombre de la fruta -->
            <div id="fruitName" class="fruit-name"></div>
            
            <!-- Panel de información -->
            <div class="info-panel">
                <div id="score-container">Puntos: <span id="score">0</span></div>
                <div id="lives">Vidas: <span class="heart">❤</span><span class="heart">❤</span><span class="heart">❤</span></div>
            </div>
        </div>

        <!-- Pantalla de fin de juego -->
        <div id="gameOver" class="screen" style="display: none;">
            <h2>¡Juego Terminado!</h2>
            <p>Tu puntuación final: <span id="finalScore">0</span></p>
            <button id="restartButton" class="btn">Jugar de Nuevo</button>
        </div>
    </div>

    <!-- Scripts -->
    <script src="../../javaScript/componentes/atrapaFruta.js"></script>
</body>
</html>
