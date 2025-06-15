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
    <title>Recuperar Contraseña</title>
    <link rel="stylesheet" href="../css/login.css">
</head>

<body>
    <div class="login-container">
        <h2>Recuperar Contraseña</h2>
        <form id="forgot-password-form">
            <div class="input-box">
                <input type="email" id="Correo" placeholder="Correo electrónico" required>
            </div>
            <button type="submit" class="btn">Enviar enlace de recuperación</button>
            <p><a href="login.html">Volver al inicio de Sesión</a></p>
        </form>
    </div>

    <script>
        document.getElementById('forgot-password-form').addEventListener('submit', async function (event) {
            event.preventDefault();

            const Correo = document.getElementById('Correo').value; 
            try {
                const response = await fetch('http://localhost:3000/api/forgot-password', { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ Correo }) 
                });

                const data = await response.json();

                if (data.status === 'success') {
                    alert('Correo de recuperación enviado. Por favor, revisa tu bandeja de entrada.');
                } else {
                    alert('Error: ' + data.message);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al conectar con el servidor');
            }
        });
    </script>
</body>

</html>