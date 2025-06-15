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
    <title>Aprendiendo Colores - Juego Educativo</title>
    <link rel="stylesheet" href="../../css/componentes/coloresMagicos.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Aprendiendo Colores</h1>
            <p class="subtitle">¡Descubre y aprende sobre los colores jugando!</p>
        </header>

        <!-- Sección de navegación entre actividades -->
        <nav class="activities-nav">
            <button class="activity-btn active" data-activity="learn">Aprender</button>
            <button class="activity-btn" data-activity="identify">Identificar</button>
            <button class="activity-btn" data-activity="mix">Mezclar</button>
            <button class="activity-btn" data-activity="memory">Memorama</button>
        </nav>

        <!-- Contenedor principal de actividades -->
        <main class="activities-container">
            <!-- Sección de Aprendizaje -->
            <section id="learn-section" class="activity-section active">
                <h2>Conoce los Colores</h2>
                <div class="colors-grid" id="colores-container">
                    <!-- Los colores se generarán dinámicamente con JavaScript -->
                </div>
            </section>

            <!-- Sección de Identificación -->
            <section id="identify-section" class="activity-section">
                <h2>¿Qué color es?</h2>
                <div class="identify-game">
                    <div class="game-status">
                        <div class="score">Puntos: <span id="identify-score">0</span></div>
                        <div class="level">Nivel: <span id="identify-level">1</span></div>
                    </div>
                    
                    <div class="object-display">
                        <img id="object-to-identify" src="" alt="Objeto para identificar">
                    </div>
                    
                    <div class="options-container" id="identify-options">
                        <!-- Las opciones se generarán dinámicamente -->
                    </div>
                    
                    <div class="feedback-message" id="identify-feedback"></div>
                </div>
            </section>

            <!-- Sección de Mezcla de Colores -->
            <section id="mix-section" class="activity-section">
                <h2>Mezcla de Colores</h2>
                <div class="mix-game">
                    <div class="game-status">
                        <div class="score">Puntos: <span id="mix-score">0</span></div>
                        <div class="level">Nivel: <span id="mix-level">1</span></div>
                    </div>
                    
                    <div class="mix-display">
                        <div class="color-to-mix" id="color1"></div>
                        <div class="mix-sign">+</div>
                        <div class="color-to-mix" id="color2"></div>
                        <div class="mix-sign">=</div>
                        <div class="mix-result" id="mix-result">?</div>
                    </div>
                    
                    <div class="options-container" id="mix-options">
                        <!-- Las opciones se generarán dinámicamente -->
                    </div>
                    
                    <div class="feedback-message" id="mix-feedback"></div>
                </div>
            </section>

            <!-- Sección de Memorama -->
            <section id="memory-section" class="activity-section">
                <h2>Memorama de Colores</h2>
                <div class="memory-container">
                    <div class="game-status">
                        <div class="score">Intentos: <span id="memory-attempts">0</span></div>
                        <div class="matches">Parejas: <span id="memory-matches">0</span>/6</div>
                    </div>
                    
                    <div class="memory-board" id="memory-board">
                        <!-- Las tarjetas se generarán dinámicamente -->
                    </div>
                    
                    <div class="game-controls">
                        <button id="restart-memory" class="btn">Reiniciar Juego</button>
                    </div>
                </div>
            </section>
        </main>

        <!-- Modal de celebración -->
        <div id="celebration-modal" class="modal">
            <div class="modal-content">
                <h2>¡Muy bien!</h2>
                <p id="celebration-message">Has completado la actividad correctamente.</p>
                <div class="celebration-animation">
                    <img src="../../imagenes/emociones/celebracion.gif" alt="Celebración">
                </div>
                <button id="continue-button" class="btn">Continuar</button>
            </div>
        </div>

        <!-- Modal de instrucciones -->
        <div id="instructions-modal" class="modal">
            <div class="modal-content">
                <h2>¿Cómo jugar?</h2>
                <div id="instructions-content">
                    <!-- El contenido cambiará según la actividad -->
                </div>
                <button id="start-activity-button" class="btn">¡Entendido!</button>
            </div>
        </div>
    </div>

    <!-- Audios para los colores -->
    <audio id="audio-rojo" src="../../audios/colores/Rojo.mp3"></audio>
    <audio id="audio-azul" src="../../audios/colores/Azul.mp3"></audio>
    <audio id="audio-amarillo" src="../../audios/colores/Amarillo.mp3"></audio>
    <audio id="audio-verde" src="../../audios/colores/Verde.mp3"></audio>
    <audio id="audio-naranja" src="../../audios/colores/Naranja.mp3"></audio>
    <audio id="audio-morado" src="../../audios/colores/Morado.mp3"></audio>
    <audio id="audio-rosa" src="../../audios/colores/Rosa.mp3"></audio>
    <audio id="audio-cafe" src="../../audios/colores/Cafe.mp3"></audio>
    <audio id="audio-negro" src="../../audios/colores/Negro.mp3"></audio>
    <audio id="audio-blanco" src="../../audios/colores/Blanco.mp3"></audio>
    <audio id="audio-gris" src="../../audios/colores/Gris.mp3"></audio>
    <audio id="audio-success" src="../../audios/exito.mp3"></audio>
    <audio id="audio-error" src="../../audios/error.mp3"></audio>

    <!-- Scripts -->
    <script src="../../javaScript/componentes/coloresMagicos.js"></script>
</body>
</html>