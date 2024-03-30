from flask import Flask, request, jsonify
from flask_cors import CORS

from audio_processing.transcribe_audio import transcribe_audio
from audio_processing.trim_audio import refactor_audio
from openai_integration.openai_client import create_openai_client
from openai_integration.summarisation import (abstract_summary_extraction)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


@app.route('/upload_audio', methods=['POST'])
def upload_audio_file():
    try:
        if 'audio_file' not in request.files:
            return jsonify({'error': 'No audio file part'}), 400

        audio_file = request.files['audio_file']
        print(audio_file.filename)
        if audio_file.filename == '':
            return jsonify({'error': 'No selected audio file'}), 400

        # Replace 'audio_uploads' with your desired directory for audio files
        audio_file.save('./' + audio_file.filename)
        summary = summarise_audio(audio_file)
        print('Audio file saved successfully')

        messages = [summary]
        return jsonify(messages), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def summarise_audio(audio_file):
    try:
        refactor_audio('./' + audio_file.filename, 'Audio_files')
        client = create_openai_client()
        transcription = transcribe_audio(client, './Audio_files')
        summary = abstract_summary_extraction(client, transcription)
        print(summary)
        return summary
    except Exception as e:
        return str(e)


if __name__ == '__main__':
    app.run(debug=True)
