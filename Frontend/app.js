const chatGptBox = document.getElementById("chatGptBox");
const userPrompt = document.getElementById("userPrompt");

//Recognition Settings
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
recognition.lang = "es-US";
recognition.onresult = result => {
    let text = result.results[0][0].transcript
    userPrompt.innerHTML = `
    <div class="card">
        <div class="card-body bg-dark text-black">
        User: ${text}
        </div>
    </div>
    `
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
            chatGptBox.innerHTML = `
            <div class="card">
                <div class="card-body">
                AI: ${data.text}
                </div>
            </div>
            `
            textToSpeech(data.text);
        })
        .catch(error => console.error(error));
}

function textToSpeech(text) {
    speech.text = text
    window.speechSynthesis.speak(speech);
}
