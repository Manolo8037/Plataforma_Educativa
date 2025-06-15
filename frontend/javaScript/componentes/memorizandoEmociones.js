// Datos de las emociones
const emociones = [
    {
        nombre: "Alegría",
        imagen: "alegria.jpg",
        descripcion: "La alegría es cuando nos sentimos felices y contentos. Sonreímos y nos sentimos bien por dentro.",
        color: "#f1c40f"
    },
    {
        nombre: "Tristeza",
        imagen: "tristeza.jpeg",
        descripcion: "La tristeza es cuando nos sentimos desanimados o apenados. A veces podemos llorar cuando estamos tristes.",
        color: "#3498db"
    },
    {
        nombre: "Enojo",
        imagen: "enojo.jpeg",
        descripcion: "El enojo es cuando algo nos molesta mucho. Podemos fruncir el ceño y sentir calor en la cara.",
        color: "#e74c3c"
    },
    {
        nombre: "Miedo",
        imagen: "miedo.jpeg",
        descripcion: "El miedo es cuando nos asustamos por algo. Nuestro corazón late más rápido y queremos alejarnos.",
        color: "#9b59b6"
    },
    {
        nombre: "Sorpresa",
        imagen: "sorpresa.jpeg",
        descripcion: "La sorpresa es cuando algo inesperado sucede. Abrimos mucho los ojos y la boca.",
        color: "#2ecc71"
    },
    {
        nombre: "Asco",
        imagen: "asco.jpg",
        descripcion: "El asco es cuando algo nos parece desagradable. Arrugamos la nariz y queremos alejarnos.",
        color: "#1abc9c"
    }
];

// Variables globales
let emocionActual = 0;
let nivelIdentificacion = 1;
let puntuacionIdentificacion = 0;
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
    
    // Carrusel de emociones
    carruselContenedor: document.querySelector('.carousel-container'),
    botonAnterior: document.getElementById('prev-emotion'),
    botonSiguiente: document.getElementById('next-emotion'),
    puntos: document.querySelectorAll('.dot'),
    
    // Juego de identificación
    imagenIdentificar: document.getElementById('emotion-to-identify'),
    opcionesEmociones: document.querySelectorAll('.emotion-option'),
    puntuacionIdentificacion: document.getElementById('identify-score'),
    nivelIdentificacion: document.getElementById('identify-level'),
    retroalimentacion: document.getElementById('identify-feedback'),
    
    // Juego de memorama
    tableroMemoria: document.querySelector('.memorama-board'),
    intentosMemoria: document.getElementById('memorama-attempts'),
    parejasMemoria: document.getElementById('memorama-matches'),
    botonReiniciarMemoria: document.getElementById('restart-memorama'),
    
    // Modales
    modalCelebracion: document.getElementById('celebration-modal'),
    mensajeCelebracion: document.getElementById('celebration-message'),
    botonContinuar: document.getElementById('continue-button'),
    modalInstrucciones: document.getElementById('instructions-modal'),
    contenidoInstrucciones: document.getElementById('instructions-content'),
    botonIniciarActividad: document.getElementById('start-activity-button'),
    
    // Audios
    audios: {
        alegria: document.getElementById('audio-alegria'),
        tristeza: document.getElementById('audio-tristeza'),
        enojo: document.getElementById('audio-enojo'),
        miedo: document.getElementById('audio-miedo'),
        sorpresa: document.getElementById('audio-sorpresa'),
        asco: document.getElementById('audio-asco'),
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
    
    // Inicializar carrusel de emociones
    inicializarCarrusel();
    
    // Configurar botones de sonido
    document.querySelectorAll('.sound-btn').forEach(boton => {
        boton.addEventListener('click', () => reproducirSonido(boton.dataset.sound));
    });
    
    // Inicializar juego de identificación
    inicializarJuegoIdentificacion();
    
    // Inicializar juego de memorama
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
    } else if (actividad === 'memorama') {
        reiniciarMemoriaJuego();
    }
}

