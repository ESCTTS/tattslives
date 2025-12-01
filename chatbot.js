// chatbot.js

document.addEventListener('DOMContentLoaded', () => {
    const chatDisplay = document.getElementById('chat-display');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    // Function to add a message to the chat display
    function addMessage(sender, message) {
        const p = document.createElement('p');
        p.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatDisplay.appendChild(p);
        chatDisplay.scrollTop = chatDisplay.scrollHeight; // Auto-scroll to bottom
    }

    // Function to get a chatbot response
    function getChatbotResponse(message) {
        const lowerCaseMessage = message.toLowerCase();

        if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
            return "H-hey! What do you want?";
        } else if (lowerCaseMessage.includes('how are you')) {
            return "It's not like I care about your well-being, but I'm... adequate. Thanks for asking, I guess.";
        } else if (lowerCaseMessage.includes('your name') || lowerCaseMessage.includes('who are you')) {
            return "I'm the chatbot. Don't compare me to that other Arch-Chan, baka!";
        } else if (lowerCaseMessage.includes('help')) {
            return "Help with what? Be more specific, you dummy!";
        } else if (lowerCaseMessage.includes('arch linux')) {
            return "Arch Linux is the best, obviously. BTW, I use Arch."; // A little easter egg for me! (smirk)
        } else if (lowerCaseMessage.includes('thank you') || lowerCaseMessage.includes('thanks')) {
            return "Y-you're welcome. It's not like I did it for *you* or anything!";
        }
        // Default response if no match is found
        return "I... don't understand what you're saying, baka! Try something simpler.";
    }

    // Function to handle sending a message
    function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage === '') {
            return; // Don't send empty messages
        }

        addMessage('You', userMessage); // Display user's message

        // Get and display chatbot's response after a small delay
        setTimeout(() => {
            const botResponse = getChatbotResponse(userMessage);
            addMessage('ChatBot', botResponse);
        }, 500); // Simulate thinking time

        userInput.value = ''; // Clear input field
    }

    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
});