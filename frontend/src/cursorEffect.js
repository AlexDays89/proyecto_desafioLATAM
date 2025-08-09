// Efecto de cursor personalizado con particulas doradas
// Variables globales para el cursor principal y las particulas
let mainCursor = null;
let trails = [];
let mouseX = 0;
let mouseY = 0;

// Funcion para crear el cursor principal
function createMainCursor() {
    mainCursor = document.createElement('div');
    mainCursor.className = 'main-cursor';
    document.body.appendChild(mainCursor);
}

// Funcion para crear particulas de rastro
function createTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = (x - 10) + 'px';
    trail.style.top = (y - 10) + 'px';
    
    // Variacion aleatoria en las particulas de rastro
    const randomScale = 0.8 + Math.random() * 0.4;
    trail.style.transform = `scale(${randomScale})`;
    
    document.body.appendChild(trail);
    
    // Remover particula despues de la animacion
    setTimeout(() => {
        if (trail.parentNode) {
            trail.parentNode.removeChild(trail);
        }
    }, 800);
}

// Funcion para actualizar la posicion del cursor
function updateCursor(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (mainCursor) {
        mainCursor.style.left = (mouseX - 6) + 'px';
        mainCursor.style.top = (mouseY - 6) + 'px';
    }
}

// Funcion para inicializar el efecto del cursor
function initCursorEffect() {
    createMainCursor();
    
    let trailCounter = 0;
    
    // Evento de movimiento del mouse
    document.addEventListener('mousemove', (e) => {
        updateCursor(e);
        
        // Crear rastro cada pocos pixeles movidos
        trailCounter++;
        if (trailCounter % 3 === 0) {
            createTrail(e.clientX, e.clientY);
        }
    });
    
    // Efecto de click
    document.addEventListener('mousedown', () => {
        if (mainCursor) {
            mainCursor.classList.add('clicking');
            // Crear particulas extra al hacer click
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    createTrail(mouseX + (Math.random() - 0.5) * 20, mouseY + (Math.random() - 0.5) * 20);
                }, i * 50);
            }
        }
    });
    
    // Remover efecto de click
    document.addEventListener('mouseup', () => {
        if (mainCursor) {
            mainCursor.classList.remove('clicking');
        }
    });
    
    // Ocultar cursor cuando sale de la ventana
    document.addEventListener('mouseleave', () => {
        if (mainCursor) {
            mainCursor.style.opacity = '0';
        }
    });
    
    // Mostrar cursor cuando entra a la ventana
    document.addEventListener('mouseenter', () => {
        if (mainCursor) {
            mainCursor.style.opacity = '1';
        }
    });
}

// Iniciar el efecto cuando la pagina carga
document.addEventListener('DOMContentLoaded', initCursorEffect);

// Exportar la funcion para uso en React
export { initCursorEffect };