// Variables del juego
let randomNumber;
let attempts = 10;
const guesses = [];
let isGameOver = false;

// Elementos del DOM
const guessInput = document.getElementById('guessInput');
const submitBtn = document.getElementById('submitBtn');
const playAgainBtn = document.getElementById('playAgainBtn');
const feedback = document.getElementById('feedback');
const attemptsLeft = document.getElementById('attemptsLeft');
const guessesList = document.getElementById('guessesList');

/**
 * Inicia un nuevo juego reiniciando todas las variables y la UI.
 */
function newGame() {
    // Genera un número aleatorio entre 1 y 100
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 10;
    guesses.length = 0; // Limpia el array de intentos
    isGameOver = false;

    // Reinicia la interfaz de usuario
    guessInput.value = '';
    guessInput.disabled = false;
    submitBtn.disabled = false;
    playAgainBtn.style.display = 'none';
    feedback.textContent = '';
    attemptsLeft.textContent = `Intentos restantes: ${attempts}`;
    guessesList.innerHTML = '';
}

/**
 * Comprueba el número introducido por el usuario.
 */
function checkGuess() {
    // Si el juego ha terminado, no se hace nada
    if (isGameOver) return;

    const userGuess = Number(guessInput.value);

    // Valida que la entrada sea un número válido
    if (userGuess < 1 || userGuess > 100 || isNaN(userGuess)) {
        feedback.textContent = 'Introduce un número válido entre 1 y 100.';
        return;
    }

    // Añade el intento a la lista
    guesses.push(userGuess);
    const listItem = document.createElement('li');
    listItem.textContent = userGuess;
    guessesList.appendChild(listItem);

    // Comprueba si el intento es correcto
    if (userGuess === randomNumber) {
        feedback.textContent = `¡Felizidades has ganado! El número era ${randomNumber}`;
        feedback.style.color = '#64ffda';
        endGame();
    } else {
        attempts--;
        attemptsLeft.textContent = `Intentos restantes: ${attempts}`;
        feedback.style.color = '#ff6464';

        // Da pistas al usuario
        if (userGuess < randomNumber) {
            feedback.textContent = 'Intenta un número mayor.';
        } else {
            feedback.textContent = 'Intenta un número menor.';
        }

        // Comprueba si se acabaron los intentos
        if (attempts === 0) {
            feedback.textContent = `¡Se acabo el juego! El número correcto era ${randomNumber}.`;
            endGame();
        }
    }

    // Limpia el campo de entrada y lo enfoca
    guessInput.value = '';
    guessInput.focus();
}

/**
 * Finaliza el juego y deshabilita los controles.
 */
function endGame() {
    isGameOver = true;
    guessInput.disabled = true;
    submitBtn.disabled = true;
    playAgainBtn.style.display = 'block';
}

// Event listeners para los botones y la entrada
submitBtn.addEventListener('click', checkGuess);
playAgainBtn.addEventListener('click', newGame);
guessInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        checkGuess();
    }
});

// Inicia el juego por primera vez
newGame();
