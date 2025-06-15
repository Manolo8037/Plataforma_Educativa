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
    <title>Aprendiendo Emociones - Juego Educativo</title>
    <link rel="stylesheet" href="../../css/componentes/memorizandoEmociones.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Aprendiendo Emociones</h1>
            <p class="subtitle">¡Descubre y aprende sobre las emociones jugando!</p>
        </header>

        <!-- Sección de navegación entre actividades -->
        <nav class="activities-nav">
            <button class="activity-btn active" data-activity="learn">Aprender</button>
            <button class="activity-btn" data-activity="identify">Identificar</button>
            <button class="activity-btn" data-activity="memorama">Memorama</button>
        </nav>

        <!-- Contenedor principal de actividades -->
        <main class="activities-container">
            <!-- Sección de Aprendizaje -->
            <section id="learn-section" class="activity-section active">
                <h2>Conoce las Emociones</h2>
                <div class="emotions-carousel">
                    <div class="carousel-container">
                        <div class="emotion-card">
                            <div class="emotion-image">
                                <img src="../../imagenes/emociones/alegria.jpg" alt="Alegría">
                            </div>
                            <div class="emotion-info">
                                <h3>Alegría</h3>
                                <p>La alegría es cuando nos sentimos felices y contentos. Sonreímos y nos sentimos bien.</p>
                                <button class="sound-btn" data-sound="alegria">Escuchar</button>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-controls">
                        <button id="prev-emotion" class="carousel-btn">←</button>
                        <div class="emotion-dots">
                            <span class="dot active" data-index="0"></span>
                            <span class="dot" data-index="1"></span>
                            <span class="dot" data-index="2"></span>
                            <span class="dot" data-index="3"></span>
                            <span class="dot" data-index="4"></span>
                            <span class="dot" data-index="5"></span>
                        </div>
                        <button id="next-emotion" class="carousel-btn">→</button>
                    </div>
                </div>
            </section>

            <!-- Sección de Identificación -->
            <section id="identify-section" class="activity-section">
                <h2>¿Qué emoción es?</h2>
                <div class="identify-game">
                    <div class="game-status">
                        <div class="score">Puntos: <span id="identify-score">0</span></div>
                        <div class="level">Nivel: <span id="identify-level">1</span></div>
                    </div>
                    
                    <div class="emotion-display">
                        <img id="emotion-to-identify" src="../../imagenes/emociones/alegria.jpg" alt="Emoción para identificar">
                    </div>
                    
                    <div class="options-container">
                        <button class="emotion-option" data-emotion="alegria">Alegría</button>
                        <button class="emotion-option" data-emotion="tristeza">Tristeza</button>
                        <button class="emotion-option" data-emotion="enojo">Enojo</button>
                        <button class="emotion-option" data-emotion="miedo">Miedo</button>
                    </div>
                    
                    <div class="feedback-message" id="identify-feedback"></div>
                </div>
            </section>

            <!-- Sección de Memorama -->
            <section id="memorama-section" class="activity-section">
                <h2>Memorama de Emociones</h2>
                <div class="memorama-container">
                    <div class="game-status">
                        <div class="score">Intentos: <span id="memorama-attempts">0</span></div>
                        <div class="matches">Parejas: <span id="memorama-matches">0</span>/6</div>
                    </div>
                    
                    <div class="memorama-board">
                        <!-- Las tarjetas se generarán dinámicamente con JavaScript -->
                    </div>
                    
                    <div class="game-controls">
                        <button id="restart-memorama" class="btn">Reiniciar Juego</button>
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

    <!-- Audios para las emociones -->
    <audio id="audio-alegria" src="/plataformaEducativa/frontend/assets/audio/alegria.mp3"></audio>
    <audio id="audio-tristeza" src="/plataformaEducativa/frontend/assets/audio/tristeza.mp3"></audio>
    <audio id="audio-enojo" src="/plataformaEducativa/frontend/assets/audio/enojo.mp3"></audio>
    <audio id="audio-miedo" src="/plataformaEducativa/frontend/assets/audio/miedo.mp3"></audio>
    <audio id="audio-sorpresa" src="/plataformaEducativa/frontend/assets/audio/sorpresa.mp3"></audio>
    <audio id="audio-asco" src="/plataformaEducativa/frontend/assets/audio/asco.mp3"></audio>
    <audio id="audio-success" src="/plataformaEducativa/frontend/audios/exito.mp3"></audio>
    <audio id="audio-error" src="/plataformaEducativa/frontend/audios/error.mp3"></audio>

    <!-- Scripts -->
    <script src="../../javaScript/componentes/memorizandoEmociones.js"></script>
</body>
</html>