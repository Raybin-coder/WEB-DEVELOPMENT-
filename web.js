async function sendMessage() {
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("ChatBox");
    const message = userInput.value;

    if (!message.trim()) return;

    chatBox.innerHTML += `<div><strong>You:</strong> ${message}</div>`;

    const botResponse = await getBotReply(message);
    chatBox.innerHTML += `<div><strong>Bot:</strong> ${botResponse || "I'm not sure how to respond to that."}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
    userInput.value = "";
}

async function getBotReply(msg) {
    msg = msg.toLowerCase();

    if (msg.includes("how are you")) {
        return "I'm fine, thank you! How can I assist you today?";
    }
    if (msg.includes("hello") || msg.includes("hi")) {
        return "Hello! namaskar hjur aja hjur lai kasari sayog garna sakxu";
    }
    // Weather check
    if (msg.includes("weather in")) {
        // Extract city name
        const city = msg.split("weather in")[1].trim();
        if (!city) return "Please specify a city, e.g., 'weather in kathmandu'.";
        try {
            // wttr.in returns plain text by default, but we want JSON
            const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
            const data = await response.json();
            const current = data.current_condition[0];
            return `Weather in ${city.charAt(0).toUpperCase() + city.slice(1)}: ${current.weatherDesc[0].value}, ${current.temp_C}°C, Humidity: ${current.humidity}%`;
        } catch (error) {
            return "Sorry, I couldn't get the weather information.";
        }
    }

    // Default fallback
    return "I can tell you the weather! Try typing 'weather in kathmandu'.";
}