// Datos de los sonidos
const sonidos = [
    { nombre: "Guitarra", icono: "🎸", audio: "guitarra" },
    { nombre: "Piano", icono: "🎹", audio: "piano" },
    { nombre: "Tambor", icono: "🥁", audio: "tambor" },
    { nombre: "Campana", icono: "🔔", audio: "campana" },
    { nombre: "Silbato", icono: "📣", audio: "silbato" },
    { nombre: "Lluvia", icono: "🌧️", audio: "lluvia" },
    { nombre: "Timbre", icono: "🚨", audio: "timbre" }
];

// Variables globales
let nivelIdentificacion = 1;
let puntuacionIdentificacion = 0;
let nivelSecuencia = 1;
let puntuacionSecuencia = 0;
let intentosMemoria = 0;
let parejasEncontradas = 0;
let cartasVolteadas = [];
let puedeVoltear = true;
let sonidoActual = null;
let secuenciaActual = [];
let sonidosDisponibles = [];

// Inicialización de la aplicación
document.addEventListener("DOMContentLoaded", function() {
    inicializarNavegacion();
    inicializarSecciones();
    inicializarJuegos();
    inicializarModales();
    mostrarInstrucciones('learn');
});

// ==================== FUNCIONES DE NAVEGACIÓN ====================

function inicializarNavegacion() {
    const botonesActividad = document.querySelectorAll('.activity-btn');
    botonesActividad.forEach(boton => {
        boton.addEventListener('click', function() {
            const actividad = this.getAttribute('data-activity');
            cambiarActividad(actividad);
        });
    });
}

function inicializarSecciones() {
    // Ocultar todas las secciones excepto la primera
    document.querySelectorAll('.activity-section').forEach((seccion, index) => {
        seccion.style.display = index === 0 ? 'block' : 'none';
    });
}

function cambiarActividad(actividad) {
    // Actualizar botones de navegación
    document.querySelectorAll('.activity-btn').forEach(boton => {
        boton.classList.toggle('active', boton.getAttribute('data-activity') === actividad);
    });

    // Ocultar todas las secciones
    document.querySelectorAll('.activity-section').forEach(seccion => {
        seccion.style.display = 'none';
    });

    // Mostrar solo la sección seleccionada
    const seccionActiva = document.getElementById(`${actividad}-section`);
    if (seccionActiva) {
        seccionActiva.style.display = 'block';
    }

    // Mostrar instrucciones y reiniciar juegos si es necesario
    mostrarInstrucciones(actividad);
    reiniciarJuegoSiEsNecesario(actividad);
}

function reiniciarJuegoSiEsNecesario(actividad) {
    switch(actividad) {
        case 'identify':
            reiniciarJuegoIdentificacion();
            break;
        case 'sequence':
            reiniciarJuegoSecuencia();
            break;
        case 'memory':
            reiniciarMemorama();
            break;
    }
}

// ==================== FUNCIONES DE INSTRUCCIONES ====================

function inicializarModales() {
    document.getElementById('continue-button').addEventListener('click', function() {
        document.getElementById('celebration-modal').style.display = 'none';
    });
    
    document.getElementById('start-activity-button').addEventListener('click', function() {
        document.getElementById('instructions-modal').style.display = 'none';
    });
}

