from openai_integration.openai_client import create_openai_client
from audio_processing.trim_audio import trim_audio
from openai_integration.summarisation import abstract_summary_extraction
from audio_processing.transcribe_audio import transcribe_audio

# Trim first 30 seconds of the audio
trim_audio('./EarningsCall.wav', './TrimmedAudio.wav', 0, 30000)

client = create_openai_client()

transcription = transcribe_audio(client, './TrimmedAudio.wav')

summary = abstract_summary_extraction(client, transcription)

print(summary)




