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
const estadoJuego = {
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
    // Mostrar instrucciones al inicio
    elementos.modalInstrucciones.style.display = 'flex';

    // Configurar eventos
    elementos.botonIniciarJuego.addEventListener('click', iniciarJuego);
    elementos.botonComprobar.addEventListener('click', comprobarPalabra);
    elementos.botonPista.addEventListener('click', darPista);
    elementos.botonSiguiente.addEventListener('click', cargarSiguientePalabra);
    elementos.botonContinuar.addEventListener('click', () => {
        elementos.modalCelebracion.style.display = 'none';
        cargarSiguientePalabra();
    });
});

// Iniciar el juego
function iniciarJuego() {
    elementos.modalInstrucciones.style.display = 'none';
    reiniciarJuego();
    cargarPalabra();
}

// Reiniciar el juego
function reiniciarJuego() {
    estadoJuego.nivelActual = 1;
    estadoJuego.puntuacion = 0;
    estadoJuego.indicePalabraActual = 0;
    estadoJuego.palabrasCompletadas = 0;
    actualizarInterfaz();
}

// Cargar una palabra
function cargarPalabra() {
    // Obtener la palabra actual según el nivel
    const palabrasNivel = palabrasPorNivel[estadoJuego.nivelActual];
    const datosPalabra = palabrasNivel[estadoJuego.indicePalabraActual];

    estadoJuego.palabraActual = datosPalabra.palabra;
    estadoJuego.pistasUsadas = 0;

    // Actualizar la imagen
    elementos.imagenPalabra.src = `../../imagenes/${datosPalabra.imagen}`;

    // Crear espacios para las letras
    crearEspaciosLetras(estadoJuego.palabraActual);

    // Crear banco de letras
    crearBancoLetras(estadoJuego.palabraActual);

    // Resetear botones
    elementos.botonSiguiente.disabled = true;
    elementos.botonPista.disabled = false;

    actualizarInterfaz();
}

// Crear espacios para las letras
function crearEspaciosLetras(palabra) {
    elementos.contenedorPalabra.innerHTML = '';

    for (let i = 0; i < palabra.length; i++) {
        const espacioLetra = document.createElement('div');
        espacioLetra.className = 'letter-space';
        espacioLetra.dataset.index = i;

        // Configurar para recibir letras arrastradas
        espacioLetra.addEventListener('dragover', (e) => {
            e.preventDefault();
            espacioLetra.classList.add('highlight');
        });

        espacioLetra.addEventListener('dragleave', () => {
            espacioLetra.classList.remove('highlight');
        });

        espacioLetra.addEventListener('drop', (e) => {
            e.preventDefault();
            espacioLetra.classList.remove('highlight');

            // Obtener la letra arrastrada
            const idLetra = e.dataTransfer.getData('text/plain');
            const fichaLetra = document.getElementById(idLetra);

            // Si ya hay una letra en este espacio, devolverla al banco
            if (espacioLetra.hasChildNodes()) {
                const letraAnterior = espacioLetra.firstChild;
                elementos.bancoLetras.appendChild(letraAnterior);
                letraAnterior.classList.remove('placed-letter');
            }

            // Colocar la nueva letra
            espacioLetra.appendChild(fichaLetra);
            fichaLetra.classList.add('placed-letter');
        });

        elementos.contenedorPalabra.appendChild(espacioLetra);
    }
}

// Crear banco de letras
function crearBancoLetras(palabra) {
    elementos.bancoLetras.innerHTML = '';

    // Crear array con las letras de la palabra
    let letras = palabra.split('');

    // Añadir algunas letras adicionales para confundir
    const alfabeto = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
    const cantidadLetrasExtra = Math.min(5, Math.max(2, Math.floor(palabra.length / 2)));

    for (let i = 0; i < cantidadLetrasExtra; i++) {
        const letraAleatoria = alfabeto[Math.floor(Math.random() * alfabeto.length)];
        letras.push(letraAleatoria);
    }

    // Mezclar las letras
    letras = mezclarArray(letras);

    // Crear los elementos de las letras
    letras.forEach((letra, indice) => {
        const fichaLetra = document.createElement('div');
        fichaLetra.className = 'letter-tile';
        fichaLetra.textContent = letra;
        fichaLetra.id = `letra-${indice}`;
        fichaLetra.draggable = true;

        // Configurar eventos de arrastre
        fichaLetra.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', fichaLetra.id);
        });

        // Permitir hacer clic en las letras ya colocadas para devolverlas al banco
        fichaLetra.addEventListener('click', () => {
            if (fichaLetra.classList.contains('placed-letter')) {
                elementos.bancoLetras.appendChild(fichaLetra);
                fichaLetra.classList.remove('placed-letter');
            }
        });

        elementos.bancoLetras.appendChild(fichaLetra);
    });
}

