function toggleNavBar() {
    let menu = document.getElementById("navlinks");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

// Mouse Effects
let lastStarX = 0;
let lastStarY = 0;
const minDistance = 100;

const maxStars = 100;
const maxSprays = 200;

// Função para não sobrecarregar o DOM
function removeOldestElements(className, maxElements) {
    const elements = document.getElementsByClassName(className);
    if (elements.length > maxElements) {
        elements[0].remove();
    }
}

// Função para calcular a distância entre dois pontos
function distance(x1, y1, x2, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
}

document.addEventListener('mousemove', (event) => {
    const x = event.pageX;
    const y = event.pageY;

    // Atualizar a posição do spray com base nas coordenadas da página
    createSpray(x, y);

    // Garantir que a criação das estrelas também está alinhada
    if (distance(x, y, lastStarX, lastStarY) > minDistance) {
        createStar(x, y);  // Usando as coordenadas corretas
        lastStarX = x;
        lastStarY = y;
    }
});

function createSpray(x, y) {
    const spray = document.createElement('div');
    spray.classList.add('spray');  // Supondo que tenha uma classe para o estilo

    // Posicionar o spray na coordenada correta em relação ao documento
    spray.style.left = `${x - spray.offsetWidth / 2}px`;
    spray.style.top = `${y - spray.offsetHeight / 2}px`;

    document.body.appendChild(spray);

    setTimeout(() => {
        spray.remove();  // Remover o efeito após algum tempo
    }, 800);
    
    removeOldestElements('spray', maxSprays);
}

function createStar(x, y) {
    const star = document.createElement('i'); // Usa a tag <i> para o ícone do Font Awesome
    star.classList.add('fas', 'fa-star', 'star'); // Adiciona as classes para o ícone de estrela e animação

    // Escolhe uma das animações de forma randômica
    const animationClass = getRandomAnimation();
    star.classList.add(animationClass);

    // Posicionar a estrela na coordenada correta em relação ao documento
    star.style.left = `${x - star.offsetWidth / 2}px`;
    star.style.top = `${y - star.offsetHeight / 2}px`;

    document.body.appendChild(star);

    setTimeout(() => {
        star.remove();  // Remover a estrela após algum tempo
    }, 1000);

    removeOldestElements('star', maxStars);
}

// Função para escolher uma animação randômica
function getRandomAnimation() {
    const animations = ['fall-1', 'fall-2', 'fall-3'];
    return animations[Math.floor(Math.random() * animations.length)];
}
