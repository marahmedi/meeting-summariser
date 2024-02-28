from openai import OpenAI
from dotenv import load_dotenv
import os

def create_openai_client():
    load_dotenv()
    return OpenAI(api_key=os.getenv("OPENAI_API_KEY"))