// Verificar la palabra formada
function comprobarPalabra() {
    const espaciosLetras = elementos.contenedorPalabra.querySelectorAll('.letter-space');
    let palabraFormada = '';
    let todosEspaciosLlenos = true;

    // Recopilar las letras colocadas
    espaciosLetras.forEach(espacio => {
        if (espacio.firstChild) {
            palabraFormada += espacio.firstChild.textContent;
        } else {
            todosEspaciosLlenos = false;
        }
    });

    // Verificar si todos los espacios están llenos
    if (!todosEspaciosLlenos) {
        sacudirElemento(elementos.contenedorPalabra);
        return;
    }

    // Verificar si la palabra es correcta
    if (palabraFormada === estadoJuego.palabraActual) {
        // Palabra correcta
        const puntosGanados = calcularPuntos();
        estadoJuego.puntuacion += puntosGanados;
        estadoJuego.palabrasCompletadas++;

        // Reproducir sonido de éxito
        let audioExito = new Audio("../../audios/exito.mp3");
        audioExito.play().catch(e => console.error("Error al reproducir sonido de éxito:", e));

        // Actualizar mensaje de celebración
        elementos.mensajeCelebracion.textContent = `¡Correcto! Has ganado ${puntosGanados} puntos.`;

        // Mostrar modal de celebración
        elementos.modalCelebracion.style.display = 'flex';

        // Habilitar botón de siguiente
        elementos.botonSiguiente.disabled = false;
        elementos.botonPista.disabled = true;

        actualizarInterfaz();
    } else {
        // Palabra incorrecta
        sacudirElemento(elementos.contenedorPalabra);
        // Reproducir sonido de error
        let audioError = new Audio("../../audios/error.mp3");
        audioError.play().catch(e => console.error("Error al reproducir sonido de error:", e));
        // Mostrar mensaje de ánimo
        setTimeout(() => {
            alert("Intenta de nuevo.");
        }, 500);
    }
}

// Calcular puntos ganados
function calcularPuntos() {
    // Base de puntos según el nivel
    const puntoBase = estadoJuego.nivelActual * 10;

    // Restar puntos por pistas usadas
    const penalizacionPistas = estadoJuego.pistasUsadas * 5;

    return Math.max(puntoBase - penalizacionPistas, 5);
}

// Dar una pista
function darPista() {
    if (estadoJuego.pistasUsadas >= estadoJuego.maxPistasPorPalabra) {
        return;
    }

    const espaciosLetras = elementos.contenedorPalabra.querySelectorAll('.letter-space');
    const espaciosVacios = [];

    // Encontrar espacios vacíos
    espaciosLetras.forEach(espacio => {
        if (!espacio.firstChild) {
            espaciosVacios.push(espacio);
        }
    });

    if (espaciosVacios.length === 0) {
        return;
    }

    // Seleccionar un espacio vacío al azar
    const espacioAleatorio = espaciosVacios[Math.floor(Math.random() * espaciosVacios.length)];
    const indiceEspacio = parseInt(espacioAleatorio.dataset.index);

    // Encontrar la letra correcta en el banco
    const letraCorrecta = estadoJuego.palabraActual[indiceEspacio];
    const fichasLetras = elementos.bancoLetras.querySelectorAll('.letter-tile');

    let fichaCorrecta = null;

    for (const ficha of fichasLetras) {
        if (ficha.textContent === letraCorrecta && !ficha.classList.contains('placed-letter')) {
            fichaCorrecta = ficha;
            break;
        }
    }

    if (fichaCorrecta) {
        // Colocar la letra correcta en el espacio
        espacioAleatorio.appendChild(fichaCorrecta);
        fichaCorrecta.classList.add('placed-letter');
        fichaCorrecta.classList.add('hint-letter');

        // Incrementar contador de pistas usadas
        estadoJuego.pistasUsadas++;

        // Deshabilitar el botón de pista si se alcanzó el máximo
        if (estadoJuego.pistasUsadas >= estadoJuego.maxPistasPorPalabra) {
            elementos.botonPista.disabled = true;
        }
    }
}

// Cargar la siguiente palabra
function cargarSiguientePalabra() {
    estadoJuego.indicePalabraActual++;

    // Verificar si se completaron todas las palabras del nivel actual
    if (estadoJuego.indicePalabraActual >= palabrasPorNivel[estadoJuego.nivelActual].length) {
        // Avanzar al siguiente nivel
        estadoJuego.nivelActual = Math.min(estadoJuego.nivelActual + 1, Object.keys(palabrasPorNivel).length);
        estadoJuego.indicePalabraActual = 0;
    }

    cargarPalabra();
}

// Actualizar la interfaz de usuario
function actualizarInterfaz() {
    elementos.mostrarPuntuacion.textContent = estadoJuego.puntuacion;
    elementos.mostrarNivel.textContent = estadoJuego.nivelActual;
}

// Función para animar sacudida de elemento
function sacudirElemento(elemento) {
    elemento.classList.add('shake');
    setTimeout(() => {
        elemento.classList.remove('shake');
    }, 500);
}

// Función para mezclar un array (algoritmo Fisher-Yates)
function mezclarArray(array) {
    const nuevoArray = [...array];
    for (let i = nuevoArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nuevoArray[i], nuevoArray[j]] = [nuevoArray[j], nuevoArray[i]];
    }
    return nuevoArray;
}