function mostrarInstrucciones(actividad) {
    const instrucciones = {
        'learn': `
            <p>En esta sección podrás explorar diferentes sonidos:</p>
            <ul>
                <li>Haz clic en cualquier tarjeta para escuchar el sonido</li>
                <li>Observa el icono que representa cada sonido</li>
                <li>Familiarízate con los diferentes sonidos</li>
            </ul>
            <p>¡Prepárate para los juegos de identificación y memorama!</p>
        `,
        'identify': `
            <p>¡A jugar a identificar sonidos!</p>
            <ul>
                <li>Haz clic en "Reproducir Sonido" para escuchar</li>
                <li>Selecciona la opción que creas correcta</li>
                <li>Ganarás más puntos en niveles más altos</li>
                <li>¡Demuestra cuánto has aprendido!</li>
            </ul>
        `,
        'sequence': `
            <p>¡Ordena los sonidos en la secuencia correcta!</p>
            <ul>
                <li>Escucha atentamente la secuencia de sonidos</li>
                <li>Arrastra y suelta los sonidos para ordenarlos</li>
                <li>Verifica tu respuesta cuando creas que está correcta</li>
                <li>Los niveles más altos tendrán secuencias más largas</li>
            </ul>
            <p>¡Desarrolla tu memoria auditiva y sentido del ritmo!</p>
        `,
        'memory': `
            <p>¡Juguemos al memorama de sonidos!</p>
            <ul>
                <li>Encuentra las parejas de sonidos iguales</li>
                <li>Haz clic en una carta para escuchar el sonido</li>
                <li>Intenta recordar la ubicación de cada sonido</li>
                <li>¡Completa el juego con el menor número de intentos!</li>
            </ul>
        `
    };

    document.getElementById('instructions-content').innerHTML = instrucciones[actividad] || '';
    document.getElementById('instructions-modal').style.display = 'flex';
}

// ==================== SECCIÓN APRENDER ====================

function inicializarJuegos() {
    generarTarjetasSonido();
    inicializarJuegoIdentificacion();
    inicializarJuegoSecuencia();
    inicializarMemorama();
}

function generarTarjetasSonido() {
    const contenedor = document.getElementById('sounds-container');
    if (!contenedor) return;
    
    contenedor.innerHTML = '';
    
    sonidos.forEach(sonido => {
        const card = document.createElement('div');
        card.className = 'sound-card';
        card.innerHTML = `
            <div class="sound-icon">${sonido.icono}</div>
            <h3>${sonido.nombre}</h3>
        `;
        card.addEventListener('click', () => reproducirSonido(sonido.audio));
        contenedor.appendChild(card);
    });
}

// ==================== JUEGO DE IDENTIFICACIÓN ====================

function inicializarJuegoIdentificacion() {
    const playSoundBtn = document.getElementById('play-sound-btn');
    if (playSoundBtn) {
        playSoundBtn.addEventListener('click', reproducirSonidoAleatorio);
    }
    reiniciarJuegoIdentificacion();
}

function reiniciarJuegoIdentificacion() {
    nivelIdentificacion = 1;
    puntuacionIdentificacion = 0;
    actualizarInterfazIdentificacion();
}

function reproducirSonidoAleatorio() {
    const sonidoAleatorio = sonidos[Math.floor(Math.random() * sonidos.length)];
    sonidoActual = sonidoAleatorio;
    reproducirSonido(sonidoAleatorio.audio);
    cargarOpcionesIdentificacion(sonidoAleatorio);
}

function cargarOpcionesIdentificacion(sonidoCorrecto) {
    const opcionesContainer = document.getElementById('identify-options');
    if (!opcionesContainer) return;
    
    let opciones = [sonidoCorrecto];
    let opcionesDisponibles = sonidos.filter(s => s.nombre !== sonidoCorrecto.nombre);

    // Añadir opciones según nivel de dificultad
    for (let i = 0; i < Math.min(nivelIdentificacion + 1, opcionesDisponibles.length); i++) {
        const indice = Math.floor(Math.random() * opcionesDisponibles.length);
        opciones.push(opcionesDisponibles[indice]);
        opcionesDisponibles.splice(indice, 1);
    }

    // Mezclar y mostrar opciones
    opcionesContainer.innerHTML = '';
    mezclarArray(opciones).forEach(opcion => {
        const btn = document.createElement('button');
        btn.className = 'color-option';
        btn.innerHTML = `
            <span class="sound-icon-small">${opcion.icono}</span>
            ${opcion.nombre}
        `;
        btn.addEventListener('click', () => verificarRespuestaIdentificacion(opcion.nombre));
        opcionesContainer.appendChild(btn);
    });
}

