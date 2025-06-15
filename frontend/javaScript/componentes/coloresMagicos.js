// Datos de los colores (tomados de tu código)
const colores = [
    { nombre: "Rojo", hex: "#FF0000", rgb: "rgb(255, 0, 0)", ejemplo: "🍎 Manzana" },
    { nombre: "Azul", hex: "#0000FF", rgb: "rgb(0, 0, 255)", ejemplo: "🌊 Mar" },
    { nombre: "Amarillo", hex: "#FFFF00", rgb: "rgb(255, 255, 0)", ejemplo: "🍌 Platano" },
    { nombre: "Verde", hex: "#00FF00", rgb: "rgb(0, 255, 0)", ejemplo: "🥬 Lechuga" },
    { nombre: "Naranja", hex: "#FFA500", rgb: "rgb(255, 165, 0)", ejemplo: "🍊 Naranja" },
    { nombre: "Morado", hex: "#800080", rgb: "rgb(128, 0, 128)", ejemplo: "🍇 Uvas" },
    { nombre: "Rosa", hex: "#FFC0CB", rgb: "rgb(255, 192, 203)", ejemplo: "🌸 Flor" },
    { nombre: "Cafe", hex: "#A52A2A", rgb: "rgb(165, 42, 42)", ejemplo: "🍫 Chocolate" },
    { nombre: "Negro", hex: "#000000", rgb: "rgb(0, 0, 0)", ejemplo: "⚫ Círculo" },
    { nombre: "Blanco", hex: "#FFFFFF", rgb: "rgb(255, 255, 255)", ejemplo: "☁️ Nube" },
    { nombre: "Gris", hex: "#808080", rgb: "rgb(128, 128, 128)", ejemplo: "🐘 Elefante" }
];

// Variables globales
let nivelIdentificacion = 1;
let puntuacionIdentificacion = 0;
let nivelMezcla = 1;
let puntuacionMezcla = 0;
let intentosMemoria = 0;
let parejasEncontradas = 0;
let cartasVolteadas = [];
let tableroMemoria = [];
let puedeVoltear = true;

// Elementos del DOM
const elementos = {
    // Navegación
    botonesActividad: document.querySelectorAll('.activity-btn'),
    secciones: document.querySelectorAll('.activity-section'),
    
    // Sección Aprender
    coloresContainer: document.getElementById('colores-container'),
    
    // Juego de identificación
    objetoIdentificar: document.getElementById('object-to-identify'),
    opcionesIdentificacion: document.getElementById('identify-options'),
    puntuacionIdentificacion: document.getElementById('identify-score'),
    nivelIdentificacion: document.getElementById('identify-level'),
    retroalimentacionIdentificacion: document.getElementById('identify-feedback'),
    
    // Juego de mezcla
    color1Mezcla: document.getElementById('color1'),
    color2Mezcla: document.getElementById('color2'),
    resultadoMezcla: document.getElementById('mix-result'),
    opcionesMezcla: document.getElementById('mix-options'),
    puntuacionMezcla: document.getElementById('mix-score'),
    nivelMezcla: document.getElementById('mix-level'),
    retroalimentacionMezcla: document.getElementById('mix-feedback'),
    
    // Juego de memorama
    tableroMemoria: document.getElementById('memory-board'),
    intentosMemoria: document.getElementById('memory-attempts'),
    parejasMemoria: document.getElementById('memory-matches'),
    botonReiniciarMemoria: document.getElementById('restart-memory'),
    
    // Modales
    modalCelebracion: document.getElementById('celebration-modal'),
    mensajeCelebracion: document.getElementById('celebration-message'),
    botonContinuar: document.getElementById('continue-button'),
    modalInstrucciones: document.getElementById('instructions-modal'),
    contenidoInstrucciones: document.getElementById('instructions-content'),
    botonIniciarActividad: document.getElementById('start-activity-button'),
    
    // Audios
    audios: {
        rojo: document.getElementById('audio-rojo'),
        azul: document.getElementById('audio-azul'),
        amarillo: document.getElementById('audio-amarillo'),
        verde: document.getElementById('audio-verde'),
        naranja: document.getElementById('audio-naranja'),
        morado: document.getElementById('audio-morado'),
        rosa: document.getElementById('audio-rosa'),
        cafe: document.getElementById('audio-cafe'),
        negro: document.getElementById('audio-negro'),
        blanco: document.getElementById('audio-blanco'),
        gris: document.getElementById('audio-gris'),
        exito: document.getElementById('audio-success'),
        error: document.getElementById('audio-error')
    }
};

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    // Configurar navegación entre actividades
    elementos.botonesActividad.forEach(boton => {
        boton.addEventListener('click', () => cambiarActividad(boton.dataset.activity));
    });
    
    // Inicializar sección de aprendizaje
    generarColores();
    
    // Inicializar juegos
    inicializarJuegoIdentificacion();
    inicializarJuegoMezcla();
    inicializarMemoriaJuego();
    
    // Configurar botones de modales
    elementos.botonContinuar.addEventListener('click', () => {
        elementos.modalCelebracion.style.display = 'none';
    });
    
    elementos.botonIniciarActividad.addEventListener('click', () => {
        elementos.modalInstrucciones.style.display = 'none';
    });
    
    // Mostrar instrucciones de la primera actividad
    mostrarInstrucciones('learn');
});

