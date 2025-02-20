from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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

@app.get("/")
def read_root():
    return {"message": "Welcome to the Wedding Website Backend!"}

@app.get("/api/info")
def get_info():
    return {"event": "Krish & Anisha's Wedding", "date": "November 30 - December 1, 2025", "location": "Mumbai, ITC Maratha"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
