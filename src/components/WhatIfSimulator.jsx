import React, { useState, useEffect } from 'react';
import { Sparkles, Check, ArrowRight, Zap, RefreshCw, Award } from 'lucide-react';
import { calculateWhatIfScore } from '../services/api';

export default function WhatIfSimulator({ profile, onSwitchProfile }) {
  const { whatIfSimulator } = profile;
  const [toggledSkills, setToggledSkills] = useState({});
  const [currentScore, setCurrentScore] = useState(whatIfSimulator.initialScore);
  const [scoreDelta, setScoreDelta] = useState(0);
  const [unlockedList, setUnlockedList] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);

  // Reset toggles when profile changes
  useEffect(() => {
    setToggledSkills({});
    setCurrentScore(whatIfSimulator.initialScore);
    setScoreDelta(0);
    setUnlockedList([]);
  }, [profile.id]);

  const handleToggle = async (skillId) => {
    const updated = {
      ...toggledSkills,
      [skillId]: !toggledSkills[skillId]
    };
    setToggledSkills(updated);

    const activeSkillIds = Object.keys(updated).filter(k => updated[k]);

    setIsCalculating(true);
    try {
      const res = await calculateWhatIfScore(whatIfSimulator.initialScore, activeSkillIds, profile.id);
      setCurrentScore(res.updated_score);
      setScoreDelta(res.delta);
      setUnlockedList(res.unlocked_capabilities || []);
    } catch (err) {
      console.error("Error calculating what-if:", err);
    } finally {
      setIsCalculating(false);
    }
  };

  const resetAll = () => {
    setToggledSkills({});
    setCurrentScore(whatIfSimulator.initialScore);
    setScoreDelta(0);
    setUnlockedList([]);
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#06b6d4', marginBottom: '0.25rem' }}>
            <Sparkles size={20} />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Section 11 Feature • Interactive Simulation
            </span>
          </div>
          <h2 style={{ fontSize: '1.35rem' }}>"What-If" Analysis Sandbox</h2>
          <p style={{ fontSize: '0.84rem', color: '#9ca3af', maxWidth: '720px' }}>
            Simulate your job match score in real time. Select missing skills to see how completing specific projects or courses impacts your placement probability.
          </p>
        </div>

        <button 
          onClick={resetAll}
          style={{ background: 'rgba(255, 255, 255, 0.05)', color: '#9ca3af', padding: '0.45rem 0.85rem', borderRadius: '8px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.35rem', border: '1px solid rgba(255, 255, 255, 0.08)' }}
        >
          <RefreshCw size={13} /> Reset Simulation
        </button>
      </div>

      <div className="whatif-grid">
        {/* Left: Interactive Skill Toggles */}
        <div>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', color: '#9ca3af', letterSpacing: '0.05em', marginBottom: '0.85rem' }}>
            Hypothetical Skill Acquisitions:
          </div>

          {whatIfSimulator.skillsToToggle.map(skill => {
            const isChecked = !!toggledSkills[skill.id];
            return (
              <div 
                key={skill.id}
                onClick={() => handleToggle(skill.id)}
                className={`interactive-toggle-card ${isChecked ? 'checked' : ''}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div className="checkbox-custom">
                    {isChecked && <Check size={14} />}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.92rem', color: '#fff' }}>{skill.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Simulate acquiring verified project proof</div>
                  </div>
                </div>

                <div className="boost-badge">
                  +{skill.boost}% Fit Boost
                </div>
              </div>
            );
          })}

          {/* Target Role Switcher from Section 11 */}
          <div style={{ marginTop: '1.5rem', background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Document Prompt: "What if I apply for a different role?"
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => onSwitchProfile('ml_engineer')}
                className={`preset-btn ${profile.id === 'ml_engineer' ? 'active' : ''}`}
              >
                Target: Junior ML Engineer (Current)
              </button>
              <button 
                onClick={() => onSwitchProfile('fullstack_dev')}
                className={`preset-btn ${profile.id === 'fullstack_dev' ? 'active' : ''}`}
              >
                Target: Full-Stack Web Dev
              </button>
            </div>
          </div>
        </div>

        {/* Right: Dynamic Score Gauge & Unlocked Highlights */}
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.9), rgba(30, 27, 75, 0.6))', 
          borderRadius: '16px', 
          padding: '1.75rem', 
          border: '1px solid rgba(99, 102, 241, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '0.76rem', color: '#a5b4fc', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              Live Simulated Outcome
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', margin: '0.75rem 0' }}>
              <span style={{ fontSize: '3.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: currentScore >= 80 ? '#34d399' : '#fff' }}>
                {currentScore}%
              </span>
              {scoreDelta > 0 && (
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#34d399', background: 'rgba(16, 185, 129, 0.15)', padding: '0.2rem 0.6rem', borderRadius: '8px' }}>
                  +{scoreDelta}% Jump
                </span>
              )}
            </div>

            <div style={{ fontSize: '0.84rem', color: '#d1d5db', marginBottom: '1.25rem' }}>
              {scoreDelta === 0 ? (
                <span>Baseline readiness score: <strong>{whatIfSimulator.initialScore}%</strong>. Toggle missing skills on the left to simulate readiness gains.</span>
              ) : (
                <span>By closing these {Object.values(toggledSkills).filter(Boolean).length} gaps, your profile leaps from <strong>{whatIfSimulator.initialScore}%</strong> to <strong>{currentScore}%</strong> placement match!</span>
              )}
            </div>

            {/* Score progress bar */}
            <div className="score-progress-bar" style={{ height: '8px' }}>
              <div 
                className="score-progress-fill" 
                style={{ 
                  width: `${currentScore}%`, 
                  background: currentScore >= 80 ? 'linear-gradient(90deg, #10b981, #34d399)' : 'linear-gradient(90deg, #6366f1, #8b5cf6)' 
                }}
              ></div>
            </div>

            {/* Unlocked competencies */}
            <div style={{ marginTop: '1.5rem' }}>
              <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: '#6b7280', fontWeight: 700, marginBottom: '0.4rem' }}>
                Interview Qualification Status:
              </div>
              {currentScore >= 80 ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.15)', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#6ee7b7', fontSize: '0.82rem', fontWeight: 600 }}>
                  <Award size={18} /> High Probability of Shortlisting & Placement
                </div>
              ) : currentScore >= 70 ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(245, 158, 11, 0.15)', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#fcd34d', fontSize: '0.82rem', fontWeight: 600 }}>
                  <Zap size={18} /> Competitive for Junior Roles with Guided Mentorship
                </div>
              ) : (
                <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                  Requires targeted project experience in core framework gaps.
                </div>
              )}
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem', marginTop: '1.5rem', fontSize: '0.78rem', color: '#6b7280' }}>
            Calculated dynamically via FastAPI Triangular Gap Engine
          </div>
        </div>
      </div>
    </div>
  );
}