// Mostrar instrucciones según la actividad
function mostrarInstrucciones(actividad) {
    let contenido = '';
    
    switch (actividad) {
        case 'learn':
            contenido = `
                <p>En esta sección podrás conocer las diferentes emociones:</p>
                <ul>
                    <li>Usa las flechas para navegar entre las emociones</li>
                    <li>Observa la imagen que muestra cada emoción</li>
                    <li>Lee la descripción para entender qué significa</li>
                    <li>Presiona el botón "Escuchar" para oír el nombre de la emoción</li>
                </ul>
                <p>¡Explora todas las emociones para aprender a reconocerlas!</p>
            `;
            break;
        case 'identify':
            contenido = `
                <p>¡Vamos a jugar a identificar emociones!</p>
                <ul>
                    <li>Observa la imagen que aparece en pantalla</li>
                    <li>Selecciona la emoción que crees que representa</li>
                    <li>Ganarás puntos por cada respuesta correcta</li>
                    <li>A medida que avances, el juego se volverá más desafiante</li>
                </ul>
                <p>¡Demuestra lo que has aprendido sobre las emociones!</p>
            `;
            break;
        case 'memorama':
            contenido = `
                <p>¡Juguemos al memorama de emociones!</p>
                <ul>
                    <li>Encuentra las parejas de emociones iguales</li>
                    <li>Haz clic en una carta para voltearla</li>
                    <li>Luego haz clic en otra para ver si coinciden</li>
                    <li>Si coinciden, ¡has encontrado una pareja!</li>
                    <li>Intenta encontrar todas las parejas con el menor número de intentos</li>
                </ul>
                <p>¡Este juego te ayudará a recordar las emociones mientras te diviertes!</p>
            `;
            break;
    }
    
    elementos.contenidoInstrucciones.innerHTML = contenido;
    elementos.modalInstrucciones.style.display = 'flex';
}

// Reproducir sonido
function reproducirSonido(emocion) {
    const audio = elementos.audios[emocion];
    if (audio) {
        audio.currentTime = 0;
        audio.play();
    }
}

//=============== CARRUSEL DE EMOCIONES ===============//

// Inicializar carrusel
function inicializarCarrusel() {
    // Crear tarjetas para todas las emociones
    crearTarjetasEmociones();
    
    // Configurar navegación
    elementos.botonAnterior.addEventListener('click', () => navegarCarrusel(-1));
    elementos.botonSiguiente.addEventListener('click', () => navegarCarrusel(1));
    
    // Configurar puntos de navegación
    elementos.puntos.forEach(punto => {
        punto.addEventListener('click', () => {
            emocionActual = parseInt(punto.dataset.index);
            actualizarCarrusel();
        });
    });
    
    // Mostrar primera emoción
    actualizarCarrusel();
}

// Crear tarjetas para todas las emociones
function crearTarjetasEmociones() {
    const contenedor = document.createElement('div');
    contenedor.className = 'carousel-slides';
    
    emociones.forEach((emocion, index) => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'emotion-card';
        tarjeta.innerHTML = `
            <div class="emotion-image" style="background-color: ${emocion.color}20;">
                <img src="/plataformaEducativa/frontend/imagenes/emociones/${emocion.imagen}" alt="${emocion.nombre}">
            </div>
            <div class="emotion-info">
                <h3>${emocion.nombre}</h3>
                <p>${emocion.descripcion}</p>
                <button class="sound-btn" data-sound="${emocion.nombre.toLowerCase()}">
                    Escuchar
                </button>
            </div>
        `;
        contenedor.appendChild(tarjeta);
    });
    
    elementos.carruselContenedor.innerHTML = '';
    elementos.carruselContenedor.appendChild(contenedor);
}

// Navegar por el carrusel
function navegarCarrusel(direccion) {
    emocionActual = (emocionActual + direccion + emociones.length) % emociones.length;
    actualizarCarrusel();
}

// Actualizar visualización del carrusel
function actualizarCarrusel() {
    const slides = document.querySelector('.carousel-slides');
    if (slides) {
        slides.style.transform = `translateX(-${emocionActual * 100}%)`;
    }
    
    // Actualizar puntos de navegación
    elementos.puntos.forEach((punto, index) => {
        punto.classList.toggle('active', index === emocionActual);
    });
}

//=============== JUEGO DE IDENTIFICACIÓN ===============//

// Inicializar juego de identificación
function inicializarJuegoIdentificacion() {
    // Configurar opciones
    elementos.opcionesEmociones.forEach(opcion => {
        opcion.addEventListener('click', (e) => verificarRespuesta(e.target.dataset.emotion));
    });
    
    // Cargar primera pregunta
    cargarPreguntaIdentificacion();
}

// Reiniciar juego de identificación
function reiniciarJuegoIdentificacion() {
    nivelIdentificacion = 1;
    puntuacionIdentificacion = 0;
    actualizarInterfazIdentificacion();
    cargarPreguntaIdentificacion();
}

