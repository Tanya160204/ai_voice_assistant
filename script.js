let recognition;
let isRecording = false;
let transcript = "";
const recordBtn = document.getElementById("recordBtn");
const userText = document.getElementById("userText");
const aiResponse = document.getElementById("aiResponse");
const aiAudio = document.getElementById("aiAudio");

window.onload = () => {
  speak("Namaste, how can I help you?");
};

function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = 'en-IN';
  window.speechSynthesis.speak(msg);
}

recordBtn.onmousedown = () => {
  startRecognition();
};

recordBtn.onmouseup = () => {
  stopRecognition();
};

function startRecognition() {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-IN';
  recognition.interimResults = false;
  recognition.start();
  isRecording = true;

  recognition.onresult = function (event) {
    transcript = event.results[0][0].transcript;
  };

  recognition.onerror = function (e) {
    alert("Error: " + e.error);
  };
}

function stopRecognition() {
  if (!isRecording) return;
  recognition.stop();
  isRecording = false;

  setTimeout(() => {
    if (transcript.length === 0) {
      userText.innerText = "❌ Could not recognize speech.";
      return;
    }

    userText.innerText = `🗣️ You: ${transcript}`;
    fetch('/process_text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: transcript })
    })
    .then(res => res.json())
    .then(data => {
      if (data.reply) {
        aiResponse.innerText = `🤖: ${data.reply}`;
        aiAudio.src = "/audio";
        aiAudio.hidden = false;
        aiAudio.play();
      } else {
        aiResponse.innerText = "❌ Error from Gemini.";
      }
    });
  }, 1000);  // ⏱️ Delay before sending to Gemini
}
