import React, { useState } from 'react';
import { GitBranch, Check, Clock, AlertCircle, ArrowRight, Zap, Target } from 'lucide-react';

export default function DependencyGraph({ graphData }) {
  const [selectedNode, setSelectedNode] = useState(graphData.nodes.find(n => n.id === 'pytorch') || graphData.nodes[0]);

  const getNodeStatusBadge = (status) => {
    switch (status) {
      case 'completed': return { label: 'Mastered', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' };
      case 'in_progress': return { label: 'In Progress / Basic', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' };
      case 'prereq_ready': return { label: 'Prerequisites Met', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)' };
      case 'target_gap': return { label: 'High Priority Gap', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.2)' };
      default: return { label: 'Next Stage / Production', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)' };
    }
  };

  // Find incoming prerequisites
  const getPrerequisites = (nodeId) => {
    const incomingEdges = graphData.edges.filter(e => e.to === nodeId);
    return incomingEdges.map(e => graphData.nodes.find(n => n.id === e.from)).filter(Boolean);
  };

  // Find outgoing unlocks
  const getUnlocks = (nodeId) => {
    const outgoingEdges = graphData.edges.filter(e => e.from === nodeId);
    return outgoingEdges.map(e => graphData.nodes.find(n => n.id === e.to)).filter(Boolean);
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6366f1', marginBottom: '0.25rem' }}>
            <GitBranch size={20} />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Section 11 Feature • Prerequisite Intelligence
            </span>
          </div>
          <h2 style={{ fontSize: '1.35rem' }}>Skill Dependency & Prerequisite Graph</h2>
          <p style={{ fontSize: '0.84rem', color: '#9ca3af', maxWidth: '700px' }}>
            SkillBridge AI maps technical concepts into an ordered Directed Acyclic Graph (DAG) so students master foundational prerequisites before tackling advanced frameworks.
          </p>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', background: 'rgba(255,255,255,0.03)', padding: '0.5rem 0.85rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="legend-item"><div className="legend-dot" style={{ background: '#10b981' }}></div> Mastered</div>
          <div className="legend-item"><div className="legend-dot" style={{ background: '#f59e0b' }}></div> In Progress</div>
          <div className="legend-item"><div className="legend-dot" style={{ background: '#ef4444' }}></div> Target Gap</div>
          <div className="legend-item"><div className="legend-dot" style={{ background: '#8b5cf6' }}></div> Future / MLOps</div>
        </div>
      </div>

      {/* Main Interactive Flow Graph Canvas */}
      <div className="graph-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
          
          {/* Level 1: Foundations */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: '#6b7280', fontWeight: 700, textAlign: 'center' }}>
              Level 1: Academic & Core
            </div>
            {graphData.nodes.filter(n => ['python', 'math', 'js', 'sql_theory'].includes(n.id)).map(node => (
              <div 
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`graph-node-card node-${node.status}`}
                style={{
                  border: selectedNode?.id === node.id ? '2px solid #6366f1' : undefined,
                  boxShadow: selectedNode?.id === node.id ? '0 0 15px rgba(99,102,241,0.5)' : undefined
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{node.category}</span>
                  <Check size={14} color="#10b981" />
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>{node.label}</div>
                <div style={{ fontSize: '0.74rem', color: '#9ca3af', marginTop: '0.2rem' }}>{node.desc}</div>
              </div>
            ))}
          </div>

          <div className="graph-arrow-connector">
            <ArrowRight size={28} />
          </div>

          {/* Level 2: Intermediary Modeling / Framework */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: '#6b7280', fontWeight: 700, textAlign: 'center' }}>
              Level 2: Data & Modeling
            </div>
            {graphData.nodes.filter(n => ['numpy', 'ml_basics', 'fastapi', 'react', 'postgres'].includes(n.id)).map(node => (
              <div 
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`graph-node-card node-${node.status}`}
                style={{
                  border: selectedNode?.id === node.id ? '2px solid #6366f1' : undefined,
                  boxShadow: selectedNode?.id === node.id ? '0 0 15px rgba(99,102,241,0.5)' : undefined
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{node.category}</span>
                  {node.status === 'completed' ? <Check size={14} color="#10b981" /> : <Clock size={14} color="#f59e0b" />}
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>{node.label}</div>
                <div style={{ fontSize: '0.74rem', color: '#9ca3af', marginTop: '0.2rem' }}>{node.desc}</div>
              </div>
            ))}
          </div>

          <div className="graph-arrow-connector">
            <ArrowRight size={28} />
          </div>

          {/* Level 3: Target Gaps & Production */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: '#6b7280', fontWeight: 700, textAlign: 'center' }}>
              Level 3: Industry Target Gaps
            </div>
            {graphData.nodes.filter(n => ['deep_learning', 'pytorch', 'docker', 'mlops', 'typescript', 'nextjs', 'testing'].includes(n.id)).map(node => (
              <div 
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`graph-node-card node-${node.status}`}
                style={{
                  border: selectedNode?.id === node.id ? '2px solid #ef4444' : undefined,
                  boxShadow: selectedNode?.id === node.id ? '0 0 20px rgba(239, 68, 68, 0.4)' : undefined
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{node.category}</span>
                  {node.status === 'target_gap' ? <Target size={14} color="#ef4444" /> : <Zap size={14} color="#8b5cf6" />}
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>{node.label}</div>
                <div style={{ fontSize: '0.74rem', color: '#9ca3af', marginTop: '0.2rem' }}>{node.desc}</div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Selected Node Details Card */}
      {selectedNode && (
        <div style={{ marginTop: '1.5rem', padding: '1.25rem 1.5rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div>
              <span style={{ fontSize: '0.74rem', color: '#9ca3af', textTransform: 'uppercase', fontWeight: 700 }}>
                Selected Concept Analysis:
              </span>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {selectedNode.label}
                <span style={{ 
                  fontSize: '0.72rem', 
                  padding: '0.2rem 0.6rem', 
                  borderRadius: '9999px',
                  background: getNodeStatusBadge(selectedNode.status).bg,
                  color: getNodeStatusBadge(selectedNode.status).color,
                  fontWeight: 700 
                }}>
                  {getNodeStatusBadge(selectedNode.status).label}
                </span>
              </h3>
            </div>

            <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
              Category: <strong style={{ color: '#fff' }}>{selectedNode.category}</strong>
            </div>
          </div>

          <p style={{ fontSize: '0.86rem', color: '#d1d5db', marginBottom: '1rem' }}>
            {selectedNode.desc}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '0.85rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
              <div style={{ fontSize: '0.72rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Prerequisites (Learn First):
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {getPrerequisites(selectedNode.id).length === 0 ? (
                  <span style={{ fontSize: '0.78rem', color: '#6ee7b7' }}>Foundational Concept (No prerequisites)</span>
                ) : (
                  getPrerequisites(selectedNode.id).map(p => (
                    <span key={p.id} style={{ fontSize: '0.74rem', background: 'rgba(99, 102, 241, 0.15)', color: '#c7d2fe', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                      ← {p.label}
                    </span>
                  ))
                )}
              </div>
            </div>

            <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '0.85rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
              <div style={{ fontSize: '0.72rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Unlocks Next (Downstream):
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {getUnlocks(selectedNode.id).length === 0 ? (
                  <span style={{ fontSize: '0.78rem', color: '#a5b4fc' }}>Final Capstone / Production Ready</span>
                ) : (
                  getUnlocks(selectedNode.id).map(u => (
                    <span key={u.id} style={{ fontSize: '0.74rem', background: 'rgba(16, 185, 129, 0.15)', color: '#6ee7b7', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                      → {u.label}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
