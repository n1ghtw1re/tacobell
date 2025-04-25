// js/terminal.js
document.addEventListener('DOMContentLoaded', () => {
    const terminalContainer = document.querySelector('.terminal-container'); // Get container
    const outputElement = document.getElementById('terminal-output');
    const cursorElement = document.getElementById('cursor');
    const returnButton = document.getElementById('return-button');

    const messageLines = [
        // ... (keep messageLines array as is)
        "INCOMING TRANSMISSION...",
        "SOURCE: E.FRIENDLY",
        "ENCRYPTION: BROKEN",
        " ", // Empty line for spacing
        "See, according to Cocteau's plan, I'm the enemy.",
        "Cause I like to think, I like to read.",
        "I'm into freedom of speech and freedom of choice.",
        "I'm the kind of guy who wants to sit in a greasy spoon and think,",
        "\"Gee, should I have the T-bone steak or the jumbo rack of barbecued ribs with the side order of gravy fries?\"",
        "I want high cholesterol.",
        "I want to eat bacon, butter and buckets of cheese, okay?",
        "I want to smoke a Cuban cigar the size of Cincinnati in a non-smoking section.",
        "I wanna run through the streets naked with green Jello all over my body reading Playboy magazine.",
        "Why?",
        "Because I suddenly might feel the need to.",
        "Okay, pal?",
        "I've seen the future, you know what it is?",
        "It's a 47-year-old virgin sittin' around in his beige pajamas,",
        "drinking a banana-broccoli shake singing \"I'm an Oscar-Meyer Wiener\".",
        "You wanna live on top, you gotta live Cocteau's way.",
        "What he wants, when he wants, how he wants.",
        "Your other choice: come down here, maybe starve to death.",
        "TRANSMISSION END."
    ];

    const typingSpeed = 40;
    const lineDelay = 100;

    // Function to scroll the terminal container to the bottom
    function scrollToBottom() {
        terminalContainer.scrollTop = terminalContainer.scrollHeight;
    }

    async function typeMessage(lines) {
        cursorElement.style.display = 'inline-block';

        for (const line of lines) {
            for (const char of line) {
                outputElement.textContent += char;
                scrollToBottom(); // Scroll container after each character
                await new Promise(resolve => setTimeout(resolve, typingSpeed));
            }
            outputElement.textContent += '\n';
            scrollToBottom(); // Scroll container after each newline
            await new Promise(resolve => setTimeout(resolve, lineDelay));
        }

        cursorElement.style.display = 'none';
        returnButton.style.display = 'block';
        scrollToBottom(); // Ensure it's scrolled fully at the end
    }

    returnButton.addEventListener('click', () => {
        window.location.href = '/index.html';
    });

    typeMessage(messageLines);
});