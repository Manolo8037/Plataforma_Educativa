<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro de Alumno - Plataforma Educativa</title>
    <link rel="stylesheet" href="../css/registro.css"> <!-- Usaremos un nuevo CSS -->
</head>
<body>
    <div class="register-container">
        <h2>¡Crea tu Cuenta!</h2>
        <p>Pide ayuda a tu papá o mamá para llenar tus datos.</p>
        
        <!-- El formulario enviará los datos a tu nuevo archivo de backend -->
        <form id="register-form" method="post" action="../../backend/controladores/procesar_registro.php">
            
            <div class="input-group">
                <input type="text" name="nombre_alumno" placeholder="Tu nombre completo" required>
                <input type="text" name="nombre_usuario" placeholder="Crea un nombre de usuario" required>
            </div>

            <div class="input-group">
                <input type="password" name="password" placeholder="Crea una contraseña" required>
                <input type="password" name="confirmar_password" placeholder="Repite la contraseña" required>
            </div>

            <div class="input-group">
                <select name="grado" required>
                    <option value="" disabled selected>Grado</option>
                    <option value="1">1º</option>
                    <option value="2">2º</option>
                    <option value="3">3º</option>
                    <option value="4">4º</option>
                    <option value="5">5º</option>
                    <option value="6">6º</option>
                </select>
                <input type="text" name="grupo" placeholder="Grupo (ej. A, B, C)" required>
            </div>
            
            <input type="email" name="correo_tutor" placeholder="Correo electrónico de tu papá o mamá" required>
            <input type="text" name="nombre_primaria" placeholder="Nombre de tu escuela primaria" required>
            <input type="text" name="clave_escuela" placeholder="Clave de tu escuela (CCT)" required>
            
            <button type="submit" class="btn">¡Registrarme!</button>
            
            <p class="login-link">¿Ya tienes una cuenta? <a href="login.php">Inicia Sesión aquí</a></p>
        </form>
    </div>
</body>
</html>