// Cambiar entre actividades
function cambiarActividad(actividad) {
    // Actualizar botones de navegación
    elementos.botonesActividad.forEach(boton => {
        boton.classList.toggle('active', boton.dataset.activity === actividad);
    });
    
    // Mostrar la sección correspondiente
    elementos.secciones.forEach(seccion => {
        seccion.classList.toggle('active', seccion.id === `${actividad}-section`);
    });
    
    // Mostrar instrucciones para la actividad
    mostrarInstrucciones(actividad);
    
    // Reiniciar juegos si es necesario
    if (actividad === 'identify') {
        reiniciarJuegoIdentificacion();
    } else if (actividad === 'mix') {
        reiniciarJuegoMezcla();
    } else if (actividad === 'memory') {
        reiniciarMemoriaJuego();
    }
}

// Mostrar instrucciones según la actividad
function mostrarInstrucciones(actividad) {
    let contenido = '';
    
    switch (actividad) {
        case 'learn':
            contenido = `
                <p>En esta sección podrás conocer los diferentes colores:</p>
                <ul>
                    <li>Haz clic en cada color para escuchar su nombre</li>
                    <li>Observa el ejemplo de objeto asociado a cada color</li>
                    <li>Explora todos los colores para familiarizarte con ellos</li>
                </ul>
                <p>¡Aprende los colores para prepararte para los juegos!</p>
            `;
            break;
        case 'identify':
            contenido = `
                <p>¡Vamos a jugar a identificar colores!</p>
                <ul>
                    <li>Observa la imagen que aparece en pantalla</li>
                    <li>Selecciona el color que crees que representa</li>
                    <li>Ganarás puntos por cada respuesta correcta</li>
                    <li>A medida que avances, el juego se volverá más desafiante</li>
                </ul>
                <p>¡Demuestra lo que has aprendido sobre los colores!</p>
            `;
            break;
        case 'mix':
            contenido = `
                <p>¡Aprende cómo se mezclan los colores!</p>
                <ul>
                    <li>Observa los dos colores que se van a mezclar</li>
                    <li>Selecciona el color resultante de la mezcla</li>
                    <li>Ganarás más puntos en niveles más difíciles</li>
                    <li>Descubre interesantes combinaciones de colores</li>
                </ul>
                <p>¡Conviértete en un experto en teoría del color!</p>
            `;
            break;
        case 'memory':
            contenido = `
                <p>¡Juguemos al memorama de colores!</p>
                <ul>
                    <li>Encuentra las parejas de colores iguales</li>
                    <li>Haz clic en una carta para voltearla</li>
                    <li>Luego haz clic en otra para ver si coinciden</li>
                    <li>Si coinciden, ¡has encontrado una pareja!</li>
                    <li>Intenta encontrar todas las parejas con el menor número de intentos</li>
                </ul>
                <p>¡Este juego te ayudará a recordar los colores mientras te diviertes!</p>
            `;
            break;
    }
    
    elementos.contenidoInstrucciones.innerHTML = contenido;
    elementos.modalInstrucciones.style.display = 'flex';
}

// =============== SECCIÓN APRENDER =============== //

