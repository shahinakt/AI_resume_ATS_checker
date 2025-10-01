import spacy
from rapidfuzz import fuzz

nlp = spacy.load("en_core_web_sm")

def extract_skills(text: str) -> list:
    doc = nlp(text.lower())
    return list(set([token.text for token in doc if token.pos_ in ("NOUN", "PROPN")]))


def fuzzy_match(keywords: list, skills: list, threshold=80):
    matches, missing = [], []
    for kw in keywords:
        found = any(fuzz.partial_ratio(kw.lower(), skill.lower()) >= threshold for skill in skills)
        if found:
            matches.append(kw)
        else:
            missing.append(kw)
    return matches, missing