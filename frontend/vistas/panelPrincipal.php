<?php
session_start();
if (!isset($_SESSION["usuario"])) {
    header("Location: login.php");
    exit();
}
$nombreUsuario = $_SESSION["usuario"];
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel Principal - Plataforma Educativa</title>
    <link rel="stylesheet" href="../css/panel.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="panel-container">
        <header>
            <div class="logo">
                <img src="../imagenes/logo.png" alt="Logo">
                <div>
                    <h1>Plataforma Educativa</h1>
                    <p class="subtitle">Aprendiendo jugando</p>
                </div>
            </div>
            <div class="user-info">
                <div class="user-welcome">
                    <span>Bienvenido, <?php echo htmlspecialchars($nombreUsuario); ?></span>
                    <div class="user-points">
                        <img src="../imagenes/star-icon.jpeg" alt="Puntos">
                        <span>150 puntos</span>
                    </div>
                </div>
                <a href="./cerrarSesion.php" class="btn btn-logout">
                    <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
                </a>
            </div>
        </header>

        <main>
            <!-- Sección de categorías -->
            <nav class="categories-nav">
                <button class="category-btn active" data-category="all">
                    <i class="fas fa-th-large"></i>
                    <span>Todas</span>
                </button>
                <button class="category-btn" data-category="learn">
                    <i class="fas fa-book-open"></i>
                    <span>Aprender</span>
                </button>
                <button class="category-btn" data-category="play">
                    <i class="fas fa-gamepad"></i>
                    <span>Jugar</span>
                </button>
                <button class="category-btn" data-category="music">
                    <i class="fas fa-music"></i>
                    <span>Música</span>
                </button>
                <button class="category-btn" data-category="think">
                    <i class="fas fa-brain"></i>
                    <span>Pensar</span>
                </button>
            </nav>

            <!-- Sección de actividades -->
            <section class="activities-section">
                <h2><i class="fas fa-star"></i> Actividades Recomendadas</h2>
                <div class="activities-grid" id="activities-container">
                    <!-- Las actividades se cargarán dinámicamente con JavaScript -->
                </div>
            </section>
        </main>

        <!-- Modal de bienvenida -->
        <div id="welcome-modal" class="modal">
            <div class="modal-content">
                <h2>¡Bienvenido de vuelta!</h2>
                <p>Hoy tenemos nuevas actividades para ti.</p>
                <div class="modal-buttons">
                    <button id="close-welcome" class="btn">Comenzar</button>
                </div>
            </div>
        </div>
    </div>

    <script src="../javaScript/componentes/actividades.js"></script>
</body>
</html>