// Generar la cuadrícula de colores (tomado de tu código)
function generarColores() {
    elementos.coloresContainer.innerHTML = '';
    
    colores.forEach(color => {
        let colorBox = document.createElement("div");
        colorBox.classList.add("color-box");
        colorBox.style.backgroundColor = color.hex;
        
        let colorInfo = document.createElement("div");
        colorInfo.classList.add("color-info");
        
        let colorNombre = document.createElement("h3");
        colorNombre.textContent = color.nombre;
        
        let colorEjemplo = document.createElement("p");
        colorEjemplo.textContent = color.ejemplo;
        
        colorInfo.appendChild(colorNombre);
        colorInfo.appendChild(colorEjemplo);
        
        colorBox.appendChild(colorInfo);
        
        // Evento para reproducir el sonido del color al hacer clic
        colorBox.addEventListener("click", () => {
            reproducirSonidoColor(color.nombre);
            
            // Efecto visual al hacer clic
            colorBox.classList.add("active");
            setTimeout(() => {
                colorBox.classList.remove("active");
            }, 500);
        });
        
        elementos.coloresContainer.appendChild(colorBox);
    });
}

// Reproducir sonido del color (tomado de tu código)
function reproducirSonidoColor(nombreColor) {
    // Normalizar el nombre del color (quitar acentos, minúsculas)
    const nombreNormalizado = nombreColor.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    
    const audio = elementos.audios[nombreNormalizado];
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(error => {
            console.error(`Error al reproducir el sonido del color ${nombreColor}:`, error);
        });
    }
}

// =============== JUEGO DE IDENTIFICACIÓN =============== //

// Inicializar juego de identificación (adaptado de tu código)
function inicializarJuegoIdentificacion() {
    reiniciarJuegoIdentificacion();
}

function reiniciarJuegoIdentificacion() {
    nivelIdentificacion = 1;
    puntuacionIdentificacion = 0;
    actualizarInterfazIdentificacion();
    cargarPreguntaIdentificacion();
}

function cargarPreguntaIdentificacion() {
    // Seleccionar color aleatorio
    const indiceAleatorio = Math.floor(Math.random() * colores.length);
    const colorCorrecto = colores[indiceAleatorio];
    
    // Actualizar imagen (usando el ejemplo del color)
    elementos.objetoIdentificar.src = obtenerImagenEjemplo(colorCorrecto.nombre);
    elementos.objetoIdentificar.dataset.color = colorCorrecto.nombre.toLowerCase();
    
    // Crear opciones (más difíciles en niveles superiores)
    let opcionesDisponibles = [...colores];
    let opcionesMostradas = [];
    
    // Siempre incluir la respuesta correcta
    opcionesMostradas.push(colorCorrecto);
    opcionesDisponibles = opcionesDisponibles.filter(c => c.nombre !== colorCorrecto.nombre);
    
    // Añadir opciones incorrectas según el nivel
    const numOpciones = Math.min(nivelIdentificacion + 1, 4);
    for (let i = 1; i < numOpciones; i++) {
        if (opcionesDisponibles.length > 0) {
            const indiceIncorrecto = Math.floor(Math.random() * opcionesDisponibles.length);
            opcionesMostradas.push(opcionesDisponibles[indiceIncorrecto]);
            opcionesDisponibles.splice(indiceIncorrecto, 1);
        }
    }
    
    // Mezclar opciones
    opcionesMostradas = mezclarArray(opcionesMostradas);
    
    // Actualizar botones de opciones
    elementos.opcionesIdentificacion.innerHTML = '';
    opcionesMostradas.forEach(opcion => {
        let btn = document.createElement("button");
        btn.textContent = opcion.nombre;
        btn.classList.add("color-option");
        btn.dataset.color = opcion.nombre.toLowerCase();
        
        // Ajustar el color del texto según el fondo
        if (opcion.nombre === "Negro" || opcion.nombre === "Azul" || opcion.nombre === "Morado" || opcion.nombre === "Cafe") {
            btn.style.color = "white";
        }
        
        btn.addEventListener("click", () => verificarRespuestaIdentificacion(btn.dataset.color));
        elementos.opcionesIdentificacion.appendChild(btn);
    });
    
    // Limpiar retroalimentación
    elementos.retroalimentacionIdentificacion.textContent = '';
    elementos.retroalimentacionIdentificacion.className = 'feedback-message';
}

