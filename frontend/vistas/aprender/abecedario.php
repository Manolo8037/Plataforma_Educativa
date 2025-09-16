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
    <title>Aprende el Abecedario - Juego Educativo</title>
    <link rel="stylesheet" href="../../css/componentes/abecedario.css">
</head>

<body>
    <div class="container">
        <header>
            <h1>Aprende el Abecedario</h1>
            <p class="subtitle">¡Descubre y aprende las letras jugando!</p>
            <div class="header-buttons">
                <a href="../panelPrincipal.php" class="btn btn-back">Regresar</a>
                <a href="" class="btn btn-save">Guardar Progreso</a>
            </div>
        </header>

        <!-- Sección de navegación entre actividades -->
        <nav class="activities-nav">
            <button class="activity-btn active" data-activity="letters">Letras</button>
            <button class="activity-btn" data-activity="syllables">Conoce Sílabas</button>
            <button class="activity-btn" data-activity="build-syllables">Forma con Sílabas</button>
            <button class="activity-btn" data-activity="find">Encuentra</button>
            <button class="activity-btn" data-activity="build">Forma Palabras</button>
            <button class="activity-btn" data-activity="match">Relaciona</button>
        </nav>

        <!-- Contenedor principal de actividades -->
        <main class="activities-container">
            <!-- Sección de Letras -->
            <section id="letters-section" class="activity-section active">
                <h2>El Abecedario</h2>
                <div class="letters-grid" id="letras-container">
                    <!-- Las letras se generarán dinámicamente con JavaScript -->
                </div>
            </section>
            <!-- Sección Conoce las Sílabas -->
            <section id="syllables-section" class="activity-section">
                <h2>Conoce las Sílabas</h2>
                <p class="instruction">Selecciona una consonante para ver y escuchar cómo se une con las vocales.</p>

                <div class="syllable-explorer">
                    <div class="level-selector" id="consonant-level-selector"></div>
                    <div class="consonant-selector" id="consonant-selector">
                    </div>
                    <div class="syllable-display" id="syllable-display">
                        <p>¡Selecciona una letra de la izquierda para empezar!</p>
                    </div>
                </div>
            </section>
            <!-- Sección Forma Palabras con Sílabas -->
            <section id="build-syllables-section" class="activity-section">
                <h2>Forma Palabras con Sílabas</h2>
                <p class="instruction">Observa la imagen y arrastra las sílabas para formar la palabra correcta.</p>
                <div class="exercises-grid" id="build-syllables-grid">
                </div>
            </section>

            <!-- Sección Encuentra la Letra -->
            <section id="find-section" class="activity-section">
                <h2>Encuentra la Letra</h2>
                <p class="instruction">Selecciona la letra correcta para la imagen:</p>
                <div class="exercises-grid">
                    <div class="exercise-container" id="encuentra-letra-1"></div>
                    <div class="exercise-container" id="encuentra-letra-2"></div>
                    <div class="exercise-container" id="encuentra-letra-3"></div>
                    <div class="exercise-container" id="encuentra-letra-4"></div>
                    <div class="exercise-container" id="encuentra-letra-5"></div>
                    <div class="exercise-container" id="encuentra-letra-6"></div>
                    <div class="exercise-container" id="encuentra-letra-7"></div>
                    <div class="exercise-container" id="encuentra-letra-8"></div>
                    <div class="exercise-container" id="encuentra-letra-9"></div>
                    <div class="exercise-container" id="encuentra-letra-10"></div>
                    <div class="exercise-container" id="encuentra-letra-11"></div>
                    <div class="exercise-container" id="encuentra-letra-12"></div>
                </div>
            </section>

            <!-- Sección Forma la Palabra -->
            <section id="build-section" class="activity-section">
                <h2>Forma la Palabra</h2>
                <p class="instruction">Ordena las letras para formar la palabra correcta:</p>
                <div class="exercises-grid">
                    <div class="exercise-container" id="forma-palabra-1"></div>
                    <div class="exercise-container" id="forma-palabra-2"></div>
                    <div class="exercise-container" id="forma-palabra-3"></div>
                    <div class="exercise-container" id="forma-palabra-4"></div>
                    <div class="exercise-container" id="forma-palabra-5"></div>
                    <div class="exercise-container" id="forma-palabra-6"></div>
                    <div class="exercise-container" id="forma-palabra-7"></div>
                    <div class="exercise-container" id="forma-palabra-8"></div>
                    <div class="exercise-container" id="forma-palabra-9"></div>
                    <div class="exercise-container" id="forma-palabra-10"></div>
                    <div class="exercise-container" id="forma-palabra-11"></div>
                    <div class="exercise-container" id="forma-palabra-12"></div>
                </div>
            </section>

            <!-- Sección Une Letra con Imagen -->
            <section id="match-section" class="activity-section">
                <h2>Une la Letra con la Imagen</h2>
                <p class="instruction">Selecciona la letra que corresponde a la imagen:</p>
                <div class="exercises-grid">
                    <div class="exercise-container" id="une-letra-imagen-1"></div>
                    <div class="exercise-container" id="une-letra-imagen-2"></div>
                    <div class="exercise-container" id="une-letra-imagen-3"></div>
                    <div class="exercise-container" id="une-letra-imagen-4"></div>
                    <div class="exercise-container" id="une-letra-imagen-5"></div>
                    <div class="exercise-container" id="une-letra-imagen-6"></div>
                    <div class="exercise-container" id="une-letra-imagen-7"></div>
                    <div class="exercise-container" id="une-letra-imagen-8"></div>
                    <div class="exercise-container" id="une-letra-imagen-9"></div>
                    <div class="exercise-container" id="une-letra-imagen-10"></div>
                    <div class="exercise-container" id="une-letra-imagen-11"></div>
                    <div class="exercise-container" id="une-letra-imagen-12"></div>
                </div>
            </section>
        </main>

        <!-- Modal de celebración -->
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

    <!-- Audios para las letras -->
    <audio id="audio-success" src="/plataformaEducativa/frontend/audios/exito.mp3"></audio>
    <audio id="audio-error" src="/plataformaEducativa/frontend/audios/error.mp3"></audio>

    <!-- Scripts -->
    <script src="../../javaScript/componentes/abecedario.js"></script>
</body>

</html>