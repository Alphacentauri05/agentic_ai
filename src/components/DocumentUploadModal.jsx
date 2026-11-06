import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle2, Cpu, Sparkles, BookOpen, Briefcase, FileUp, AlertCircle } from 'lucide-react';
import { analyzeCustomDocuments, uploadAndAnalyzeFiles } from '../services/api';

export default function DocumentUploadModal({ isOpen, onClose, onAnalysisComplete, onSelectPreset }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('files'); // 'files' (default for main app), 'custom', 'preset'
  
  // Real file states
  const [syllabusFile, setSyllabusFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [jdFile, setJdFile] = useState(null);

  // Text states
  const [syllabusText, setSyllabusText] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [jdText, setJdText] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [uploadError, setUploadError] = useState('');

  const steps = [
    "Reading & Parsing Academic Syllabus (PDF / PyPDF2)...",
    "Extracting Resume Skills & Project Evidence...",
    "Parsing Job Description Core & Preferred Requirements...",
    "Semantic Normalization (e.g. 'ML' -> 'Machine Learning')...",
    "Building Prerequisite Graph & Computing Triangular Gaps...",
    "Synthesizing Personalized Learning Roadmap & Projects..."
  ];

  // Handle Real File Upload
  const handleUploadFiles = async () => {
    if (!syllabusFile || !resumeFile || !jdFile) {
      setUploadError("Please select all 3 files (Syllabus, Resume, and Job Description) to run the full triangular analysis.");
      return;
    }
    setUploadError('');
    setIsProcessing(true);
    setCurrentStepIndex(0);

    for (let i = 0; i < steps.length; i++) {
      setCurrentStepIndex(i);
      await new Promise(r => setTimeout(r, 450));
    }

    try {
      const result = await uploadAndAnalyzeFiles(syllabusFile, resumeFile, jdFile);
      if (result) {
        onAnalysisComplete(result);
        onClose();
      } else {
        setUploadError("Could not connect to FastAPI server. Ensure python backend is running on port 8000.");
      }
    } catch (err) {
      setUploadError("Analysis error: " + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle Raw Text Input
  const handleRunTextAnalysis = async () => {
    setIsProcessing(true);
    setCurrentStepIndex(0);

    for (let i = 0; i < steps.length; i++) {
      setCurrentStepIndex(i);
      await new Promise(r => setTimeout(r, 400));
    }

    try {
      const result = await analyzeCustomDocuments(
        syllabusText || "Computer Science Core Curriculum with DBMS and Algorithms",
        resumeText || "Python Flask backend project with SQL queries",
        jdText || "Junior AI Engineer requiring PyTorch, Docker, FastAPI"
      );
      onAnalysisComplete(result);
      onClose();
    } catch (err) {
      setUploadError("Analysis error: " + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '1.5rem'
    }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '820px', maxHeight: '92vh', overflowY: 'auto', padding: '2rem', position: 'relative' }}>
        
        {/* Close Button */}
        <button 
          id="modal-close-btn"
          onClick={onClose}
          style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', color: '#9ca3af' }}
        >
          <X size={22} />
        </button>

        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.45rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Cpu size={24} color="#6366f1" />
            SkillBridge AI Analysis Console
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '0.2rem' }}>
            Upload your actual PDF documents or paste text to perform live triangular evaluation with FastAPI.
          </p>
        </div>

        {/* Tab switch */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.03)', padding: '0.3rem', borderRadius: '10px' }}>
          <button 
            id="tab-upload-files"
            onClick={() => { setActiveTab('files'); setUploadError(''); }}
            style={{ flex: 1, padding: '0.65rem', borderRadius: '8px', fontSize: '0.84rem', fontWeight: 600, background: activeTab === 'files' ? '#6366f1' : 'transparent', color: activeTab === 'files' ? '#fff' : '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
          >
            <FileUp size={16} /> Upload Real PDF Files
          </button>
          <button 
            id="tab-custom-text"
            onClick={() => { setActiveTab('custom'); setUploadError(''); }}
            style={{ flex: 1, padding: '0.65rem', borderRadius: '8px', fontSize: '0.84rem', fontWeight: 600, background: activeTab === 'custom' ? '#6366f1' : 'transparent', color: activeTab === 'custom' ? '#fff' : '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
          >
            <FileText size={16} /> Paste Raw Text
          </button>
          <button 
            id="tab-presets"
            onClick={() => { setActiveTab('preset'); setUploadError(''); }}
            style={{ flex: 1, padding: '0.65rem', borderRadius: '8px', fontSize: '0.84rem', fontWeight: 600, background: activeTab === 'preset' ? '#6366f1' : 'transparent', color: activeTab === 'preset' ? '#fff' : '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
          >
            ⚡ Sample Demo Presets
          </button>
        </div>

        {uploadError && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#fca5a5', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.25rem', fontSize: '0.84rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={16} />
            <span>{uploadError}</span>
          </div>
        )}

        {/* TAB 1: REAL FILE UPLOAD (MAIN APP FEATURE) */}
        {activeTab === 'files' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              
              {/* Syllabus Upload Box */}
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px dashed rgba(59, 130, 246, 0.4)', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
                <BookOpen size={28} color="#60a5fa" style={{ margin: '0 auto 0.5rem' }} />
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff', marginBottom: '0.2rem' }}>1. College Syllabus</div>
                <div style={{ fontSize: '0.74rem', color: '#9ca3af', marginBottom: '0.75rem' }}>Upload university curriculum (PDF or TXT)</div>
                <input 
                  type="file" 
                  id="syllabus-file-input"
                  accept=".pdf,.txt,.doc,.docx"
                  onChange={(e) => setSyllabusFile(e.target.files[0] || null)}
                  style={{ display: 'none' }}
                />
                <label 
                  htmlFor="syllabus-file-input"
                  style={{ display: 'inline-block', background: 'rgba(59, 130, 246, 0.2)', color: '#93c5fd', border: '1px solid rgba(59, 130, 246, 0.4)', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}
                >
                  {syllabusFile ? `✓ ${syllabusFile.name}` : "Choose Syllabus File"}
                </label>
              </div>

              {/* Resume Upload Box */}
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px dashed rgba(16, 185, 129, 0.4)', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
                <FileText size={28} color="#34d399" style={{ margin: '0 auto 0.5rem' }} />
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff', marginBottom: '0.2rem' }}>2. Student Resume</div>
                <div style={{ fontSize: '0.74rem', color: '#9ca3af', marginBottom: '0.75rem' }}>Upload student resume (PDF or TXT)</div>
                <input 
                  type="file" 
                  id="resume-file-input"
                  accept=".pdf,.txt,.doc,.docx"
                  onChange={(e) => setResumeFile(e.target.files[0] || null)}
                  style={{ display: 'none' }}
                />
                <label 
                  htmlFor="resume-file-input"
                  style={{ display: 'inline-block', background: 'rgba(16, 185, 129, 0.2)', color: '#6ee7b7', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}
                >
                  {resumeFile ? `✓ ${resumeFile.name}` : "Choose Resume File"}
                </label>
              </div>

              {/* Job Description Upload Box */}
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px dashed rgba(245, 158, 11, 0.4)', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
                <Briefcase size={28} color="#fbbf24" style={{ margin: '0 auto 0.5rem' }} />
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff', marginBottom: '0.2rem' }}>3. Job Description</div>
                <div style={{ fontSize: '0.74rem', color: '#9ca3af', marginBottom: '0.75rem' }}>Upload target role JD (PDF or TXT)</div>
                <input 
                  type="file" 
                  id="jd-file-input"
                  accept=".pdf,.txt,.doc,.docx"
                  onChange={(e) => setJdFile(e.target.files[0] || null)}
                  style={{ display: 'none' }}
                />
                <label 
                  htmlFor="jd-file-input"
                  style={{ display: 'inline-block', background: 'rgba(245, 158, 11, 0.2)', color: '#fcd34d', border: '1px solid rgba(245, 158, 11, 0.4)', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}
                >
                  {jdFile ? `✓ ${jdFile.name}` : "Choose JD File"}
                </label>
              </div>

            </div>

            {isProcessing && (
              <div style={{ background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.35)', borderRadius: '10px', padding: '1.1rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.84rem', color: '#c7d2fe', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Sparkles size={16} /> Python FastAPI Engine Pipeline:
                </div>
                <div style={{ fontSize: '0.84rem', color: '#fff', marginBottom: '0.5rem' }}>
                  {steps[currentStepIndex]}
                </div>
                <div className="score-progress-bar" style={{ height: '5px' }}>
                  <div className="score-progress-fill" style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%`, background: '#6366f1' }}></div>
                </div>
              </div>
            )}

            <button 
              id="upload-analyze-submit-btn"
              onClick={handleUploadFiles}
              disabled={isProcessing}
              className="action-btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
            >
              <Cpu size={17} />
              <span>{isProcessing ? 'Processing PDF Files via FastAPI...' : 'Analyze Uploaded Documents'}</span>
            </button>
          </div>
        )}

        {/* TAB 2: PASTE RAW TEXT */}
        {activeTab === 'custom' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: '#93c5fd', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.4rem' }}>
                  <BookOpen size={14} /> 1. College Syllabus
                </label>
                <textarea 
                  rows={4}
                  placeholder="Paste syllabus modules, course subjects, or unit outcomes..."
                  value={syllabusText}
                  onChange={(e) => setSyllabusText(e.target.value)}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.65rem', color: '#fff', fontSize: '0.8rem', resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: '#6ee7b7', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.4rem' }}>
                  <FileText size={14} /> 2. Student Resume
                </label>
                <textarea 
                  rows={4}
                  placeholder="Paste student technical skills, projects, and codebase experience..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.65rem', color: '#fff', fontSize: '0.8rem', resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: '#fcd34d', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.4rem' }}>
                  <Briefcase size={14} /> 3. Job Description
                </label>
                <textarea 
                  rows={4}
                  placeholder="Paste target job role requirements and preferred qualifications..."
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.65rem', color: '#fff', fontSize: '0.8rem', resize: 'vertical' }}
                />
              </div>
            </div>

            <button 
              id="run-text-analysis-btn"
              onClick={handleRunTextAnalysis}
              disabled={isProcessing}
              className="action-btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
            >
              <Cpu size={16} />
              <span>{isProcessing ? 'Executing AI Engine...' : 'Run Triangular AI Analysis'}</span>
            </button>
          </div>
        )}

        {/* TAB 3: DEMO PRESETS */}
        {activeTab === 'preset' && (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div 
                onClick={() => { onSelectPreset('ml_engineer'); onClose(); }}
                className="glass-panel"
                style={{ padding: '1.25rem', cursor: 'pointer', border: '1px solid rgba(99, 102, 241, 0.3)', background: 'rgba(99, 102, 241, 0.08)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '1.05rem' }}>
                    1. B.Tech CS Student vs. Junior AI / ML Engineer Role
                  </div>
                  <span style={{ fontSize: '0.74rem', background: '#6366f1', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '6px', fontWeight: 700 }}>
                    Recommended Profile
                  </span>
                </div>
                <p style={{ fontSize: '0.82rem', color: '#9ca3af', marginTop: '0.4rem' }}>
                  Has college SQL & Python, but lacks PyTorch, Docker, and deep learning project proof.
                </p>
              </div>

              <div 
                onClick={() => { onSelectPreset('fullstack_dev'); onClose(); }}
                className="glass-panel"
                style={{ padding: '1.25rem', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '1.05rem' }}>
                    2. IT Student vs. Full-Stack Cloud & Web Developer
                  </div>
                  <span style={{ fontSize: '0.74rem', background: 'rgba(255,255,255,0.08)', color: '#d1d5db', padding: '0.2rem 0.6rem', borderRadius: '6px', fontWeight: 600 }}>
                    Full-Stack Profile
                  </span>
                </div>
                <p style={{ fontSize: '0.82rem', color: '#9ca3af', marginTop: '0.4rem' }}>
                  Demonstrates React & Node.js, but lacks strict TypeScript, testing, and Docker.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
