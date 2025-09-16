document.addEventListener('DOMContentLoaded', function() {
    // --- Elementos del DOM ---
    const gameContainer = document.getElementById('gameContainer');
    const basket = document.getElementById('basket');
    const scoreElement = document.getElementById('score');
    const fruitNameElement = document.getElementById('fruitName');
    const livesHeartsElement = document.getElementById('lives-hearts');
    
    const startScreen = document.getElementById('startScreen');
    const startButton = document.getElementById('startButton');
    const gameOverScreen = document.getElementById('gameOverScreen');
    const restartButton = document.getElementById('restartButton');
    const finalScoreElement = document.getElementById('finalScore');

    // --- Configuración y Estado del Juego ---
    let score = 0;
    let lives = 3;
    let gameRunning = false;
    let lastFruitTime = 0;
    let fruitSpawnRate = 2000; // ms

    const fruitsData = [
        { name: 'Manzana', image: '../../imagenes/manzana.jpg' },
        { name: 'Uva', image: '..//../imagenes/uva.jpg' },
        { name: 'Pera', image: '../../imagenes/pera.jpg' },
        { name: 'Fresa', image: '/plataformaEducativa/frontend/assets/img/frutas/fresa.png' },
        { name: 'Uva', image: '/plataformaEducativa/frontend/assets/img/frutas/uva.png' },
        { name: 'Piña', image: '/plataformaEducativa/frontend/assets/img/frutas/pina.png' }
    ];

    // --- Funciones Principales del Juego ---

    function startGame() {
        // Reiniciar estado
        score = 0;
        lives = 3;
        fruitSpawnRate = 2000;
        gameRunning = true;
        
        // Actualizar UI
        scoreElement.textContent = score;
        updateLives();
        startScreen.style.display = 'none';
        gameOverScreen.style.display = 'none';
        gameContainer.style.display = 'block';

        // Limpiar frutas de partidas anteriores
        document.querySelectorAll('.fruit').forEach(fruit => fruit.remove());

        // Iniciar el ciclo del juego
        requestAnimationFrame(gameLoop);
    }

    function endGame() {
        gameRunning = false;
        finalScoreElement.textContent = score;
        gameContainer.style.display = 'none';
        gameOverScreen.style.display = 'flex';
    }

    function gameLoop(timestamp) {
        if (!gameRunning) return;

        // Crear nuevas frutas a intervalos regulares
        if (timestamp - lastFruitTime > fruitSpawnRate) {
            createFruit();
            lastFruitTime = timestamp;
        }

        // Mover y verificar todas las frutas en pantalla
        document.querySelectorAll('.fruit').forEach(fruit => {
            let top = parseFloat(fruit.style.top);
            top += 5; // Velocidad de caída
            fruit.style.top = top + 'px';

            // Comprobar colisión o si salió de la pantalla
            if (top > window.innerHeight) {
                fruit.remove();
                lives--;
                updateLives();
                if (lives <= 0) endGame();
            } else {
                checkCollision(fruit);
            }
        });

        // Continuar el ciclo
        requestAnimationFrame(gameLoop);
    }

    // --- Funciones Auxiliares ---

    function createFruit() {
        const fruitElement = document.createElement('div');
        fruitElement.className = 'fruit';
        
        const randomFruit = fruitsData[Math.floor(Math.random() * fruitsData.length)];
        fruitElement.dataset.name = randomFruit.name;
        fruitElement.style.backgroundImage = `url('${randomFruit.image}')`;
        
        fruitElement.style.left = Math.random() * (window.innerWidth - 60) + 'px';
        fruitElement.style.top = '-60px'; // Empezar justo fuera de la pantalla
        
        gameContainer.appendChild(fruitElement);
    }

    function checkCollision(fruit) {
        const fruitRect = fruit.getBoundingClientRect();
        const basketRect = basket.getBoundingClientRect();

        // Si hay colisión
        if (fruitRect.left < basketRect.right &&
            fruitRect.right > basketRect.left &&
            fruitRect.bottom > basketRect.top &&
            fruitRect.top < basketRect.bottom) 
        {
            fruit.remove();
            score += 10;
            scoreElement.textContent = score;

            // Mostrar nombre de la fruta
            fruitNameElement.textContent = fruit.dataset.name;
            fruitNameElement.style.display = 'block';
            setTimeout(() => { fruitNameElement.style.display = 'none'; }, 1500);

            // Aumentar dificultad
            if (score > 0 && score % 50 === 0) {
                fruitSpawnRate = Math.max(500, fruitSpawnRate - 200);
            }
        }
    }

    function updateLives() {
        livesHeartsElement.textContent = '❤'.repeat(lives);
    }

    function moveBasket(e) {
        const x = e.clientX || e.touches[0].clientX;
        basket.style.left = (x - basket.offsetWidth / 2) + 'px';
    }

    // --- Event Listeners ---
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', startGame);
    window.addEventListener('mousemove', moveBasket);
    window.addEventListener('touchmove', moveBasket, { passive: false });
});