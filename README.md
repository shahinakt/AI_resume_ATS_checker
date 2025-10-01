# AI Resume ATS Checker

> An intelligent web application that analyzes resumes against job descriptions using AI-powered ATS (Applicant Tracking System) technology.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688.svg)](https://fastapi.tiangolo.com/)

## Overview

This application helps job seekers optimize their resumes by providing detailed analysis of how well their resume matches specific job requirements. It uses natural language processing and AI to simulate ATS scoring and provide actionable improvement suggestions.

## Features

- **Resume Analysis**: Upload PDF resumes for comprehensive evaluation
- **Job Description Matching**: Compare resumes against specific job postings
- **ATS Score Calculation**: Get numerical scores showing resume compatibility
- **Improvement Suggestions**: Receive AI-powered recommendations for optimization
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Framer Motion

### Backend
- FastAPI
- Python
- OpenAI API
- spaCy (NLP)
- PyMuPDF (PDF processing)

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- OpenAI API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/shahinakt/AI_resume_ATS_checker.git
cd AI_resume_ATS_checker
```

2. **Backend setup**
```bash
cd backend
pip install -r requirements.txt
```

3. **Frontend setup**
```bash
cd frontend
npm install
```

4. **Environment configuration**
Create a `.env` file in the backend directory with your OpenAI API key:
```env
OPENAI_API_KEY=your_api_key_here
```

### Running the Application

1. **Start the backend server:**
```bash
cd backend
uvicorn app.main:app --reload
```

2. **Start the frontend development server:**
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`

## License

This project is licensed under the MIT License.