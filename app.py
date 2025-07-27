from flask import Flask, render_template, request, jsonify, send_file
import google.generativeai as genai
import speech_recognition as sr
from gtts import gTTS
from langdetect import detect
import os

app = Flask(__name__)

# Gemini 2.5 Flash config
genai.configure(api_key="AIzaSyCWLlP3WPVwInwn7MAHj3ujgOlpPav83Qk")
model = genai.GenerativeModel("models/gemini-1.5-flash")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process_text', methods=['POST'])
def process_text():
    data = request.get_json()
    user_text = data['text']
    lang = detect(user_text)

    prompt = f"You are a friendly multilingual assistant. Respond in {lang} to: {user_text}"
    try:
        response = model.generate_content(prompt)
        reply = response.text

        tts = gTTS(reply, lang=lang if lang in ['en', 'hi', 'or'] else 'en')
        tts.save("response.mp3")

        return jsonify({'reply': reply})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/audio')
def audio():
    return send_file('response.mp3', mimetype='audio/mpeg')

if __name__ == '__main__':
    app.run(debug=True)
