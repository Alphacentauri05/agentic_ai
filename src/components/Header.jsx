import React from 'react';
import { Sparkles, GraduationCap, Award, Cpu, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Header({ backendOnline, onOpenUpload }) {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo-group">
          <div className="logo-icon">
            <Sparkles size={24} />
          </div>
          <div className="logo-text">
            <h1>
              SKILLBRIDGE AI
              <span style={{ fontSize: '0.65rem', background: 'rgba(99, 102, 241, 0.25)', color: '#a5b4fc', padding: '0.2rem 0.5rem', borderRadius: '6px', border: '1px solid rgba(99,102,241,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                React + FastAPI
              </span>
            </h1>
            <p>Connecting what colleges teach, what students know, and what companies demand.</p>
          </div>
        </div>

        <div className="sdg-badge-group">
          <div className="sdg-pill sdg-4" title="SDG 4: Quality Education — Personalized Learning & Gap Analysis">
            <GraduationCap size={14} />
            <span>SDG 4 • Quality Education</span>
          </div>

          <div className="sdg-pill sdg-8" title="SDG 8: Decent Work & Economic Growth — Industry Placement Readiness">
            <Award size={14} />
            <span>SDG 8 • Decent Work</span>
          </div>

          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.3rem 0.65rem',
              borderRadius: '9999px',
              fontSize: '0.72rem',
              fontWeight: 600,
              background: backendOnline ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
              border: `1px solid ${backendOnline ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
              color: backendOnline ? '#6ee7b7' : '#fcd34d'
            }}
            title={backendOnline ? "FastAPI backend running at http://127.0.0.1:8000" : "Running on local client engine"}
          >
            {backendOnline ? <CheckCircle2 size={13} /> : <AlertCircle size={13} />}
            <span>{backendOnline ? 'FastAPI Connected' : 'Client Mode'}</span>
          </div>

          <button 
            id="header-upload-btn"
            onClick={onOpenUpload}
            className="action-btn-primary"
            style={{ padding: '0.45rem 1rem', fontSize: '0.8rem', marginLeft: '0.5rem' }}
          >
            <Cpu size={15} />
            <span>Analyze Documents</span>
          </button>
        </div>
      </div>
    </header>
  );
}
