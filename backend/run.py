import uvicorn
import sys
import os

# Ensure backend folder is on python path
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)

if __name__ == "__main__":
    print("Starting SkillBridge AI FastAPI backend on http://127.0.0.1:8000...")
    uvicorn.run("backend.app.main:app", host="127.0.0.1", port=8000, reload=True)
