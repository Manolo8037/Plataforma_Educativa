<?php
session_start();
if (!isset($_SESSION["usuario"])) {
    header("Location: login.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Memoria Musical - Juego Educativo</title>
    <link rel="stylesheet" href="../../css/componentes/memoriaMusical.css">
</head>

<body>
    <div class="container">
        <header>
            <h1>Memoria Musical</h1>
            <p class="subtitle">¡Descubre y aprende sonidos de instrumentos y objetos cotidianos!</p>
            <div class="header-buttons">
                <a href="../panelPrincipal.php" class="btn btn-back">Regresar</a>
                <a href="" class="btn btn-save">Guardar Progreso</a>
            </div>
        </header>

        <!-- Navegación entre actividades -->
        <nav class="activities-nav">
            <button class="activity-btn active" data-activity="learn">Aprender</button>
            <button class="activity-btn" data-activity="identify">Identificar</button>
            <button class="activity-btn" data-activity="sequence">Ordenar</button>
            <button class="activity-btn" data-activity="memory">Memorama</button>
        </nav>

        <!-- Contenedor de actividades -->
        <main class="activities-container">
            <!-- Sección de Aprendizaje -->
            <section id="learn-section" class="activity-section active">
                <h2>Conoce los Sonidos</h2>
                <div class="sounds-grid" id="sounds-container">
                    <!-- Los sonidos se generarán con JavaScript -->
                </div>
            </section>

            <!-- Sección de Identificación -->
            <section id="identify-section" class="activity-section">
                <h2>¿Qué sonido es?</h2>
                <div class="identify-game">
                    <div class="game-status">
                        <div class="score">Puntos: <span id="identify-score">0</span></div>
                        <div class="level">Nivel: <span id="identify-level">1</span></div>
                    </div>

                    <button id="play-sound-btn" class="btn">🔊 Reproducir Sonido</button>

                    <div class="options-container" id="identify-options">
                        <!-- Opciones generadas dinámicamente -->
                    </div>

                    <div class="feedback-message" id="identify-feedback"></div>
                </div>
            </section>

            <!-- Nueva Sección: Ordenar Sonidos -->
            <section id="sequence-section" class="activity-section">
                <h2>Ordena la Secuencia</h2>
                <div class="sequence-game">
                    <div class="game-status">
                        <div class="score">Puntos: <span id="sequence-score">0</span></div>
                        <div class="level">Nivel: <span id="sequence-level">1</span></div>
                    </div>

                    <div class="sequence-instructions">
                        <p>Escucha la secuencia y arrastra los sonidos al orden correcto</p>
                        <button id="play-sequence-btn" class="btn">▶ Reproducir Secuencia</button>
                    </div>

                    <div class="sequence-container" id="sequence-container">
                        <!-- Área para la secuencia correcta (oculta al jugador) -->
                        <div class="correct-sequence" id="correct-sequence"></div>

                        <!-- Área donde el jugador ordenará los sonidos -->
                        <div class="player-sequence" id="player-sequence"></div>
                    </div>

                    <button id="check-sequence-btn" class="btn">Verificar</button>
                    <div class="feedback-message" id="sequence-feedback"></div>
                </div>
            </section>

            <!-- Sección de Memorama -->
            <section id="memory-section" class="activity-section">
                <h2>Memorama de Sonidos</h2>
                <div class="memory-container">
                    <div class="game-status">
                        <div class="score">Intentos: <span id="memory-attempts">0</span></div>
                        <div class="matches">Parejas: <span id="memory-matches">0</span>/6</div>
                    </div>

                    <div class="memory-board" id="memory-board">
                        <!-- Tarjetas generadas dinámicamente -->
                    </div>

                    <div class="game-controls">
                        <button id="restart-memory" class="btn">Reiniciar Juego</button>
                    </div>
                </div>
            </section>
        </main>

        <!-- Modales de celebracion -->
        <div id="celebration-modal" class="modal">
            <div class="modal-content">
                <h2>¡Muy bien!</h2>
                <p id="celebration-message">Has completado la actividad correctamente.</p>
                <div class="celebration-animation">
                    <img src="../../imagenes/abecedario/celebracion.gif" alt="Celebración">
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

    <!-- Audios (agregar nuevos si es necesario) -->
    <audio id="audio-success" src="/plataformaEducativa/frontend/audios/exito.mp3"></audio>
    <audio id="audio-error" src="/plataformaEducativa/frontend/audios/error.mp3"></audio>
    <!--javaScript-->
    <script src="../../javaScript/componentes/memoriaMusical.js"></script>
</body>

</html>