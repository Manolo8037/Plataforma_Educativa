// Banco de palabras por nivel
const palabrasPorNivel = {
    1: [
        { palabra: "SOL", imagen: "sol.jpg" },
        { palabra: "PAN", imagen: "pan.jpg" },
        { palabra: "OSO", imagen: "oso.jpg" },
        { palabra: "MAR", imagen: "mar.jpg" },
        { palabra: "UVA", imagen: "uva.jpg" }
    ],
    2: [
        { palabra: "CASA", imagen: "casa.jpg" },
        { palabra: "GATO", imagen: "gato.jpg" },
        { palabra: "PATO", imagen: "pato.jpg" },
        { palabra: "LUNA", imagen: "luna.jpg" },
        { palabra: "PERA", imagen: "pera.jpg" }
    ],
    3: [
        { palabra: "PERRO", imagen: "perro.jpg" },
        { palabra: "ARBOL", imagen: "arbol.jpg" },
        { palabra: "LIBRO", imagen: "libro.jpg" },
        { palabra: "FLOR", imagen: "flor.png" },
        { palabra: "NUBE", imagen: "nube.jpg" }
    ],
    4: [
        { palabra: "ESCUELA", imagen: "escuela.jpg" },
        { palabra: "PELOTA", imagen: "pelota.jpg" },
        { palabra: "ZAPATO", imagen: "zapato.jpg" },
        { palabra: "ESTRELLA", imagen: "estrella.jpg" },
        { palabra: "MANZANA", imagen: "manzana.jpg" }
    ],
    5: [
        { palabra: "ELEFANTE", imagen: "elefante.jpg" },
        { palabra: "MARIPOSA", imagen: "mariposa.jpg" },
        { palabra: "DINOSAURIO", imagen: "dinosaurio.jpg" },
        { palabra: "CHOCOLATE", imagen: "chocolate.jpg" },
        { palabra: "BICICLETA", imagen: "bicicleta.jpg" }
    ]
};

// Estado del juego
let estadoJuego = {
    nivelActual: 1,
    puntuacion: 0,
    indicePalabraActual: 0,
    palabraActual: "",
    pistasUsadas: 0,
    maxPistasPorPalabra: 2,
    palabrasCompletadas: 0
};

// Elementos del DOM
const elementos = {
    imagenPalabra: document.getElementById('wordImage'),
    contenedorPalabra: document.getElementById('wordTarget'),
    bancoLetras: document.getElementById('lettersBank'),
    botonComprobar: document.getElementById('checkButton'),
    botonPista: document.getElementById('hintButton'),
    botonSiguiente: document.getElementById('nextButton'),
    // --- NUEVO ---
    botonGuardar: document.getElementById('saveButton'),
    // -------------
    mostrarPuntuacion: document.querySelector('#score span'),
    mostrarNivel: document.querySelector('#level span'),
    modalCelebracion: document.getElementById('celebrationModal'),
    mensajeCelebracion: document.getElementById('celebrationMessage'),
    botonContinuar: document.getElementById('continueButton'),
    modalInstrucciones: document.getElementById('instructionsModal'),
    botonIniciarJuego: document.getElementById('startGameButton')
};

// Inicializar el juego
document.addEventListener('DOMContentLoaded', () => {
    // --- NUEVO: Cargar progreso guardado al iniciar ---
    cargarProgreso();
    // --------------------------------------------------

    elementos.modalInstrucciones.style.display = 'flex';

    elementos.botonIniciarJuego.addEventListener('click', iniciarJuego);
    elementos.botonComprobar.addEventListener('click', comprobarPalabra);
    elementos.botonPista.addEventListener('click', darPista);
    elementos.botonSiguiente.addEventListener('click', cargarSiguientePalabra);
    // --- NUEVO: Añadir evento al botón de guardar ---
    elementos.botonGuardar.addEventListener('click', guardarProgreso);
    // ------------------------------------------------
    elementos.botonContinuar.addEventListener('click', () => {
        elementos.modalCelebracion.style.display = 'none';
        cargarSiguientePalabra();
    });
});

// --- NUEVA FUNCIÓN: Guardar el progreso en localStorage ---
function guardarProgreso() {
    // Convierte el objeto de estado del juego a un texto JSON para poder guardarlo
    localStorage.setItem('progresoJuegoPalabras', JSON.stringify(estadoJuego));
    alert('¡Progreso guardado!'); // Muestra una confirmación al usuario
}
// -------------------------------------------------------

