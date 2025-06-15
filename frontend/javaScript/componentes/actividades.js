document.addEventListener("DOMContentLoaded", function() {
    // Mostrar modal de bienvenida al cargar
    setTimeout(() => {
        document.getElementById('welcome-modal').style.display = 'flex';
    }, 500);

    // Configurar botón para cerrar modal
    document.getElementById('close-welcome').addEventListener('click', function() {
        document.getElementById('welcome-modal').style.display = 'none';
    });

    // Cargar actividades
    renderActivities();

    // Configurar filtros de categoría
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Filtrar actividades
            renderActivities(this.dataset.category);
        });
    });
});

// Datos de actividades (simplificado para ejemplo)
const activities = [
    { 
        id: 1, 
        title: "Aventura Matemática", 
        description: "¡Aprende números jugando!", 
        category: "learn", 
        difficulty: "Fácil", 
        stars: 3, 
        imageUrl: "https://img.freepik.com/vector-premium/ninos-dibujos-animados-123-numeros-imagen-vectorial_679557-1683.jpg?w=1380",
        difficultyClass: "difficulty-easy"
    },
    { 
        id: 2, 
        title: "Memoria Musical", 
        description: "Recordar sonidos divertidos", 
        category: "music", 
        difficulty: "Medio", 
        stars: 4, 
        imageUrl: "https://content.tinytap.it/0B0375EF-42AC-41A9-8B83-0CC0D5552C9B/coverImage813x610.png",
        difficultyClass: "difficulty-medium"
    },
    { 
        id: 3, 
        title: "Juego de Palabras", 
        description: "¡Forma palabras mágicas!", 
        category: "play", 
        difficulty: "Fácil", 
        stars: 5, 
        imageUrl: "https://1.bp.blogspot.com/-yFtL5cFyTM0/XXZDl3938oI/AAAAAAAAQMk/N5VF9wNWZucqOOYnvHbP1PHqUDqMLoTiwCLcBGAs/s640/Aprendo%2BPalabras%2B00%2Bpor%2BMateriales%2BEducativos%2Bpara%2BMaestras.jpg",
        difficultyClass: "difficulty-easy"
    },
    { 
        id: 4, 
        title: "Rompecabezas", 
        description: "¡Arma figuras increíbles!", 
        category: "think", 
        difficulty: "Medio", 
        stars: 4, 
        imageUrl: "https://img.freepik.com/vector-gratis/feliz-lindo-nino-nino-nina-juegan-rompecabezas_97632-2430.jpg?size=626&ext=jpg",
        difficultyClass: "difficulty-medium"
    },
    { 
        id: 5, 
        title: "Memorizando Emociones", 
        description: "¡Juguemos memorizando!", 
        category: "play", 
        difficulty: "Medio", 
        stars: 4, 
        imageUrl: "https://img.elo7.com.br/product/360x360/13D2363/rotulo-folha-5x5-divertida-mente-emocoes-latinha-mint-to-be.jpg",
        difficultyClass: "difficulty-medium"
    },
    { 
        id: 6, 
        title: "Explorando el Abecedario", 
        description: "Aprende el sonido de las letras", 
        category: "learn", 
        difficulty: "Fácil", 
        stars: 3, 
        imageUrl: "https://ecdn.teacherspayteachers.com/thumbitem/Los-cuadros-del-Abecedario-Literacy-workstation-spanish-1311601-1723419183/original-1311601-1.jpg",
        difficultyClass: "difficulty-easy"
    },
    { 
        id: 7, 
        title: "Colores Mágicos", 
        description: "Asocia los colores correctamente", 
        category: "learn", 
        difficulty: "Fácil", 
        stars: 4, 
        imageUrl: "https://http2.mlstatic.com/D_NQ_NP_663178-MLA43953541705_102020-O.webp",
        difficultyClass: "difficulty-easy"
    },
    { 
        id: 8, 
        title: "Atrapa la Fruta", 
        description: "Recoge las frutas correctas", 
        category: "play", 
        difficulty: "Medio", 
        stars: 4, 
        imageUrl: "https://th.bing.com/th/id/OIP.h0bQPZMkNes1TJ3VvEwEDQAAAA?rs=1&pid=ImgDetMain",
        difficultyClass: "difficulty-medium"
    },
    { 
        id: 9, 
        title: "Sonidos de los Animales", 
        description: "Descubre los sonidos de los animales", 
        category: "music", 
        difficulty: "Fácil", 
        stars: 5, 
        imageUrl: "https://m.media-amazon.com/images/I/61qeM0M7VSL.png",
        difficultyClass: "difficulty-easy"
    },
    { 
        id: 10, 
        title: "Adivina la Sombra", 
        description: "Encuentra la silueta correcta", 
        category: "think", 
        difficulty: "Medio", 
        stars: 4, 
        imageUrl: "https://th.bing.com/th/id/OIP.DQYqHVnn9L8JyxpBwBQS4QHaHa?w=512&h=512&rs=1&pid=ImgDetMain",
        difficultyClass: "difficulty-medium"
    }
];

