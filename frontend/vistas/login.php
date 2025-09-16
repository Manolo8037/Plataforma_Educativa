<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio - Plataforma de Aprendizaje</title>
    <link rel="stylesheet" href="../css/login.css">
</head>

<body>
    <div class="login-container">
        <h2>Inicio de Sesión</h2>
        <form id="login-form" method="post" action="">
            <div class="input-box">
                <input type="text" name="txtusuario" placeholder="Nombre de usuario" required>
            </div>
            <div class="input-box">
                <input type="password" name="txtpassword" placeholder="Contraseña" required>
            </div>
            <button type="submit" class="btn">Iniciar Sesión</button>
            <p><a href="./recuperar_contraseña.php">¿Olvidé mi contraseña?</a></p>
        </form>
        <!-- ======================= LÍNEA AÑADIDA ======================= -->
        <p class="register-link">¿No tienes una cuenta? <a href="registro.php">Regístrate aquí</a></p>
        <!-- ============================================================= -->

        <div id="mensaje">
            <?php if (!empty($error)): ?>
                <p class="error"><?php echo htmlspecialchars($error); ?></p>
            <?php endif; ?>
            <?php if (!empty($exito)): ?>
                <p class="exito"><?php echo htmlspecialchars($exito); ?></p>
            <?php endif; ?>
        </div>
    </div>
</body>

</html>

<?php
session_start();

// Variable para almacenar mensajes de error
$error = "";

// --- NUEVO: Mostrar mensaje de éxito desde el registro ---
$exito = "";
if (isset($_SESSION['mensaje_exito'])) {
    $exito = $_SESSION['mensaje_exito'];
    unset($_SESSION['mensaje_exito']); // Limpiar el mensaje para que no aparezca de nuevo
}

// Procesar el formulario cuando se envía
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Incluir la conexión a la base de datos
    require_once '../../backend/controladores/db.php';

    $nombre = $_POST["txtusuario"];
    $pass = $_POST["txtpassword"];

    // Consulta preparada para evitar SQL Injection
    $stmt = $conn->prepare("SELECT id_usuario, nombre, contrasena, rol FROM usuarios WHERE nombre = ?");
    $stmt->bind_param("s", $nombre);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();

        // --- MODIFICADO: Verificar contraseña con password_verify ---
        if (password_verify($pass, $row["contrasena"])) {
            // Crear la sesión y redirigir
            $_SESSION["usuario"] = $row["nombre"];
            $_SESSION["id_usuario"] = $row["id_usuario"];
            $_SESSION["rol"] = $row["rol"];

            if ($row["rol"] === 'docente') {
                header("Location: panelDocente.php");
            } else {
                // Redirigir al panel principal
                header("Location: panelPrincipal.php");
            }
            exit();
        } else {
            $error = "Usuario o contraseña incorrectos";
        }
    } else {
        $error = "Usuario o contraseña incorrectos";
    }

    $stmt->close();
    $conn->close();
}
?>