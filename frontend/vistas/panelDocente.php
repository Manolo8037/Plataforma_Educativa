<?php
session_start();

// Paso 1: Seguridad. Si el usuario no ha iniciado sesión o no es un docente,
// lo redirigimos a la página de inicio de sesión.
if (!isset($_SESSION["usuario"]) || $_SESSION["rol"] !== 'docente') {
    header("Location: login.php");
    exit();
}

// Incluir la conexión a la base de datos
require_once '../../backend/controladores/db.php';

// Paso 2: Obtener la lista de todos los alumnos.
// Nota: En una versión futura, aquí filtraríamos solo los alumnos de este docente.
$alumnos = [];
$sql = "SELECT id_usuario, nombre_completo, grado, grupo FROM usuarios WHERE rol = 'alumno'";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Por cada alumno, verificamos si tiene progreso registrado
        $stmt_progreso = $conn->prepare("SELECT COUNT(*) as total FROM progreso_estudiante WHERE id_usuario = ?");
        $stmt_progreso->bind_param("i", $row['id_usuario']);
        $stmt_progreso->execute();
        $res_progreso = $stmt_progreso->get_result();
        $progreso = $res_progreso->fetch_assoc();
        
        // Añadimos un campo 'activo' para el indicador verde/gris
        $row['activo'] = ($progreso['total'] > 0);
        
        $alumnos[] = $row;
        $stmt_progreso->close();
    }
}
$conn->close();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Docente</title>
    <link rel="stylesheet" href="../css/panelDocente.css">
</head>
<body>
    <div class="dashboard-container">
        <header class="dashboard-header">
            <h1>Panel de Docente</h1>
            <div class="teacher-info">
                <span>Bienvenido/a, <?php echo htmlspecialchars($_SESSION["usuario"]); ?></span>
                <a href="cerrarSesionDocente.php" class="btn-logout">Cerrar Sesión</a>
            </div>
        </header>

        <main class="dashboard-content">
            <section class="student-list-section">
                <h2>Mis Alumnos</h2>
                <p>Aquí puedes ver el estado de actividad de tus alumnos. Haz clic en un alumno para ver su progreso detallado (próximamente).</p>
                
                <div class="student-list">
                    <?php if (empty($alumnos)): ?>
                        <p class="no-students">Aún no hay alumnos registrados en la plataforma.</p>
                    <?php else: ?>
                        <table>
                            <thead>
                                <tr>
                                    <th>Estado</th>
                                    <th>Nombre del Alumno</th>
                                    <th>Grado y Grupo</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($alumnos as $alumno): ?>
                                    <tr>
                                        <td>
                                            <!-- Indicador de estado verde o gris -->
                                            <span class="status-dot <?php echo $alumno['activo'] ? 'active' : 'inactive'; ?>"></span>
                                        </td>
                                        <td><?php echo htmlspecialchars($alumno['nombre_completo']); ?></td>
                                        <td><?php echo htmlspecialchars($alumno['grado']) . 'º ' . htmlspecialchars($alumno['grupo']); ?></td>
                                        <td>
                                            <a href="#" class="btn-details">Ver Progreso</a>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    <?php endif; ?>
                </div>
            </section>
        </main>
    </div>
</body>
</html>
