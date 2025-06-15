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
    <title>Arma Palabras - Juego Educativo</title>
    <link rel="stylesheet" href="../../css/componentes/juegoPalabras.css">
</head>
<body>
    <div class="game-container">
        <!-- Cabecera del juego -->
        <header class="game-header">
            <h1>¡Arma Palabras!</h1>
            <div class="score-panel">
                <div id="score">Puntos: <span>0</span></div>
                <div id="level">Nivel: <span>1</span></div>
            </div>
        </header>

        <!-- Área de juego principal -->
        <main class="game-area">
            <!-- Sección de imagen -->
            <div class="image-section">
                <img id="wordImage" src="/plataformaEducativa/frontend/assets/img/palabras/default.png" alt="Imagen de la palabra">
            </div>

            <!-- Sección de construcción de palabras -->
            <div class="word-building-section">
                <div id="wordTarget" class="word-target">
                    <!-- Aquí se mostrarán los espacios para las letras -->
                </div>
                
                <div id="lettersBank" class="letters-bank">
                    <!-- Aquí se generarán las letras disponibles -->
                </div>
            </div>
        </main>

        <!-- Controles del juego -->
        <div class="game-controls">
            <button id="checkButton" class="btn btn-check">Comprobar</button>
            <button id="hintButton" class="btn btn-hint">Pista</button>
            <button id="nextButton" class="btn btn-next" disabled>Siguiente</button>
        </div>

        <!-- Modal de celebración -->
        <div id="celebrationModal" class="modal">
            <div class="modal-content">
                <h2>¡Muy bien!</h2>
                <p id="celebrationMessage">Has formado la palabra correctamente.</p>
                <div class="celebration-animation">
                    <img src="/plataformaEducativa/frontend/assets/img/celebration.gif" alt="Celebración">
                </div>
                <button id="continueButton" class="btn">Continuar</button>
            </div>
        </div>

        <!-- Modal de instrucciones -->
        <div id="instructionsModal" class="modal">
            <div class="modal-content">
                <h2>¿Cómo jugar?</h2>
                <ol>
                    <li>Observa la imagen y piensa qué palabra representa</li>
                    <li>Arrastra las letras desde abajo hacia los espacios</li>
                    <li>Forma la palabra correcta</li>
                    <li>Presiona "Comprobar" para verificar tu respuesta</li>
                </ol>
                <button id="startGameButton" class="btn">¡Vamos a jugar!</button>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="../../javaScript/componentes/juegoPalabras.js"></script>
</body>
</html>
