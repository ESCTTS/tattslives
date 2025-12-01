// clock

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Add leading zeros if numbers are less than 10
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    const timeString = `${hours}:${minutes}:${seconds}`;
    
    // Find the clock element and update its text content
    const clockElement = document.getElementById('live-clock');
    if (clockElement) { // Check if the element exists
        clockElement.textContent = timeString;
    } else {
        // Not that I care, but if it's not there, you messed up the HTML ID, baka!
        console.error("Error: Element with ID 'live-clock' not found!");
    }
}

// Call updateClock once immediately to display the time without delay
updateClock();

// Then, update the clock every second (1000 milliseconds)
setInterval(updateClock, 1000);