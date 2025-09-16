document.addEventListener("DOMContentLoaded", function () {
    // Configurar navegación entre actividades
    const botonesActividad = document.querySelectorAll('.activity-btn');
    botonesActividad.forEach(boton => {
        boton.addEventListener('click', () => cambiarActividad(boton.dataset.activity));
    });

    // Inicializar todas las secciones
    generarAbecedario();
    iniciarSilabas();
    iniciarEjercicios();

    // Configurar botones de modales
    document.getElementById('continue-button').addEventListener('click', () => {
        document.getElementById('celebration-modal').style.display = 'none';
    });
    document.getElementById('start-activity-button').addEventListener('click', () => {
        document.getElementById('instructions-modal').style.display = 'none';
    });

    // Mostrar instrucciones iniciales (solo una vez)
    mostrarInstrucciones('letters');
});

function cambiarActividad(actividad) {
    document.querySelectorAll('.activity-btn').forEach(boton => {
        boton.classList.toggle('active', boton.dataset.activity === actividad);
    });
    document.querySelectorAll('.activity-section').forEach(seccion => {
        seccion.classList.toggle('active', seccion.id === `${actividad}-section`);
    });
}

function mostrarInstrucciones(actividad) {
    let contenido = '';
    switch (actividad) {
        case 'letters':
            contenido = `
                <p>En esta sección podrás explorar todas las letras del abecedario:</p>
                <ul>
                    <li>Haz clic en cualquier letra para escuchar su sonido.</li>
                    <li>Observa la forma de cada letra y practica su sonido.</li>
                </ul>`;
            break;
        case 'syllables':
            contenido = `
                <p>¡Es hora de formar sílabas!</p>
                <ul>
                    <li>Selecciona una consonante de la cuadrícula de arriba.</li>
                    <li>Observa cómo se combina con las vocales A, E, I, O, U.</li>
                    <li>Haz clic en cada sílaba de colores para escuchar cómo suena.</li>
                </ul>`;
            break;
        case 'find':
            contenido = `
                <p>¡Vamos a jugar a identificar letras!</p>
                <ul>
                    <li>Observa la imagen que aparece en cada ejercicio.</li>
                    <li>Lee o escucha la pista para saber qué letra buscar.</li>
                    <li>Selecciona la letra correcta entre las opciones.</li>
                </ul>`;
            break;
        case 'build':
            contenido = `
                <p>¡Forma palabras con las letras!</p>
                <ul>
                    <li>Observa las letras desordenadas en cada ejercicio.</li>
                    <li>Intenta formar la palabra correcta en tu mente.</li>
                    <li>Escribe tu respuesta en el campo de texto y verifícala.</li>
                </ul>`;
            break;
        case 'match':
            contenido = `
                <p>¡Relaciona letras con imágenes!</p>
                <ul>
                    <li>Observa cuidadosamente cada imagen.</li>
                    <li>Piensa con qué letra comienza esa palabra.</li>
                    <li>Selecciona la letra correcta de las opciones.</li>
                </ul>`;
            break;
    }
    document.getElementById('instructions-content').innerHTML = contenido;
    document.getElementById('instructions-modal').style.display = 'flex';
}

