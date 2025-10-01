from openai import OpenAI
import os

# Initialize OpenAI client only if API key is provided
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key) if api_key else None

def generate_suggestion(resume_text: str, job_description: str, missing_keywords: list):
    if not missing_keywords:
        return "Your resume matches all the key skills!"
    
    # Check if OpenAI client is available
    if not client:
        return f"Missing keywords found: {', '.join(missing_keywords)}. Please set OPENAI_API_KEY environment variable for AI-powered suggestions."
    
    prompt = f"""
    Resume Text: {resume_text[:2000]}
    Job Description: {job_description[:1000]}
    Missing Keywords: {missing_keywords}
    Suggest concise improvements to include missing keywords.
    """
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that provides resume improvement suggestions."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=150
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Could not generate AI suggestions at this time. Error: {str(e)}"