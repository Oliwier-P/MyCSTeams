from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from cs2api import CS2

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)

@app.get("/")
def read_root():
    return {"Hello": "Wrold"}

@app.get("/api/live-matches")
async def live_matches():
    async with CS2() as cs2:
        data = await cs2.get_live_matches()
    return {"matches": data}
