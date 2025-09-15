from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from cs2api import CS2

# source venv/bin/activate (Mac/Linux)
# venv\Scripts\activate (Windows)
# uvicorn main:app --reload


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)

@app.get("/api/team/{name}/search")
async def search_teams(name: str):
    async with CS2() as cs2:
        results = await cs2.search_teams(name)
    return {"teams": results}

@app.get("/api/team/{name}/data")  # name -> team_slug
async def team_data(name: str):
    async with CS2() as cs2:
        data = await cs2.get_team_data(name)
    return {"team_data": data}

@app.get("/api/team/{team_id}/upcoming-matches")
async def team_upcoming_matches(team_id: int):
    async with CS2() as cs2:
        data = await cs2.get_team_upcoming_matches(team_id)
    return {"team_matches": data}

# TODO: Validation for search-teams and other endpoints