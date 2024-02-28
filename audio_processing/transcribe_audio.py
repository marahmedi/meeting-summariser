import os

def transcribe_audio(client, folder_path):

    audio_files = sorted([f for f in os.listdir(folder_path)], key=lambda f: os.path.getmtime(os.path.join(folder_path, f)))
    transcribed_files = []

    for audio_file in audio_files:
        audio_file_path = os.path.join(folder_path, audio_file)
        with open(audio_file_path, 'rb') as file:
            transcription = client.audio.transcriptions.create(
                model="whisper-1", 
                file=file
          )
        transcribed_files.append(transcription.text)
        
    return "".join(transcribed_files)

