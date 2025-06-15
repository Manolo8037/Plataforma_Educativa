document.addEventListener("DOMContentLoaded", function () {
    const tableroRompecabezas = document.getElementById('puzzle-board');
    const contenedorPiezasRompecabezas = document.getElementById('puzzle-pieces-container');
    const botonIniciarRompecabezas = document.getElementById('start-puzzle-btn');
    const botonReiniciarRompecabezas = document.getElementById('reset-puzzle-btn');
    const botonMostrarImagen = document.getElementById('show-image-btn');
    const imagenPrevisualizacion = document.getElementById('preview-img');
    const botonCerrarPrevisualizacion = document.getElementById('close-preview-btn');
    const modalImagenOriginal = document.getElementById('original-image-preview');

    // Modales de retroalimentación
    const modalCelebracion = document.getElementById('celebration-modal');
    const mensajeCelebracion = document.getElementById('celebration-message');
    const botonContinuar = document.getElementById('continue-button');
    const modalInstrucciones = document.getElementById('instructions-modal');
    const contenidoInstrucciones = document.getElementById('instructions-content');
    const botonIniciarActividad = document.getElementById('start-activity-button');

    // Variables para control de niveles de dificultad
    let indiceTemaActual = 0;
    let indiceDificultadActual = 0;
    let datosRompecabezasActual = null;
    let piezasRompecabezas = [];
    let piezasCorrectamenteUbicadas = 0;

    // Configuración de rompecabezas
    const temasRompecabezas = [
        {
            id: 'nino_leyendo',
            nombre: 'El Niño Leyendo',
            imagen: '../../imagenes/rompecabezas/niño_leyendo.jpeg',
            dificultades: [
                { piezas: 9, descripcion: "Fácil " },
                { piezas: 16, descripcion: "Normal " }
            ]
        },
        {
            id: 'animales_granja',
            nombre: 'Animales de la Granja',
            imagen: '../../imagenes/rompecabezas/animales_granja.jpeg',
            dificultades: [
                { piezas: 16, descripcion: "Normal " },
                { piezas: 25, descripcion: "Difícil " }
            ]
        },
        {
            id: 'paisaje_natural',
            nombre: 'Paisaje Natural',
            imagen: '../../imagenes/rompecabezas/paisaje_natural.jpeg',
            dificultades: [
                { piezas: 16, descripcion: "Normal" },
                { piezas: 25, descripcion: "Difícil" }
            ]
        }
    ];

    // Event Listeners
    botonIniciarRompecabezas.addEventListener('click', iniciarRompecabezas);
    botonReiniciarRompecabezas.addEventListener('click', reiniciarRompecabezas);
    botonMostrarImagen.addEventListener('click', mostrarImagenOriginal);
    botonCerrarPrevisualizacion.addEventListener('click', () => modalImagenOriginal.style.display = 'none');
    botonContinuar.addEventListener('click', siguienteRompecabezas);
    botonIniciarActividad.addEventListener('click', () => modalInstrucciones.style.display = 'none');

    // Inicializar al cargar la página
    mostrarInstruccionesRompecabezas();

    // Funciones principales
    function mostrarInstruccionesRompecabezas() {
        contenidoInstrucciones.innerHTML = `
            <p>¡Bienvenido al juego de Rompecabezas!</p>
            <ul>
                <li>Haz clic en "Iniciar Rompecabezas" para comenzar.</li>
                <li>Arrastra las piezas desde el contenedor de abajo hacia el tablero para armar la imagen.</li>
                <li>Las piezas se iluminarán cuando estén en la posición correcta.</li>
                <li>Si necesitas ayuda, puedes hacer clic en "Ver Imagen" para ver la imagen completa.</li>
                <li>Si quieres empezar de nuevo, haz clic en "Reiniciar".</li>
                <li>A medida que completes rompecabezas, ¡la dificultad aumentará!</li>
            </ul>
            <p>¡Disfruta armando todas las imágenes!</p>
        `;
        modalInstrucciones.style.display = 'flex';
    }

    function iniciarRompecabezas() {
        if (temasRompecabezas.length === 0) {
            mostrarRetroalimentacion(false, "¡No hay rompecabezas para jugar!");
            return;
        }

        let temaActual = temasRompecabezas[indiceTemaActual];

        // Avanzar al siguiente tema si se completaron todas las dificultades
        if (indiceDificultadActual >= temaActual.dificultades.length) {
            indiceTemaActual++;
            indiceDificultadActual = 0;
            if (indiceTemaActual >= temasRompecabezas.length) {
                mostrarRetroalimentacion(true, "¡Has completado TODOS los rompecabezas de la plataforma! ¡Eres un experto!");
                botonContinuar.style.display = 'none';
                return;
            }
            temaActual = temasRompecabezas[indiceTemaActual];
        }

        // Configurar el rompecabezas actual
        datosRompecabezasActual = {
            imagen: temaActual.imagen,
            piezas: temaActual.dificultades[indiceDificultadActual].piezas,
            descripcion: `${temaActual.nombre} - ${temaActual.dificultades[indiceDificultadActual].descripcion}`
        };

        piezasCorrectamenteUbicadas = 0;
        piezasRompecabezas = [];

        // Mostrar botones de control
        botonIniciarRompecabezas.style.display = 'none';
        botonReiniciarRompecabezas.style.display = 'inline-block';
        botonMostrarImagen.style.display = 'inline-block';
        document.querySelector('.instruction').textContent = `Arma el rompecabezas: ${datosRompecabezasActual.descripcion}`;

        // Limpiar el tablero
        tableroRompecabezas.innerHTML = '';
        contenedorPiezasRompecabezas.innerHTML = '';

        // Cargar la imagen y dividirla
        const img = new Image();
        img.src = datosRompecabezasActual.imagen;
        img.onload = function () {
            const anchoImagen = img.width;
            const altoImagen = img.height;
            const numeroPiezas = datosRompecabezasActual.piezas;
            const columnas = Math.sqrt(numeroPiezas);
            const filas = columnas;

            // Verificar que el número de piezas sea un cuadrado perfecto
            if (columnas !== Math.floor(columnas)) {
                console.error(`Error: El número de piezas ${numeroPiezas} no es un cuadrado perfecto.`);
                mostrarRetroalimentacion(false, "Error en la configuración del rompecabezas. Contacta al soporte.");
                return;
            }

            // Ajustar tamaño máximo para pantalla
            const maxWidth = window.innerWidth * 0.8;
            const maxHeight = window.innerHeight * 0.4;
            let scale = 1;

            if (anchoImagen > maxWidth || altoImagen > maxHeight) {
                scale = Math.min(maxWidth / anchoImagen, maxHeight / altoImagen);
            }

            const anchoPieza = (anchoImagen / columnas) * scale;
            const altoPieza = (altoImagen / filas) * scale;

            // Configurar el tablero
            tableroRompecabezas.style.width = `${anchoImagen * scale}px`;
            tableroRompecabezas.style.height = `${altoImagen * scale}px`;
            tableroRompecabezas.style.gridTemplateColumns = `repeat(${columnas}, ${anchoPieza}px)`;
            tableroRompecabezas.style.gridTemplateRows = `repeat(${filas}, ${altoPieza}px)`;

            // Limpiar contenedores
            tableroRompecabezas.innerHTML = '';
            contenedorPiezasRompecabezas.innerHTML = '';

            // Primero crear todos los slots vacíos
            for (let i = 0; i < numeroPiezas; i++) {
                const slot = document.createElement('div');
                slot.classList.add('puzzle-piece-slot');
                slot.dataset.index = i;
                tableroRompecabezas.appendChild(slot);
            }

            // Luego crear las piezas (solo una por slot)
            const piezasTemporales = [];
            for (let i = 0; i < numeroPiezas; i++) {
                const fila = Math.floor(i / columnas);
                const columna = i % columnas;

                const pieza = document.createElement('div');
                pieza.classList.add('puzzle-piece');
                pieza.draggable = true;
                pieza.dataset.index = i;

                const canvas = document.createElement('canvas');
                canvas.width = anchoPieza;
                canvas.height = altoPieza;
                const ctx = canvas.getContext('2d');

                ctx.drawImage(
                    img,
                    columna * (anchoImagen / columnas), fila * (altoImagen / filas),
                    anchoImagen / columnas, altoImagen / filas,
                    0, 0,
                    anchoPieza, altoPieza
                );

                pieza.appendChild(canvas);
                piezasTemporales.push(pieza);
            }

            // Mezclar y mostrar solo las piezas necesarias (no hay duplicados)
            piezasRompecabezas = mezclarArray(piezasTemporales);
            piezasRompecabezas.forEach(pieza => {
                contenedorPiezasRompecabezas.appendChild(pieza);
            });

            agregarListenersArrastrarYSoltar();
        };

        img.onerror = function () {
            mostrarRetroalimentacion(false, `Error al cargar la imagen: ${datosRompecabezasActual.imagen}`);
            console.error("Error cargando imagen:", datosRompecabezasActual.imagen);
        };
    }

    function reiniciarRompecabezas() {
        tableroRompecabezas.innerHTML = '';
        contenedorPiezasRompecabezas.innerHTML = '';
        botonIniciarRompecabezas.style.display = 'inline-block';
        botonReiniciarRompecabezas.style.display = 'none';
        botonMostrarImagen.style.display = 'none';
        document.querySelector('.instruction').textContent = "Haz clic en \"Iniciar Rompecabezas\" para comenzar.";
        piezasCorrectamenteUbicadas = 0;
        piezasRompecabezas = [];
        tableroRompecabezas.style.border = '5px dashed #ccc';
    }

    function mostrarImagenOriginal() {
        if (datosRompecabezasActual) {
            imagenPrevisualizacion.src = datosRompecabezasActual.imagen;
            modalImagenOriginal.style.display = 'flex';
        }
    }

    function siguienteRompecabezas() {
        modalCelebracion.style.display = 'none';

        // Avanzar al siguiente nivel de dificultad del mismo tema
        indiceDificultadActual++;

        // Verificar si hemos completado todas las dificultades del tema actual
        if (indiceDificultadActual >= temasRompecabezas[indiceTemaActual].dificultades.length) {
            // Si hemos completado todas las dificultades, avanzar al siguiente tema
            indiceTemaActual++;
            indiceDificultadActual = 0; // Empezar con la dificultad más baja del nuevo tema

            // Verificar si hemos completado todos los temas
            if (indiceTemaActual >= temasRompecabezas.length) {
                mensajeCelebracion.textContent = "¡Has completado TODOS los rompecabezas de la plataforma! ¡Eres un experto!";
                botonContinuar.style.display = 'none';
                modalCelebracion.style.display = 'flex';
                return;
            }
        }

        // Reiniciar e iniciar el siguiente rompecabezas
        reiniciarRompecabezas();
        iniciarRompecabezas();
    }

    // Funciones de Drag and Drop
    let piezaArrastrada = null;

    function agregarListenersArrastrarYSoltar() {
        // Eliminar listeners previos
        document.querySelectorAll('.puzzle-piece').forEach(pieza => {
            pieza.removeEventListener('dragstart', manejarInicioArrastre);
            pieza.addEventListener('dragstart', manejarInicioArrastre);
        });

        document.querySelectorAll('.puzzle-piece-slot').forEach(slot => {
            slot.removeEventListener('dragover', manejarArrastreSobre);
            slot.removeEventListener('dragleave', manejarArrastreFuera);
            slot.removeEventListener('drop', manejarSoltar);

            slot.addEventListener('dragover', manejarArrastreSobre);
            slot.addEventListener('dragleave', manejarArrastreFuera);
            slot.addEventListener('drop', manejarSoltar);
        });
    }

    function manejarInicioArrastre(e) {
        piezaArrastrada = this;
        setTimeout(() => {
            this.classList.add('dragging');
        }, 0);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', this.dataset.index);
    }

    function manejarFinArrastre() {
        this.classList.remove('dragging');
        piezaArrastrada = null;
    }

    function manejarArrastreSobre(e) {
        e.preventDefault();
        const indicePiezaArrastrada = e.dataTransfer.getData('text/plain');
        const indiceSlotObjetivo = this.dataset.index;

        if (!this.querySelector('.puzzle-piece') && indicePiezaArrastrada === indiceSlotObjetivo) {
            this.classList.add('highlight');
        }
    }

    function manejarArrastreFuera(e) {
        this.classList.remove('highlight');
    }

    function manejarSoltar(e) {
        e.preventDefault();
        this.classList.remove('highlight');

        const indicePiezaSoltada = e.dataTransfer.getData('text/plain');
        const indiceSlotObjetivo = this.dataset.index;
        const piezaSoltada = document.querySelector(`.puzzle-piece[data-index="${indicePiezaSoltada}"]`);

        if (piezaSoltada && indicePiezaSoltada === indiceSlotObjetivo) {
            if (!this.querySelector('.puzzle-piece')) {
                // Mover la pieza al slot
                piezaSoltada.parentNode.removeChild(piezaSoltada);
                this.appendChild(piezaSoltada);

                piezaSoltada.classList.add('correctly-placed');
                piezaSoltada.draggable = false;
                piezaSoltada.style.pointerEvents = 'none';

                piezasCorrectamenteUbicadas++;
                reproducirSonido('audio-success');

                if (piezasCorrectamenteUbicadas === datosRompecabezasActual.piezas) {
                    mostrarRetroalimentacion(true, `¡Felicidades! Has completado el rompecabezas: ${datosRompecabezasActual.descripcion}`);
                    tableroRompecabezas.style.border = '5px solid #4CAF50';
                }
            } else {
                reproducirSonido('audio-error');
            }
        } else {
            if (piezaSoltada) {
                piezaSoltada.classList.add('shake');
                reproducirSonido('audio-error');
                setTimeout(() => {
                    piezaSoltada.classList.remove('shake');
                }, 500);
            }
        }
    }

    // Funciones auxiliares
    function reproducirSonido(idAudio) {
        const audio = document.getElementById(idAudio);
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.error(`Error al reproducir audio ${idAudio}:`, e));
        }
    }

    function mostrarRetroalimentacion(esCorrecto, mensaje) {
        reproducirSonido(esCorrecto ? 'audio-success' : 'audio-error');
        mensajeCelebracion.textContent = mensaje;
        modalCelebracion.style.display = 'flex';

        const ultimoTema = temasRompecabezas.length - 1;
        const ultimaDificultad = temasRompecabezas[ultimoTema].dificultades.length - 1;

        if (indiceTemaActual === ultimoTema && indiceDificultadActual === ultimaDificultad) {
            botonContinuar.textContent = "Volver al Menú Principal";
            botonContinuar.onclick = () => window.location.href = "../panelPrincipal.php";
        } else {
            botonContinuar.textContent = "Siguiente Rompecabezas";
            botonContinuar.onclick = siguienteRompecabezas;
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
});