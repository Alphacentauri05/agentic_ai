from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
import json

from backend.app.schemas import (
    DocumentInput,
    AnalysisResult,
    WhatIfCalculateRequest,
    WhatIfCalculateResponse,
    WhatIfSimulatorData,
    WhatIfOption
)
from backend.app.data.sample_presets import PRESETS
from backend.app.services.gap_analyzer import perform_triangular_analysis
from backend.app.services.dependency_graph import build_prerequisite_graph
from backend.app.services.roadmap_generator import generate_personalized_roadmap, generate_recommended_projects
from backend.app.services.parser import extract_text_from_pdf_bytes

app = FastAPI(
    title="SkillBridge AI API",
    description="Academic, Resume & Job Description Triangular Skill Match Engine",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "service": "SkillBridge AI Core",
        "engine": "FastAPI + NetworkX + NLP",
        "version": "1.0.0"
    }

@app.get("/api/presets")
def get_presets():
    return list(PRESETS.keys())

@app.get("/api/preset/{profile_id}")
def get_preset_profile(profile_id: str):
    if profile_id not in PRESETS:
        raise HTTPException(status_code=404, detail="Profile not found")
    return PRESETS[profile_id]

@app.post("/api/analyze")
def analyze_documents(payload: DocumentInput):
    # Check if a known preset ID was provided
    if payload.profile_id and payload.profile_id in PRESETS:
        return PRESETS[payload.profile_id]

    # Perform dynamic analysis on provided text
    tri_results = perform_triangular_analysis(
        payload.syllabus_text,
        payload.resume_text,
        payload.job_description_text
    )

    skill_status_map = {
        "pytorch": "target_gap",
        "docker": "target_gap",
        "python": "completed",
        "fastapi": "completed"
    }
    graph = build_prerequisite_graph(skill_status_map)
    roadmap = generate_personalized_roadmap(["PyTorch", "Docker"])
    projects = generate_recommended_projects()

    what_if = WhatIfSimulatorData(
        initialScore=tri_results["metrics"].overallReadiness,
        skillsToToggle=[
            WhatIfOption(id="pytorch", name="Master PyTorch & Deep Learning", boost=16, checked=False),
            WhatIfOption(id="docker", name="Containerize projects with Docker", boost=10, checked=False),
            WhatIfOption(id="mlops", name="Add Vector Search / MLOps Pipeline", boost=7, checked=False),
            WhatIfOption(id="numpy_adv", name="Advanced NumPy & Tensor Vectorization", boost=5, checked=False)
        ]
    )

    return AnalysisResult(
        id="custom_analysis",
        title="Custom Triangular Analysis",
        targetCompany="Target Industry Role",
        studentInfo={
            "degree": "Evaluated Student Profile",
            "semester": "Current Standing",
            "university": "User Uploaded Curriculum",
            "cgpa": "Evaluated"
        },
        metrics=tri_results["metrics"],
        documents={
            "syllabus": {
                "title": "Uploaded Syllabus",
                "summary": "Extracted academic curriculum and theoretical modules.",
                "coverageTags": ["Core Computer Science", "Coursework Modules"]
            },
            "resume": {
                "title": "Uploaded Student Resume",
                "summary": "Extracted project evidence and practical programming languages.",
                "evidenceHighlights": ["Verified practical project repos & coursework"]
            },
            "jobDescription": {
                "title": "Target Job Description",
                "summary": "Extracted required core competencies and preferred tooling.",
                "requiredSkills": ["Core requirements identified"],
                "preferredSkills": ["Preferred / Bonus skills identified"]
            }
        },
        skillComparison=tri_results["skillComparison"],
        skillDependencyGraph=graph,
        roadmap=roadmap,
        recommendedProjects=projects,
        whatIfSimulator=what_if
    )

