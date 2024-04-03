import os
from pydub import AudioSegment


def refactor_audio(input_path, output_folder):
    name_without_extension = get_file_name(input_path)
    audio = AudioSegment.from_file(input_path)

    segment = 30000
    for i, start_ms in enumerate(range(0, len(audio), segment)):
        end_ms = start_ms + segment
        trimmed_audio = audio[start_ms:end_ms]
        file_name = f'{output_folder}/{name_without_extension}{i + 1}.wav'
        print(file_name)
        trimmed_audio.export(file_name, format="wav")


def get_file_name(file_path):
    base_name = os.path.basename(file_path)  # Get the base name of the file
    file_name_without_extension = os.path.splitext(base_name)[
        0]  # Split the base name into name and extension, and take the name part
    print(file_name_without_extension)
    return file_name_without_extension