function verificarRespuestaIdentificacion(colorSeleccionado) {
    const colorCorrecto = elementos.objetoIdentificar.dataset.color;
    
    if (colorSeleccionado === colorCorrecto) {
        // Respuesta correcta
        elementos.retroalimentacionIdentificacion.textContent = '¡Correcto! 🎉';
        elementos.retroalimentacionIdentificacion.className = 'feedback-message correct';
        reproducirSonido('exito');
        
        // Actualizar puntuación
        puntuacionIdentificacion += nivelIdentificacion * 10;
        
        // Avanzar nivel cada 3 respuestas correctas
        if (puntuacionIdentificacion >= nivelIdentificacion * 30) {
            nivelIdentificacion = Math.min(nivelIdentificacion + 1, 5);
            mostrarCelebracion(`¡Has avanzado al nivel ${nivelIdentificacion}!`);
        }
        
        // Actualizar interfaz
        actualizarInterfazIdentificacion();
        
        // Cargar nueva pregunta después de un breve retraso
        setTimeout(cargarPreguntaIdentificacion, 1500);
    } else {
        // Respuesta incorrecta
        elementos.retroalimentacionIdentificacion.textContent = `Incorrecto. Era "${colorCorrecto.charAt(0).toUpperCase() + colorCorrecto.slice(1)}"`;
        elementos.retroalimentacionIdentificacion.className = 'feedback-message incorrect';
        reproducirSonido('error');
        
        // Sacudir la imagen
        elementos.objetoIdentificar.classList.add('shake');
        setTimeout(() => {
            elementos.objetoIdentificar.classList.remove('shake');
        }, 500);
        
        // Cargar nueva pregunta después de un breve retraso
        setTimeout(cargarPreguntaIdentificacion, 2000);
    }
}

function actualizarInterfazIdentificacion() {
    elementos.puntuacionIdentificacion.textContent = puntuacionIdentificacion;
    elementos.nivelIdentificacion.textContent = nivelIdentificacion;
}

// =============== JUEGO DE MEZCLA =============== //

// Inicializar juego de mezcla (adaptado de tu código)
function inicializarJuegoMezcla() {
    reiniciarJuegoMezcla();
}

function reiniciarJuegoMezcla() {
    nivelMezcla = 1;
    puntuacionMezcla = 0;
    actualizarInterfazMezcla();
    cargarPreguntaMezcla();
}

function cargarPreguntaMezcla() {
    // Definir combinaciones de mezcla
    const combinaciones = [
        { color1: "Azul", color2: "Amarillo", resultado: "Verde" },
        { color1: "Rojo", color2: "Amarillo", resultado: "Naranja" },
        { color1: "Rojo", color2: "Azul", resultado: "Morado" },
        { color1: "Rojo", color2: "Blanco", resultado: "Rosa" },
        { color1: "Negro", color2: "Blanco", resultado: "Gris" }
    ];
    
    // Seleccionar combinación aleatoria
    const combinacion = combinaciones[Math.floor(Math.random() * combinaciones.length)];
    
    // Configurar colores a mezclar
    const color1 = colores.find(c => c.nombre === combinacion.color1);
    const color2 = colores.find(c => c.nombre === combinacion.color2);
    const resultado = colores.find(c => c.nombre === combinacion.resultado);
    
    elementos.color1Mezcla.style.backgroundColor = color1.hex;
    elementos.color1Mezcla.dataset.color = color1.nombre.toLowerCase();
    
    elementos.color2Mezcla.style.backgroundColor = color2.hex;
    elementos.color2Mezcla.dataset.color = color2.nombre.toLowerCase();
    
    elementos.resultadoMezcla.textContent = "?";
    elementos.resultadoMezcla.style.backgroundColor = "";
    elementos.resultadoMezcla.dataset.color = resultado.nombre.toLowerCase();
    
    // Crear opciones (incluyendo el resultado correcto y algunos distractores)
    let opcionesDisponibles = [...colores];
    let opcionesMostradas = [];
    
    // Siempre incluir la respuesta correcta
    opcionesMostradas.push(resultado);
    opcionesDisponibles = opcionesDisponibles.filter(c => c.nombre !== resultado.nombre);
    
    // Añadir opciones incorrectas
    for (let i = 0; i < 2; i++) {
        if (opcionesDisponibles.length > 0) {
            const indiceIncorrecto = Math.floor(Math.random() * opcionesDisponibles.length);
            opcionesMostradas.push(opcionesDisponibles[indiceIncorrecto]);
            opcionesDisponibles.splice(indiceIncorrecto, 1);
        }
    }
    
    // Mezclar opciones
    opcionesMostradas = mezclarArray(opcionesMostradas);
    
    // Actualizar botones de opciones
    elementos.opcionesMezcla.innerHTML = '';
    opcionesMostradas.forEach(opcion => {
        let btn = document.createElement("button");
        btn.textContent = opcion.nombre;
        btn.classList.add("color-option");
        btn.style.backgroundColor = opcion.hex;
        btn.dataset.color = opcion.nombre.toLowerCase();
        
        // Ajustar el color del texto según el fondo
        if (opcion.nombre === "Negro" || opcion.nombre === "Azul" || opcion.nombre === "Morado" || opcion.nombre === "Cafe") {
            btn.style.color = "white";
        }
        
        btn.addEventListener("click", () => verificarRespuestaMezcla(btn.dataset.color));
        elementos.opcionesMezcla.appendChild(btn);
    });
    
    // Limpiar retroalimentación
    elementos.retroalimentacionMezcla.textContent = '';
    elementos.retroalimentacionMezcla.className = 'feedback-message';
}