// --- NUEVA FUNCIÓN: Cargar el progreso desde localStorage ---
function cargarProgreso() {
    const progresoGuardado = localStorage.getItem('progresoJuegoPalabras');
    if (progresoGuardado) {
        // Si hay datos guardados, pregunta al usuario si quiere continuar
        if (confirm('Hemos encontrado un progreso guardado. ¿Quieres continuar donde lo dejaste?')) {
            // Si acepta, actualiza el estado del juego con los datos guardados
            estadoJuego = JSON.parse(progresoGuardado);
        } else {
            // Si no, borra el progreso guardado para empezar de cero
            localStorage.removeItem('progresoJuegoPalabras');
        }
    }
}
// ---------------------------------------------------------

function iniciarJuego() {
    elementos.modalInstrucciones.style.display = 'none';
    // Si el usuario no quiso continuar o no había nada, reinicia el estado visual
    if (!localStorage.getItem('progresoJuegoPalabras')) {
        reiniciarJuego();
    }
    // Carga la palabra correspondiente al estado actual (ya sea nuevo o cargado)
    cargarPalabra();
}

function reiniciarJuego() {
    estadoJuego.nivelActual = 1;
    estadoJuego.puntuacion = 0;
    estadoJuego.indicePalabraActual = 0;
    estadoJuego.palabrasCompletadas = 0;
    localStorage.removeItem('progresoJuegoPalabras'); // Limpia el guardado si se reinicia
    actualizarInterfaz();
}

function cargarPalabra() {
    const palabrasNivel = palabrasPorNivel[estadoJuego.nivelActual];
    // Asegurarse de que el índice no esté fuera de los límites
    if (estadoJuego.indicePalabraActual >= palabrasNivel.length) {
        estadoJuego.indicePalabraActual = 0;
    }
    const datosPalabra = palabrasNivel[estadoJuego.indicePalabraActual];

    estadoJuego.palabraActual = datosPalabra.palabra;
    estadoJuego.pistasUsadas = 0;

    elementos.imagenPalabra.src = `../../imagenes/palabras/${datosPalabra.imagen}`;
    crearEspaciosLetras(estadoJuego.palabraActual);
    crearBancoLetras(estadoJuego.palabraActual);

    elementos.botonSiguiente.disabled = true;
    elementos.botonPista.disabled = false;
    elementos.botonComprobar.disabled = false;

    actualizarInterfaz();
}

function crearEspaciosLetras(palabra) {
    elementos.contenedorPalabra.innerHTML = '';
    for (let i = 0; i < palabra.length; i++) {
        const espacioLetra = document.createElement('div');
        espacioLetra.className = 'letter-space';
        espacioLetra.dataset.index = i;
        configurarDrop(espacioLetra);
        elementos.contenedorPalabra.appendChild(espacioLetra);
    }
}

function crearBancoLetras(palabra) {
    elementos.bancoLetras.innerHTML = '';
    let letras = palabra.split('');
    const alfabeto = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
    const cantidadLetrasExtra = Math.min(5, Math.max(2, Math.floor(palabra.length / 2)));
    for (let i = 0; i < cantidadLetrasExtra; i++) {
        letras.push(alfabeto[Math.floor(Math.random() * alfabeto.length)]);
    }
    letras = mezclarArray(letras);
    letras.forEach((letra, indice) => {
        const fichaLetra = document.createElement('div');
        fichaLetra.className = 'letter-tile';
        fichaLetra.textContent = letra;
        fichaLetra.id = `letra-${indice}`;
        fichaLetra.draggable = true;
        configurarDrag(fichaLetra);
        elementos.bancoLetras.appendChild(fichaLetra);
    });
}

function configurarDrag(elemento) {
    elemento.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', elemento.id);
    });
    elemento.addEventListener('click', () => {
        if (elemento.classList.contains('placed-letter')) {
            elementos.bancoLetras.appendChild(elemento);
            elemento.classList.remove('placed-letter', 'hint-letter');
        }
    });
}

