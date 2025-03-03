from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base, Session
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

# Database setup
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()

# FastAPI app instance
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Define a model for password input
class PasswordInput(BaseModel):
    password: str

# Hardcoded password (can later be stored securely)
VALID_PASSWORD = "logistics2025"

@app.post("/api/validate-password")
def validate_password(data: PasswordInput):
    if data.password == VALID_PASSWORD:
        return {"success": True}
    raise HTTPException(status_code=401, detail="Invalid password")

# Database Models
class Group(Base):
    __tablename__ = "groups"
    id = Column(Integer, primary_key=True, index=True)
    group_name = Column(String, nullable=False)
    rsvp_code = Column(String, unique=True, nullable=False)

class Invitation(Base):
    __tablename__ = "invitations"
    id = Column(Integer, primary_key=True, index=True)
    group_id = Column(Integer, ForeignKey("groups.id"), nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=True)
    status = Column(String, default="pending")

# Pydantic Models
class RSVPRequest(BaseModel):
    first_name: str
    last_name: str

class RSVPResponse(BaseModel):
    rsvp_code: str
    group_name: str
    guests: list

class RSVPUpdate(BaseModel):
    rsvp_code: str
    guest_id: int
    status: str

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# API Endpoints

@app.get("/")
def read_root():
    return {"message": "Welcome to the Wedding Website Backend!"}

@app.get("/api/info")
def get_info():
    return {"event": "Krish & Anisha's Wedding", "date": "November 22 - 23 2025", "location": "Mumbai, ITC Maratha"}

@app.get("/api/invite", response_model=RSVPResponse)
def get_invite(first_name: str, last_name: str, db: Session = Depends(get_db)):
    first_name = first_name.strip().title()
    last_name = last_name.strip().title()

    guest = db.query(Invitation).filter(Invitation.first_name.ilike(first_name), Invitation.last_name.ilike(last_name)).first()
    if not guest:
        raise HTTPException(status_code=404, detail="Invitation not found")

    group = db.query(Group).filter(Group.id == guest.group_id).first()
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")

    guests_in_group = db.query(Invitation).filter(Invitation.group_id == group.id).all()

    return {
        "rsvp_code": group.rsvp_code,
        "group_name": group.group_name,
        "guests": [{"id": g.id, "first_name": g.first_name, "last_name": g.last_name, "email": g.email, "status": g.status} for g in guests_in_group]
    }

@app.post("/api/rsvp")
def submit_rsvp(data: RSVPUpdate, db: Session = Depends(get_db)):
    if data.status not in ["confirmed", "declined"]:
        raise HTTPException(status_code=400, detail="Invalid RSVP status")

    group = db.query(Group).filter(Group.rsvp_code == data.rsvp_code).first()
    if not group:
        raise HTTPException(status_code=400, detail="Invalid RSVP code")

    guest = db.query(Invitation).filter(Invitation.id == data.guest_id, Invitation.group_id == group.id).first()
    if not guest:
        raise HTTPException(status_code=404, detail="Guest not found")

    guest.status = data.status
    db.commit()

    return {"message": "RSVP updated successfully"}

@app.post("/api/log-error")
def log_error(data: dict):
    print("Frontend Error Log:", data.get("error"))
    return {"message": "Error logged"}
