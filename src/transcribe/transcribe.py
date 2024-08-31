from flask import Flask, request, jsonify
from flask_cors import CORS
import whisper

app = Flask(__name__)
CORS(app)
model = whisper.load_model("base")

@app.route('/transcribe', methods=['POST'])
def transcribe():
    audio_file = request.files['file']
    audio_path = 'audio.mp3'
    audio_file.save(audio_path)
    
    model = whisper.load_model("base")
    result = model.transcribe("audio.mp3")
    
    return jsonify({"transcription": result})

if __name__ == '__main__':
    app.run(port=5000)
