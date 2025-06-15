document.addEventListener("DOMContentLoaded", function () {
    generarNumeros();
    iniciarEjercicios();
});

// Función para generar los números del 0 al 20
function generarNumeros() {
    const numeros = Array.from({ length: 51 }, (_, i) => i); // Números del 0 al 20
    const contenedor = document.getElementById("numeros-container");
    
    numeros.forEach(numero => {
        let div = document.createElement("div");
        div.classList.add("numero");
        div.textContent = numero;
        div.addEventListener("click", () => reproducirSonidoNumero(numero));
        contenedor.appendChild(div);
    });
}

// Función para reproducir el sonido del número
function reproducirSonidoNumero(numero) {
    // Resaltar el número seleccionado
    const numeros = document.querySelectorAll(".numero");
    numeros.forEach(n => n.classList.remove("active"));
    
    const numeroSeleccionado = document.querySelector(`.numero:nth-child(${numero + 1})`);
    if (numeroSeleccionado) {
        numeroSeleccionado.classList.add("active");
    }
    
    // Reproducir el sonido
    let audio = new Audio(`../../audios/numeros/${numero}.mp3`);
    audio.play().catch(error => {
        console.error(`Error al reproducir el sonido del número ${numero}:`, error);
    });
}

// Función para iniciar todos los ejercicios
function iniciarEjercicios() {
    ejercicioCuentaSelecciona();
    ejercicioOrdenaNumeros();
    ejercicioSumaSimple();
    ejercicioNumeroPerdido();
}

// Ejercicio 1: Cuenta y Selecciona
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
        
        // Verificar si el contenedor existe
        if (!container) {
            console.error(`No se encontró el contenedor cuenta-selecciona-${index + 1}`);
            return;
        }
        
        // Limpiar el contenedor
        container.innerHTML = '';
        
        // Crear contenedor para los objetos
        let objetosContainer = document.createElement("div");
        objetosContainer.classList.add("objetos-container");
        
        // Agregar los objetos según la cantidad
        for (let i = 0; i < ejercicio.cantidad; i++) {
            let objeto = document.createElement("span");
            objeto.textContent = ejercicio.objetos;
            objeto.style.fontSize = "30px";
            objetosContainer.appendChild(objeto);
        }
        
        // Agregar el contenedor de objetos al contenedor principal
        container.appendChild(objetosContainer);
        
        // Crear contenedor para las opciones
        let opcionesContainer = document.createElement("div");
        opcionesContainer.classList.add("opciones-container");
        
        // Instrucción para el usuario
        let instruccion = document.createElement("p");
        instruccion.textContent = "¿Cuántos hay?";
        instruccion.classList.add("instruccion");
        container.appendChild(instruccion);
        
        // Agregar las opciones de números
        ejercicio.opciones.forEach(opcion => {
            let btn = document.createElement("button");
            btn.textContent = opcion;
            btn.classList.add("opcion-numero");
            btn.addEventListener("click", () => {
                // Verificar respuesta
                if (opcion === ejercicio.cantidad) {
                    // Respuesta correcta
                    btn.classList.add("correcta");
                    
                    // Reproducir sonido de éxito
                    let audioExito = new Audio("../../audios/exito.mp3");
                    audioExito.play().catch(e => console.error("Error al reproducir sonido de éxito:", e));
                    
                    // Mostrar mensaje de felicitación
                    setTimeout(() => {
                        alert(`¡Correcto! Hay ${ejercicio.cantidad} ${ejercicio.objetos}`);
                    }, 500);
                } else {
                    // Respuesta incorrecta
                    btn.classList.add("incorrecta");
                    
                    // Reproducir sonido de error
                    let audioError = new Audio("../../audios/error.mp3");
                    audioError.play().catch(e => console.error("Error al reproducir sonido de error:", e));
                    
                    // Mostrar mensaje de ánimo
                    setTimeout(() => {
                        alert("Intenta de nuevo. Cuenta con cuidado.");
                    }, 500);
                }
            });
            opcionesContainer.appendChild(btn);
        });
        
        // Agregar el contenedor de opciones al contenedor principal
        container.appendChild(opcionesContainer);
    });
}

