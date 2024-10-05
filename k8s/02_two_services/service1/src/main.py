from dotenv import load_dotenv, find_dotenv
from fastapi import FastAPI
import requests, os

load_dotenv(find_dotenv())

app = FastAPI()

@app.get('/')
def get_test():
    return {
        'message': 'Service 1',
        'service2': requests.get(
            url=os.getenv('SERVICE2_URL', 'https://static.benedikt-schwering.de/'),
        ).text,
    }
