const textBox = document.getElementById("textBox");

//Recognition Settings
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
recognition.lang = "es-US";
recognition.onresult = result => {
    let text = result.results[0][0].transcript
    textBox.textContent = `User: ${text}`;
    getChatGptResponse(text);
};

document.getElementById("recognitionButton").addEventListener('click', () => {
    recognition.start();
});

//Speech Settings
var speech = new SpeechSynthesisUtterance();
speech.lang = 'es';

function getChatGptResponse(text) {
    fetch('http://localhost:3000/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userText: text })
    })
        .then(response => response.json())
        .then(data => {
            textBox.textContent = `AI: ${data.text}`;
            textToSpeech(data.text);
        })
        .catch(error => console.error(error));
}

function textToSpeech(text) {
    speech.text = text
    window.speechSynthesis.speak(speech);
}
