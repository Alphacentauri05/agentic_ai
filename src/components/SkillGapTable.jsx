import React, { useState } from 'react';
import { Search, Filter, Info, CheckCircle2, AlertTriangle, AlertOctagon, Clock } from 'lucide-react';

export default function SkillGapTable({ skills }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredSkills = skills.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.explanation.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && item.status === filterStatus;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'strong': return <CheckCircle2 size={14} color="#34d399" />;
      case 'moderate': return <AlertTriangle size={14} color="#fbbf24" />;
      case 'missing': return <AlertOctagon size={14} color="#f87171" />;
      default: return <Clock size={14} color="#a5b4fc" />;
    }
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '1.75rem', marginTop: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.2rem' }}>Comprehensive Skill-Gap Analysis</h2>
          <p style={{ fontSize: '0.82rem', color: '#9ca3af' }}>
            Detailed breakdown comparing university coursework, student portfolio evidence, and job requirements.
          </p>
        </div>

        {/* Search & Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', color: '#6b7280' }} />
            <input 
              type="text" 
              placeholder="Search skill or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '0.5rem 0.75rem 0.5rem 2.2rem',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '0.84rem',
                outline: 'none',
                width: '220px'
              }}
            />
          </div>

          <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.04)', padding: '0.25rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <button 
              onClick={() => setFilterStatus('all')}
              style={{ padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 600, background: filterStatus === 'all' ? '#6366f1' : 'transparent', color: filterStatus === 'all' ? '#fff' : '#9ca3af' }}
            >
              All ({skills.length})
            </button>
            <button 
              onClick={() => setFilterStatus('strong')}
              style={{ padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 600, background: filterStatus === 'strong' ? '#10b981' : 'transparent', color: filterStatus === 'strong' ? '#fff' : '#9ca3af' }}
            >
              Ready
            </button>
            <button 
              onClick={() => setFilterStatus('moderate')}
              style={{ padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 600, background: filterStatus === 'moderate' ? '#f59e0b' : 'transparent', color: filterStatus === 'moderate' ? '#fff' : '#9ca3af' }}
            >
              Needs Practice
            </button>
            <button 
              onClick={() => setFilterStatus('missing')}
              style={{ padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 600, background: filterStatus === 'missing' ? '#ef4444' : 'transparent', color: filterStatus === 'missing' ? '#fff' : '#9ca3af' }}
            >
              High Priority Gaps
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Skill & Category</th>
              <th>College Syllabus</th>
              <th>Student Resume Proof</th>
              <th>Job Requirement</th>
              <th>Readiness Result</th>
              <th>AI Gap Explanation</th>
            </tr>
          </thead>
          <tbody>
            {filteredSkills.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                  No skills matching filter criteria.
                </td>
              </tr>
            ) : (
              filteredSkills.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#f3f4f6' }}>{item.name}</div>
                    <div style={{ fontSize: '0.74rem', color: '#9ca3af' }}>{item.category}</div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.82rem', color: item.academicLevel.includes('Covered') ? '#93c5fd' : '#9ca3af' }}>
                      {item.academicLevel}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.82rem', color: item.resumeEvidence.includes('No evidence') ? '#f87171' : '#d1d5db' }}>
                      {item.resumeEvidence}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: item.jobRequirement.includes('Required') ? '#fcd34d' : '#9ca3af' }}>
                      {item.jobRequirement}
                    </span>
                  </td>
                  <td>
                    <span className={`status-pill status-${item.status}`}>
                      {getStatusIcon(item.status)}
                      <span>{item.badge}</span>
                    </span>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.8rem', color: '#9ca3af', maxWidth: '300px', lineHeight: '1.4' }}>
                      {item.explanation}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
