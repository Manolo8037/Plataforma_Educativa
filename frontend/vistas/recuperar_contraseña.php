<?php session_start(); ?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperar Contraseña</title>
    <link rel="stylesheet" href="../css/login.css"> <!-- Reutilizamos los estilos del login -->
</head>
<body>
    <div class="login-container">
        <h2>Recuperar Contraseña</h2>
        <p>Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.</p>

        <form method="post" action="../../backend/controladores/solicitar_recuperacion.php">
            <div class="input-box">
                <input type="email" name="correo" placeholder="Tu correo electrónico" required>
            </div>
            <button type="submit" class="btn">Enviar Enlace</button>
        </form>

        <div id="mensaje">
            <?php if (isset($_SESSION['mensaje_error'])): ?>
                <p class="error"><?php echo $_SESSION['mensaje_error']; unset($_SESSION['mensaje_error']); ?></p>
            <?php endif; ?>
            <?php if (isset($_SESSION['mensaje_exito'])): ?>
                <p class="exito"><?php echo $_SESSION['mensaje_exito']; unset($_SESSION['mensaje_exito']); ?></p>
            <?php endif; ?>
        </div>

        <p class="register-link"><a href="login.php">Volver a Inicio de Sesión</a></p>
    </div>
</body>
</html>