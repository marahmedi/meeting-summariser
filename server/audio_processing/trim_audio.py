from pydub import AudioSegment

def refactor_audio(input_path, output_folder):
    audio = AudioSegment.from_file(input_path)

    segment = 30000

    for i, start_ms in enumerate(range(0, len(audio), segment)):
        end_ms = start_ms + segment
        trimmed_audio = audio[start_ms:end_ms]
        file_name = f'{output_folder}/segment{i+1}.wav'
        trimmed_audio.export(file_name, format="wav")

    
