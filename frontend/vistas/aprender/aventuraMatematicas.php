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
    <title>Aprende los Números Jugando</title>
    <link rel="stylesheet" href="../../css/componentes/numeros.css">
</head>
<body>
    <header>
        <h1>¡Aprende los Números Jugando!</h1>
    </header>

    <main>
        <!-- Sección de presentación de números -->
        <section id="presentacion-numeros">
            <h2>Conoce los Números</h2>
            <div id="numeros-container" class="numeros-grid"></div>
        </section>

        <!-- Sección de ejercicios -->
        <section id="ejercicios">
            <h2>Ejercicios Divertidos</h2>
            
            <!-- Ejercicio 1: Cuenta y Selecciona -->
            <div class="ejercicio-container">
                <h3>Ejercicio 1: Cuenta y Selecciona</h3>
                <p class="instrucciones">Cuenta los objetos y selecciona el número correcto</p>
                <div id="cuenta-selecciona" class="ejercicios-grid">
                    <div class="ejercicio" id="cuenta-selecciona-1"></div>
                    <div class="ejercicio" id="cuenta-selecciona-2"></div>
                    <div class="ejercicio" id="cuenta-selecciona-3"></div>
                    <div class="ejercicio" id="cuenta-selecciona-4"></div>
                    <div class="ejercicio" id="cuenta-selecciona-5"></div>
                </div>
            </div>
            
            <!-- Ejercicio 2: Ordena los Números -->
            <div class="ejercicio-container">
                <h3>Ejercicio 2: Ordena los Números</h3>
                <p class="instrucciones">Arrastra los números para ordenarlos correctamente</p>
                <div id="ordena-numeros" class="ejercicios-grid">
                    <div class="ejercicio" id="ordena-numeros-1"></div>
                    <div class="ejercicio" id="ordena-numeros-2"></div>
                    <div class="ejercicio" id="ordena-numeros-3"></div>
                    <div class="ejercicio" id="ordena-numeros-4"></div>
                </div>
            </div>
            
            <!-- Ejercicio 3: Suma Simple -->
            <div class="ejercicio-container">
                <h3>Ejercicio 3: Suma Simple</h3>
                <p class="instrucciones">Resuelve estas sumas sencillas</p>
                <div id="suma-simple" class="ejercicios-grid">
                    <div class="ejercicio" id="suma-simple-1"></div>
                    <div class="ejercicio" id="suma-simple-2"></div>
                    <div class="ejercicio" id="suma-simple-3"></div>
                </div>
            </div>
            
            <!-- Ejercicio 4: Encuentra el Número Perdido -->
            <div class="ejercicio-container">
                <h3>Ejercicio 4: Encuentra el Número Perdido</h3>
                <p class="instrucciones">¿Qué número falta en la secuencia?</p>
                <div id="numero-perdido" class="ejercicios-grid">
                    <div class="ejercicio" id="numero-perdido-1"></div>
                    <div class="ejercicio" id="numero-perdido-2"></div>
                </div>
            </div>
        </section>
    </main>

    <script src="../../javaScript/componentes/numeros.js"></script>
</body>
</html>