function verificarRespuestaIdentificacion(respuesta) {
    const feedbackElement = document.getElementById('identify-feedback');
    
    if (respuesta === sonidoActual.nombre) {
        // Respuesta correcta
        mostrarFeedback(feedbackElement, '¡Correcto! 🎉', 'correct', 'exito');
        
        puntuacionIdentificacion += nivelIdentificacion * 10;
        
        if (puntuacionIdentificacion >= nivelIdentificacion * 30) {
            nivelIdentificacion = Math.min(nivelIdentificacion + 1, 5);
            mostrarCelebracion(`¡Subiste al nivel ${nivelIdentificacion}!`);
        }
        
        actualizarInterfazIdentificacion();
        setTimeout(reproducirSonidoAleatorio, 1500);
    } else {
        // Respuesta incorrecta
        mostrarFeedback(feedbackElement, `Incorrecto. Era ${sonidoActual.nombre}`, 'incorrect', 'error');
        setTimeout(reproducirSonidoAleatorio, 2000);
    }
}

function mostrarFeedback(elemento, mensaje, tipo, sonido) {
    if (!elemento) return;
    
    elemento.textContent = mensaje;
    elemento.className = `feedback-message ${tipo}`;
    reproducirSonido(sonido);
}

function actualizarInterfazIdentificacion() {
    const scoreElement = document.getElementById('identify-score');
    const levelElement = document.getElementById('identify-level');
    
    if (scoreElement) scoreElement.textContent = puntuacionIdentificacion;
    if (levelElement) levelElement.textContent = nivelIdentificacion;
}

// ==================== JUEGO DE ORDENAR SONIDOS ====================

function inicializarJuegoSecuencia() {
    const playSequenceBtn = document.getElementById('play-sequence-btn');
    const checkSequenceBtn = document.getElementById('check-sequence-btn');
    
    if (playSequenceBtn) {
        playSequenceBtn.addEventListener('click', reproducirSecuencia);
    }
    
    if (checkSequenceBtn) {
        checkSequenceBtn.addEventListener('click', verificarSecuencia);
    }
    
    configurarDragAndDrop();
    reiniciarJuegoSecuencia();
}

function configurarDragAndDrop() {
    const playerSequence = document.getElementById('player-sequence');
    if (!playerSequence) return;
    
    playerSequence.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    
    playerSequence.addEventListener('drop', (e) => {
        e.preventDefault();
        const soundId = e.dataTransfer.getData('text/plain');
        const soundItem = document.getElementById(soundId);
        if (soundItem) {
            e.target.appendChild(soundItem);
        }
    });
}

function reiniciarJuegoSecuencia() {
    nivelSecuencia = 1;
    puntuacionSecuencia = 0;
    actualizarInterfazSecuencia();
    cargarSecuencia();
}

function cargarSecuencia() {
    const correctSequence = document.getElementById('correct-sequence');
    const playerSequence = document.getElementById('player-sequence');
    
    if (!correctSequence || !playerSequence) return;
    
    // Limpiar contenedores
    correctSequence.innerHTML = '';
    playerSequence.innerHTML = '';
    
    // Seleccionar sonidos aleatorios según el nivel
    const numSonidos = Math.min(3 + nivelSecuencia, 7);
    sonidosDisponibles = mezclarArray([...sonidos]).slice(0, numSonidos);
    secuenciaActual = mezclarArray([...sonidosDisponibles]);
    
    // Crear elementos arrastrables
    crearElementosArrastrables();
    
    // Crear secuencia correcta (oculta)
    crearSecuenciaCorrecta();
}

function crearElementosArrastrables() {
    const playerSequence = document.getElementById('player-sequence');
    if (!playerSequence) return;
    
    sonidosDisponibles.forEach((sonido, index) => {
        const soundItem = document.createElement('div');
        soundItem.className = 'sound-item';
        soundItem.id = `sound-${index}`;
        soundItem.draggable = true;
        soundItem.innerHTML = `${sonido.icono} ${sonido.nombre}`;
        soundItem.dataset.sonido = sonido.audio;
        
        soundItem.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', soundItem.id);
            soundItem.classList.add('dragging');
        });
        
        soundItem.addEventListener('dragend', () => {
            soundItem.classList.remove('dragging');
        });
        
        playerSequence.appendChild(soundItem);
    });
}

