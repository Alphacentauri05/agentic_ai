import requests
import json
import os

def test_full_pipeline():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    test_dir = os.path.join(base_dir, "test_data")
    
    with open(os.path.join(test_dir, "syllabus_sample.txt"), "r", encoding="utf-8") as f:
        syllabus = f.read()
    with open(os.path.join(test_dir, "resume_sample.txt"), "r", encoding="utf-8") as f:
        resume = f.read()
    with open(os.path.join(test_dir, "job_description_sample.txt"), "r", encoding="utf-8") as f:
        jd = f.read()

    print("\n=======================================================")
    print("Testing SkillBridge AI: Triangular Evaluation Engine")
    print("=======================================================")
    print(f"Loaded Syllabus ({len(syllabus)} chars)")
    print(f"Loaded Resume ({len(resume)} chars)")
    print(f"Loaded Job Description ({len(jd)} chars)")

    # 1. Health check
    health_res = requests.get("http://127.0.0.1:8000/api/health")
    assert health_res.status_code == 200, f"Health check failed: {health_res.text}"
    print(f"[OK] Health check passed: {health_res.json()}")

    # 2. Analyze test documents
    payload = {
        "syllabus_text": syllabus,
        "resume_text": resume,
        "job_description_text": jd
    }
    
    print("\nSending payload to http://127.0.0.1:8000/api/analyze ...")
    res = requests.post("http://127.0.0.1:8000/api/analyze", json=payload)
    assert res.status_code == 200, f"Analysis failed: {res.text}"
    
    data = res.json()
    metrics = data["metrics"]
    print("\n[OK] Analysis Succeeded! Extracted Metrics:")
    print(f"  - Overall Placement Readiness: {metrics['overallReadiness']}%")
    print(f"  - Academic Foundation Coverage: {metrics['academicCoverage']}%")
    print(f"  - Resume Evidence Strength:     {metrics['resumeEvidence']}%")
    print(f"  - Total Skills Evaluated:       {metrics['totalSkillsAnalyzed']}")
    print(f"  - Ready / Strong:               {metrics['strongSkills']}")
    print(f"  - Needs Practice:               {metrics['moderateSkills']}")
    print(f"  - High Priority Gaps:           {metrics['missingSkills']}")
    print(f"  - Learn Later (Bonus):          {metrics['learnLater']}")

    print("\nTriangular Skill Breakdown:")
    for item in data["skillComparison"]:
        print(f"  • {item['name']:<30} | Status: {item['badge']:<20} | Reason: {item['explanation']}")

    # 3. Test What-If Simulator Endpoint
    what_if_payload = {
        "base_score": metrics['overallReadiness'],
        "toggled_skill_ids": ["pytorch", "docker"]
    }
    print("\nTesting 'What-If' Simulation Endpoint for [PyTorch, Docker]...")
    wif_res = requests.post("http://127.0.0.1:8000/api/what-if", json=what_if_payload)
    assert wif_res.status_code == 200, f"What-If failed: {wif_res.text}"
    wif_data = wif_res.json()
    print(f"[OK] What-If Simulation Result: {wif_data['original_score']}% -> {wif_data['updated_score']}% (+{wif_data['delta']}%)")
    for cap in wif_data["unlocked_capabilities"]:
        print(f"     + {cap}")

    print("\n=======================================================")
    print("ALL TESTS PASSED WITH 100% SUCCESS!")
    print("=======================================================\n")

if __name__ == "__main__":
    test_full_pipeline()