// Cargar nueva pregunta
function cargarPreguntaIdentificacion() {
    // Seleccionar emoción aleatoria
    const indiceAleatorio = Math.floor(Math.random() * emociones.length);
    const emocionCorrecta = emociones[indiceAleatorio];
    
    // Actualizar imagen
    elementos.imagenIdentificar.src = `/plataformaEducativa/frontend/imagenes/emociones/${emocionCorrecta.imagen}`;
    elementos.imagenIdentificar.dataset.emocion = emocionCorrecta.nombre.toLowerCase();
    
    // Crear opciones (más difícil en niveles superiores)
    let opcionesDisponibles = [...emociones];
    let opcionesMostradas = [];
    
    // Siempre incluir la respuesta correcta
    opcionesMostradas.push(emocionCorrecta);
    opcionesDisponibles = opcionesDisponibles.filter(e => e.nombre !== emocionCorrecta.nombre);
    
    // Añadir opciones incorrectas según el nivel
    const numOpciones = Math.min(nivelIdentificacion + 1, 3);
    for (let i = 0; i < numOpciones; i++) {
        if (opcionesDisponibles.length > 0) {
            const indiceIncorrecto = Math.floor(Math.random() * opcionesDisponibles.length);
            opcionesMostradas.push(opcionesDisponibles[indiceIncorrecto]);
            opcionesDisponibles.splice(indiceIncorrecto, 1);
        }
    }
    
    // Mezclar opciones
    opcionesMostradas = mezclarArray(opcionesMostradas);
    
    // Actualizar botones de opciones
    elementos.opcionesEmociones.forEach((boton, index) => {
        if (index < opcionesMostradas.length) {
            boton.textContent = opcionesMostradas[index].nombre;
            boton.dataset.emotion = opcionesMostradas[index].nombre.toLowerCase();
            boton.style.display = 'block';
        } else {
            boton.style.display = 'none';
        }
    });
    
    // Limpiar retroalimentación
    elementos.retroalimentacion.textContent = '';
    elementos.retroalimentacion.className = 'feedback-message';
}

// Verificar respuesta
function verificarRespuesta(emocionSeleccionada) {
    const emocionCorrecta = elementos.imagenIdentificar.dataset.emocion;
    
    if (emocionSeleccionada === emocionCorrecta) {
        // Respuesta correcta
        elementos.retroalimentacion.textContent = '¡Correcto! 🎉';
        elementos.retroalimentacion.className = 'feedback-message correct';
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
        elementos.retroalimentacion.textContent = `Incorrecto. Era "${emocionCorrecta.charAt(0).toUpperCase() + emocionCorrecta.slice(1)}"`;
        elementos.retroalimentacion.className = 'feedback-message incorrect';
        reproducirSonido('error');
        
        // Sacudir la imagen
        elementos.imagenIdentificar.classList.add('shake');
        setTimeout(() => {
            elementos.imagenIdentificar.classList.remove('shake');
        }, 500);
        
        // Cargar nueva pregunta después de un breve retraso
        setTimeout(cargarPreguntaIdentificacion, 2000);
    }
}

// Actualizar interfaz del juego de identificación
function actualizarInterfazIdentificacion() {
    elementos.puntuacionIdentificacion.textContent = puntuacionIdentificacion;
    elementos.nivelIdentificacion.textContent = nivelIdentificacion;
}

//=============== JUEGO DE MEMORAMA ===============//

// Inicializar juego de memorama
function inicializarMemoriaJuego() {
    // Configurar botón de reinicio
    elementos.botonReiniciarMemoria.addEventListener('click', reiniciarMemoriaJuego);
    
    // Crear tablero inicial
    crearTableroMemoria();
}

// Crear tablero de memorama
function crearTableroMemoria() {
    // Reiniciar variables
    intentosMemoria = 0;
    parejasEncontradas = 0;
    cartasVolteadas = [];
    puedeVoltear = true;
    
    // Actualizar interfaz
    elementos.intentosMemoria.textContent = intentosMemoria;
    elementos.parejasMemoria.textContent = parejasEncontradas;
    
    // Crear array de cartas (6 emociones, cada una repetida una vez = 12 cartas)
    const emocionesMemoria = [];
    for (let i = 0; i < 6; i++) {
        emocionesMemoria.push(emociones[i]);
        emocionesMemoria.push(emociones[i]);
    }
    
    // Mezclar cartas
    tableroMemoria = mezclarArray(emocionesMemoria);
    
    // Crear elementos HTML
    elementos.tableroMemoria.innerHTML = '';
    
    tableroMemoria.forEach((emocion, index) => {
        const carta = document.createElement('div');
        carta.className = 'memory-card';
        carta.dataset.index = index;
        carta.dataset.emocion = emocion.nombre.toLowerCase();
        
        carta.innerHTML = `
            <div class="card-front"></div>
            <div class="card-back" style="background-color: ${emocion.color}20;">
                <img src="/plataformaEducativa/frontend/imagenes/emociones/${emocion.imagen}" alt="${emocion.nombre}">
            </div>
        `;
        
        carta.addEventListener('click', () => voltearCarta(carta));
        elementos.tableroMemoria.appendChild(carta);
    });
}

// Voltear carta
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
        
        const emocion1 = cartasVolteadas[0].dataset.emocion;
        const emocion2 = cartasVolteadas[1].dataset.emocion;
        
        if (emocion1 === emocion2) {
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

// Reiniciar juego de memorama
function reiniciarMemoriaJuego() {
    crearTableroMemoria();
}

//=============== FUNCIONES AUXILIARES ===============//

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