
from flask import Flask, request, jsonify
from flask_cors import CORS

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
        # audio_file.save('../' + audio_file.filename)
        audio_file.save('' + audio_file.filename)
        print('Audio file saved successfully')
        messages = ["Hello from our server", "Hi from our server", 
                    "Greetings from our server", "Welcome from our server",
                      "Good day from our server"]
        return jsonify(messages), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
