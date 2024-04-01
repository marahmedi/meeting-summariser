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

        if audio_file.filename.split('.')[-1] not in allowed_extensions:
            return jsonify({'error': 'Invalid file format. Only audio and video files are allowed.'}), 400
        
        # Replace 'audio_uploads' with your desired directory for audio files
        audio_file.save('./' + audio_file.filename)
        summary = summarise_audio(audio_file)
        print('Audio file saved successfully')
        
        user_stories = turn_summary_into_story(summary)

        if user_stories is None:
            return jsonify({'error': 'An error occurred while turning the summary into a story'}), 500
        
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
    try:
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

    except Exception as e:
        print(f"An error occurred in turn_summary_into_story: {e}")
        return None

allowed_extensions = {'mp3', 'wav', 'mp4', 'avi'}
test_summary = """
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
        id: 4
        Title: Implement a chatbot for customer support
        Description: As a customer support representative, I want to implement a chatbot on our website to assist users with common questions and issues.
        Acceptance Criteria:
        - The chatbot should be able to answer frequently asked questions about our products and services.
        - The chatbot should provide users with relevant information based on their input.
        - The chatbot should escalate complex issues to a human representative when necessary.
        id: 5
        Title: Create a mobile app for tracking fitness goals
        Description: As a fitness enthusiast, I want to create a mobile app that allows users to set and track their fitness goals.
        Acceptance Criteria:
        - Users should be able to input their fitness goals and track their progress over time.
        - The app should provide motivational messages and reminders to help users stay on track.
        - Users should be able to share their progress with friends and social media.
        id: 6
        Title: Implement a recommendation engine for e-commerce platform
        Description: As an e-commerce platform owner, I want to implement a recommendation engine that suggests products to users based on their browsing history and preferences.
        Acceptance Criteria:
        - The recommendation engine should analyze user behavior to generate personalized product recommendations.
        - Users should be able to provide feedback on the recommendations to improve future suggestions.
        - The recommendation engine should be scalable and able to handle a large number of users and products.
        id: 7
        Title: Develop a feature for real-time collaboration
        Description: As a software developer, I want to develop a feature that allows multiple users to collaborate on a document in real-time.
        Acceptance Criteria:
        - Users should be able to see changes made by other collaborators in real-time.
        - The feature should support multiple users editing the document simultaneously.
        - The system should provide a revision history to track changes and allow users to revert to previous versions.
        id: 8
        Title: Create a dashboard for monitoring system performance
        Description: As a system administrator, I want to create a dashboard that displays real-time performance metrics for our servers and applications.
        Acceptance Criteria:
        - The dashboard should provide an overview of CPU usage, memory consumption, and network traffic.
        - Users should be able to set up alerts for performance thresholds and receive notifications when thresholds are exceeded.
        - The dashboard should support customization to display specific metrics based on user preferences.
        """

if __name__ == '__main__':
    app.run(debug=True)
