from flask import Flask, request, jsonify
from flask_cors import CORS
import whisper
from openai import OpenAI
import json
import os

app = Flask(__name__)
CORS(app)
model = whisper.load_model('base')

ROLE = 'recruiter'

# Old response format
"""
RESPONSE_FORMAT = (
    '{'
    r'"<criteria1>": {"score": <value>, "feedback": "<feedback>"}, '
    r'"<criteria2>": {"score": <value>, "feedback": "<feedback>"}, '
    '... '
    '}'
)

def CRITERIA(question_type):
    if (question_type == 'Introduction'):
        return 'clarity, relevance, structure'
    elif (question_type == 'Motivation'):
        return 'alignment, company fit, goals'
    elif (question_type == 'Company'):
        return 'research, understanding, fit'
    elif (question_type == 'Positive Situation'):
        return 'example relevance, impact, skills demonstrated'
    elif (question_type == 'Negative Situation'):
        return 'self-awareness, problem-solving, learning'
    else:
        return 'create your own criteria'
"""

test_transcription = r"In my previous job, I was reporting to two different managers. On one occasion, I was already working on a project for one manager and I received an additional project from the other manager simultaneously. However, I didn’t inform either of them about it. Halfway through the projects, I realised I couldn't meet both deadlines. I told my managers what had happened, and we were able to find extra resources to complete the projects on time. Now, when I take on multiple projects, I keep my managers informed, map out my schedule and assess what I can handle more sensibly."
test_response = r"This response demonstrates a good reflection on a mistake made by the candidate and highlights the steps taken to rectify it. The candidate showed accountability by admitting their oversight and taking swift action to address the issue by involving their managers to find a solution. Additionally, the candidate shared a proactive approach taken after the incident to prevent a similar situation from occurring in the future by better managing their workload and communicating effectively with their managers.\n\nTo enhance this response further, the candidate could provide more specific details about the impact of the mistake on the projects or the overall work environment. It would be beneficial to include specific examples of how they assessed their workload, communicated with their managers, and organized their tasks to handle multiple projects more effectively. Additionally, the response could be improved by elaborating on the lessons learned from this experience and how they have applied those lessons in subsequent situations to demonstrate growth and development.\n\nOverall, this response is a good starting point but could be strengthened by providing more detailed examples and showcasing personal growth and learning from the mistake."

@app.route('/getFeedback', methods=['POST'])
def getFeedback():
    audio_file = request.files['file']
    current_path = os.path.dirname(os.path.realpath(__file__))
    audio_path = os.path.join(current_path, 'audio.mp3')
    audio_file.save(audio_path)

    data = request.form['data']
    json_data = json.loads(data)
    API_key = json_data['APIKey']
    question = json_data['question']
    question_type = json_data['questionType']
    # Commented out to avoid processing for testing
    '''
    model = whisper.load_model('base')
    result = model.transcribe('audio.mp3')
    transcription = result['text']
    '''
    transcription = test_transcription
    client = OpenAI(
        api_key = API_key
    )
    # Old response format
    """
    system_message = (
        f'You are a {ROLE}. '
        f'You need to evaluate a transcription of this interview question: \"{question}\" '
        f'based on the following criteria: {CRITERIA(question_type)}. '
        f'You are to give your response in the following format: {RESPONSE_FORMAT}.'
    )
    """
    question = "Tell me about a time when you made a mistake and what you did to correct it."
    system_message = (
        f'you are a recruiter. '
        f'you need to critically evaluate a response to this interview question: {question}. '
        f'You give them feedback on what was good and how they can improve their response.'
    )
    """
    client_report = client.chat.completions.create(
        messages=[
            {'role': 'system', 'content': system_message},
            {'role': 'user', 'content': transcription}
        ],
        model='gpt-3.5-turbo'
    )
    report = client_report.choices[0].message.content
    """
    report = test_response

    return jsonify({'transcription': transcription, 'report': report})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

