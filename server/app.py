from flask import Flask, request, jsonify
from flask_cors import CORS
import json

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
        #summary = summarise_audio(audio_file)
    
        print('Audio file saved successfully')
        

            # Assume you have a single string containing user story information
        summary = """
        id: 1
        Title: Implement Caching Mechanism for Improved Performance
        Description: As a developer, I want to implement a caching mechanism within our web application. This will allow us to reduce page load times and enhance the overall user experience.
        Acceptance Criteria:
        - When a user accesses a frequently requested page, the system should retrieve data from the cache rather than making a fresh database query.
        - Cache expiration should be configurable, allowing us to balance data freshness with performance gains.
        - Automated tests should verify that cached content remains consistent and up-to-date.
        id: 2
        Title: Navigate to australia like a chicken nugget
        Description: As a chicken nugget, I want to navigate to Australia so that I can experience the land down under.
        Acceptance Criteria:
        - The chicken nugget must be able to travel across the ocean.
        - The chicken nugget must be able to survive the journey.
        - The chicken nugget must be able to explore various regions of Australia.
        id: 3
        Title: Order a pizza online
        Description: As a pizza lover, I want to order a pizza online so that I can enjoy a delicious meal without leaving my home.
        Acceptance Criteria:
        - The online ordering system should allow me to choose from a variety of toppings and crust styles.
        - The system should provide an estimated delivery time based on my location.
        - I should receive a confirmation email with the order details after completing the purchase.
        """

        user_stories = turn_summary_into_story(summary)
        return jsonify({'user_stories': user_stories}), 200
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
    
def turn_summary_into_story(summary):
    user_stories = []
    user_story = {}
    acceptance_criteria = []

    for line in summary.split("\n"):
        line = line.lstrip()  # Remove leading whitespace
        if line.startswith("id:"):
            if user_story:
                user_story["acceptance_criteria"] = acceptance_criteria
                user_stories.append(user_story)
            user_story = {"id": int(line.replace("id:", "").strip())}
            acceptance_criteria = []
        elif line.startswith("Title:"):
            user_story["title"] = line.replace("Title:", "").strip()
        elif line.startswith("Description:"):
            user_story["description"] = line.replace("Description:", "").strip()
        elif line.startswith("-"):
            acceptance_criteria.append(line.strip("- ").strip())

    if user_story:
        user_story["acceptance_criteria"] = acceptance_criteria
        user_stories.append(user_story)

    return user_stories

if __name__ == '__main__':
    app.run(debug=True)
