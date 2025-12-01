document.addEventListener('DOMContentLoaded', function () {
    const typedTextElement = document.querySelector('.typed-text');
    const textToType = typedTextElement.getAttribute('data-text');
    const cursorElement = typedTextElement.querySelector('::after');
    let index = 0;

    function type() {
        if (index < textToType.length) {
            typedTextElement.textContent += textToType.charAt(index);
            index++;
            setTimeout(type, 100); // Adjust typing speed (milliseconds)
        } else {
            cursorElement.style.display = 'none'; // Hide blinking cursor when typing is complete
        }
    }

    type(); // Start typing animation when the DOM is loaded
});