function renderActivities(filterCategory = "all") {
    const container = document.getElementById('activities-container');
    container.innerHTML = '';

    const filteredActivities = filterCategory === "all" 
        ? activities 
        : activities.filter(activity => activity.category === filterCategory);

    filteredActivities.forEach(activity => {
        const activityCard = document.createElement('div');
        activityCard.className = 'activity-card';
        activityCard.innerHTML = `
            <img src="${activity.imageUrl}" alt="${activity.title}">
            <div class="activity-content">
                <h3 class="activity-title">${activity.title}</h3>
                <p class="activity-description">${activity.description}</p>
                <div class="activity-footer">
                    <div class="stars">${'⭐'.repeat(activity.stars)}</div>
                    <span class="difficulty ${activity.difficultyClass}">${activity.difficulty}</span>
                </div>
            </div>
        `;

        // Configurar redirección al hacer clic
        activityCard.addEventListener('click', () => {
            redirectToActivity(activity.id);
        });

        container.appendChild(activityCard);
    });
}

function redirectToActivity(activityId) {
    const baseUrl = '/plataformaEducativa';
    let targetUrl = '';
    
    switch(activityId) {
        case 1: // Aventura Matemática
            targetUrl = `${baseUrl}/frontend/vistas/aprender/aventuraMatematicas.php`;
            break;
        case 2: // Memoria Musical
            targetUrl = `${baseUrl}/frontend/vistas/musica/memoriaMusical.php`;
            break;
        case 3: // Juego de Palabras
            targetUrl = `${baseUrl}/frontend/vistas/jugar/juegoPalabras.php`;
            break;
        case 4: // Rompecabezas
            targetUrl = `${baseUrl}/frontend/vistas/pensar/rompecabezas.php`;
            break;
        case 5: // Memorizando Emociones
            targetUrl = `${baseUrl}/frontend/vistas/jugar/memorizandoEmociones.php`;
            break;
        case 6: // Explorando el Abecedario
            targetUrl = `${baseUrl}/frontend/vistas/aprender/abecedario.php`;
            break;
        case 7: // Colores Mágicos
            targetUrl = `${baseUrl}/frontend/vistas/aprender/coloresMagicos.php`;
            break;
        case 8: // Atrapa la Fruta
            targetUrl = `${baseUrl}/frontend/vistas/jugar/atrapaFruta.php`;
            break;
        case 9: // Sonidos de los Animales
            targetUrl = `${baseUrl}/frontend/vistas/musica/sonidoAnimales.php`;
            break;
        case 10: // Adivina la Sombra
            targetUrl = `${baseUrl}/frontend/vistas/pensar/adivinaSombra.php`;
            break;
        default:
            console.log('Actividad no reconocida');
            return;
    }
    
    window.location.href = targetUrl;
}