// --- SECCIÓN DE SÍLABAS (REDiseñada) ---
function iniciarSilabas() {
    const consonantes = "BCDFGHJKLMNÑPQRSTVWXYZ".split("");
    const vocales = "AEIOU".split("");
    const selector = document.getElementById('consonant-selector');
    const display = document.getElementById('syllable-display');
    const levelSelector = document.getElementById('consonant-level-selector');

    // --- Lógica de Niveles ---
    const CONSONANTES_POR_NIVEL = 8; // Mostraremos 10 letras por nivel
    const totalNiveles = Math.ceil(consonantes.length / CONSONANTES_POR_NIVEL);

    // Función para crear los botones de Nivel 1, Nivel 2, etc.
    function crearBotonesDeNivel() {
        levelSelector.innerHTML = ''; // Limpiar botones de nivel
        for (let i = 1; i <= totalNiveles; i++) {
            const btn = document.createElement('button');
            btn.className = 'level-btn';
            btn.textContent = `Grupo ${i}`;
            btn.dataset.level = i; // Guardamos el número de nivel
            btn.addEventListener('click', () => {
                mostrarConsonantesPorNivel(i);
                // Marcar este botón de nivel como activo
                levelSelector.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
            levelSelector.appendChild(btn);
        }
    }

    // Función para mostrar las consonantes del nivel seleccionado
    function mostrarConsonantesPorNivel(nivel) {
        selector.innerHTML = ''; // Limpiar consonantes anteriores
        
        const inicio = (nivel - 1) * CONSONANTES_POR_NIVEL;
        const fin = inicio + CONSONANTES_POR_NIVEL;
        const consonantesDelNivel = consonantes.slice(inicio, fin);

        consonantesDelNivel.forEach(consonante => {
            const btn = document.createElement('button');
            btn.className = 'consonant-btn';
            btn.textContent = consonante;
            btn.addEventListener('click', () => {
                // Marcar como activo el botón de consonante presionado
                selector.querySelectorAll('.consonant-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                mostrarSilabas(consonante);
            });
            selector.appendChild(btn);
        });
    }
    
    // Función que muestra las sílabas (la que ya tenías)
    function mostrarSilabas(consonante) {
        display.innerHTML = '';
        const grid = document.createElement('div');
        grid.className = 'syllable-grid';
        vocales.forEach(vocal => {
            const silaba = consonante + vocal;
            const card = document.createElement('div');
            card.className = 'syllable-card';
            card.textContent = silaba;
            card.addEventListener('click', () => reproducirSonidoSilaba(silaba));
            grid.appendChild(card);
        });
        display.appendChild(grid);
    }

    // Iniciar todo
    crearBotonesDeNivel();
    mostrarConsonantesPorNivel(1); // Muestra el primer nivel por defecto
    levelSelector.querySelector('.level-btn[data-level="1"]').classList.add('active'); // Marca "Grupo 1" como activo
}


function reproducirSonidoSilaba(silaba) {
    let audio = new Audio(`../../audios/silabas/${silaba}.mp3`);
    audio.play().catch(error => {
        console.error(`Error al reproducir el sonido de la sílaba ${silaba}:`, error);
        alert(`Sonido para "${silaba}" no encontrado.`);
    });
}
function ejercicioFormaSilabas() {
    const grid = document.getElementById('build-syllables-grid');
    grid.innerHTML = ''; // Limpiar la cuadrícula

    const ejercicios = [
        // --- Nivel Fácil: Palabras de 2 sílabas (CVCV) ---
        { palabra: "GATO", silabas: ["GA", "TO"], opciones: ["MA", "TO", "LO", "GA"], imagen: "https://cdn-icons-png.flaticon.com/512/1998/1998592.png" },
        { palabra: "LUNA", silabas: ["LU", "NA"], opciones: ["NA", "PA", "SA", "LU"], imagen: "https://cdn-icons-png.flaticon.com/512/720/720588.png" },
        { palabra: "MESA", silabas: ["ME", "SA"], opciones: ["SA", "LA", "TE", "ME"], imagen: "https://cdn-icons-png.flaticon.com/512/3202/3202226.png" },
        { palabra: "PERA", silabas: ["PE", "RA"], opciones: ["RA", "BO", "PE", "MI"], imagen: "https://cdn-icons-png.flaticon.com/512/1393/1393529.png" },
        { palabra: "SOFA", silabas: ["SO", "FA"], opciones: ["FA", "SO", "NI", "ÑO"], imagen: "https://cdn-icons-png.flaticon.com/512/869/869425.png" },

        // --- Nivel Medio: Palabras de 2 sílabas (un poco más complejas) ---
        { palabra: "CAMA", silabas: ["CA", "MA"], opciones: ["MA", "CA", "ÑA", "PI"], imagen: "https://cdn-icons-png.flaticon.com/512/2838/2838914.png" },
        { palabra: "VASO", silabas: ["VA", "SO"], opciones: ["SO", "TE", "VA", "JA"], imagen: "https://cdn-icons-png.flaticon.com/512/931/931969.png" },
        { palabra: "PIÑA", silabas: ["PI", "ÑA"], opciones: ["ÑA", "MO", "NI", "PI"], imagen: "https://cdn-icons-png.flaticon.com/512/3098/3098481.png" },
        { palabra: "FOCA", silabas: ["FO", "CA"], opciones: ["CA", "FO", "LE", "TE"], imagen: "https://cdn-icons-png.flaticon.com/512/2831/2831154.png" },
        { palabra: "DADO", silabas: ["DA", "DO"], opciones: ["DO", "DE", "DA", "DI"], imagen: "https://images.vexels.com/media/users/3/154562/isolated/preview/26c8913a484323758336e788e0a174a7-dado-de-juego-rojo.png" },

        // --- Nivel Difícil: Palabras de 3 sílabas ---
        { palabra: "PELOTA", silabas: ["PE", "LO", "TA"], opciones: ["LO", "CA", "PE", "SA", "TA"], imagen: "https://cdn-icons-png.flaticon.com/512/885/885935.png" },
        { palabra: "ZAPATO", silabas: ["ZA", "PA", "TO"], opciones: ["TO", "ZA", "MA", "PA", "CO"], imagen: "https://cdn-icons-png.flaticon.com/512/3136/3136262.png" },
        { palabra: "CAMISA", silabas: ["CA", "MI", "SA"], opciones: ["SA", "PO", "MI", "CA", "TE"], imagen: "https://cdn-icons-png.flaticon.com/512/892/892411.png" },
        { palabra: "PALOMA", silabas: ["PA", "LO", "MA"], opciones: ["MA", "LO", "PA", "ÑA", "TE"], imagen: "https://cdn-icons-png.flaticon.com/512/1998/1998764.png" },
        { palabra: "CORONA", silabas: ["CO", "RO", "NA"], opciones: ["NA", "CO", "RE", "MO", "RO"], imagen: "https://cdn-icons-png.flaticon.com/512/179/179242.png" },
        
        // --- Nivel Experto: Palabras de 3 o 4 sílabas más complejas ---
        { palabra: "MARIPOSA", silabas: ["MA", "RI", "PO", "SA"], opciones: ["PO", "LI", "SA", "MA", "RI", "VE"], imagen: "https://cdn-icons-png.flaticon.com/512/1998/1998730.png" },
        { palabra: "ELEFANTE", silabas: ["E", "LE", "FAN", "TE"], opciones: ["FAN", "E", "SO", "TE", "LE", "JA"], imagen: "https://images.vexels.com/media/users/3/145529/isolated/preview/23300b81a28a39915967000f576e33e9-ilustraci-n-de-elefante-de-dibujos-animados.png" },
        { palabra: "BICICLETA", silabas: ["BI", "CI", "CLE", "TA"], opciones: ["CI", "TA", "BI", "CLE", "MO", "TO"], imagen: "https://cdn-icons-png.flaticon.com/512/2213/2213193.png" },
        { palabra: "CHOCOLATE", silabas: ["CHO", "CO", "LA", "TE"], opciones: ["TE", "CHO", "PA", "LA", "CO", "MA"], imagen: "https://cdn-icons-png.flaticon.com/512/1956/1956272.png" },
        { palabra: "PANTALON", silabas: ["PAN", "TA", "LON"], opciones: ["TA", "CA", "LON", "MI", "PAN", "SA"], imagen: "https://cdn-icons-png.flaticon.com/512/1867/1867621.png" }
    ];

    ejercicios.forEach((ejercicio, index) => {
        // ... (El resto del código de la función que genera la interfaz no necesita cambios)
        const container = document.createElement('div');
        container.className = 'exercise-container';

        container.innerHTML = `
            <img src="${ejercicio.imagen}" alt="${ejercicio.palabra}" class="exercise-image">
            <div class="syllable-game-container">
                <div class="syllable-target" id="target-${index}"></div>
                <div class="syllable-bank" id="bank-${index}"></div>
            </div>
            <button class="btn btn-verify">Verificar</button>
        `;

        const target = container.querySelector(`#target-${index}`);
        const bank = container.querySelector(`#bank-${index}`);

        // Crear espacios para soltar
        ejercicio.silabas.forEach(() => {
            const space = document.createElement('div');
            space.className = 'syllable-space';
            target.appendChild(space);
        });

        // Crear fichas de sílabas para arrastrar
        mezclarArray(ejercicio.opciones).forEach((silaba, i) => {
            const tile = document.createElement('div');
            tile.className = 'syllable-tile';
            tile.textContent = silaba;
            tile.id = `tile-${index}-${i}`;
            tile.draggable = true;
            bank.appendChild(tile);
        });

        configurarDragAndDrop(container, ejercicio);
        grid.appendChild(container);
    });
}

function configurarDragAndDrop(container, ejercicio) {
    const tiles = container.querySelectorAll('.syllable-tile');
    const spaces = container.querySelectorAll('.syllable-space');
    const bank = container.querySelector('.syllable-bank');
    let draggedTile = null;

    tiles.forEach(tile => {
        tile.addEventListener('dragstart', () => {
            draggedTile = tile;
            setTimeout(() => tile.style.display = 'none', 0);
        });
        tile.addEventListener('dragend', () => {
            draggedTile.style.display = 'flex';
            draggedTile = null;
        });
    });

    const dropZones = [...spaces, bank];

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', e => {
            e.preventDefault();
            if (zone.classList.contains('syllable-space')) {
                zone.classList.add('highlight');
            }
        });
        zone.addEventListener('dragleave', () => {
            if (zone.classList.contains('syllable-space')) {
                zone.classList.remove('highlight');
            }
        });
        zone.addEventListener('drop', e => {
            e.preventDefault();
            if (zone.classList.contains('syllable-space')) {
                zone.classList.remove('highlight');
                // Si el espacio ya tiene una ficha, la devolvemos al banco
                if (zone.children.length > 0) {
                    bank.appendChild(zone.firstElementChild);
                }
                zone.appendChild(draggedTile);
            } else if (zone.classList.contains('syllable-bank')) {
                zone.appendChild(draggedTile);
            }
        });
    });
    
    // Lógica del botón Verificar
    const verifyBtn = container.querySelector('.btn-verify');
    verifyBtn.addEventListener('click', () => {
        let palabraFormada = "";
        let completo = true;
        spaces.forEach(space => {
            if (space.children.length > 0) {
                palabraFormada += space.firstElementChild.textContent;
            } else {
                completo = false;
            }
        });

        if (!completo) {
            alert("Completa todos los espacios antes de verificar.");
            return;
        }

        if (palabraFormada === ejercicio.palabra) {
            mostrarFeedback(true, `¡Felicidades! Formaste la palabra ${ejercicio.palabra}`);
            verifyBtn.disabled = true;
            container.style.backgroundColor = '#d4edda';
        } else {
            const audio = document.getElementById('audio-error');
            audio.play();
            container.classList.add('shake');
            setTimeout(() => container.classList.remove('shake'), 500);
        }
    });
}