function crearSecuenciaCorrecta() {
    const correctSequence = document.getElementById('correct-sequence');
    if (!correctSequence) return;
    
    secuenciaActual.forEach(sonido => {
        const item = document.createElement('div');
        item.className = 'sound-item';
        item.innerHTML = `${sonido.icono} ${sonido.nombre}`;
        item.dataset.sonido = sonido.audio;
        correctSequence.appendChild(item);
    });
}

function reproducirSecuencia() {
    let delay = 0;
    secuenciaActual.forEach((sonido, index) => {
        setTimeout(() => {
            reproducirSonido(sonido.audio);
            resaltarElementoSecuencia(index);
        }, delay);
        delay += 1000; // 1 segundo entre sonidos
    });
}

function resaltarElementoSecuencia(index) {
    const correctSequence = document.getElementById('correct-sequence');
    if (!correctSequence) return;
    
    const items = correctSequence.children;
    if (items[index]) {
        items[index].classList.add('pulse');
        setTimeout(() => {
            items[index].classList.remove('pulse');
        }, 800);
    }
}

function verificarSecuencia() {
    const playerSequence = document.getElementById('player-sequence');
    const feedbackSequence = document.getElementById('sequence-feedback');
    
    if (!playerSequence || !feedbackSequence) return;
    
    const playerItems = playerSequence.children;
    let correctas = 0;
    
    for (let i = 0; i < secuenciaActual.length; i++) {
        if (playerItems[i] && playerItems[i].dataset.sonido === secuenciaActual[i].audio) {
            correctas++;
        }
    }
    
    const porcentajeCorrecto = (correctas / secuenciaActual.length) * 100;
    mostrarFeedbackSecuencia(porcentajeCorrecto);
    actualizarPuntuacionSecuencia(porcentajeCorrecto);
    actualizarInterfazSecuencia();
}

function mostrarFeedbackSecuencia(porcentajeCorrecto) {
    const feedbackSequence = document.getElementById('sequence-feedback');
    if (!feedbackSequence) return;
    
    if (porcentajeCorrecto === 100) {
        feedbackSequence.textContent = '¡Perfecto! Secuencia correcta 🎶';
        feedbackSequence.className = 'feedback-message correct';
        reproducirSonido('exito');
    } else if (porcentajeCorrecto >= 70) {
        feedbackSequence.textContent = '¡Casi! Intenta nuevamente';
        feedbackSequence.className = 'feedback-message almost';
    } else {
        feedbackSequence.textContent = 'Sigue practicando';
        feedbackSequence.className = 'feedback-message incorrect';
        reproducirSonido('error');
    }
}

function actualizarPuntuacionSecuencia(porcentajeCorrecto) {
    if (porcentajeCorrecto === 100) {
        puntuacionSecuencia += nivelSecuencia * 15;
        
        if (puntuacionSecuencia >= nivelSecuencia * 30) {
            nivelSecuencia = Math.min(nivelSecuencia + 1, 5);
            mostrarCelebracion(`¡Subiste al nivel ${nivelSecuencia} en Ordenar Sonidos!`);
        }
    }
}

function actualizarInterfazSecuencia() {
    const scoreElement = document.getElementById('sequence-score');
    const levelElement = document.getElementById('sequence-level');
    
    if (scoreElement) scoreElement.textContent = puntuacionSecuencia;
    if (levelElement) levelElement.textContent = nivelSecuencia;
}

// ==================== JUEGO DE MEMORAMA ====================

function inicializarMemorama() {
    const restartBtn = document.getElementById('restart-memory');
    if (restartBtn) {
        restartBtn.addEventListener('click', reiniciarMemorama);
    }
    reiniciarMemorama();
}

function reiniciarMemorama() {
    intentosMemoria = 0;
    parejasEncontradas = 0;
    cartasVolteadas = [];
    puedeVoltear = true;

    actualizarInterfazMemorama();
    crearCartasMemoria();
}

function actualizarInterfazMemorama() {
    const attemptsElement = document.getElementById('memory-attempts');
    const matchesElement = document.getElementById('memory-matches');
    
    if (attemptsElement) attemptsElement.textContent = intentosMemoria;
    if (matchesElement) matchesElement.textContent = `${parejasEncontradas}/6`;
}

