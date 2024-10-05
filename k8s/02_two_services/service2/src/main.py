from fastapi import FastAPI
import os

app = FastAPI()

@app.get('/')
def get_test():
    return {
        'message': 'Service 2',
        'customization': os.getenv('SERVICE2_CUSTOMIZATION'),
    }