// --- FUNCIONES DE ACTIVIDADES ---

function generarAbecedario() {
    const letras = "ABCDEFGHIJKLMNÑPQRSTUVWXYZ".split("");
    const contenedor = document.getElementById("letras-container");
    contenedor.innerHTML = '';
    letras.forEach(letra => {
        let div = document.createElement("div");
        div.classList.add("letter-card");
        div.textContent = letra;
        div.addEventListener("click", () => reproducirSonido(letra));
        contenedor.appendChild(div);
    });
}

function reproducirSonido(letra) {
    let audio = new Audio(`../../audios/Abecedario/${letra}.mp3`);
    audio.play().catch(error => console.error(`Error al reproducir el sonido de la letra ${letra}:`, error));
}

function iniciarEjercicios() {
    ejercicioEncuentraLetra();
    ejercicioFormaPalabra();
    ejercicioUneLetraImagen();
    ejercicioFormaSilabas(); 
}

// --- EJERCICIOS COMPLETOS ---

function ejercicioEncuentraLetra() {
    const ejercicios = [
        // Nivel Fácil
        { opciones: ["A", "B", "C", "D"], correcta: "B", pista: "Con ella comienza la palabra 'barco'", imagen: "https://i.pinimg.com/originals/ce/c8/a1/cec8a107357c394b98453e003a30d52b.png" },
        { opciones: ["E", "F", "G", "H"], correcta: "F", pista: "Con ella comienza la palabra 'foca'", imagen: "https://cdn-icons-png.flaticon.com/512/2831/2831154.png" },
        { opciones: ["I", "J", "K", "L"], correcta: "K", pista: "Con ella comienza la palabra 'koala'", imagen: "https://cdn-icons-png.flaticon.com/512/1998/1998632.png" },
        // Nivel Medio
        { opciones: ["M", "I", "A", "Z"], correcta: "A", pista: "Con ella comienza la palabra 'araña'", imagen: "https://cdn-icons-png.flaticon.com/512/1844/1844307.png" },
        { opciones: ["O", "W", "T", "P"], correcta: "T", pista: "Con ella comienza la palabra 'taza'", imagen: "https://cdn-icons-png.flaticon.com/512/1182/1182103.png" },
        { opciones: ["S", "H", "P", "U"], correcta: "S", pista: "Con ella comienza la palabra 'sopa'", imagen: "https://cdn-icons-png.flaticon.com/512/3480/3480749.png" },
        // Nivel Difícil
        { opciones: ["V", "M", "Q", "Ñ"], correcta: "M", pista: "Con ella comienza la palabra 'manzana'", imagen: "https://cdn-icons-png.flaticon.com/512/415/415733.png" },
        { opciones: ["D", "B", "E", "O"], correcta: "O", pista: "Con ella comienza la palabra 'oreja'", imagen: "https://cdn-icons-png.flaticon.com/512/2043/2043831.png" },
        { opciones: ["X", "T", "I", "R"], correcta: "I", pista: "Con ella comienza la palabra 'iguana'", imagen: "https://cdn-icons-png.flaticon.com/512/3069/3069212.png" },
        // Nivel Experto
        { opciones: ["Y", "L", "N", "S"], correcta: "N", pista: "Con ella comienza la palabra 'nido'", imagen: "https://cdn-icons-png.flaticon.com/512/1012/1012716.png" },
        { opciones: ["P", "K", "D", "R"], correcta: "P", pista: "Con ella comienza la palabra 'patines'", imagen: "https://cdn-icons-png.flaticon.com/512/2553/2553805.png" },
        { opciones: ["N", "G", "V", "L"], correcta: "L", pista: "Con ella comienza la palabra 'limones'", imagen: "https://cdn-icons-png.flaticon.com/512/1135/1135528.png" }
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
        
        container.querySelector('.btn-sound').addEventListener('click', () => {
            reproducirSonido(ejercicio.correcta);
        });
        
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

function ejercicioFormaPalabra() {
    const ejercicios = [
        // --- Nivel Fácil: Palabras de 3 letras, muy comunes ---
        { palabra: "SOL" },
        { palabra: "MAR" },
        { palabra: "PAN" },
        // --- Nivel Medio: Palabras de 4 letras, comunes y fonéticas ---
        { palabra: "LUNA" },
        { palabra: "GATO" },
        { palabra: "CASA" },
        // --- Nivel Difícil: Palabras de 5 o 6 letras ---
        { palabra: "PERRO" },
        { palabra: "ARBOL" },
        { palabra: "FLOR" },
        // --- Nivel Experto: Palabras más largas y complejas ---
        { palabra: "PELOTA" },
        { palabra: "ZAPATO" },
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
        
        container.querySelector('.btn-verify').addEventListener('click', () => {
            const input = container.querySelector('.word-input');
            if (input.value.toUpperCase() === ejercicio.palabra) {
                mostrarFeedback(true, `¡Correcto! La palabra es ${ejercicio.palabra}`);
                input.style.border = "2px solid #4CAF50";
                input.disabled = true;
                container.querySelector('.btn-verify').disabled = true;
            } else {
                const audio = document.getElementById('audio-error');
                audio.currentTime = 0;
                audio.play();
                input.classList.add('shake');
                input.style.border = "2px solid #e74c3c";
                audio.onended = () => {
                    input.value = "";
                    input.classList.remove('shake');
                    input.style.border = "2px solid #ddd";
                };
            }
        });
    });
}

function ejercicioUneLetraImagen() {
    const ejercicios = [
        // --- Nivel Fácil: Letras muy comunes y opciones muy diferentes ---
        { imagen: "https://i.pinimg.com/originals/9e/d9/a2/9ed9a212f4e3f350c39f60a931494f48.png", correcta: "A", opciones: ["A", "X", "L"] },
        { imagen: "https://images.vexels.com/media/users/3/145529/isolated/preview/23300b81a28a39915967000f576e33e9-ilustraci-n-de-elefante-de-dibujos-animados.png", correcta: "E", opciones: ["I", "E", "P"] },
        { imagen: "https://cdn-icons-png.flaticon.com/512/3069/3069224.png", correcta: "O", opciones: ["C", "U", "O"] },
        // --- Nivel Medio: Palabras comunes, opciones con cierta similitud ---
        { imagen: "https://i.pinimg.com/originals/cb/59/e9/cb59e999c0a6b72a95a8a113d78b277b.png", correcta: "M", opciones: ["N", "M", "L"] },
        { imagen: "https://www.pngplay.com/wp-content/uploads/10/Sandbox-PNG-Clipart-Background.png", correcta: "S", opciones: ["C", "Z", "S"] },
        { imagen: "https://images.vexels.com/media/users/3/154562/isolated/preview/26c8913a484323758336e788e0a174a7-dado-de-juego-rojo.png", correcta: "D", opciones: ["B", "D", "P"] },
        // --- Nivel Difícil: Palabras más largas, opciones que suenan parecido ---
        { imagen: "https://static.vecteezy.com/system/resources/previews/009/393/819/original/watermelon-fruit-illustration-cartoon-png.png", correcta: "G", opciones: ["J", "C", "G"] },
        { imagen: "https://i.pinimg.com/originals/e3/3e/26/e33e2617300c1445b23d537f2010878e.png", correcta: "Z", opciones: ["S", "C", "Z"] },
        { imagen: "https://vignette.pngowl.com/repo/p/354/p_354228_1562940251_3306.png", correcta: "Q", opciones: ["K", "C", "Q"] },
        // --- Nivel Experto: Letras menos frecuentes o con sonidos especiales (H, Ñ, Y) ---
        { imagen: "https://pluspng.com/img-png/ice-cream-png-ice-cream-png-image-2336.png", correcta: "H", opciones: ["A", "I", "H"] },
        { imagen: "https://www.publicdomainpictures.net/pictures/270000/nahled/pastry-with-filling.jpg", correcta: "Ñ", opciones: ["N", "M", "Ñ"] },
        { imagen: "https://i.pinimg.com/originals/f3/51/3a/f3513ad5f2f518e154f24c16a655bf93.png", correcta: "Y", opciones: ["L", "Y", "J"] }
    ];

    ejercicios.forEach((ejercicio, index) => {
        let container = document.getElementById(`une-letra-imagen-${index + 1}`);
        if (!container) return;
        
        container.innerHTML = `
            <img src="${ejercicio.imagen}" alt="Imagen" class="exercise-image">
            <p class="clue-text">¿Con qué letra comienza?</p>
            <div class="options-container" id="options-match-${index}"></div>
        `;
        
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

// --- FUNCIONES AUXILIARES ---

function verificarRespuesta(respuesta, correcta, elemento) {
    if (respuesta === correcta) {
        elemento.classList.add("correct");
        elemento.parentElement.querySelectorAll('.letter-option').forEach(btn => btn.disabled = true);
        mostrarFeedback(true, `¡Correcto! La letra es ${correcta}`);
    } else {
        elemento.classList.add("incorrect");
        const audio = document.getElementById('audio-error');
        audio.currentTime = 0;
        audio.play();
        audio.onended = () => {
            elemento.classList.remove("incorrect");
        };
    }
}

function mostrarFeedback(esCorrecto, mensaje) {
    if (esCorrecto) {
        const audio = document.getElementById('audio-success');
        audio.currentTime = 0;
        audio.play().catch(console.error);
        document.getElementById('celebration-message').textContent = mensaje;
        document.getElementById('celebration-modal').style.display = 'flex';
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