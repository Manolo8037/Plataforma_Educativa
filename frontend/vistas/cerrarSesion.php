<?php
session_start();
$usuario = isset($_SESSION["usuario"]) ? $_SESSION["usuario"] : null;
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cerrar Sesión - Plataforma Educativa</title>
    <link rel="stylesheet" href="../css/panel.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="panel-container" style="max-width: 600px; text-align: center;">
        <header>
            <div class="logo">
                <img src="../imagenes/logo.png" alt="Logo">
                <div>
                    <h1>Plataforma Educativa</h1>
                    <p class="subtitle">Cerrando sesión</p>
                </div>
            </div>
        </header>

        <main style="padding: 40px 20px;">
            <div class="logout-message">
                <i class="fas fa-sign-out-alt" style="font-size: 3rem; color: #FF6B6B; margin-bottom: 20px;"></i>
                <h2>¿Estás seguro que deseas salir?</h2>
                <?php if ($usuario): ?>
                <p>Actualmente has iniciado sesión como <strong><?php echo htmlspecialchars($usuario); ?></strong></p>
                <?php endif; ?>
                
                <div class="logout-buttons" style="margin-top: 30px;">
                    <a href="./panelPrincipal.php" class="btn" style="background-color: #4ECDC4; margin-right: 10px;">
                        <i class="fas fa-arrow-left"></i> Cancelar
                    </a>
                    <a href="../../backend/controladores/procesarLogout.php" class="btn" style="background-color: #FF6B6B;">
                        <i class="fas fa-sign-out-alt"></i> Sí, salir
                    </a>
                </div>
            </div>
        </main>
    </div>
</body>
</html>