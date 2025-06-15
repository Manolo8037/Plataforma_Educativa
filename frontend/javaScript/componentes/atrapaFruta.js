document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const gameContainer = document.getElementById('gameContainer');
    const basket = document.getElementById('basket');
    const scoreElement = document.getElementById('score');
    const fruitNameElement = document.getElementById('fruitName');
    const startScreen = document.getElementById('startScreen');
    const startButton = document.getElementById('startButton');
    const gameOverScreen = document.getElementById('gameOver');
    const restartButton = document.getElementById('restartButton');
    const finalScoreElement = document.getElementById('finalScore');
    const livesElement = document.getElementById('lives');
    
    // Variables del juego
    let score = 0;
    let lives = 3;
    let gameRunning = false;
    let fruitsInterval;
    let gameSpeed = 2000; // Intervalo inicial para generar frutas (ms)
    
    // Definir frutas con sus nombres e imágenes
    const fruits = [
        { name: 'Manzana', image: '/plataformaEducativa/frontend/assets/img/frutas/manzana.png' },
        { name: 'Banana', image: '/plataformaEducativa/frontend/assets/img/frutas/banana.png' },
        { name: 'Naranja', image: '/plataformaEducativa/frontend/assets/img/frutas/naranja.png' },
        { name: 'Fresa', image: '/plataformaEducativa/frontend/assets/img/frutas/fresa.png' },
        { name: 'Uva', image: '/plataformaEducativa/frontend/assets/img/frutas/uva.png' },
        { name: 'Piña', image: '/plataformaEducativa/frontend/assets/img/frutas/pina.png' },
        { name: 'Sandía', image: '/plataformaEducativa/frontend/assets/img/frutas/sandia.png' },
        { name: 'Pera', image: '/plataformaEducativa/frontend/assets/img/frutas/pera.png' }
    ];
    
    // Inicializar posición de la canasta
    basket.style.left = (window.innerWidth / 2 - 50) + 'px';
    
    // Mover la canasta con el mouse/touch
    function moveBasket(e) {
        let xPos;
        
        if (e.type === 'mousemove') {
            xPos = e.clientX;
        } else if (e.type === 'touchmove') {
            xPos = e.touches[0].clientX;
            e.preventDefault(); // Prevenir scroll en dispositivos táctiles
        }
        
        // Limitar la posición de la canasta dentro de los límites del contenedor
        if (xPos < 50) xPos = 50;
        if (xPos > window.innerWidth - 50) xPos = window.innerWidth - 50;
        
        basket.style.left = (xPos - 50) + 'px';
    }
    
    // Crear una fruta aleatoria
    function createFruit() {
        if (!gameRunning) return;
        
        const fruit = document.createElement('div');
        fruit.className = 'fruit';
        
        // Seleccionar una fruta aleatoria
        const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
        fruit.dataset.name = randomFruit.name;
        fruit.style.backgroundImage = `url('${randomFruit.image}')`;
        
        // Posición inicial aleatoria (horizontal)
        const fruitLeft = Math.random() * (window.innerWidth - 60);
        fruit.style.left = fruitLeft + 'px';
        fruit.style.top = '0px';
        
        gameContainer.appendChild(fruit);
        
        // Animar la caída de la fruta
        let fruitFall = setInterval(() => {
            if (!gameRunning) {
                clearInterval(fruitFall);
                if (fruit.parentNode) {
                    gameContainer.removeChild(fruit);
                }
                return;
            }
            
            const fruitTop = parseFloat(fruit.style.top) || 0;
            fruit.style.top = (fruitTop + 5) + 'px';
            
            // Verificar colisión con la canasta
            if (fruitTop > window.innerHeight - 80) {
                const basketLeft = parseFloat(basket.style.left) || 0;
                const fruitLeft = parseFloat(fruit.style.left) || 0;
                
                // Si la fruta está dentro del rango de la canasta
                if (fruitLeft > basketLeft - 30 && fruitLeft < basketLeft + 80) {
                    // Fruta atrapada
                    score += 10;
                    scoreElement.textContent = score;
                    
                    // Mostrar el nombre de la fruta
                    fruitNameElement.textContent = fruit.dataset.name;
                    fruitNameElement.style.display = 'block';
                    
                    // Ocultar el nombre después de 2 segundos
                    setTimeout(() => {
                        fruitNameElement.style.display = 'none';
                    }, 2000);
                    
                    // Aumentar la velocidad del juego cada 50 puntos
                    if (score % 50 === 0 && gameSpeed > 500) {
                        gameSpeed -= 200;
                        clearInterval(fruitsInterval);
                        fruitsInterval = setInterval(createFruit, gameSpeed);
                    }
                } else {
                    // Fruta perdida
                    lives--;
                    updateLives();
                    
                    if (lives <= 0) {
                        endGame();
                    }
                }
                
                clearInterval(fruitFall);
                if (fruit.parentNode) {
                    gameContainer.removeChild(fruit);
                }
            }
        }, 30);
    }
    
    // Actualizar visualización de vidas
    function updateLives() {
        let heartsHTML = '';
        for (let i = 0; i < lives; i++) {
            heartsHTML += '<span class="heart">❤</span>';
        }
        livesElement.innerHTML = 'Vidas: ' + heartsHTML;
    }
    
    // Iniciar el juego
    function startGame() {
        score = 0;
        lives = 3;
        gameSpeed = 2000;
        scoreElement.textContent = score;
        updateLives();
        
        startScreen.style.display = 'none';
        gameOverScreen.style.display = 'none';
        
        gameRunning = true;
        
        // Generar frutas periódicamente
        fruitsInterval = setInterval(createFruit, gameSpeed);
        
        // Eliminar todas las frutas existentes
        document.querySelectorAll('.fruit').forEach(fruit => {
            gameContainer.removeChild(fruit);
        });
    }
    
    // Finalizar el juego
    function endGame() {
        gameRunning = false;
        clearInterval(fruitsInterval);
        
        finalScoreElement.textContent = score;
        gameOverScreen.style.display = 'block';
    }
    
    // Event listeners
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', startGame);
    
    gameContainer.addEventListener('mousemove', moveBasket);
    gameContainer.addEventListener('touchmove', moveBasket);
    
    // Ajustar el juego cuando cambia el tamaño de la ventana
    window.addEventListener('resize', function() {
        basket.style.left = (window.innerWidth / 2 - 50) + 'px';
    });
});