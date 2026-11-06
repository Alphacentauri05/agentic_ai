import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TriangularMatrix from './components/TriangularMatrix';
import SkillGapTable from './components/SkillGapTable';
import DependencyGraph from './components/DependencyGraph';
import RoadmapView from './components/RoadmapView';
import WhatIfSimulator from './components/WhatIfSimulator';
import DocumentUploadModal from './components/DocumentUploadModal';

import { PROFILES } from './data/profiles';
import { checkBackendHealth, fetchProfileData } from './services/api';
import { Layers, Table2, GitBranch, Calendar, Sparkles, User, Briefcase, GraduationCap } from 'lucide-react';

export default function App() {
  const [activeProfileId, setActiveProfileId] = useState('ml_engineer');
  const [profileData, setProfileData] = useState(PROFILES.ml_engineer);
  const [activeTab, setActiveTab] = useState('matrix'); // matrix, table, graph, roadmap, whatif
  const [backendOnline, setBackendOnline] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Check FastAPI backend health on mount and periodically
  useEffect(() => {
    async function checkHealth() {
      const res = await checkBackendHealth();
      setBackendOnline(!!res);
    }
    checkHealth();
    const interval = setInterval(checkHealth, 6000);
    return () => clearInterval(interval);
  }, []);

  // Fetch or update profile data when profileId changes
  useEffect(() => {
    async function loadProfile() {
      const data = await fetchProfileData(activeProfileId);
      if (data) {
        setProfileData(data);
      }
    }
    loadProfile();
  }, [activeProfileId]);

  const handleCustomAnalysisComplete = (customResult) => {
    setProfileData(customResult);
    setActiveTab('matrix');
  };

  return (
    <div className="app-layout">
      {/* Top Header */}
      <Header 
        backendOnline={backendOnline} 
        onOpenUpload={() => setIsUploadOpen(true)} 
      />

      {/* Main Tab Navigation */}
      <div className="nav-tabs-wrapper">
        <div className="nav-tabs-bar">
          <button 
            id="tab-btn-matrix"
            className={`nav-tab-btn ${activeTab === 'matrix' ? 'active' : ''}`}
            onClick={() => setActiveTab('matrix')}
          >
            <Layers size={16} />
            <span>Triangular Gap Matrix</span>
          </button>

          <button 
            id="tab-btn-table"
            className={`nav-tab-btn ${activeTab === 'table' ? 'active' : ''}`}
            onClick={() => setActiveTab('table')}
          >
            <Table2 size={16} />
            <span>Skill Evaluation Table</span>
          </button>

          <button 
            id="tab-btn-graph"
            className={`nav-tab-btn ${activeTab === 'graph' ? 'active' : ''}`}
            onClick={() => setActiveTab('graph')}
          >
            <GitBranch size={16} />
            <span>Skill Dependency Graph</span>
          </button>

          <button 
            id="tab-btn-roadmap"
            className={`nav-tab-btn ${activeTab === 'roadmap' ? 'active' : ''}`}
            onClick={() => setActiveTab('roadmap')}
          >
            <Calendar size={16} />
            <span>Learning Roadmap & Projects</span>
          </button>

          <button 
            id="tab-btn-whatif"
            className={`nav-tab-btn ${activeTab === 'whatif' ? 'active' : ''}`}
            onClick={() => setActiveTab('whatif')}
          >
            <Sparkles size={16} />
            <span>"What-If" Analysis Simulator</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <main className="main-content">
        
        {/* Profile Details & Preset Quick-Switch Bar */}
        <div className="glass-panel profile-selector-card">
          <div className="profile-info">
            <div className="profile-avatar">
              <User size={24} />
            </div>
            <div className="profile-meta">
              <h3>
                {profileData.title}
                <span style={{ fontSize: '0.72rem', background: 'rgba(99, 102, 241, 0.2)', color: '#c7d2fe', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                  {profileData.studentInfo.semester}
                </span>
              </h3>
              <p style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap', marginTop: '0.2rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <GraduationCap size={14} color="#9ca3af" /> {profileData.studentInfo.degree}
                </span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Briefcase size={14} color="#9ca3af" /> Target: {profileData.targetCompany}
                </span>
              </p>
            </div>
          </div>

          {/* Quick preset changer */}
          <div className="preset-switcher-group">
            <span style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', fontWeight: 700 }}>
              Quick Preset:
            </span>
            <button 
              id="preset-btn-ml"
              className={`preset-btn ${activeProfileId === 'ml_engineer' ? 'active' : ''}`}
              onClick={() => setActiveProfileId('ml_engineer')}
            >
              Junior ML Engineer
            </button>
            <button 
              id="preset-btn-fs"
              className={`preset-btn ${activeProfileId === 'fullstack_dev' ? 'active' : ''}`}
              onClick={() => setActiveProfileId('fullstack_dev')}
            >
              Full-Stack Cloud Dev
            </button>
          </div>
        </div>

        {/* Tab Content Panels */}
        {activeTab === 'matrix' && (
          <TriangularMatrix 
            profile={profileData} 
            onSelectTab={setActiveTab} 
          />
        )}

        {activeTab === 'table' && (
          <SkillGapTable 
            skills={profileData.skillComparison} 
          />
        )}

        {activeTab === 'graph' && (
          <DependencyGraph 
            graphData={profileData.skillDependencyGraph} 
          />
        )}

        {activeTab === 'roadmap' && (
          <RoadmapView 
            roadmap={profileData.roadmap} 
            projects={profileData.recommendedProjects} 
          />
        )}

        {activeTab === 'whatif' && (
          <WhatIfSimulator 
            profile={profileData} 
            onSwitchProfile={(id) => setActiveProfileId(id)} 
          />
        )}
      </main>

      {/* Footer Statement from Presentation Doc */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '2rem', textAlign: 'center', color: '#6b7280', fontSize: '0.82rem' }}>
        <p style={{ fontStyle: 'italic', color: '#9ca3af', marginBottom: '0.5rem' }}>
          “We connect what colleges teach, what students know, and what companies demand.”
        </p>
        <p>
          SkillBridge AI • Supporting SDG 4 (Quality Education) & SDG 8 (Decent Work and Economic Growth) • React + FastAPI
        </p>
      </footer>

      {/* Document Upload / Analysis Modal */}
      <DocumentUploadModal 
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onAnalysisComplete={handleCustomAnalysisComplete}
        onSelectPreset={(id) => setActiveProfileId(id)}
      />
    </div>
  );
}