// Ejercicio 2: Ordena los Números
// Ejercicio 2: Ordena los Números
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
        
        // Verificar si el contenedor existe
        if (!container) {
            console.error(`No se encontró el contenedor ordena-numeros-${index + 1}`);
            return;
        }
        
        // Limpiar el contenedor
        container.innerHTML = '';
        
        // Crear una copia desordenada de los números
        let numerosDesordenados = [...ejercicio.numeros].sort(() => Math.random() - 0.5);
        
        // Crear contenedor para los números desordenados
        let numerosContainer = document.createElement("div");
        numerosContainer.classList.add("numeros-desordenados");
        numerosContainer.setAttribute("data-numeros-correctos", ejercicio.numeros.join(","));
        
        // Agregar los números desordenados
        numerosDesordenados.forEach(numero => {
            let numeroElement = document.createElement("div");
            numeroElement.classList.add("numero-arrastrable");
            numeroElement.textContent = numero;
            numeroElement.setAttribute("draggable", "true");
            
            // Eventos para arrastrar
            numeroElement.addEventListener("dragstart", function(e) {
                e.dataTransfer.setData("text/plain", numero);
                this.style.opacity = "0.4";
            });
            
            numeroElement.addEventListener("dragend", function() {
                this.style.opacity = "1";
            });
            
            numerosContainer.appendChild(numeroElement);
        });
        
        // Agregar el contenedor de números al contenedor principal
        container.appendChild(numerosContainer);
        
        // Crear zona de destino
        let zonaDestino = document.createElement("div");
        zonaDestino.classList.add("zona-destino");
        
        // Crear espacios para los números
        for (let i = 0; i < ejercicio.numeros.length; i++) {
            let espacio = document.createElement("div");
            espacio.classList.add("espacio-numero");
            
            // Eventos para soltar
            espacio.addEventListener("dragover", function(e) {
                e.preventDefault();
                this.style.backgroundColor = "#e8f4fc";
            });
            
            espacio.addEventListener("dragleave", function() {
                this.style.backgroundColor = "";
            });
            
            espacio.addEventListener("drop", function(e) {
                e.preventDefault();
                this.style.backgroundColor = "";
                
                const numero = e.dataTransfer.getData("text/plain");
                this.textContent = numero;
                this.setAttribute("data-numero", numero);
                
                // Verificar si todos los espacios están llenos
                const espacios = zonaDestino.querySelectorAll(".espacio-numero");
                const todosLlenos = Array.from(espacios).every(esp => esp.textContent !== "");
                
                if (todosLlenos) {
                    // Verificar si el orden es correcto
                    const numerosColocados = Array.from(espacios).map(esp => parseInt(esp.getAttribute("data-numero")));
                    const numerosCorrectos = container.querySelector(".numeros-desordenados").getAttribute("data-numeros-correctos").split(",").map(Number);
                    
                    const esOrdenCorrecto = numerosColocados.every((num, i) => num === numerosCorrectos[i]);
                    
                    if (esOrdenCorrecto) {
                        // Orden correcto
                        espacios.forEach(esp => esp.style.backgroundColor = "#2ecc71");
                        
                        // Reproducir sonido de éxito
                        let audioExito = new Audio("../../audios/exito.mp3");
                        audioExito.play().catch(e => console.error("Error al reproducir sonido de éxito:", e));
                        
                        // Mostrar mensaje de felicitación
                        setTimeout(() => {
                            alert("¡Correcto! Has ordenado los números correctamente.");
                        }, 500);
                    } else {
                        // Orden incorrecto
                        espacios.forEach(esp => esp.style.backgroundColor = "#e74c3c");
                        
                        // Reproducir sonido de error
                        let audioError = new Audio("../../audios/error.mp3");
                        audioError.play().catch(e => console.error("Error al reproducir sonido de error:", e));
                        
                        // Mostrar mensaje de ánimo
                        setTimeout(() => {
                            alert("Intenta de nuevo. Recuerda el orden correcto de los números.");
                            // Limpiar los espacios
                            espacios.forEach(esp => {
                                esp.textContent = "";
                                esp.removeAttribute("data-numero");
                                esp.style.backgroundColor = "";
                            });
                        }, 500);
                    }
                }
            });
            
            zonaDestino.appendChild(espacio);
        }
        
        // Agregar la zona de destino al contenedor principal
        container.appendChild(zonaDestino);
        
        // Agregar instrucciones específicas para cada ejercicio
        let instruccion = document.createElement("p");
        instruccion.textContent = ejercicio.instruccion;
        instruccion.classList.add("instruccion");
        container.insertBefore(instruccion, numerosContainer);
        
        // Agregar botón para reiniciar el ejercicio
        let reiniciarBtn = document.createElement("button");
        reiniciarBtn.textContent = "Reiniciar";
        reiniciarBtn.classList.add("reiniciar-btn");
        reiniciarBtn.addEventListener("click", () => {
            // Limpiar los espacios
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

// Ejercicio 3: Suma Simple
function ejercicioSumaSimple() {
    const ejercicios = [
        { num1: 2, num2: 3, resultado: 5 },
        { num1: 4, num2: 2, resultado: 6 },
        { num1: 1, num2: 5, resultado: 6 }
    ];

    ejercicios.forEach((ejercicio, index) => {
        let container = document.getElementById(`suma-simple-${index + 1}`);
        
        // Verificar si el contenedor existe
        if (!container) {
            console.error(`No se encontró el contenedor suma-simple-${index + 1}`);
            return;
        }
        
        // Limpiar el contenedor
        container.innerHTML = '';
        
        // Crear contenedor para la suma
        let sumaContainer = document.createElement("div");
        sumaContainer.classList.add("suma-container");
        
        // Agregar el primer número
        let num1Element = document.createElement("div");
        num1Element.classList.add("numero-suma");
        num1Element.textContent = ejercicio.num1;
        sumaContainer.appendChild(num1Element);
        
        // Agregar el signo +
        let signoElement = document.createElement("div");
        signoElement.textContent = "+";
        sumaContainer.appendChild(signoElement);
        
        // Agregar el segundo número
        let num2Element = document.createElement("div");
        num2Element.classList.add("numero-suma");
        num2Element.textContent = ejercicio.num2;
        sumaContainer.appendChild(num2Element);
        
        // Agregar el signo =
        let igualElement = document.createElement("div");
        igualElement.textContent = "=";
        sumaContainer.appendChild(igualElement);
        
        // Agregar el contenedor de suma al contenedor principal
        container.appendChild(sumaContainer);
        
        // Crear contenedor para la respuesta
        let respuestaContainer = document.createElement("div");
        respuestaContainer.classList.add("respuesta-container");
        
        // Agregar input para la respuesta
        let input = document.createElement("input");
        input.type = "number";
        input.min = "0";
        input.max = "20";
        input.placeholder = "?";
        input.classList.add("respuesta-input");
        respuestaContainer.appendChild(input);
        
        // Agregar botón de verificación
        let btn = document.createElement("button");
        btn.textContent = "Verificar";
        btn.classList.add("verificar-btn");
        btn.addEventListener("click", () => {
            const respuesta = parseInt(input.value);
            
            if (respuesta === ejercicio.resultado) {
                // Respuesta correcta
                input.style.backgroundColor = "#d5f5e3";
                input.style.borderColor = "#2ecc71";
                
                // Reproducir sonido de éxito
                let audioExito = new Audio("../../audios/exito.mp3");
                audioExito.play().catch(e => console.error("Error al reproducir sonido de éxito:", e));
                
                // Mostrar mensaje de felicitación
                setTimeout(() => {
                    alert(`¡Correcto! ${ejercicio.num1} + ${ejercicio.num2} = ${ejercicio.resultado}`);
                }, 500);
            } else {
                // Respuesta incorrecta
                input.style.backgroundColor = "#fadbd8";
                input.style.borderColor = "#e74c3c";
                
                // Reproducir sonido de error
                let audioError = new Audio("../../audios/error.mp3");
                audioError.play().catch(e => console.error("Error al reproducir sonido de error:", e));
                
                // Mostrar mensaje de ánimo
                setTimeout(() => {
                    alert("Intenta de nuevo. Cuenta con los dedos si necesitas ayuda.");
                    input.value = "";
                    input.style.backgroundColor = "";
                    input.style.borderColor = "";
                }, 500);
            }
        });
        respuestaContainer.appendChild(btn);
        
        // Agregar el contenedor de respuesta al contenedor principal
        container.appendChild(respuestaContainer);
    });
}

// Ejercicio 4: Encuentra el Número Perdido
function ejercicioNumeroPerdido() {
    const ejercicios = [
        { secuencia: [1, 2, 3, null, 5], numeroPerdido: 4 },
        { secuencia: [5, 6, null, 8, 9], numeroPerdido: 7 }
    ];

    ejercicios.forEach((ejercicio, index) => {
        let container = document.getElementById(`numero-perdido-${index + 1}`);
        
        // Verificar si el contenedor existe
        if (!container) {
            console.error(`No se encontró el contenedor numero-perdido-${index + 1}`);
            return;
        }
        
        // Limpiar el contenedor
        container.innerHTML = '';
        
        // Crear contenedor para la secuencia
        let secuenciaContainer = document.createElement("div");
        secuenciaContainer.classList.add("secuencia-container");
        
        // Agregar los números de la secuencia
        ejercicio.secuencia.forEach(numero => {
            if (numero === null) {
                // Espacio para el número perdido
                let numeroPerdidoElement = document.createElement("div");
                numeroPerdidoElement.classList.add("numero-perdido");
                numeroPerdidoElement.textContent = "?";
                secuenciaContainer.appendChild(numeroPerdidoElement);
            } else {
                // Número normal de la secuencia
                let numeroElement = document.createElement("div");
                numeroElement.classList.add("numero-secuencia");
                numeroElement.textContent = numero;
                secuenciaContainer.appendChild(numeroElement);
            }
        });
        
        // Agregar el contenedor de secuencia al contenedor principal
        container.appendChild(secuenciaContainer);
        
        // Crear contenedor para las opciones
        let opcionesContainer = document.createElement("div");
        opcionesContainer.classList.add("opciones-container");
        
        // Generar opciones (la correcta y dos distractores)
        let opciones = [
            ejercicio.numeroPerdido,
            ejercicio.numeroPerdido - 1,
            ejercicio.numeroPerdido + 1
        ].sort(() => Math.random() - 0.5);
        
        // Agregar las opciones
        opciones.forEach(opcion => {
            let btn = document.createElement("button");
            btn.textContent = opcion;
            btn.classList.add("opcion-numero");
            btn.addEventListener("click", () => {
                // Verificar respuesta
                if (opcion === ejercicio.numeroPerdido) {
                    // Respuesta correcta
                    btn.classList.add("correcta");
                    
                    // Actualizar el número perdido en la secuencia
                    const numeroPerdidoElement = secuenciaContainer.querySelector(".numero-perdido");
                    numeroPerdidoElement.textContent = ejercicio.numeroPerdido;
                    numeroPerdidoElement.classList.add("correcta");
                    
                    // Reproducir sonido de éxito
                    let audioExito = new Audio("../../audios/exito.mp3");
                    audioExito.play().catch(e => console.error("Error al reproducir sonido de éxito:", e));
                    
                    // Mostrar mensaje de felicitación
                    setTimeout(() => {
                        alert(`¡Correcto! El número perdido es ${ejercicio.numeroPerdido}`);
                    }, 500);
                } else {
                    // Respuesta incorrecta
                    btn.classList.add("incorrecta");
                    
                    // Reproducir sonido de error
                    let audioError = new Audio("../../audios/error.mp3");
                    audioError.play().catch(e => console.error("Error al reproducir sonido de error:", e));
                    
                    // Mostrar mensaje de ánimo
                    setTimeout(() => {
                        alert("Intenta de nuevo. Observa bien la secuencia de números.");
                    }, 500);
                }
            });
            opcionesContainer.appendChild(btn);
        });
        
        // Agregar el contenedor de opciones al contenedor principal
        container.appendChild(opcionesContainer);
    });
}