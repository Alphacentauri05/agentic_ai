import React from 'react';
import { Calendar, CheckCircle, ExternalLink, Code2, Layers, Clock, Sparkles } from 'lucide-react';

export default function RoadmapView({ roadmap, projects }) {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Phased Roadmap Timeline */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6366f1', marginBottom: '0.25rem' }}>
            <Calendar size={20} />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Personalized Learning Path
            </span>
          </div>
          <h2 style={{ fontSize: '1.35rem' }}>Sequenced Learning Roadmap</h2>
          <p style={{ fontSize: '0.84rem', color: '#9ca3af' }}>
            Tailored weekly milestones structured by prerequisite difficulty, bridging identified gaps into job-ready skills.
          </p>
        </div>

        <div className="roadmap-timeline">
          {roadmap.map((phase, idx) => (
            <div key={idx} className="roadmap-card" style={{ borderLeftColor: phase.color }}>
              <div className="roadmap-card-header">
                <div>
                  <span style={{ 
                    fontSize: '0.72rem', 
                    fontWeight: 700, 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.05em',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '6px',
                    background: `${phase.color}20`,
                    color: phase.color,
                    border: `1px solid ${phase.color}40`,
                    marginRight: '0.6rem'
                  }}>
                    {phase.tag}
                  </span>
                  <strong style={{ fontSize: '1.05rem', color: '#fff' }}>{phase.phase}</strong>
                </div>
                <div style={{ fontSize: '0.82rem', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Clock size={14} />
                  <span>{phase.duration}</span>
                </div>
              </div>

              <ul className="roadmap-goals-list">
                {phase.goals.map((goal, gIdx) => (
                  <li key={gIdx} className="roadmap-goal-item">
                    <CheckCircle size={16} color={phase.color} style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.75rem', marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.74rem', color: '#6b7280', textTransform: 'uppercase', fontWeight: 700 }}>Curated Resources:</span>
                {phase.curatedResources.map((res, rIdx) => (
                  <span key={rIdx} style={{ fontSize: '0.76rem', color: '#a5b4fc', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(99, 102, 241, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                    <ExternalLink size={11} /> {res}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Capstone Projects */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', marginBottom: '0.25rem' }}>
            <Code2 size={20} />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Portfolio Impact
            </span>
          </div>
          <h2 style={{ fontSize: '1.35rem' }}>Recommended Projects to Close Missing Gaps</h2>
          <p style={{ fontSize: '0.84rem', color: '#9ca3af' }}>
            Instead of building generic to-do apps, build targeted projects that directly demonstrate your missing skills to interviewers.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
          {projects.map((proj, idx) => (
            <div key={idx} style={{ 
              background: 'rgba(255, 255, 255, 0.03)', 
              borderRadius: '16px', 
              padding: '1.5rem', 
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.72rem', background: 'rgba(16, 185, 129, 0.15)', color: '#6ee7b7', padding: '0.25rem 0.6rem', borderRadius: '6px', fontWeight: 700 }}>
                    {proj.difficulty}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={13} /> {proj.estimatedTime}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '0.5rem' }}>
                  {proj.title}
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#9ca3af', lineHeight: '1.5', marginBottom: '1rem' }}>
                  {proj.description}
                </p>

                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#6b7280', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Directly Addresses Identified Gaps:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {proj.addressesGaps.map((gap, gIdx) => (
                      <span key={gIdx} style={{ fontSize: '0.74rem', background: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
                        ✓ Eliminates {gap} Gap
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.85rem' }}>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#6b7280', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Tech Stack & Architecture:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {proj.architectureHighlights.map((arch, aIdx) => (
                    <span key={aIdx} style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.05)', color: '#e5e7eb', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                      {arch}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
