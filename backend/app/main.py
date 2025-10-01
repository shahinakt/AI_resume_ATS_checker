from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import ats
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="AI ATS Resume Checker")

# Allow frontend to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ats.router, prefix="/ats", tags=["ATS"])