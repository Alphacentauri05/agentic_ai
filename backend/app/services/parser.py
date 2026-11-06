import io
import re
from typing import Dict, Any, List
import PyPDF2

def extract_text_from_pdf_bytes(pdf_bytes: bytes) -> str:
    """Extract clean text content from PDF file bytes."""
    try:
        reader = PyPDF2.PdfReader(io.BytesIO(pdf_bytes))
        extracted_text = []
        for page in reader.pages:
            text = page.extract_text()
            if text:
                extracted_text.append(text)
        return "\n".join(extracted_text)
    except Exception as e:
        return f"Error parsing PDF: {str(e)}"

def clean_and_tokenize(text: str) -> List[str]:
    """Basic NLP tokenization and lowercase normalization."""
    tokens = re.findall(r'\b[a-zA-Z0-9_\-\.\+]+\b', text.lower())
    return tokens

def detect_sections(text: str) -> Dict[str, str]:
    """Detect common resume or syllabus sections."""
    sections = {}
    current_section = "general"
    lines = text.split("\n")
    
    for line in lines:
        cleaned = line.strip().lower()
        if any(h in cleaned for h in ["education", "academics", "coursework", "units"]):
            current_section = "academics"
        elif any(h in cleaned for h in ["projects", "experience", "technical skills"]):
            current_section = "projects"
        elif any(h in cleaned for h in ["requirements", "responsibilities", "qualifications"]):
            current_section = "requirements"
            
        sections[current_section] = sections.get(current_section, "") + "\n" + line
        
    return sections
