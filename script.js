// Matrix Digital Rain Animation
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Matrix characters - mix of letters, numbers, and Japanese katakana
const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん0123456789!@#$%^&*()_-+{}";
const matrix = matrixChars.split("");

const fontSize = 14;
const columns = canvas.width / fontSize;

// Array to store drop positions
const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

// Draw function
function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff00';
    ctx.font = fontSize + 'px Fira Code, monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++; // Move drop down by one row
    }
}
function animateMatrix() {
    drawMatrix();
    requestAnimationFrame(animateMatrix);
}
animateMatrix();

// Resize canvas when window resizes
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const newColumns = canvas.width / fontSize;
    drops.length = 0;
    for (let x = 0; x < newColumns; x++) {
        drops[x] = 1;
    }
});

// Add click effects to links
document.querySelectorAll('.matrix-link').forEach(link => {
    link.addEventListener('click', function (e) {
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(0, 255, 0, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';

        this.style.position = 'relative';
        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Console easter egg
console.log(`
╔═══════════════════════════════════════╗
║            MATRIX ACCESSED            ║
║                                       ║
║  Welcome to the digital construct.    ║
║  Reality is what you make of it.      ║
║                                       ║
║  "There is no spoon." - Neo           ║
╚═══════════════════════════════════════╝
`);