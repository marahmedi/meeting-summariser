from pydub import AudioSegment

def trim_audio(input_path, output_path, start_ms, end_ms):
    audio = AudioSegment.from_file(input_path)
    trimmed_audio = audio[start_ms:end_ms]
    trimmed_audio.export(output_path, format="wav")
