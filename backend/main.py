from fastapi import FastAPI, Depends, HTTPException, status, Response, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from pydantic import BaseModel
from cs2api import CS2
from dotenv import load_dotenv
import os

# source venv/bin/activate (Mac/Linux)
# venv\Scripts\activate (Windows)
# uvicorn main:app --reload

# --- Config ---
load_dotenv() 
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))
REFRESH_TOKEN_EXPIRE_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", 7))
REFRESH_TOKEN_EXPIRE_DAYS_REMEMBER = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS_REMEMBER", 30))
DATABASE_URL = os.getenv("DATABASE_URL")

# --- Database setup ---
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)

# --- Models / Classes ---
class UserTeam(Base):
    __tablename__ = "user_teams"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    team_id = Column(String, index=True)
    
    user = relationship("User", back_populates="followed_teams")

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)

    # relation to followed teams
    followed_teams = relationship("UserTeam", back_populates="user", cascade="all, delete-orphan")

class UserRegister(BaseModel):
    username: str
    password: str
    
class UserLogin(BaseModel):
    username: str
    password: str
    remember_me: bool = False
        
# TODO: Remove this class later
class UserOut(BaseModel):
    id: int 
    username: str
    class Config:
        from_attributes = True  # Allows to return SQLAlchemy objects

Base.metadata.create_all(bind=engine)

# --- Dependency (SQLAlchemy) ---
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
# --- Security ---
password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return password_context.hash(password)
        
def verify_password(plain_password, hashed_password):
    return password_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# --- API User ---
@app.post("/register")
def register(request: UserRegister, db: Session = Depends(get_db)):
    # Check if user already exists
    user = db.query(User).filter(User.username == request.username).first()
    if user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    # Create new user
    hashed_password = get_password_hash(request.password)
    new_user = User(username=request.username, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"msg": "User created", "username": new_user.username}

@app.post("/login")
def login(request: UserLogin, response: Response, db: Session = Depends(get_db)):
    # Authenticate user
    user = db.query(User).filter(User.username == request.username).first()
    
    if not user or not verify_password(request.password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid username or password")

    # Generate JWT (Access Token)
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)

    # Generate JWT (Refresh Token)
    remember_me = request.remember_me
    refresh_expires = timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS_REMEMBER if remember_me else REFRESH_TOKEN_EXPIRE_DAYS)
    refresh_token = create_access_token(data={"sub": user.username}, expires_delta=refresh_expires)

    # Set token in HttpOnly cookie
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        samesite="lax",
        secure=False,  # TODO: Set to True in production with HTTPS
        domain="localhost",
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        max_age=refresh_expires.total_seconds(),
        samesite="lax",
        secure=False, # TODO: Set to True in production with HTTPS
        domain="localhost",
    )

    return {"msg": "Login successful"}

@app.get("/me")
def get_current_user(request: Request, db: Session = Depends(get_db)):
    # Get JWT token from browser cookies
    
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    try:
        # Decode the JWT using the secret key
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        
        # Extract the "sub" field from token payload
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        # Decoding fails
        raise HTTPException(status_code=401, detail="Invalid token")

    # Check if user exists
    user = db.query(User).filter(User.username == username).first()
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")

    return {"id": user.id, "username": user.username}

@app.post("/refresh")
def refresh_token(request: Request, response: Response, db: Session = Depends(get_db)):
    refresh_token = request.cookies.get("refresh_token")
    if not refresh_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid refresh token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    # Check if user stil exists
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    # Create new access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    new_access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )

    response.set_cookie(
        key="access_token",
        value=new_access_token,
        httponly=True,
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        samesite="lax",
        secure=False,
        domain="localhost",
    )

    return {"msg": "Access token refreshed"}

# TODO: Remove this endpoint later
@app.get("/users", response_model=list[UserOut])
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users

# --- API Teams --- 
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