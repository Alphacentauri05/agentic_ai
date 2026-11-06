from typing import List
from backend.app.schemas import RoadmapPhase, RecommendedProject

def generate_personalized_roadmap(missing_skills: List[str]) -> List[RoadmapPhase]:
    """Generates structured weekly phases based on gaps."""
    phases = [
        RoadmapPhase(
            phase="Phase 1: Deep Learning Foundations & Tensor Operations",
            duration="Weeks 1 - 2",
            tag="High Priority Gap",
            color="#EF4444",
            goals=[
                "Bridge academic Linear Algebra with PyTorch Tensor broadcasting",
                "Implement neural network forward & backward passes from scratch",
                "Master PyTorch Dataset, DataLoader, and standard training loops on CPU/GPU"
            ],
            curatedResources=[
                "Deep Learning with PyTorch (Official 60-min Blitz)",
                "Fast.ai Practical Deep Learning for Coders"
            ]
        ),
        RoadmapPhase(
            phase="Phase 2: Real-World Model Training & Fine-Tuning",
            duration="Weeks 3 - 4",
            tag="Core Modeling",
            color="#F59E0B",
            goals=[
                "Train a Computer Vision CNN or NLP Transformer with PyTorch",
                "Perform hyperparameter tuning and model checkpointing with evaluation metrics",
                "Export trained model weights into ONNX / TorchScript for optimized inference"
            ],
            curatedResources=[
                "Hugging Face Transformers Course",
                "PyTorch Recipes: Performance Tuning"
            ]
        ),
        RoadmapPhase(
            phase="Phase 3: Production Serving with FastAPI & Docker",
            duration="Weeks 5 - 6",
            tag="Engineering Bridge",
            color="#10B981",
            goals=[
                "Wrap your PyTorch inference model inside an asynchronous FastAPI server",
                "Write a multi-stage Dockerfile to containerize the ML microservice",
                "Test load latency and payload serialization with Pydantic schemas"
            ],
            curatedResources=[
                "FastAPI for Machine Learning Microservices",
                "Docker for Python Data Scientists"
            ]
        ),
        RoadmapPhase(
            phase="Phase 4: Capstone Portfolio & Vector Search Extension",
            duration="Weeks 7 - 8",
            tag="Placement Ready",
            color="#6366F1",
            goals=[
                "Deploy live containerized service to Render or Railway with interactive Swagger docs",
                "Add optional semantic vector search module using ChromaDB",
                "Publish a clean GitHub repository with README demo GIF and system architecture diagram"
            ],
            curatedResources=[
                "Building Production RAG Systems",
                "Portfolio Presentation Guide for ML Engineers"
            ]
        )
    ]
    return phases

def generate_recommended_projects() -> List[RecommendedProject]:
    return [
        RecommendedProject(
            title="Dockerized PyTorch Visual Classifier API",
            difficulty="Intermediate",
            estimatedTime="12 Hours",
            addressesGaps=["PyTorch", "Docker", "FastAPI"],
            description="Build an end-to-end computer vision service that accepts image uploads, runs ResNet inference with PyTorch, and returns predictions via FastAPI running in a lightweight Docker container.",
            architectureHighlights=[
                "PyTorch ResNet-18",
                "FastAPI Async Endpoints",
                "Docker Multi-stage build",
                "Swagger Documentation"
            ]
        ),
        RecommendedProject(
            title="Semantic Document Q&A with Vector Embeddings",
            difficulty="Intermediate-Advanced",
            estimatedTime="15 Hours",
            addressesGaps=["Embeddings", "Vector Databases", "NumPy"],
            description="Develop a RAG-based search engine that converts academic PDF notes into dense vector embeddings using Sentence-Transformers and queries them via ChromaDB.",
            architectureHighlights=[
                "Sentence-Transformers",
                "ChromaDB / pgvector",
                "Python LangChain",
                "Streamlit / React UI"
            ]
        )
    ]