function crearCartasMemoria() {
    const tablero = document.getElementById('memory-board');
    if (!tablero) return;
    
    tablero.innerHTML = '';
    
    // Seleccionar 6 sonidos aleatorios y duplicarlos para formar parejas
    const sonidosParaMemoria = mezclarArray([...sonidos]).slice(0, 6);
    const cartas = [];
    
    sonidosParaMemoria.forEach(sonido => {
        cartas.push({...sonido, id: Math.random()});
        cartas.push({...sonido, id: Math.random()});
    });
    
    // Mezclar y crear las cartas
    mezclarArray(cartas).forEach((sonido, index) => {
        crearCartaMemoria(sonido, index);
    });
}

function crearCartaMemoria(sonido, index) {
    const tablero = document.getElementById('memory-board');
    if (!tablero) return;
    
    const carta = document.createElement('div');
    carta.className = 'memory-card';
    carta.dataset.index = index;
    carta.dataset.sonido = sonido.audio;
    
    carta.innerHTML = `
        <div class="card-front"></div>
        <div class="card-back">
            <div class="sound-icon">${sonido.icono}</div>
            <p>${sonido.nombre}</p>
        </div>
    `;
    
    carta.addEventListener('click', () => voltearCarta(carta));
    tablero.appendChild(carta);
}

function voltearCarta(carta) {
    if (!puedeVoltear || carta.classList.contains('flipped') || carta.classList.contains('matched')) return;

    carta.classList.add('flipped');
    cartasVolteadas.push(carta);
    
    // Reproducir sonido al voltear
    reproducirSonido(carta.dataset.sonido);

    if (cartasVolteadas.length === 2) {
        puedeVoltear = false;
        intentosMemoria++;
        actualizarInterfazMemorama();
        verificarPareja();
    }
}

function verificarPareja() {
    const sonido1 = cartasVolteadas[0].dataset.sonido;
    const sonido2 = cartasVolteadas[1].dataset.sonido;

    if (sonido1 === sonido2) {
        parejaEncontrada();
    } else {
        noEsPareja();
    }
}

function parejaEncontrada() {
    setTimeout(() => {
        cartasVolteadas.forEach(c => {
            c.classList.add('matched');
            c.classList.add('bounce');
        });

        parejasEncontradas++;
        actualizarInterfazMemorama();
        reproducirSonido('exito');

        // Reproducir el nombre del sonido
        const sonido = sonidos.find(s => s.audio === cartasVolteadas[0].dataset.sonido);
        if (sonido) {
            setTimeout(() => reproducirSonido(sonido.audio), 300);
        }

        verificarJuegoCompleto();
        reiniciarCartasVolteadas();
    }, 500);
}

function noEsPareja() {
    setTimeout(() => {
        cartasVolteadas.forEach(c => c.classList.remove('flipped'));
        reiniciarCartasVolteadas();
    }, 1000);
}

function verificarJuegoCompleto() {
    if (parejasEncontradas === 6) {
        setTimeout(() => {
            mostrarCelebracion(`¡Completaste el memorama en ${intentosMemoria} intentos!`);
        }, 1000);
    }
}

function reiniciarCartasVolteadas() {
    cartasVolteadas = [];
    puedeVoltear = true;
}

// ==================== FUNCIONES AUXILIARES ====================

function reproducirSonido(tipo) {
    const audioElement = document.getElementById(`audio-${tipo}`);
    if (audioElement) {
        audioElement.currentTime = 0;
        audioElement.play().catch(error => {
            console.error(`Error al reproducir sonido ${tipo}:`, error);
        });
    }
}

function mostrarCelebracion(mensaje) {
    const modal = document.getElementById('celebration-modal');
    const messageElement = document.getElementById('celebration-message');
    
    if (modal && messageElement) {
        messageElement.textContent = mensaje;
        modal.style.display = 'flex';
    }
}

function mezclarArray(array) {
    const nuevoArray = [...array];
    for (let i = nuevoArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nuevoArray[i], nuevoArray[j]] = [nuevoArray[j], nuevoArray[i]];
    }
    return nuevoArray;
}