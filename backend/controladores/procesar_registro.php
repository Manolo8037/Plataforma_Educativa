<?php
session_start();
require_once 'db.php'; // Asegúrate que la ruta a tu conexión sea correcta

// Variable para mensajes
$mensaje = "";
$error = false;

// Verificar que la solicitud sea por POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 1. Recoger y sanear los datos del formulario
    $nombre_alumno = trim($_POST['nombre_alumno']);
    $nombre_usuario = trim($_POST['nombre_usuario']);
    $password = $_POST['password'];
    $confirmar_password = $_POST['confirmar_password'];
    $grado = $_POST['grado'];
    $grupo = trim($_POST['grupo']);
    $correo_tutor = trim($_POST['correo_tutor']);
    $nombre_primaria = trim($_POST['nombre_primaria']);
    $clave_escuela = trim($_POST['clave_escuela']);

    // 2. Validaciones
    if (empty($nombre_alumno) || empty($nombre_usuario) || empty($password) || empty($grado) || empty($grupo) || empty($correo_tutor) || empty($nombre_primaria) || empty($clave_escuela)) {
        $mensaje = "Por favor, completa todos los campos.";
        $error = true;
    } elseif ($password !== $confirmar_password) {
        $mensaje = "Las contraseñas no coinciden.";
        $error = true;
    } elseif (strlen($password) < 6) {
        $mensaje = "La contraseña debe tener al menos 6 caracteres.";
        $error = true;
    } elseif (!filter_var($correo_tutor, FILTER_VALIDATE_EMAIL)) {
        $mensaje = "El correo electrónico del tutor no es válido.";
        $error = true;
    }

    // 3. Si no hay errores, proceder a verificar si el usuario ya existe
    if (!$error) {
        // Consulta para verificar si el nombre de usuario ya está en uso
        $stmt = $conn->prepare("SELECT id_usuario FROM usuarios WHERE nombre = ?");
        $stmt->bind_param("s", $nombre_usuario);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $mensaje = "El nombre de usuario ya está en uso. Por favor, elige otro.";
            $error = true;
        }
        $stmt->close();
    }
    
    // 4. Si todo está bien, insertar el nuevo usuario en la base de datos
    if (!$error) {
        // ¡IMPORTANTE! Hashear la contraseña para guardarla de forma segura
        $password_hashed = password_hash($password, PASSWORD_DEFAULT);

        // Preparar la consulta de inserción
        $stmt = $conn->prepare("INSERT INTO usuarios (nombre_completo, nombre, contrasena, grado, grupo, correo_tutor, nombre_primaria, clave_escuela) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssissss", $nombre_alumno, $nombre_usuario, $password_hashed, $grado, $grupo, $correo_tutor, $nombre_primaria, $clave_escuela);
        
        if ($stmt->execute()) {
            // Si el registro es exitoso, redirigir al login con un mensaje de éxito
            $_SESSION['mensaje_exito'] = "¡Registro exitoso! Ahora puedes iniciar sesión.";
            header("Location: ../../frontend/vistas/login.php");
            exit();
        } else {
            $mensaje = "Error al registrar el usuario. Por favor, intenta de nuevo.";
            $error = true;
        }
        $stmt->close();
    }

    // Si hubo algún error, guardar el mensaje en sesión y redirigir de vuelta al registro
    if ($error) {
        $_SESSION['mensaje_error'] = $mensaje;
        header("Location: ../../frontend/vistas/registro.php");
        exit();
    }
    
    $conn->close();
} else {
    // Si alguien intenta acceder al archivo directamente, lo redirigimos
    header("Location: ../../frontend/vistas/registro.php");
    exit();
}
?>