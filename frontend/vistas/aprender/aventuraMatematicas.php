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
    <title>Aprendiendo Números - Juego Educativo</title>
    <link rel="stylesheet" href="../../css/componentes/numeros.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Aprendiendo Números</h1>
            <p class="subtitle">¡Descubre y aprende sobre los números jugando!</p>
            <a href="../panelPrincipal.php" class="back-btn">← Regresar</a>
        </header>

        <!-- Sección de navegación entre actividades -->
        <nav class="activities-nav">
            <button class="activity-btn active" data-activity="learn">Conocer</button>
            <button class="activity-btn" data-activity="count">Contar</button>
            <button class="activity-btn" data-activity="order">Ordenar</button>
            <button class="activity-btn" data-activity="add">Sumar</button>
        </nav>

        <!-- Contenedor principal de actividades -->
        <main class="activities-container">
            <!-- Sección de Aprendizaje -->
            <section id="learn-section" class="activity-section active">
                <h2>Conoce los Números</h2>
                <div class="numbers-grid" id="numeros-container">
                    <!-- Los números se generarán dinámicamente con JavaScript -->
                </div>
            </section>

            <!-- Sección de Contar -->
            <section id="count-section" class="activity-section">
                <h2>Cuenta y Selecciona</h2>
                <div class="counting-game">
                    <div class="game-status">
                        <div class="score">Puntos: <span id="counting-score">0</span></div>
                    </div>
                    <div id="cuenta-selecciona" class="ejercicios-grid">
                        <div class="ejercicio" id="cuenta-selecciona-1"></div>
                        <div class="ejercicio" id="cuenta-selecciona-2"></div>
                        <div class="ejercicio" id="cuenta-selecciona-3"></div>
                        <div class="ejercicio" id="cuenta-selecciona-4"></div>
                        <div class="ejercicio" id="cuenta-selecciona-5"></div>
                    </div>
                </div>
            </section>

            <!-- Sección de Ordenar -->
            <section id="order-section" class="activity-section">
                <h2>Ordena los Números</h2>
                <div class="ordering-game">
                    <div class="game-status">
                        <div class="score">Puntos: <span id="ordering-score">0</span></div>
                    </div>
                    <div id="ordena-numeros" class="ejercicios-grid">
                        <div class="ejercicio" id="ordena-numeros-1"></div>
                        <div class="ejercicio" id="ordena-numeros-2"></div>
                        <div class="ejercicio" id="ordena-numeros-3"></div>
                        <div class="ejercicio" id="ordena-numeros-4"></div>
                    </div>
                </div>
            </section>

            <!-- Sección de Sumar -->
            <section id="add-section" class="activity-section">
                <h2>Sumas Básicas</h2>
                <div class="addition-game">
                    <div class="game-status">
                        <div class="score">Puntos: <span id="addition-score">0</span></div>
                    </div>
                    <div id="suma-simple" class="ejercicios-grid">
                        <div class="ejercicio" id="suma-simple-1"></div>
                        <div class="ejercicio" id="suma-simple-2"></div>
                        <div class="ejercicio" id="suma-simple-3"></div>
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

    <!-- Audios para los números -->
    <audio id="audio-exito" src="../../audios/exito.mp3"></audio>
    <audio id="audio-error" src="../../audios/error.mp3"></audio>

    <!-- Scripts -->
    <script src="../../javaScript/componentes/numeros.js"></script>
</body>
</html>