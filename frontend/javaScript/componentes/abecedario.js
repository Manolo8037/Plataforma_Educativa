document.addEventListener("DOMContentLoaded", function () {
    // Configurar navegación entre actividades
    const botonesActividad = document.querySelectorAll('.activity-btn');
    botonesActividad.forEach(boton => {
        boton.addEventListener('click', () => cambiarActividad(boton.dataset.activity));
    });
    
    // Inicializar secciones
    generarAbecedario();
    iniciarEjercicios();
    
    // Configurar botones de modales
    document.getElementById('continue-button').addEventListener('click', () => {
        document.getElementById('celebration-modal').style.display = 'none';
    });
    
    document.getElementById('start-activity-button').addEventListener('click', () => {
        document.getElementById('instructions-modal').style.display = 'none';
    });
    
    // Mostrar instrucciones iniciales
    mostrarInstrucciones('letters');
});

// Cambiar entre actividades
function cambiarActividad(actividad) {
    // Actualizar botones de navegación
    document.querySelectorAll('.activity-btn').forEach(boton => {
        boton.classList.toggle('active', boton.dataset.activity === actividad);
    });
    
    // Mostrar la sección correspondiente
    document.querySelectorAll('.activity-section').forEach(seccion => {
        seccion.classList.toggle('active', seccion.id === `${actividad}-section`);
    });
    
    // Mostrar instrucciones para la actividad
    mostrarInstrucciones(actividad);
}

// Mostrar instrucciones según la actividad
function mostrarInstrucciones(actividad) {
    let contenido = '';
    
    switch (actividad) {
        case 'letters':
            contenido = `
                <p>En esta sección podrás explorar todas las letras del abecedario:</p>
                <ul>
                    <li>Haz clic en cualquier letra para escuchar su sonido</li>
                    <li>Observa la forma de cada letra</li>
                    <li>Practica pronunciando cada una</li>
                </ul>
                <p>¡Prepárate para los juegos con las letras!</p>
            `;
            break;
        case 'find':
            contenido = `
                <p>¡Vamos a jugar a identificar letras!</p>
                <ul>
                    <li>Observa la imagen que aparece en pantalla</li>
                    <li>Escucha la pista de sonido si necesitas ayuda</li>
                    <li>Selecciona la letra que corresponde a la imagen</li>
                </ul>
                <p>¡Demuestra lo que has aprendido sobre las letras!</p>
            `;
            break;
        case 'build':
            contenido = `
                <p>¡Forma palabras con las letras!</p>
                <ul>
                    <li>Observa las letras desordenadas</li>
                    <li>Intenta formar la palabra correcta</li>
                    <li>Escribe tu respuesta en el campo de texto</li>
                    <li>Presiona "Verificar" para comprobar</li>
                </ul>
                <p>¡Construye palabras como un experto!</p>
            `;
            break;
        case 'match':
            contenido = `
                <p>¡Relaciona letras con imágenes!</p>
                <ul>
                    <li>Observa cuidadosamente cada imagen</li>
                    <li>Piensa con qué letra comienza esa palabra</li>
                    <li>Selecciona la letra correcta</li>
                </ul>
                <p>¡Este juego te ayudará a asociar letras con objetos!</p>
            `;
            break;
    }
    
    document.getElementById('instructions-content').innerHTML = contenido;
    document.getElementById('instructions-modal').style.display = 'flex';
}

// Generar el abecedario (adaptado de tu código original)
function generarAbecedario() {
    const letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
    const contenedor = document.getElementById("letras-container");
    
    letras.forEach(letra => {
        let div = document.createElement("div");
        div.classList.add("letter-card");
        div.textContent = letra;
        div.addEventListener("click", () => reproducirSonido(letra));
        contenedor.appendChild(div);
    });
}

// Reproducir sonido de letra (adaptado de tu código original)
function reproducirSonido(letra) {
    let audio = new Audio(`../../audios/Abecedario/${letra}.mp3`);
    audio.play().catch(error => {
        console.error(`Error al reproducir el sonido de la letra ${letra}:`, error);
    });
}

// Iniciar todos los ejercicios (adaptado de tu código original)
function iniciarEjercicios() {
    ejercicioEncuentraLetra();
    ejercicioFormaPalabra();
    ejercicioUneLetraImagen();
}

