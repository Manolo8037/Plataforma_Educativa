// Variables globales
let currentActivity = 'learn';

// Elementos del DOM
const elementos = {
    // Navegación
    botonesActividad: document.querySelectorAll('.activity-btn'),
    secciones: document.querySelectorAll('.activity-section'),

    // Sección Aprender
    numerosContainer: document.getElementById('numeros-container'),

    // Modales
    modalCelebracion: document.getElementById('celebration-modal'),
    mensajeCelebracion: document.getElementById('celebration-message'),
    botonContinuar: document.getElementById('continue-button'),
    modalInstrucciones: document.getElementById('instructions-modal'),
    contenidoInstrucciones: document.getElementById('instructions-content'),
    botonIniciarActividad: document.getElementById('start-activity-button'),

    // Audios
    audios: {
        exito: document.getElementById('audio-exito'),
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
    generarNumeros();

    // Inicializar ejercicios
    iniciarEjercicios();

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
    currentActivity = actividad;

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
}

// =============== SECCIÓN APRENDER =============== //

// Función para generar los números del 0 al 50
function generarNumeros() {
    const numeros = Array.from({ length: 51 }, (_, i) => i); // Números del 0 al 50
    const contenedor = elementos.numerosContainer;

    numeros.forEach(numero => {
        let div = document.createElement("div");
        div.classList.add("number-box");

        let numeroElement = document.createElement("div");
        numeroElement.classList.add("number-value");
        numeroElement.textContent = numero;

        div.appendChild(numeroElement);

        div.addEventListener("click", () => reproducirSonidoNumero(numero));
        contenedor.appendChild(div);
    });
}

// Función para reproducir el sonido del número
function reproducirSonidoNumero(numero) {
    // Resaltar el número seleccionado
    const numeros = document.querySelectorAll(".number-box");
    numeros.forEach(n => n.classList.remove("active"));

    const numeroSeleccionado = document.querySelector(`.number-box:nth-child(${numero + 1})`);
    if (numeroSeleccionado) {
        numeroSeleccionado.classList.add("active");
    }

    // Reproducir el sonido
    let audio = new Audio(`../../audios/numeros/${numero}.mp3`);
    audio.play().catch(error => {
        console.error(`Error al reproducir el sonido del número ${numero}:`, error);
    });
}

// =============== EJERCICIOS =============== //

// Función para iniciar todos los ejercicios (manteniendo la lógica original)
function iniciarEjercicios() {
    ejercicioCuentaSelecciona();
    ejercicioOrdenaNumeros();
    ejercicioSumaSimple();
}

// Ejercicio 1: Cuenta y Selecciona (manteniendo la lógica original)
function ejercicioCuentaSelecciona() {
    const ejercicios = [
        {
            objetos: "🍎",
            cantidad: 5,
            opciones: [3, 5, 7]
        },
        {
            objetos: "🐶",
            cantidad: 3,
            opciones: [2, 3, 4]
        },
        {
            objetos: "🌟",
            cantidad: 8,
            opciones: [6, 8, 10]
        },
        {
            objetos: "👑",
            cantidad: 6,
            opciones: [9, 3, 6]
        },
        {
            objetos: "⚽",
            cantidad: 4,
            opciones: [1, 5, 4]
        }
    ];

    ejercicios.forEach((ejercicio, index) => {
        let container = document.getElementById(`cuenta-selecciona-${index + 1}`);
        if (!container) return;
        container.innerHTML = '';

        let objetosContainer = document.createElement("div");
        objetosContainer.classList.add("objetos-container");

        for (let i = 0; i < ejercicio.cantidad; i++) {
            let objeto = document.createElement("span");
            objeto.textContent = ejercicio.objetos;
            objeto.style.fontSize = "30px";
            objetosContainer.appendChild(objeto);
        }

        container.appendChild(objetosContainer);

        let opcionesContainer = document.createElement("div");
        opcionesContainer.classList.add("opciones-container");

        let instruccion = document.createElement("p");
        instruccion.textContent = "¿Cuántos hay?";
        instruccion.classList.add("instruccion");
        container.appendChild(instruccion);

        ejercicio.opciones.forEach(opcion => {
            let btn = document.createElement("button");
            btn.textContent = opcion;
            btn.classList.add("opcion-numero");
            btn.addEventListener("click", () => {
                if (opcion === ejercicio.cantidad) {
                    btn.classList.add("correcta");
                    // Deshabilitar botones para evitar más clics
                    opcionesContainer.querySelectorAll('.opcion-numero').forEach(b => b.disabled = true);
                    reproducirSonido('exito');
                    mostrarCelebracion(`¡Correcto! Hay ${ejercicio.cantidad} ${ejercicio.objetos}`);
                } else {
                    // --- INICIO DE LA MODIFICACIÓN ---
                    // 1. Ya no hay alerta.
                    // 2. Marcamos el botón como incorrecto y lo agitamos.
                    btn.classList.add("incorrecta", "shake");
                    reproducirSonido('error');

                    // 3. Escuchamos cuando el audio de error termina.
                    elementos.audios.error.onended = () => {
                        // 4. Quitamos las clases de feedback para que pueda volver a intentarlo.
                        btn.classList.remove("incorrecta", "shake");
                    };
                    // --- FIN DE LA MODIFICACIÓN ---
                }
            });
            opcionesContainer.appendChild(btn);
        });

        container.appendChild(opcionesContainer);
    });
}

// Ejercicio 2: Ordena los Números (manteniendo la lógica original)
function ejercicioOrdenaNumeros() {
    const ejercicios = [
        {
            numeros: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            instruccion: "Arrastra los números en orden de menor a mayor (1-10)"
        },
        {
            numeros: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
            instruccion: "Arrastra los números en orden de mayor a menor (10-1)"
        },
        {
            numeros: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
            instruccion: "Arrastra los números pares en orden de menor a mayor"
        },
        {
            numeros: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
            instruccion: "Arrastra los números impares en orden de menor a mayor"
        }
    ];

    ejercicios.forEach((ejercicio, index) => {
        let container = document.getElementById(`ordena-numeros-${index + 1}`);

        if (!container) return;

        container.innerHTML = '';

        let numerosDesordenados = [...ejercicio.numeros].sort(() => Math.random() - 0.5);

        let numerosContainer = document.createElement("div");
        numerosContainer.classList.add("numeros-desordenados");
        numerosContainer.setAttribute("data-numeros-correctos", ejercicio.numeros.join(","));

        numerosDesordenados.forEach(numero => {
            let numeroElement = document.createElement("div");
            numeroElement.classList.add("numero-arrastrable");
            numeroElement.textContent = numero;
            numeroElement.setAttribute("draggable", "true");

            numeroElement.addEventListener("dragstart", function (e) {
                e.dataTransfer.setData("text/plain", numero);
                this.style.opacity = "0.4";
            });

            numeroElement.addEventListener("dragend", function () {
                this.style.opacity = "1";
            });

            numerosContainer.appendChild(numeroElement);
        });

        container.appendChild(numerosContainer);

        let zonaDestino = document.createElement("div");
        zonaDestino.classList.add("zona-destino");

        for (let i = 0; i < ejercicio.numeros.length; i++) {
            let espacio = document.createElement("div");
            espacio.classList.add("espacio-numero");

            espacio.addEventListener("dragover", function (e) {
                e.preventDefault();
                this.style.backgroundColor = "#e8f4fc";
            });

            espacio.addEventListener("dragleave", function () {
                this.style.backgroundColor = "";
            });

            espacio.addEventListener("drop", function (e) {
                e.preventDefault();
                this.style.backgroundColor = "";

                const numero = e.dataTransfer.getData("text/plain");
                this.textContent = numero;
                this.setAttribute("data-numero", numero);

                const espacios = zonaDestino.querySelectorAll(".espacio-numero");
                const todosLlenos = Array.from(espacios).every(esp => esp.textContent !== "");

                if (todosLlenos) {
                    const numerosColocados = Array.from(espacios).map(esp => parseInt(esp.getAttribute("data-numero")));
                    const numerosCorrectos = container.querySelector(".numeros-desordenados").getAttribute("data-numeros-correctos").split(",").map(Number);

                    const esOrdenCorrecto = numerosColocados.every((num, i) => num === numerosCorrectos[i]);

                    if (esOrdenCorrecto) {
                        espacios.forEach(esp => esp.style.backgroundColor = "#2ecc71");
                        reproducirSonido('exito');
                        mostrarCelebracion("¡Correcto! Has ordenado los números correctamente.");
                    } else {
                        // 1. Pintamos los espacios de rojo para dar feedback visual.
                        espacios.forEach(esp => esp.style.backgroundColor = "#e74c3c");
                        reproducirSonido('error');

                        // 3. (LO NUEVO) Le decimos al programa: "Cuando el audio de error termine..."
                        elementos.audios.error.onended = () => {
                            // 4. "...ejecuta este código para limpiar todos los espacios".
                            espacios.forEach(esp => {
                                esp.textContent = "";
                                esp.removeAttribute("data-numero");
                                esp.style.backgroundColor = "";
                            });
                        };
                    }
                }
            });

            zonaDestino.appendChild(espacio);
        }

        container.appendChild(zonaDestino);

        let instruccion = document.createElement("p");
        instruccion.textContent = ejercicio.instruccion;
        instruccion.classList.add("instruccion");
        container.insertBefore(instruccion, numerosContainer);

        let reiniciarBtn = document.createElement("button");
        reiniciarBtn.textContent = "Reiniciar";
        reiniciarBtn.classList.add("btn");
        reiniciarBtn.addEventListener("click", () => {
            const espacios = zonaDestino.querySelectorAll(".espacio-numero");
            espacios.forEach(esp => {
                esp.textContent = "";
                esp.removeAttribute("data-numero");
                esp.style.backgroundColor = "";
            });
        });
        container.appendChild(reiniciarBtn);
    });
}

// Ejercicio 3: Suma Simple (manteniendo la lógica original)
function ejercicioSumaSimple() {
    const ejercicios = [
        { num1: 2, num2: 3, resultado: 5 },
        { num1: 4, num2: 2, resultado: 6 },
        { num1: 1, num2: 5, resultado: 6 },
        { num1: 6, num2: 3, resultado: 9 },
        { num1: 3, num2: 7, resultado: 10 },
        { num1: 2, num2: 5, resultado: 7 },
        { num1: 7, num2: 9, resultado: 16 },
        { num1: 5, num2: 8, resultado: 13 },
        { num1: 8, num2: 4, resultado: 12 },
        { num1: 9, num2: 2, resultado: 11 },
    ];

    // 1. Obtenemos el contenedor PADRE donde irán todos los ejercicios.
    const parentContainer = document.getElementById('suma-simple');
    
    // 2. Limpiamos el contenedor padre por si tenía algo antes.
    parentContainer.innerHTML = '';

    // 3. Ahora, por cada ejercicio en tu lista...
    ejercicios.forEach((ejercicio, index) => {
        // 4. (LO NUEVO) Creamos un 'div' para ser el contenedor de este ejercicio.
        let container = document.createElement('div');
        container.classList.add('ejercicio');
        // No necesitamos ID, pero lo podemos añadir si quisiéramos.
        // container.id = `suma-simple-${index + 1}`; 

        // El resto de tu código para crear la suma es igual...
        let sumaContainer = document.createElement("div");
        sumaContainer.classList.add("suma-container");
        
        let num1Element = document.createElement("div");
        num1Element.classList.add("numero-suma");
        num1Element.textContent = ejercicio.num1;
        sumaContainer.appendChild(num1Element);
        
        let signoElement = document.createElement("div");
        signoElement.textContent = "+";
        sumaContainer.appendChild(signoElement);
        
        let num2Element = document.createElement("div");
        num2Element.classList.add("numero-suma");
        num2Element.textContent = ejercicio.num2;
        sumaContainer.appendChild(num2Element);
        
        let igualElement = document.createElement("div");
        igualElement.textContent = "=";
        sumaContainer.appendChild(igualElement);
        
        container.appendChild(sumaContainer);
        
        let respuestaContainer = document.createElement("div");
        respuestaContainer.classList.add("respuesta-container");
        
        let input = document.createElement("input");
        input.type = "number";
        input.min = "0";
        input.max = "20";
        input.placeholder = "?";
        input.classList.add("respuesta-input");
        respuestaContainer.appendChild(input);
        
        let btn = document.createElement("button");
        btn.textContent = "Verificar";
        btn.classList.add("verificar-btn");
        btn.addEventListener("click", () => {
            const respuesta = parseInt(input.value);
            
            if (respuesta === ejercicio.resultado) {
                input.style.backgroundColor = "#d5f5e3";
                input.style.borderColor = "#2ecc71";
                reproducirSonido('exito');
                mostrarCelebracion(`¡Correcto! ${ejercicio.num1} + ${ejercicio.num2} = ${ejercicio.resultado}`);
            } else {
                input.classList.add('shake');
                input.style.borderColor = "#e74c3c";
                reproducirSonido('error');

                elementos.audios.error.onended = () => {
                    input.value = "";
                    input.style.borderColor = "";
                    input.classList.remove('shake');
                };
            }
        });
        respuestaContainer.appendChild(btn);
        
        container.appendChild(respuestaContainer);

        // 5. (LO NUEVO) Finalmente, agregamos el ejercicio recién creado al contenedor padre.
        parentContainer.appendChild(container);
    });
}

// =============== FUNCIONES AUXILIARES =============== //

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