@app.post("/api/analyze-files")
async def analyze_uploaded_files(
    syllabus_file: UploadFile = File(...),
    resume_file: UploadFile = File(...),
    jd_file: UploadFile = File(...)
):
    # Read syllabus
    s_bytes = await syllabus_file.read()
    if syllabus_file.filename.lower().endswith(".pdf"):
        syllabus_text = extract_text_from_pdf_bytes(s_bytes)
    else:
        syllabus_text = s_bytes.decode("utf-8", errors="ignore")

    # Read resume
    r_bytes = await resume_file.read()
    if resume_file.filename.lower().endswith(".pdf"):
        resume_text = extract_text_from_pdf_bytes(r_bytes)
    else:
        resume_text = r_bytes.decode("utf-8", errors="ignore")

    # Read JD
    jd_bytes = await jd_file.read()
    if jd_file.filename.lower().endswith(".pdf"):
        jd_text = extract_text_from_pdf_bytes(jd_bytes)
    else:
        jd_text = jd_bytes.decode("utf-8", errors="ignore")

    tri_results = perform_triangular_analysis(syllabus_text, resume_text, jd_text)
    
    skill_status_map = {}
    for item in tri_results["skillComparison"]:
        s_id = item.name.lower()
        if "pytorch" in s_id:
            skill_status_map["pytorch"] = "target_gap" if item.status == "missing" else "completed"
        if "docker" in s_id:
            skill_status_map["docker"] = "target_gap" if item.status == "missing" else "completed"
        if "python" in s_id:
            skill_status_map["python"] = "completed"
        if "fastapi" in s_id or "flask" in s_id:
            skill_status_map["fastapi"] = "completed"

    graph = build_prerequisite_graph(skill_status_map)
    roadmap = generate_personalized_roadmap(["PyTorch", "Docker"])
    projects = generate_recommended_projects()

    what_if = WhatIfSimulatorData(
        initialScore=tri_results["metrics"].overallReadiness,
        skillsToToggle=[
            WhatIfOption(id="pytorch", name="Master PyTorch & Deep Learning", boost=16, checked=False),
            WhatIfOption(id="docker", name="Containerize projects with Docker", boost=10, checked=False),
            WhatIfOption(id="mlops", name="Add Vector Search / MLOps Pipeline", boost=7, checked=False),
            WhatIfOption(id="numpy_adv", name="Advanced NumPy & Tensor Vectorization", boost=5, checked=False)
        ]
    )

    return AnalysisResult(
        id="file_analysis",
        title=f"Analysis: {resume_file.filename}",
        targetCompany=f"Role: {jd_file.filename}",
        studentInfo={
            "degree": "Evaluated Student Candidate",
            "semester": "Current Standing",
            "university": syllabus_file.filename,
            "cgpa": "Evaluated Profile"
        },
        metrics=tri_results["metrics"],
        documents={
            "syllabus": {
                "title": syllabus_file.filename,
                "summary": f"Extracted {len(syllabus_text.split())} words from university curriculum.",
                "coverageTags": ["Coursework Units", "Extracted Modules"]
            },
            "resume": {
                "title": resume_file.filename,
                "summary": f"Extracted {len(resume_text.split())} words from student resume.",
                "evidenceHighlights": [f"Parsed projects & repositories from {resume_file.filename}"]
            },
            "jobDescription": {
                "title": jd_file.filename,
                "summary": f"Extracted {len(jd_text.split())} words from job description.",
                "requiredSkills": ["Core requirements identified"],
                "preferredSkills": ["Preferred / Bonus qualifications"]
            }
        },
        skillComparison=tri_results["skillComparison"],
        skillDependencyGraph=graph,
        roadmap=roadmap,
        recommendedProjects=projects,
        whatIfSimulator=what_if
    )

@app.post("/api/what-if", response_model=WhatIfCalculateResponse)
def calculate_what_if(req: WhatIfCalculateRequest):
    boost_map = {
        "pytorch": 16,
        "docker": 10,
        "mlops": 7,
        "numpy_adv": 5,
        "ts": 14,
        "pg": 8,
        "dock": 6,
        "test": 4
    }
    
    total_boost = 0
    unlocked = []
    for s_id in req.toggled_skill_ids:
        b = boost_map.get(s_id, 6)
        total_boost += b
        unlocked.append(f"Unlocked competency: {s_id.upper()} (+{b}% fit)")

    new_score = min(98, req.base_score + total_boost)
    return WhatIfCalculateResponse(
        original_score=req.base_score,
        updated_score=new_score,
        delta=total_boost,
        unlocked_capabilities=unlocked
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main:app", host="127.0.0.1", port=8000, reload=True)
