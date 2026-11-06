@echo off
echo ========================================================
echo         Starting SkillBridge AI (React + FastAPI)
echo ========================================================
echo.

echo [1/2] Launching FastAPI Backend on http://127.0.0.1:8000 ...
start "SkillBridge FastAPI Backend" cmd /k "python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload"

timeout /t 2 >nul

echo [2/2] Launching React Vite Frontend on http://127.0.0.1:5173 ...
start "SkillBridge React Frontend" cmd /k "npm run dev"

echo.
echo ========================================================
echo Both servers are launching in separate windows!
echo - React Dashboard: http://127.0.0.1:5173/
echo - FastAPI Docs:    http://127.0.0.1:8000/docs
echo ========================================================
pause