// Ejercicio Encuentra la Letra (adaptado de tu código original)
function ejercicioEncuentraLetra() {
    const ejercicios = [
        { 
            opciones: ["A", "B", "C", "D"], 
            correcta: "B",
            pista: "Esta letra suena 'be' y con ella comienza la palabra 'barco'",
            imagen: "https://th.bing.com/th/id/OIP.1jExQv5qDtfj7DmciWDWWwHaHa?rs=1&pid=ImgDetMain" 
        },
        { 
            opciones: ["E", "F", "G", "H"], 
            correcta: "F",
            pista: "Esta letra suena 'efe' y con ella comienza la palabra 'foca'",
            imagen: "https://thumbs.dreamstime.com/z/peque%C3%B1a-foca-gris-suave-sobre-un-fondo-blanco-ilustraci%C3%B3n-vectorial-en-estilo-de-caricatura-con-animales-lindos-al-las-196429007.jpg?w=576" 
        },
        { 
            opciones: ["I", "J", "K", "L"], 
            correcta: "K",
            pista: "Esta letra suena 'ka' y con ella comienza la palabra 'kilo'",
            imagen: "https://th.bing.com/th/id/OIP.UDCfhfCCAj6bUuGz076hWQHaHa?rs=1&pid=ImgDetMain" 
        }
    ];

    ejercicios.forEach((ejercicio, index) => {
        let container = document.getElementById(`encuentra-letra-${index + 1}`);
        if (!container) return;
        
        container.innerHTML = `
            <img src="${ejercicio.imagen}" alt="Pista" class="exercise-image">
            <p class="clue-text">${ejercicio.pista}</p>
            <div class="options-container" id="options-${index}"></div>
            <button class="btn btn-sound">🔊 Escuchar pista</button>
        `;
        
        // Configurar botón de sonido
        container.querySelector('.btn-sound').addEventListener('click', () => {
            reproducirSonido(ejercicio.correcta);
        });
        
        // Agregar opciones
        const opcionesContainer = container.querySelector('.options-container');
        ejercicio.opciones.forEach(opcion => {
            let btn = document.createElement("button");
            btn.textContent = opcion;
            btn.classList.add("letter-option");
            btn.addEventListener("click", () => verificarRespuesta(opcion, ejercicio.correcta, btn));
            opcionesContainer.appendChild(btn);
        });
    });
}

// Ejercicio Forma Palabra (adaptado de tu código original)
function ejercicioFormaPalabra() {
    const ejercicios = [
        { palabra: "SOL" },
        { palabra: "LUNA" },
        { palabra: "ESTRELLA" }
    ];

    ejercicios.forEach((ejercicio, index) => {
        let container = document.getElementById(`forma-palabra-${index + 1}`);
        if (!container) return;
        
        let desordenada = ejercicio.palabra.split("").sort(() => Math.random() - 0.5);
        
        container.innerHTML = `
            <p class="clue-text">Letras: ${desordenada.join(" ")}</p>
            <input type="text" class="word-input" placeholder="Escribe la palabra">
            <button class="btn btn-verify">Verificar</button>
        `;
        
        // Configurar botón de verificación
        container.querySelector('.btn-verify').addEventListener('click', () => {
            const input = container.querySelector('.word-input');
            if (input.value.toUpperCase() === ejercicio.palabra) {
                mostrarFeedback(true, `¡Correcto! La palabra es ${ejercicio.palabra}`);
            } else {
                mostrarFeedback(false, "Intenta de nuevo. Observa bien las letras.");
            }
        });
    });
}

// Ejercicio Une Letra con Imagen (adaptado de tu código original)
function ejercicioUneLetraImagen() {
    const ejercicios = [
        { imagen: "https://th.bing.com/th/id/R.bc8762116d674fb39f39d7e0ae5c8ce5?rik=CjVgsorNvqQRQg&pid=ImgRaw&r=0", correcta: "M", opciones: ["M", "L", "Z"] },
        { imagen: "https://purepng.com/public/uploads/large/purepng.com-bananafruitsyellowfruit-981524754330lspp8.png", correcta: "B", opciones: ["B", "N", "R"] },
        { imagen: "https://th.bing.com/th/id/OIP.doS_PtnxzT-XbvZAwP6DqAHaFj?rs=1&pid=ImgDetMain", correcta: "U", opciones: ["U", "V", "G"] }
    ];

    ejercicios.forEach((ejercicio, index) => {
        let container = document.getElementById(`une-letra-imagen-${index + 1}`);
        if (!container) return;
        
        container.innerHTML = `
            <img src="${ejercicio.imagen}" alt="Imagen" class="exercise-image">
            <p class="clue-text">¿Con qué letra comienza?</p>
            <div class="options-container" id="options-match-${index}"></div>
        `;
        
        // Agregar opciones
        const opcionesContainer = container.querySelector('.options-container');
        ejercicio.opciones.forEach(opcion => {
            let btn = document.createElement("button");
            btn.textContent = opcion;
            btn.classList.add("letter-option");
            btn.addEventListener("click", () => verificarRespuesta(opcion, ejercicio.correcta, btn));
            opcionesContainer.appendChild(btn);
        });
    });
}

// Función para verificar respuestas (común para varios ejercicios)
function verificarRespuesta(respuesta, correcta, elemento) {
    if (respuesta === correcta) {
        elemento.classList.add("correct");
        mostrarFeedback(true, `¡Correcto! La letra es ${correcta}`);
    } else {
        elemento.classList.add("incorrect");
        mostrarFeedback(false, `Incorrecto. La letra correcta es ${correcta}`);
    }
}

// Mostrar feedback visual y de audio
function mostrarFeedback(esCorrecto, mensaje) {
    // Reproducir sonido
    const audio = esCorrecto ? document.getElementById('audio-success') : document.getElementById('audio-error');
    audio.currentTime = 0;
    audio.play().catch(console.error);
    
    // Mostrar mensaje en modal
    document.getElementById('celebration-message').textContent = mensaje;
    document.getElementById('celebration-modal').style.display = 'flex';
}

// Función para mezclar array (Fisher-Yates)
function mezclarArray(array) {
    const nuevoArray = [...array];
    for (let i = nuevoArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nuevoArray[i], nuevoArray[j]] = [nuevoArray[j], nuevoArray[i]];
    }
    return nuevoArray;
}