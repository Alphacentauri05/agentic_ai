"""
Skill Taxonomy and Prerequisite Knowledge Base for SkillBridge AI
Handles normalization, semantic clustering, and prerequisite DAG mappings.
"""

SKILL_ALIASES = {
    "ml": "Machine Learning",
    "machine learning": "Machine Learning",
    "dl": "Deep Learning",
    "deep learning": "Deep Learning",
    "pytorch": "PyTorch Deep Learning",
    "torch": "PyTorch Deep Learning",
    "tf": "TensorFlow",
    "tensorflow": "TensorFlow",
    "docker": "Docker & Containerization",
    "containers": "Docker & Containerization",
    "containerization": "Docker & Containerization",
    "fastapi": "FastAPI / Web APIs",
    "flask": "FastAPI / Web APIs",
    "rest": "FastAPI / Web APIs",
    "rest api": "FastAPI / Web APIs",
    "sql": "SQL & Data Modeling",
    "rdbms": "SQL & Data Modeling",
    "mysql": "SQL & Data Modeling",
    "postgres": "PostgreSQL & Relational DBs",
    "postgresql": "PostgreSQL & Relational DBs",
    "numpy": "NumPy & Data Manipulation",
    "pandas": "NumPy & Data Manipulation",
    "git": "Git & Collaborative Workflow",
    "github": "Git & Collaborative Workflow",
    "vector db": "Vector Databases & Embeddings",
    "vectordb": "Vector Databases & Embeddings",
    "chromadb": "Vector Databases & Embeddings",
    "pgvector": "Vector Databases & Embeddings",
    "embeddings": "Vector Databases & Embeddings",
    "ts": "TypeScript",
    "typescript": "TypeScript",
    "js": "JavaScript ES6+",
    "javascript": "JavaScript ES6+",
    "react": "React.js & State Management",
    "reactjs": "React.js & State Management",
    "nextjs": "Next.js & Server Components",
    "next.js": "Next.js & Server Components",
    "testing": "Automated Testing (Jest / Vitest)",
    "jest": "Automated Testing (Jest / Vitest)",
    "vitest": "Automated Testing (Jest / Vitest)"
}

SKILL_PREREQUISITES = {
    "NumPy & Data Manipulation": ["Python Programming"],
    "Machine Learning": ["Python Programming", "NumPy & Data Manipulation"],
    "Deep Learning Concepts": ["Machine Learning", "Linear Algebra & Stats"],
    "PyTorch Deep Learning": ["Deep Learning Concepts"],
    "FastAPI / Web APIs": ["Python Programming"],
    "Docker & Containerization": ["FastAPI / Web APIs"],
    "Vector Databases & Embeddings": ["PyTorch Deep Learning"],
    "Production MLOps": ["PyTorch Deep Learning", "Docker & Containerization"],
    "TypeScript": ["JavaScript ES6+"],
    "React.js & State Management": ["JavaScript ES6+"],
    "Next.js & Server Components": ["React.js & State Management", "TypeScript"],
    "PostgreSQL & Relational DBs": ["SQL & Data Modeling"],
    "Automated Testing (Jest / Vitest)": ["React.js & State Management"]
}

SKILL_CATEGORIES = {
    "Python Programming": "Core Language",
    "Linear Algebra & Stats": "Mathematics",
    "NumPy & Data Manipulation": "Data Processing",
    "Machine Learning": "Modeling",
    "Deep Learning Concepts": "Theory & Neural Nets",
    "PyTorch Deep Learning": "Deep Learning Framework",
    "FastAPI / Web APIs": "Backend & Inference",
    "Docker & Containerization": "DevOps & Deployment",
    "Vector Databases & Embeddings": "Modern AI / GenAI",
    "Git & Collaborative Workflow": "Software Engineering",
    "SQL & Data Modeling": "Databases",
    "JavaScript ES6+": "Core Language",
    "TypeScript": "Typed Language",
    "React.js & State Management": "Frontend Framework",
    "Next.js & Server Components": "Full-Stack Framework",
    "PostgreSQL & Relational DBs": "Databases",
    "Automated Testing (Jest / Vitest)": "Quality Assurance"
}
