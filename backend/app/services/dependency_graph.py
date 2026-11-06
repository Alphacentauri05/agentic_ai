import networkx as nx
from typing import List, Dict, Any
from backend.app.schemas import GraphNode, SkillDependencyGraph

def build_prerequisite_graph(skill_statuses: Dict[str, str]) -> SkillDependencyGraph:
    """
    Builds a Directed Acyclic Graph (DAG) of technical skill prerequisites
    using NetworkX and maps statuses (completed, in_progress, target_gap, future).
    """
    G = nx.DiGraph()

    # Define edges: (prerequisite -> target)
    edges_def = [
        ("python", "numpy"),
        ("math", "numpy"),
        ("numpy", "ml_basics"),
        ("ml_basics", "deep_learning"),
        ("deep_learning", "pytorch"),
        ("python", "fastapi"),
        ("fastapi", "docker"),
        ("pytorch", "mlops"),
        ("docker", "mlops")
    ]

    for u, v in edges_def:
        G.add_edge(u, v)

    nodes_metadata = {
        "python": {"label": "Python", "category": "Core", "status": "completed", "desc": "Foundational programming & syntax"},
        "math": {"label": "Linear Algebra & Stats", "category": "Academics", "status": "completed", "desc": "Matrix calculus & probability (College Sem 3)"},
        "numpy": {"label": "NumPy & Tensors", "category": "Math & Data", "status": "in_progress", "desc": "Array broadcasting & vector math"},
        "ml_basics": {"label": "Scikit-Learn ML", "category": "Modeling", "status": "in_progress", "desc": "Supervised & unsupervised tabular models"},
        "deep_learning": {"label": "Deep Learning Concepts", "category": "Theory", "status": "prereq_ready", "desc": "Backprop, activation functions, loss optimizers"},
        "pytorch": {"label": "PyTorch Framework", "category": "Deep Learning", "status": "target_gap", "desc": "Model architecture, DataLoader, training loops"},
        "fastapi": {"label": "FastAPI Inference", "category": "Backend", "status": "completed", "desc": "Serving predictions via REST endpoints"},
        "docker": {"label": "Docker Containers", "category": "DevOps", "status": "target_gap", "desc": "Reproducible container builds for models"},
        "mlops": {"label": "MLOps & Vector Search", "category": "Production", "status": "future", "desc": "Monitoring, CI/CD, and vector indexes"}
    }

    # Override statuses based on dynamic skill status mapping if provided
    for node_id, status in skill_statuses.items():
        if node_id in nodes_metadata:
            nodes_metadata[node_id]["status"] = status

    graph_nodes = []
    for node_id, data in nodes_metadata.items():
        graph_nodes.append(GraphNode(
            id=node_id,
            label=data["label"],
            category=data["category"],
            status=data["status"],
            desc=data["desc"]
        ))

    graph_edges = [{"from": u, "to": v} for u, v in edges_def]

    return SkillDependencyGraph(
        nodes=graph_nodes,
        edges=graph_edges
    )
