<?php
// Iniciar buffer de salida
ob_start();

// Configurar sesión segura
session_start([
    'cookie_lifetime' => 0,
    'cookie_secure' => true,
    'cookie_httponly' => true,
    'use_strict_mode' => true
]);

// Verificar si hay sesión activa
if (isset($_SESSION["usuario"])) {
    // Registrar cierre de sesión
    error_log("[" . date('Y-m-d H:i:s') . "] Cierre de sesión - Usuario: " . $_SESSION["usuario"]);
    
    // Limpiar datos sensibles
    unset($_SESSION["usuario"]);
    unset($_SESSION["token_csrf"]);
}

// Destruir completamente la sesión
$_SESSION = [];
session_unset();
session_destroy();

// Eliminar cookie de sesión
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(
        session_name(),
        '',
        time() - 42000,
        $params["path"],
        $params["domain"],
        $params["secure"],
        $params["httponly"]
    );
}

// Limpiar buffer y redirigir
ob_end_clean();

// Redirección absoluta con protocolo
$redirectUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . 
               "://" . $_SERVER['HTTP_HOST'] . 
               "/plataformaEducativa/frontend/vistas/login.php?logout=success";

header("Location: " . $redirectUrl);
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Pragma: no-cache");
exit();
?>