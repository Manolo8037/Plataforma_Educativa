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
    <title>Juego de Rompecabezas - Plataforma Educativa</title>
    <link rel="stylesheet" href="../../css/componentes/rompecabezas.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Arma el Rompecabezas</h1>
            <p class="subtitle">¡Arrastra y suelta las piezas para completar la imagen!</p>
            <div class="header-buttons">
                <a href="../panelPrincipal.php" class="btn btn-back">Regresar</a>
                <a href="#" class="btn btn-save">Guardar Progreso</a>
            </div>
        </header>

        <main class="activities-container">
            <section id="puzzle-game-section" class="activity-section active">
                <p class="instruction">Haz clic en "Iniciar Rompecabezas" para comenzar.</p>
                
                <div class="puzzle-controls">
                    <button id="start-puzzle-btn" class="btn btn-verify">Iniciar Rompecabezas</button>
                    <button id="reset-puzzle-btn" class="btn btn-back" style="display:none;">Reiniciar</button>
                    <button id="show-image-btn" class="btn btn-save" style="display:none;">Ver Imagen</button>
                </div>

                <div class="puzzle-area">
                    <div id="puzzle-board">
                        </div>
                    <div id="puzzle-pieces-container">
                        </div>
                </div>

                <div id="original-image-preview" class="original-image-modal">
                    <div class="modal-content">
                        <h2>Imagen Original</h2>
                        <img id="preview-img" src="" alt="Imagen Completa">
                        <button class="btn" id="close-preview-btn">Cerrar</button>
                    </div>
                </div>
            </section>
        </main>

        <div id="celebration-modal" class="modal">
            <div class="modal-content">
                <h2>¡Felicidades!</h2>
                <p id="celebration-message">¡Has completado el rompecabezas!</p>
                <div class="celebration-animation">
                    <img src="../../imagenes/abecedario/celebracion.gif" alt="Celebración">
                </div>
                <button id="continue-button" class="btn">Siguiente Rompecabezas</button>
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

    <script src="../../javaScript/componentes/rompecabezas.js"></script>
</body>
</html>