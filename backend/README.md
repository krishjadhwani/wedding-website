# Wedding Website Backend

This is the backend service for the wedding website built with FastAPI, SQLAlchemy, and PostgreSQL.

## Prerequisites

- Python 3.8+
- PostgreSQL database
- pip or pipenv

## Setup Instructions

### 1. Setup Virtual Environment

To avoid conflicts with other Python projects, it's recommended to use a virtual environment:

```bash
# Navigate to the backend directory
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 2. Install Dependencies

After activating the virtual environment, install the required packages:

```bash
pip install -r requirements.txt
```

### 3. Environment Configuration

Create a `.env` file in the backend directory with the following configuration:

```
DATABASE_URL=postgresql://username:password@localhost:5432/wedding_db
```

Replace `username`, `password`, and `wedding_db` with your PostgreSQL credentials and database name.

### 4. Database Setup

Create the database and tables:

```bash
# Create the database in PostgreSQL
# You can do this using the PostgreSQL command line tools or a GUI like pgAdmin

# Once connected to PostgreSQL:
CREATE DATABASE wedding_db;
```

The SQLAlchemy models will create the tables when the application starts.

### 5. Running the API

Start the FastAPI server:

```bash
# Make sure you're in the backend directory and your virtual environment is activated
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at http://localhost:8000

## API Endpoints

- `GET /` - Welcome message
- `GET /api/info` - Wedding event information
- `POST /api/validate-password` - Validate the site password
- `GET /api/invite` - Get a guest's invitation by name
- `POST /api/rsvp` - Submit an RSVP response
- `POST /api/log-error` - Log frontend errors

## API Documentation

Once the server is running, you can access the automatic API documentation at:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Development Commands

Here are some useful commands for development:

```bash
# Run the server with auto-reload
uvicorn main:app --reload

# Run with a specific host and port
uvicorn main:app --host 0.0.0.0 --port 8080

# Run without auto-reload (production-like)
uvicorn main:app
```

## Project Structure

- `main.py` - The main FastAPI application
- `requirements.txt` - Python package dependencies

## Notes

- RSVP codes are generated for each group of guests
- Each guest has a status (pending, confirmed, or declined)