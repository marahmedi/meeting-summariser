from openai import OpenAI

from dotenv import load_dotenv
import os
from pydub import AudioSegment

def trim_audio(input_path, output_path, start_ms, end_ms):
    audio = AudioSegment.from_file(input_path)
    trimmed_audio = audio[start_ms:end_ms]
    trimmed_audio.export(output_path, format="wav")

# Example usage to trim first 30 seconds of the audio
trim_audio('./EarningsCall.wav', './TrimmedAudio.wav', 0, 30000)

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

def transcribe_audio(audio_file_path):
    with open(audio_file_path, 'rb') as audio_file:
        transcription = client.audio.transcriptions.create(
            model="whisper-1", 
            file = audio_file
            )
    return transcription

print(transcribe_audio('./TrimmedAudio.wav'))


