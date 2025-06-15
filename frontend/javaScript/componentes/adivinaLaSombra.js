document.addEventListener("DOMContentLoaded", function () {
    // Configurar el botón de continuar del modal de celebración
    document.getElementById('continue-button').addEventListener('click', () => {
        document.getElementById('celebration-modal').style.display = 'none';
        // Podrías añadir lógica aquí para avanzar al siguiente ejercicio o reiniciar si lo deseas
        // Por ahora, solo cierra el modal.
    });

    // Configurar el botón de "¡Entendido!" del modal de instrucciones
    document.getElementById('start-activity-button').addEventListener('click', () => {
        document.getElementById('instructions-modal').style.display = 'none';
    });

    // Mostrar instrucciones al cargar la página por primera vez
    mostrarInstruccionesSombra();

    // Generar y mostrar los ejercicios de adivina la sombra
    generarEjerciciosAdivinaSombra();
});

// Función para mostrar las instrucciones específicas de "Adivina la Sombra"
function mostrarInstruccionesSombra() {
    let contenido = `
        <p>¡Bienvenido al juego "Adivina la Sombra"!</p>
        <ul>
            <li>Observa la imagen de color que aparece arriba.</li>
            <li>Mira las diferentes sombras que se muestran debajo.</li>
            <li>Haz clic en la sombra que crees que corresponde a la imagen de color.</li>
            <li>¡Presta mucha atención a la forma y los detalles!</li>
        </ul>
        <p>¡Diviértete encontrando las sombras correctas!</p>
    `;

    document.getElementById('instructions-content').innerHTML = contenido;
    document.getElementById('instructions-modal').style.display = 'flex';
}

// Datos de los ejercicios (puedes añadir más si lo deseas)
// Asegúrate de tener estas imágenes en tu proyecto.
// Sugerencia: crea una carpeta en 'imagenes/adivinaLaSombra/' para estas.
const ejerciciosSombra = [
    {
        objeto: "../../imagenes/adivinaLaSombra/manzana.png", // Imagen del objeto a color
        sombraCorrecta: "../../imagenes/adivinaLaSombra/sombra_manzana.png", // Sombra correcta
        otrasSombras: [
            "../../imagenes/adivinaLaSombra/sombra_platano.png",
            "../../imagenes/adivinaLaSombra/sombra_pera.png"
        ]
    },
    {
        objeto: "../../imagenes/adivinaLaSombra/gato.png",
        sombraCorrecta: "../../imagenes/adivinaLaSombra/sombra_gato.png",
        otrasSombras: [
            "../../imagenes/adivinaLaSombra/sombra_perro.png",
            "../../imagenes/adivinaLaSombra/sombra_conejo.png"
        ]
    },
    {
        objeto: "../../imagenes/adivinaLaSombra/casa.png",
        sombraCorrecta: "../../imagenes/adivinaLaSombra/sombra_casa.png",
        otrasSombras: [
            "../../imagenes/adivinaLaSombra/sombra_arbol.png",
            "../../imagenes/adivinaLaSombra/sombra_coche.png"
        ]
    },
    {
        objeto: "../../imagenes/adivinaLaSombra/flor.png",
        sombraCorrecta: "../../imagenes/adivinaLaSombra/sombra_flor.png",
        otrasSombras: [
            "../../imagenes/adivinaLaSombra/sombra_estrella.png",
            "../../imagenes/adivinaLaSombra/sombra_nube.png"
        ]
    },
    {
        objeto: "../../imagenes/adivinaLaSombra/sol.png",
        sombraCorrecta: "../../imagenes/adivinaLaSombra/sombra_sol.png",
        otrasSombras: [
            "../../imagenes/adivinaLaSombra/sombra_luna.png",
            "../../imagenes/adivinaLaSombra/sombra_paraguas.png"
        ]
    }
];

