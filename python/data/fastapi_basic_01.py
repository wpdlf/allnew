from fastapi import FastAPI

app = FastAPI()

@app.get('/')
async def healthCheck():
    return "OK"

@app.get('/hello')
async def Hello():
    return "Hello world~!!"

@app.get('/select')
async def select():
    