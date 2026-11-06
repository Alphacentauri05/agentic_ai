import React from 'react';
import { BookOpen, FileText, Briefcase, TrendingUp, CheckCircle, AlertTriangle, XCircle, ArrowUpRight } from 'lucide-react';

export default function TriangularMatrix({ profile, onSelectTab }) {
  const { metrics, documents } = profile;

  return (
    <div className="animate-fade-in">
      {/* Overall Readiness Banner */}
      <div className="readiness-banner">
        <div className="readiness-left">
          <div className="readiness-circle">
            {metrics.overallReadiness}%
            <span>FIT</span>
          </div>
          <div className="readiness-details">
            <h2>Overall Placement Readiness: {profile.title}</h2>
            <p>
              Based on triangular evaluation of your college syllabus topics, verified resume projects, and current industry job demands.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '0.65rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '0.72rem', color: '#9ca3af', textTransform: 'uppercase', fontWeight: 600 }}>Strong / Ready</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckCircle size={16} /> {metrics.strongSkills} Skills
            </div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '0.65rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '0.72rem', color: '#9ca3af', textTransform: 'uppercase', fontWeight: 600 }}>Needs Practice</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <AlertTriangle size={16} /> {metrics.moderateSkills} Skills
            </div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '0.65rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '0.72rem', color: '#9ca3af', textTransform: 'uppercase', fontWeight: 600 }}>High Priority Gaps</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f87171', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <XCircle size={16} /> {metrics.missingSkills} Skills
            </div>
          </div>
        </div>
      </div>

      {/* Triangular 3-Pillar Cards */}
      <div className="triangular-grid">
        {/* Pillar 1: Academic Syllabus */}
        <div className="glass-panel pillar-card pillar-syllabus">
          <div>
            <div className="pillar-header">
              <span className="pillar-badge">Pillar 1 • Academics</span>
              <BookOpen size={20} color="#60a5fa" />
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>College Syllabus</h3>
            <p style={{ fontSize: '0.82rem', color: '#9ca3af', marginBottom: '1rem' }}>
              {documents.syllabus.summary}
            </p>

            <div className="pillar-score-box">
              <span className="score-num" style={{ color: '#60a5fa' }}>{metrics.academicCoverage}</span>
              <span className="score-percent">% coverage</span>
            </div>
            <div className="score-progress-bar">
              <div className="score-progress-fill" style={{ width: `${metrics.academicCoverage}%`, background: '#3b82f6' }}></div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
              {documents.syllabus.coverageTags.map((tag, idx) => (
                <span key={idx} style={{ fontSize: '0.72rem', background: 'rgba(59, 130, 246, 0.12)', color: '#93c5fd', padding: '0.2rem 0.5rem', borderRadius: '6px', border: '1px solid rgba(59,130,246,0.2)' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.85rem', marginTop: '1.2rem', fontSize: '0.78rem', color: '#6b7280' }}>
            Academic Theory Focus • Units 1–5 Mapped
          </div>
        </div>

        {/* Pillar 2: Student Resume */}
        <div className="glass-panel pillar-card pillar-resume">
          <div>
            <div className="pillar-header">
              <span className="pillar-badge">Pillar 2 • Experience</span>
              <FileText size={20} color="#34d399" />
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>Student Resume</h3>
            <p style={{ fontSize: '0.82rem', color: '#9ca3af', marginBottom: '1rem' }}>
              {documents.resume.summary}
            </p>

            <div className="pillar-score-box">
              <span className="score-num" style={{ color: '#34d399' }}>{metrics.resumeEvidence}</span>
              <span className="score-percent">% demonstrated</span>
            </div>
            <div className="score-progress-bar">
              <div className="score-progress-fill" style={{ width: `${metrics.resumeEvidence}%`, background: '#10b981' }}></div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.5rem' }}>
              {documents.resume.evidenceHighlights.map((hl, idx) => (
                <div key={idx} style={{ fontSize: '0.75rem', color: '#d1d5db', display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                  <span style={{ color: '#34d399', fontWeight: 'bold' }}>•</span>
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.85rem', marginTop: '1.2rem', fontSize: '0.78rem', color: '#6b7280' }}>
            Practical Project Proof • Context-weighted
          </div>
        </div>

        {/* Pillar 3: Job Description */}
        <div className="glass-panel pillar-card pillar-job">
          <div>
            <div className="pillar-header">
              <span className="pillar-badge">Pillar 3 • Industry</span>
              <Briefcase size={20} color="#fbbf24" />
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>Job Description</h3>
            <p style={{ fontSize: '0.82rem', color: '#9ca3af', marginBottom: '1rem' }}>
              {documents.jobDescription.summary}
            </p>

            <div className="pillar-score-box">
              <span className="score-num" style={{ color: '#fbbf24' }}>{metrics.jobRequirementFit}</span>
              <span className="score-percent">% match</span>
            </div>
            <div className="score-progress-bar">
              <div className="score-progress-fill" style={{ width: `${metrics.jobRequirementFit}%`, background: '#f59e0b' }}></div>
            </div>

            <div style={{ marginTop: '0.5rem' }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#fcd34d', marginBottom: '0.3rem' }}>MUST-HAVE REQUIREMENTS:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {documents.jobDescription.requiredSkills.map((req, idx) => (
                  <span key={idx} style={{ fontSize: '0.72rem', background: 'rgba(245, 158, 11, 0.12)', color: '#fcd34d', padding: '0.2rem 0.5rem', borderRadius: '6px', border: '1px solid rgba(245,158,11,0.2)' }}>
                    {req}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.85rem', marginTop: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: '#6b7280' }}>{profile.targetCompany}</span>
            <button 
              onClick={() => onSelectTab('graph')}
              style={{ background: 'none', color: '#6366f1', fontSize: '0.78rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}
            >
              View Prereq Graph <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
