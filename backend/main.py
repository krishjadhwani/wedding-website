from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to the Wedding Website Backend!"}

@app.get("/api/info")
def get_info():
    return {"event": "Krish & Anisha's Wedding", "date": "November 30 - December 1, 2025", "location": "Mumbai, ITC Maratha"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
