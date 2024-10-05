from fastapi import FastAPI
from uuid import uuid4

app = FastAPI()

uuid = uuid4()

@app.get('/')
def get_uuid():
    return uuid
