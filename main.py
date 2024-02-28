from openai_integration.openai_client import create_openai_client
from audio_processing.trim_audio import refactor_audio
from openai_integration.summarisation import abstract_summary_extraction
from audio_processing.transcribe_audio import transcribe_audio

# splitting audio file into 30 second segments.
refactor_audio('./EarningsCall.wav','Audio_files')

client = create_openai_client()

transcribe_audio(client, './Audio_files')

# summary = abstract_summary_extraction(client, transcription)

# print(summary)