function verificarRespuestaMezcla(colorSeleccionado) {
    const colorCorrecto = elementos.resultadoMezcla.dataset.color;
    
    if (colorSeleccionado === colorCorrecto) {
        // Respuesta correcta
        elementos.retroalimentacionMezcla.textContent = '¡Correcto! 🎉';
        elementos.retroalimentacionMezcla.className = 'feedback-message correct';
        reproducirSonido('exito');
        
        // Mostrar el resultado correcto
        const resultado = colores.find(c => c.nombre.toLowerCase() === colorCorrecto);
        elementos.resultadoMezcla.textContent = "";
        elementos.resultadoMezcla.style.backgroundColor = resultado.hex;
        
        // Actualizar puntuación
        puntuacionMezcla += nivelMezcla * 15;
        
        // Avanzar nivel cada 2 respuestas correctas
        if (puntuacionMezcla >= nivelMezcla * 30) {
            nivelMezcla = Math.min(nivelMezcla + 1, 5);
            mostrarCelebracion(`¡Has avanzado al nivel ${nivelMezcla}!`);
        }
        
        // Actualizar interfaz
        actualizarInterfazMezcla();
        
        // Cargar nueva pregunta después de un breve retraso
        setTimeout(cargarPreguntaMezcla, 2000);
    } else {
        // Respuesta incorrecta
        elementos.retroalimentacionMezcla.textContent = `Incorrecto. Intenta de nuevo.`;
        elementos.retroalimentacionMezcla.className = 'feedback-message incorrect';
        reproducirSonido('error');
        
        // Sacudir los elementos de mezcla
        elementos.color1Mezcla.classList.add('shake');
        elementos.color2Mezcla.classList.add('shake');
        setTimeout(() => {
            elementos.color1Mezcla.classList.remove('shake');
            elementos.color2Mezcla.classList.remove('shake');
        }, 500);
    }
}

function actualizarInterfazMezcla() {
    elementos.puntuacionMezcla.textContent = puntuacionMezcla;
    elementos.nivelMezcla.textContent = nivelMezcla;
}

// =============== JUEGO DE MEMORAMA =============== //

// Inicializar juego de memorama
function inicializarMemoriaJuego() {
    reiniciarMemoriaJuego();
    elementos.botonReiniciarMemoria.addEventListener('click', reiniciarMemoriaJuego);
}

