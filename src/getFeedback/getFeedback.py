from flask import Flask, request, jsonify
from flask_cors import CORS
import whisper
from openai import OpenAI
import json

app = Flask(__name__)
CORS(app)
model = whisper.load_model('base')

ROLE = 'recruiter'

def CRITERIA(question_type):
    if (question_type == 'Introduction'):
        return ''
    elif (question_type == 'Motivation'):
        return ''
    elif (question_type == 'Company'):
        return ''
    elif (question_type == 'Positive Situation'):
        return ''
    elif (question_type == 'Negative Situation'):
        return ''
    else:
        return ''

@app.route('/getFeedback', methods=['POST'])
def getFeedback():
    audio_file = request.files['file']
    audio_path = 'audio.mp3'
    audio_file.save(audio_path)

    data = request.form['data']
    json_data = json.loads(data)
    API_key = json_data['APIKey']
    question = json_data['question']
    question_type = json_data['questionType']
    
    model = whisper.load_model('base')
    result = model.transcribe('audio.mp3')
    transcription = result['text']

    client = OpenAI(
        api_key = API_key
    )

    system_message = 'You are a' + ROLE + \
        '.You to evaluate a transcription of this interview question: ' + question + \
        ' based on the following criteria: ' + CRITERIA(question_type)

    client_report = client.chat.completions.create(
        messages=[
            {'role': 'system', 'content': system_message},
            {'role': 'user', 'content': transcription}
        ],
        model='gpt-3.5-turbo'
    )
    print(client_report)
    report = client_report.choices[0].message.content
    print(report)
    return jsonify({'transcription': transcription, 'report': report})

if __name__ == '__main__':
    app.run(port=5000)
