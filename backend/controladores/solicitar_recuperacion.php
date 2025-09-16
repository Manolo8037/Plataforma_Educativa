<?php
session_start();
require_once 'db.php';

// --- ATENCIÓN: Para enviar correos reales, necesitarás una librería como PHPMailer ---
// --- Por ahora, simularemos el envío y mostraremos la contraseña temporal en pantalla ---

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = $_POST['correo'];

    // 1. Verificar si el correo existe en la tabla de usuarios
    $stmt = $conn->prepare("SELECT id_usuario FROM usuarios WHERE correo_tutor = ?");
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        $_SESSION['mensaje_error'] = "No se encontró ninguna cuenta con ese correo electrónico.";
        header("Location: ../../frontend/vistas/recuperar_contraseña.php");
        exit();
    }
    $stmt->close();

    // 2. Generar una nueva contraseña temporal segura y fácil de leer
    $nueva_contrasena_temporal = "plataforma" . rand(100, 999);
    
    // 3. Encriptar (hashear) la nueva contraseña para guardarla en la BD
    $password_hashed = password_hash($nueva_contrasena_temporal, PASSWORD_DEFAULT);

    // 4. Actualizar la contraseña del usuario en la base de datos
    $stmt = $conn->prepare("UPDATE usuarios SET contrasena = ? WHERE correo_tutor = ?");
    $stmt->bind_param("ss", $password_hashed, $correo);
    $stmt->execute();
    $stmt->close();

    // --- SIMULACIÓN DE ENVÍO DE CORREO ---
    // En un proyecto real, aquí iría el código para enviar el correo con la contraseña temporal.
    // Como no podemos enviar correos, la mostraremos en pantalla para que puedas probar.
    
    // Guardamos un mensaje de éxito en la sesión y redirigimos a la página de login
    $mensaje_exito = "Se ha generado una nueva contraseña temporal: <strong>" . htmlspecialchars($nueva_contrasena_temporal) . "</strong><br><br>En un sistema real, esto se enviaría a tu correo. Por favor, úsala para iniciar sesión y cámbiala lo antes posible.";
    
    $_SESSION['mensaje_exito_recuperacion'] = $mensaje_exito;
    header("Location: ../../frontend/vistas/login.php");
    exit();
    
    $conn->close();
}