function reiniciarMemoriaJuego() {
    intentosMemoria = 0;
    parejasEncontradas = 0;
    cartasVolteadas = [];
    puedeVoltear = true;
    
    // Actualizar interfaz
    elementos.intentosMemoria.textContent = intentosMemoria;
    elementos.parejasMemoria.textContent = parejasEncontradas;
    
    // Crear array de cartas (6 colores, cada uno repetido 2 veces = 12 cartas)
    const coloresMemoria = [];
    const coloresSeleccionados = mezclarArray([...colores]).slice(0, 6);
    
    for (let i = 0; i < coloresSeleccionados.length; i++) {
        coloresMemoria.push(coloresSeleccionados[i]);
        coloresMemoria.push(coloresSeleccionados[i]);
    }
    
    // Mezclar cartas
    tableroMemoria = mezclarArray(coloresMemoria);
    
    // Crear elementos HTML
    elementos.tableroMemoria.innerHTML = '';
    
    tableroMemoria.forEach((color, index) => {
        const carta = document.createElement('div');
        carta.className = 'memory-card';
        carta.dataset.index = index;
        carta.dataset.color = color.nombre.toLowerCase();
        
        carta.innerHTML = `
            <div class="card-front"></div>
            <div class="card-back">
                <div class="color-sample" style="background-color: ${color.hex};"></div>
            </div>
        `;
        
        carta.addEventListener('click', () => voltearCarta(carta));
        elementos.tableroMemoria.appendChild(carta);
    });
}

function voltearCarta(carta) {
    // Verificar si se puede voltear
    if (!puedeVoltear) return;
    if (carta.classList.contains('flipped') || carta.classList.contains('matched')) return;
    
    // Voltear carta
    carta.classList.add('flipped');
    
    // Añadir a cartas volteadas
    cartasVolteadas.push(carta);
    
    // Si hay dos cartas volteadas, verificar si coinciden
    if (cartasVolteadas.length === 2) {
        puedeVoltear = false;
        intentosMemoria++;
        elementos.intentosMemoria.textContent = intentosMemoria;
        
        const color1 = cartasVolteadas[0].dataset.color;
        const color2 = cartasVolteadas[1].dataset.color;
        
        if (color1 === color2) {
            // Coincidencia encontrada
            setTimeout(() => {
                cartasVolteadas.forEach(c => {
                    c.classList.add('matched');
                    c.classList.add('bounce');
                });
                
                parejasEncontradas++;
                elementos.parejasMemoria.textContent = parejasEncontradas;
                
                // Reproducir sonido de éxito
                reproducirSonido('exito');
                
                // Reproducir el nombre del color
                const color = colores.find(c => c.nombre.toLowerCase() === color1);
                if (color) {
                    setTimeout(() => {
                        reproducirSonidoColor(color.nombre);
                    }, 300);
                }
                
                // Verificar si se completó el juego
                if (parejasEncontradas === 6) {
                    setTimeout(() => {
                        mostrarCelebracion(`¡Felicidades! Has completado el memorama en ${intentosMemoria} intentos.`);
                    }, 1000);
                }
                
                cartasVolteadas = [];
                puedeVoltear = true;
            }, 500);
        } else {
            // No coinciden
            setTimeout(() => {
                cartasVolteadas.forEach(c => c.classList.remove('flipped'));
                cartasVolteadas = [];
                puedeVoltear = true;
            }, 1000);
        }
    }
}

// =============== FUNCIONES AUXILIARES =============== //

// Obtener imagen de ejemplo para un color (simplificado)
function obtenerImagenEjemplo(nombreColor) {
    const color = colores.find(c => c.nombre === nombreColor);
    if (!color) return '';
    
    // En una implementación real, esto debería devolver la ruta a una imagen
    return ''; // Se usaría color.ejemplo para obtener un emoji o imagen
}

// Reproducir sonido genérico
function reproducirSonido(tipo) {
    const audio = elementos.audios[tipo];
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(error => {
            console.error(`Error al reproducir sonido de ${tipo}:`, error);
        });
    }
}

// Mostrar celebración
function mostrarCelebracion(mensaje) {
    elementos.mensajeCelebracion.textContent = mensaje;
    elementos.modalCelebracion.style.display = 'flex';
}

// Mezclar array (algoritmo Fisher-Yates)
function mezclarArray(array) {
    const nuevoArray = [...array];
    for (let i = nuevoArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nuevoArray[i], nuevoArray[j]] = [nuevoArray[j], nuevoArray[i]];
    }
    return nuevoArray;
}