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
            <p><a href="./recuperar_contraseña.html">¿Olvidé mi contraseña?</a></p>
        </form>
        <div id="mensaje">
            <?php if (!empty($error)): ?>
                <p class="error"><?php echo htmlspecialchars($error); ?></p>
            <?php endif; ?>
        </div>
    </div>
</body>
</html>

<?php
session_start();

// Variable para almacenar mensajes de error
$error = "";

// Procesar el formulario cuando se envía
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Incluir la conexión a la base de datos
    require_once '../../backend/controladores/db.php';
    
    $nombre = $_POST["txtusuario"];
    $pass = $_POST["txtpassword"];
    
    // Consulta preparada para evitar SQL Injection
    $stmt = $conn->prepare("SELECT id_usuario, nombre, contrasena FROM usuarios WHERE nombre = ?");
    $stmt->bind_param("s", $nombre);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        
        // Verificar la contraseña (ajusta esto según uses contraseñas en texto plano o hasheadas)
        if ($row["contrasena"] === $pass) { // Para texto plano
        // O si usas contraseñas hasheadas:
        // if (password_verify($pass, $row["contraseña"])) {
            // Crear la sesión y redirigir
            $_SESSION["usuario"] = $row["nombre"];
            $_SESSION["id_usuario"] = $row["id_usuario"];
            
            // Redirigir al panel principal
            header("Location: panelPrincipal.php");
            exit();
        } else {
            $error = "Contraseña incorrecta";
        }
    } else {
        $error = "Usuario no encontrado";
    }
    
    $stmt->close();
    $conn->close();
}
?>