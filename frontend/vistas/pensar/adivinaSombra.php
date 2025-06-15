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
    <title>Adivina la Sombra - Juego de Memoria y Atención</title>
    <link rel="stylesheet" href="../../css/componentes/adivinaLaSombra.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Adivina la Sombra</h1>
            <p class="subtitle">¡Encuentra la sombra correcta para cada objeto!</p>
            <div class="header-buttons">
                <a href="../panelPrincipal.php" class="btn btn-back">Regresar</a>
                <a href="#" class="btn btn-save">Guardar Progreso</a>
            </div>
        </header>

        <main class="activities-container">
            <section id="shadow-game-section" class="activity-section active">
                <p class="instruction">Observa la imagen de color y haz clic en su sombra correspondiente.</p>
                <div class="exercises-grid" id="shadow-exercises-grid">
                    </div>
            </section>
        </main>

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

        <div id="instructions-modal" class="modal">
            <div class="modal-content">
                <h2>¿Cómo jugar?</h2>
                <div id="instructions-content">
                    </div>
                <button id="start-activity-button" class="btn">¡Entendido!</button>
            </div>
        </div>
    </div>

    <audio id="audio-success" src="/plataformaEducativa/frontend/audios/exito.mp3"></audio>
    <audio id="audio-error" src="/plataformaEducativa/frontend/audios/error.mp3"></audio>

    <script src="../../javaScript/componentes/adivinaLaSombra.js"></script>
</body>
</html>