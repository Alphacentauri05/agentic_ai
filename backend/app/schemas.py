from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class DocumentInput(BaseModel):
    syllabus_text: str = Field(..., description="College syllabus topics, courses, or units")
    resume_text: str = Field(..., description="Student resume text or project portfolio")
    job_description_text: str = Field(..., description="Job description text including requirements")
    profile_id: Optional[str] = None

class SkillItem(BaseModel):
    id: str
    name: str
    category: str
    academicLevel: str
    resumeEvidence: str
    jobRequirement: str
    status: str  # strong, moderate, missing, learn_later
    badge: str
    explanation: str
    impactWeight: int

class GraphNode(BaseModel):
    id: str
    label: str
    category: str
    status: str  # completed, in_progress, prereq_ready, target_gap, future
    desc: str

class GraphEdge(BaseModel):
    from_node: str = Field(..., alias="from")
    to_node: str = Field(..., alias="to")

    class Config:
        populate_by_name = True

class SkillDependencyGraph(BaseModel):
    nodes: List[GraphNode]
    edges: List[Dict[str, str]]

class RoadmapPhase(BaseModel):
    phase: str
    duration: str
    tag: str
    color: str
    goals: List[str]
    curatedResources: List[str]

class RecommendedProject(BaseModel):
    title: str
    difficulty: str
    estimatedTime: str
    addressesGaps: List[str]
    description: str
    architectureHighlights: List[str]

class WhatIfOption(BaseModel):
    id: str
    name: str
    boost: int
    checked: bool = False

class WhatIfSimulatorData(BaseModel):
    initialScore: int
    skillsToToggle: List[WhatIfOption]

class Metrics(BaseModel):
    overallReadiness: int
    academicCoverage: int
    resumeEvidence: int
    jobRequirementFit: int
    totalSkillsAnalyzed: int
    strongSkills: int
    moderateSkills: int
    missingSkills: int
    learnLater: int

class AnalysisResult(BaseModel):
    id: str
    title: str
    targetCompany: str
    studentInfo: Dict[str, str]
    metrics: Metrics
    documents: Dict[str, Any]
    skillComparison: List[SkillItem]
    skillDependencyGraph: SkillDependencyGraph
    roadmap: List[RoadmapPhase]
    recommendedProjects: List[RecommendedProject]
    whatIfSimulator: WhatIfSimulatorData

class WhatIfCalculateRequest(BaseModel):
    base_score: int
    toggled_skill_ids: List[str]
    profile_id: Optional[str] = "ml_engineer"

class WhatIfCalculateResponse(BaseModel):
    original_score: int
    updated_score: int
    delta: int
    unlocked_capabilities: List[str]