// Función para generar dinámicamente los ejercicios
function generarEjerciciosAdivinaSombra() {
    const contenedorEjercicios = document.getElementById('shadow-exercises-grid');
    contenedorEjercicios.innerHTML = ''; // Limpiar por si acaso

    ejerciciosSombra.forEach((ejercicio, index) => {
        const ejercicioContainer = document.createElement('div');
        ejercicioContainer.classList.add('exercise-container');
        ejercicioContainer.id = `shadow-exercise-${index + 1}`;

        // Imagen del objeto a color
        const objetoImg = document.createElement('img');
        objetoImg.src = ejercicio.objeto;
        objetoImg.alt = `Objeto ${index + 1}`;
        objetoImg.classList.add('object-image');
        ejercicioContainer.appendChild(objetoImg);

        // Contenedor para las opciones de sombra
        const opcionesContainer = document.createElement('div');
        opcionesContainer.classList.add('shadow-options-container');

        // Combinar sombra correcta y otras sombras, y mezclar
        let todasLasSombras = [ejercicio.sombraCorrecta, ...ejercicio.otrasSombras];
        todasLasSombras = mezclarArray(todasLasSombras); // Reutilizamos la función de mezcla

        todasLasSombras.forEach(sombraSrc => {
            const sombraDiv = document.createElement('div');
            sombraDiv.classList.add('shadow-option');
            
            const sombraImg = document.createElement('img');
            sombraImg.src = sombraSrc;
            sombraImg.alt = "Sombra";

            sombraDiv.appendChild(sombraImg);

            // Añadir el evento de clic a cada opción de sombra
            sombraDiv.addEventListener('click', () => {
                verificarSombra(sombraSrc, ejercicio.sombraCorrecta, sombraDiv, opcionesContainer);
            });
            opcionesContainer.appendChild(sombraDiv);
        });

        ejercicioContainer.appendChild(opcionesContainer);
        contenedorEjercicios.appendChild(ejercicioContainer);
    });
}

// Función para verificar la sombra seleccionada
function verificarSombra(sombraSeleccionada, sombraCorrecta, elementoClicado, contenedorOpciones) {
    // Deshabilitar todas las opciones después de la primera selección
    Array.from(contenedorOpciones.children).forEach(optionDiv => {
        optionDiv.style.pointerEvents = 'none'; // Evita más clics
    });

    if (sombraSeleccionada === sombraCorrecta) {
        elementoClicado.classList.add("correct");
        mostrarFeedback(true, "¡Excelente! Has encontrado la sombra correcta.");
    } else {
        elementoClicado.classList.add("incorrect");
        // Opcional: Resaltar la sombra correcta también para que el niño aprenda
        Array.from(contenedorOpciones.children).forEach(optionDiv => {
            if (optionDiv.querySelector('img').src.includes(sombraCorrecta.split('/').pop())) { // Compara solo el nombre del archivo
                optionDiv.classList.add('correct');
            }
        });
        mostrarFeedback(false, "¡Ups! Esa no era la sombra. ¡Sigue intentando!");
    }
}

// Función para mostrar feedback visual y de audio (reutilizada de abecedario.js)
function mostrarFeedback(esCorrecto, mensaje) {
    const audioSuccess = document.getElementById('audio-success');
    const audioError = document.getElementById('audio-error');

    // Reproducir sonido
    const audio = esCorrecto ? audioSuccess : audioError;
    audio.currentTime = 0; // Reiniciar el audio si ya está sonando
    audio.play().catch(e => console.error("Error al reproducir audio:", e));

    // Mostrar mensaje en modal
    document.getElementById('celebration-message').textContent = mensaje;
    document.getElementById('celebration-modal').style.display = 'flex';
}

// Función para mezclar un array (Fisher-Yates) - Reutilizada de abecedario.js
function mezclarArray(array) {
    const nuevoArray = [...array];
    for (let i = nuevoArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nuevoArray[i], nuevoArray[j]] = [nuevoArray[j], nuevoArray[i]];
    }
    return nuevoArray;
}