function configurarDrop(espacio) {
    espacio.addEventListener('dragover', (e) => {
        e.preventDefault();
        espacio.classList.add('highlight');
    });
    espacio.addEventListener('dragleave', () => {
        espacio.classList.remove('highlight');
    });
    espacio.addEventListener('drop', (e) => {
        e.preventDefault();
        espacio.classList.remove('highlight');
        const idLetra = e.dataTransfer.getData('text/plain');
        const fichaLetra = document.getElementById(idLetra);
        if (espacio.hasChildNodes()) {
            const letraAnterior = espacio.firstChild;
            elementos.bancoLetras.appendChild(letraAnterior);
            letraAnterior.classList.remove('placed-letter', 'hint-letter');
        }
        espacio.appendChild(fichaLetra);
        fichaLetra.classList.add('placed-letter');
    });
}

function comprobarPalabra() {
    const espaciosLetras = elementos.contenedorPalabra.querySelectorAll('.letter-space');
    let palabraFormada = '';
    let todosEspaciosLlenos = true;
    espaciosLetras.forEach(espacio => {
        if (espacio.firstChild) {
            palabraFormada += espacio.firstChild.textContent;
        } else {
            todosEspaciosLlenos = false;
        }
    });

    if (!todosEspaciosLlenos) {
        sacudirElemento(elementos.contenedorPalabra);
        return;
    }

    if (palabraFormada === estadoJuego.palabraActual) {
        const puntosGanados = calcularPuntos();
        estadoJuego.puntuacion += puntosGanados;
        estadoJuego.palabrasCompletadas++;
        let audioExito = new Audio("../../audios/exito.mp3");
        audioExito.play().catch(e => console.error("Error al reproducir sonido de éxito:", e));
        elementos.mensajeCelebracion.textContent = `¡Correcto! Has ganado ${puntosGanados} puntos.`;
        elementos.modalCelebracion.style.display = 'flex';
        elementos.botonSiguiente.disabled = false;
        elementos.botonPista.disabled = true;
        elementos.botonComprobar.disabled = true;
        actualizarInterfaz();
    } else {
        sacudirElemento(elementos.contenedorPalabra);
        let audioError = new Audio("../../audios/error.mp3");
        audioError.play().catch(e => console.error("Error al reproducir sonido de error:", e));
    }
}

function calcularPuntos() {
    const puntoBase = estadoJuego.nivelActual * 10;
    const penalizacionPistas = estadoJuego.pistasUsadas * 5;
    return Math.max(puntoBase - penalizacionPistas, 5);
}

function darPista() {
    if (estadoJuego.pistasUsadas >= estadoJuego.maxPistasPorPalabra) return;
    const espaciosVacios = Array.from(elementos.contenedorPalabra.querySelectorAll('.letter-space')).filter(e => !e.firstChild);
    if (espaciosVacios.length === 0) return;

    const espacioAleatorio = espaciosVacios[Math.floor(Math.random() * espaciosVacios.length)];
    const indiceEspacio = parseInt(espacioAleatorio.dataset.index);
    const letraCorrecta = estadoJuego.palabraActual[indiceEspacio];
    
    const fichasDisponibles = elementos.bancoLetras.querySelectorAll('.letter-tile');
    let fichaCorrecta = Array.from(fichasDisponibles).find(f => f.textContent === letraCorrecta);

    if (fichaCorrecta) {
        espacioAleatorio.appendChild(fichaCorrecta);
        fichaCorrecta.classList.add('placed-letter', 'hint-letter');
        estadoJuego.pistasUsadas++;
        if (estadoJuego.pistasUsadas >= estadoJuego.maxPistasPorPalabra) {
            elementos.botonPista.disabled = true;
        }
    }
}

function cargarSiguientePalabra() {
    estadoJuego.indicePalabraActual++;
    if (estadoJuego.indicePalabraActual >= palabrasPorNivel[estadoJuego.nivelActual].length) {
        estadoJuego.nivelActual = Math.min(estadoJuego.nivelActual + 1, Object.keys(palabrasPorNivel).length);
        estadoJuego.indicePalabraActual = 0;
    }
    cargarPalabra();
}

function actualizarInterfaz() {
    elementos.mostrarPuntuacion.textContent = estadoJuego.puntuacion;
    elementos.mostrarNivel.textContent = estadoJuego.nivelActual;
}

function sacudirElemento(elemento) {
    elemento.classList.add('shake');
    setTimeout(() => elemento.classList.remove('shake'), 500);
}

function mezclarArray(array) {
    const nuevoArray = [...array];
    for (let i = nuevoArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nuevoArray[i], nuevoArray[j]] = [nuevoArray[j], nuevoArray[i]];
    }
    return nuevoArray;
}