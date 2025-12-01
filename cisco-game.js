// 1. The Correct T568B Standard
const correctOrder = [
    "w-orange", "orange", 
    "w-green", "blue", 
    "w-blue", "green", 
    "w-brown", "brown"
];

// User's current progress
let userSelection = [];
// Copy of wires to shuffle
let availableWires = [];

// 2. Initialize Game
function initGame() {
    const pool = document.getElementById('wire-pool');
    const slots = document.getElementById('connector-slots');
    const status = document.getElementById('crimp-status');
    
    // Reset Data
    userSelection = [];
    pool.innerHTML = '';
    slots.innerHTML = '';
    status.innerText = "STATUS: OPEN";
    status.className = "status-display";

    // Shuffle Wires
    availableWires = [...correctOrder].sort(() => Math.random() - 0.5);

    // Generate Wire Elements (Left Side)
    availableWires.forEach(color => {
        const wire = document.createElement('div');
        wire.className = `wire bg-${color}`;
        wire.dataset.color = color; // Store color info
        
        // Click Event
        wire.onclick = function() { selectWire(color, wire); };
        
        pool.appendChild(wire);
    });

    // Generate Empty Slots (Right Side)
    for (let i = 0; i < 8; i++) {
        const slot = document.createElement('div');
        slot.className = 'slot';
        slot.id = `slot-${i}`;
        slot.innerText = i + 1; // Pin number
        slots.appendChild(slot);
    }
}

// 3. Handle Wire Click
function selectWire(color, element) {
    // Stop if full
    if (userSelection.length >= 8) return;
    // Stop if wire already used
    if (element.classList.contains('used')) return;

    // Add to logic
    userSelection.push(color);
    
    // Visual: Fade out left wire
    element.classList.add('used');

    // Visual: Fill right slot
    const slotIndex = userSelection.length - 1;
    const slot = document.getElementById(`slot-${slotIndex}`);
    
    slot.innerText = ""; // Remove number
    slot.className = `slot filled wire bg-${color}`; // Add color
}

// 4. Check Logic (The Crimp Button)
window.checkCrimp = function() {
    const status = document.getElementById('crimp-status');
    
    if (userSelection.length < 8) {
        status.innerText = "ERROR: CABLE INCOMPLETE";
        status.className = "status-display status-fail";
        return;
    }

    // Compare Arrays
    let isCorrect = true;
    for (let i = 0; i < 8; i++) {
        if (userSelection[i] !== correctOrder[i]) {
            isCorrect = false;
            break;
        }
    }

    if (isCorrect) {
        status.innerText = "SUCCESS: 1000Mbps LINK UP";
        status.className = "status-display status-success";
    } else {
        status.innerText = "FAULT: CROSSTALK / MISWIRE";
        status.className = "status-display status-fail";
    }
};

// 5. Reset Button
window.resetGame = function() {
    initGame();
};

// Start game on load
window.onload = initGame;