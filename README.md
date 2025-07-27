Here's a complete and professional `README.md` file for your AI Voice Calling Assistant prototype using Flask, Gemini 1.5 Flash, Speech Recognition, and gTTS:

---

# 🗣️ AI Voice Calling Assistant (Flask Prototype)

This project is a prototype for an AI-powered voice assistant built with Flask. It accepts user text input, processes it using Google Gemini 1.5 Flash for response generation, detects language automatically, and returns both a text and voice (MP3) response using Google Text-to-Speech (gTTS).

## 🔧 Features

* 🌍 **Multilingual Support** using automatic language detection
* 🧠 **AI-Powered Responses** with Google Gemini 1.5 Flash (`generativeai`)
* 🎤 **Text-to-Speech (TTS)** using `gTTS`
* 🖥️ **Web Interface** with Flask + HTML
* 🔁 **Audio Reply Playback** via `/audio` endpoint

---

## 🚀 Usage

### 🔧 Requirements

* Python 3.8+
* `Flask`, `google-generativeai`, `speechrecognition`, `gTTS`, `langdetect`

Install dependencies:

```bash
pip install flask google-generativeai SpeechRecognition gTTS langdetect
```

### 🧠 Configure Gemini API Key

Replace this line with your own Gemini API key:

```python
genai.configure(api_key="YOUR_API_KEY")
```

---

### ▶️ Run the App

```bash
python app.py
```

Visit `http://127.0.0.1:5000` in your browser.

---

## 📁 Project Structure

```
├── app.py
├── templates/
│   └── index.html
├── response.mp3
└── README.md
```

---

## 📦 Endpoints

* `/` → Web UI
* `/process_text` → Accepts POST request with `{ text: "your input" }` and returns AI response
* `/audio` → Returns `response.mp3` audio file

---

## 💡 Example Use Case

You type:
`"Hola, ¿cómo estás?"`

The assistant:

* Detects Spanish
* Generates a friendly Spanish reply using Gemini Flash
* Converts it to audio
* Plays the response back via `/audio`

---

## ⚠️ Note

* Only basic language detection is supported (`en`, `hi`, `or` preferred)
* Experimental prototype – not suitable for production use

---

## 🤝 Contributions

Pull requests and suggestions are welcome!

---

## 📄 License

MIT License

---

Let me know if you'd like me to generate the `index.html` template as well!
