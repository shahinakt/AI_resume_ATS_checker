from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import JSONResponse
from app.utils.pdf_parser import extract_text_from_pdf
from app.utils.nlp import extract_skills, fuzzy_match
from app.utils.ai import generate_suggestion

router = APIRouter()

@router.post("/check_resume")
async def check_resume(file: UploadFile = File(...), job_description: str = Form(...)):
    contents = await file.read()
    if not contents:
        return JSONResponse({'error': 'Uploaded file is empty'}, status_code=400)
    
    # Extract text from PDF
    resume_text = extract_text_from_pdf(contents)
    if not resume_text.strip():
        return JSONResponse({'error': 'Could not extract text from the PDF. Please ensure it is a valid PDF file.'}, status_code=400)
    
    # Extract job keywords
    job_keywords = list(set(extract_skills(job_description)))

    # Extract resume skills
    resume_skills = extract_skills(resume_text)

    # Fuzzy match
    matches, missing = fuzzy_match(job_keywords, resume_skills)

    # Score
    score = int(len(matches)/ max(1, len(job_keywords)) * 100)

    # AI suggestion
    suggestion = generate_suggestion(resume_text, job_description, missing)

    return {
        'score': score,
        'matches': matches,
        'missing': missing,
        'ai_suggestion': suggestion,
        'privacy_note': 'Your resume is processed securely and no data is stored.'
    }