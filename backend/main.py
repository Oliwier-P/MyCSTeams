from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
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

# --- Database setup ---
DATABASE_URL = "sqlite:///./teams.db";
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()

# --- Team model ---
class Team(Base):
    __tablename__ = "teams"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=False, index=True)
    slug = Column(String, unique=True, index=True)
    logo = Column(String, unique=True, index=True)
    rank = Column(Integer, unique=True, index=True)

Base.metadata.create_all(bind=engine)

# --- Dependency (SQLAlchemy) ---
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
        
# --- API --- 
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