// --- Canvas Setup ---
const canvas = document.getElementById('sortingCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 700;
canvas.height = 300;

// --- Elements ---
const generateBtn = document.getElementById('generateBtn');
const bubbleSortBtn = document.getElementById('bubbleSortBtn');
const selectionSortBtn = document.getElementById('selectionSortBtn');
const insertionSortBtn = document.getElementById('insertionSortBtn');
const speedSlider = document.getElementById('speedSlider');

// --- Global Variables ---
let array = [];
const ARRAY_SIZE = 50; // Number of bars
let barWidth = canvas.width / ARRAY_SIZE;
let animationSpeed = 50; // Milliseconds per step
let isSorting = false; // Prevent multiple sorts at once
let currentAlgorithm = null; // To stop/reset animation

// --- Functions ---

// 1. Generate a new random array
function generateArray() {
    if (isSorting) return;
    array = [];
    for (let i = 0; i < ARRAY_SIZE; i++) {
        array.push(Math.floor(Math.random() * (canvas.height - 10)) + 10); // Values between 10 and canvas.height
    }
    drawArray();
}

// 2. Draw the array on the canvas
function drawArray(highlightA = -1, highlightB = -1, sortedIndex = -1) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    for (let i = 0; i < ARRAY_SIZE; i++) {
        const barHeight = array[i];
        const x = i * barWidth;
        const y = canvas.height - barHeight;

        // Base color
        ctx.fillStyle = '#0f0'; // Retro Green
        
        // Highlight active elements
        if (i === highlightA || i === highlightB) {
            ctx.fillStyle = '#ff0'; // Yellow for swapping elements
        } 
        // Highlight sorted elements
        else if (i >= sortedIndex && currentAlgorithm === 'bubble') { 
            ctx.fillStyle = '#00f'; // Blue for sorted elements (Bubble Sort specific)
        }
        else if (i <= sortedIndex && (currentAlgorithm === 'selection' || currentAlgorithm === 'insertion')) {
            ctx.fillStyle = '#00f'; // Blue for sorted elements (Selection/Insertion specific)
        }

        ctx.fillRect(x, y, barWidth - 1, barHeight); // Draw bar with 1px gap
        ctx.strokeStyle = '#000'; // Black border
        ctx.strokeRect(x, y, barWidth - 1, barHeight);
    }
}

// 3. Pause function for animation
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// --- Sorting Algorithms ---

// 4. Bubble Sort
async function bubbleSort() {
    if (isSorting) return;
    isSorting = true;
    currentAlgorithm = 'bubble';
    
    let len = array.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            drawArray(j, j + 1, len - i); // Highlight current pair
            await sleep(animationSpeed);

            if (array[j] > array[j + 1]) {
                // Swap
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                drawArray(j, j + 1, len - i); // Re-draw after swap
                await sleep(animationSpeed);
            }
        }
    }
    drawArray(-1, -1, 0); // Draw final sorted array
    isSorting = false;
    currentAlgorithm = null;
}

// 5. Selection Sort
async function selectionSort() {
    if (isSorting) return;
    isSorting = true;
    currentAlgorithm = 'selection';

    let len = array.length;
    for (let i = 0; i < len - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < len; j++) {
            drawArray(minIdx, j, i); // Highlight min and current
            await sleep(animationSpeed);

            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            // Swap
            [array[i], array[minIdx]] = [array[minIdx], array[i]];
            drawArray(i, minIdx, i); // Re-draw after swap
            await sleep(animationSpeed);
        }
    }
    drawArray(-1, -1, len -1); // Draw final sorted array
    isSorting = false;
    currentAlgorithm = null;
}

// 6. Insertion Sort
async function insertionSort() {
    if (isSorting) return;
    isSorting = true;
    currentAlgorithm = 'insertion';

    let len = array.length;
    for (let i = 1; i < len; i++) {
        let current = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > current) {
            array[j + 1] = array[j];
            drawArray(j, j + 1, i); // Highlight elements being shifted
            await sleep(animationSpeed);
            j--;
        }
        array[j + 1] = current;
        drawArray(-1, -1, i); // Re-draw current state
        await sleep(animationSpeed);
    }
    drawArray(-1, -1, len -1); // Draw final sorted array
    isSorting = false;
    currentAlgorithm = null;
}

// --- Event Listeners ---
generateBtn.addEventListener('click', generateArray);
bubbleSortBtn.addEventListener('click', bubbleSort);
selectionSortBtn.addEventListener('click', selectionSort);
insertionSortBtn.addEventListener('click', insertionSort);

speedSlider.addEventListener('input', (e) => {
    animationSpeed = 210 - parseInt(e.target.value); // Invert slider for intuitive speed control
});


// Initial array generation on page load
generateArray();