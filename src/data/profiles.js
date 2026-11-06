export const PROFILES = {
  ml_engineer: {
    id: "ml_engineer",
    title: "Junior AI / Machine Learning Engineer",
    targetCompany: "NextGen AI Labs • Series-A Startup",
    studentInfo: {
      degree: "B.Tech Computer Science & Engineering",
      semester: "8th Semester (Final Year)",
      university: "State Technical University",
      cgpa: "8.4 / 10"
    },
    metrics: {
      overallReadiness: 62,
      academicCoverage: 74,
      resumeEvidence: 56,
      jobRequirementFit: 60,
      totalSkillsAnalyzed: 18,
      strongSkills: 7,
      moderateSkills: 4,
      missingSkills: 5,
      learnLater: 2
    },
    documents: {
      syllabus: {
        title: "CS401: Computer Science Curriculum (Sem 3-7)",
        summary: "Strong theoretical base in Data Structures, Relational DBMS (SQL), Linear Algebra, Probability, and Object-Oriented Programming. Basic introduction to AI & Python scripts in Sem 6.",
        coverageTags: ["Data Structures", "Linear Algebra", "RDBMS & SQL", "Operating Systems", "Probability & Stats", "Intro to AI"]
      },
      resume: {
        title: "Student_Resume_Final.pdf",
        summary: "Demonstrated skills in Python syntax, basic Flask REST endpoints, exploratory data analysis using Pandas, and basic Scikit-Learn regression models. Lacks GPU deep learning pipelines and containerization.",
        evidenceHighlights: [
          "Developed Flask REST API for college event registration",
          "Trained simple churn prediction model using Scikit-Learn Logistic Regression",
          "Wrote SQL queries for student portal database"
        ]
      },
      jobDescription: {
        title: "JD_Junior_ML_Engineer_2026.txt",
        summary: "Looking for an engineer who can train neural networks with PyTorch, build scalable inference APIs with FastAPI, containerize with Docker, and understand embeddings/vector workflows.",
        requiredSkills: ["Python", "PyTorch", "FastAPI / Flask", "SQL", "NumPy & Pandas", "Docker"],
        preferredSkills: ["MLOps Basics", "Vector Databases", "Git & CI/CD", "AWS/Cloud"]
      }
    },
    skillComparison: [
      {
        id: "s1",
        name: "Python Programming",
        category: "Core Language",
        academicLevel: "Covered (Unit 2)",
        resumeEvidence: "Built 2 personal projects, clean OOP structure",
        jobRequirement: "Required (Must-have)",
        status: "strong",
        badge: "Ready",
        explanation: "College coursework and practical project evidence both clearly demonstrate solid proficiency.",
        impactWeight: 15
      },
      {
        id: "s2",
        name: "SQL & Data Modeling",
        category: "Databases",
        academicLevel: "Covered (Semester 4 DBMS)",
        resumeEvidence: "Complex JOINs and schema design in college project",
        jobRequirement: "Required (Must-have)",
        status: "strong",
        badge: "Ready",
        explanation: "Strong alignment between university database curriculum and resume evidence.",
        impactWeight: 12
      },
      {
        id: "s3",
        name: "NumPy & Data Manipulation",
        category: "Data Processing",
        academicLevel: "Partially mentioned in Lab",
        resumeEvidence: "Used for basic matrix operations in EDA",
        jobRequirement: "Required (Must-have)",
        status: "moderate",
        badge: "Needs Practice",
        explanation: "Has foundational familiarity, but lacks vectorization and high-dimensional tensor operations required by JD.",
        impactWeight: 10
      },
      {
        id: "s4",
        name: "Machine Learning (Scikit-Learn)",
        category: "Modeling",
        academicLevel: "Theoretical elective (Sem 6)",
        resumeEvidence: "Simple Logistic Regression / Random Forest",
        jobRequirement: "Required (Must-have)",
        status: "moderate",
        badge: "Needs Practice",
        explanation: "Student understands basic tabular algorithms, but the JD requires modern neural architectures and deep learning.",
        impactWeight: 14
      },
      {
        id: "s5",
        name: "PyTorch Deep Learning",
        category: "Deep Learning Framework",
        academicLevel: "Not in college syllabus",
        resumeEvidence: "No evidence found on resume",
        jobRequirement: "Required (Must-have)",
        status: "missing",
        badge: "High Priority Gap",
        explanation: "Critical industry requirement for model training. Never taught in college curriculum and completely missing from resume.",
        impactWeight: 18
      },
      {
        id: "s6",
        name: "FastAPI / Web APIs",
        category: "Backend & Inference",
        academicLevel: "Basic web technologies taught",
        resumeEvidence: "Demonstrated Flask API in event management project",
        jobRequirement: "Required (Must-have)",
        status: "strong",
        badge: "Ready",
        explanation: "Flask experience translates directly to FastAPI with minimal learning curve.",
        impactWeight: 11
      },
      {
        id: "s7",
        name: "Docker & Containerization",
        category: "DevOps & Deployment",
        academicLevel: "Not in syllabus",
        resumeEvidence: "No evidence found on resume",
        jobRequirement: "Preferred / Core requirement",
        status: "missing",
        badge: "High Priority Gap",
        explanation: "Industry expects containerized inference services; not covered by university academics.",
        impactWeight: 10
      },
      {
        id: "s8",
        name: "Vector Databases & Embeddings",
        category: "Modern AI / GenAI",
        academicLevel: "Not in syllabus",
        resumeEvidence: "No evidence found on resume",
        jobRequirement: "Preferred (Good-to-have)",
        status: "learn_later",
        badge: "Learn Later",
        explanation: "Valuable bonus skill for RAG and semantic search, but core PyTorch foundation should come first.",
        impactWeight: 6
      },
      {
        id: "s9",
        name: "Git & Collaborative Workflow",
        category: "Software Engineering",
        academicLevel: "Mentioned in Lab syllabus",
        resumeEvidence: "Active GitHub profile with committed repos",
        jobRequirement: "Required (Standard)",
        status: "strong",
        badge: "Ready",
        explanation: "Demonstrates consistent version control habits.",
        impactWeight: 8
      }
    ],
    skillDependencyGraph: {
      nodes: [
        { id: "python", label: "Python", category: "Core", status: "completed", desc: "Foundational programming & syntax" },
        { id: "math", label: "Linear Algebra & Stats", category: "Academics", status: "completed", desc: "Matrix calculus & probability (College Sem 3)" },
        { id: "numpy", label: "NumPy & Tensors", category: "Math & Data", status: "in_progress", desc: "Array broadcasting & vector math" },
        { id: "ml_basics", label: "Scikit-Learn ML", category: "Modeling", status: "in_progress", desc: "Supervised & unsupervised tabular models" },
        { id: "deep_learning", label: "Deep Learning Concepts", category: "Theory", status: "prereq_ready", desc: "Backprop, activation functions, loss optimizers" },
        { id: "pytorch", label: "PyTorch Framework", category: "Deep Learning", status: "target_gap", desc: "Model architecture, DataLoader, training loops" },
        { id: "fastapi", label: "FastAPI Inference", category: "Backend", status: "completed", desc: "Serving predictions via REST endpoints" },
        { id: "docker", label: "Docker Containers", category: "DevOps", status: "target_gap", desc: "Reproducible container builds for models" },
        { id: "mlops", label: "MLOps & Vector Search", category: "Production", status: "future", desc: "Monitoring, CI/CD, and vector indexes" }
      ],
      edges: [
        { from: "python", to: "numpy" },
        { from: "math", to: "numpy" },
        { from: "numpy", to: "ml_basics" },
        { from: "ml_basics", to: "deep_learning" },
        { from: "deep_learning", to: "pytorch" },
        { from: "python", to: "fastapi" },
        { from: "fastapi", to: "docker" },
        { from: "pytorch", to: "mlops" },
        { from: "docker", to: "mlops" }
      ]
    },
    roadmap: [
      {
        phase: "Phase 1: Deep Learning Core & PyTorch Foundations",
        duration: "Weeks 1 - 2",
        tag: "High Priority Gap",
        color: "#EF4444",
        goals: [
          "Bridge academic Linear Algebra with PyTorch Tensor broadcasting",
          "Implement neural network forward & backward passes from scratch",
          "Master PyTorch Dataset, DataLoader, and standard training loops on CPU/GPU"
        ],
        curatedResources: ["Deep Learning with PyTorch (Official 60-min Blitz)", "Fast.ai Practical Deep Learning for Coders"]
      },
      {
        phase: "Phase 2: Real-World Model Training & Fine-Tuning",
        duration: "Weeks 3 - 4",
        tag: "Core Modeling",
        color: "#F59E0B",
        goals: [
          "Train a Computer Vision CNN or NLP Transformer with PyTorch",
          "Perform hyperparameter tuning and model checkpointing with evaluation metrics",
          "Export trained model weights into ONNX / TorchScript for optimized inference"
        ],
        curatedResources: ["Hugging Face Transformers Course", "PyTorch Recipes: Performance Tuning"]
      },
      {
        phase: "Phase 3: Production Serving with FastAPI & Docker",
        duration: "Weeks 5 - 6",
        tag: "Engineering Bridge",
        color: "#10B981",
        goals: [
          "Wrap your PyTorch inference model inside an asynchronous FastAPI server",
          "Write a multi-stage Dockerfile to containerize the ML microservice",
          "Test load latency and payload serialization with Pydantic schemas"
        ],
        curatedResources: ["FastAPI for Machine Learning Microservices", "Docker for Python Data Scientists"]
      },
      {
        phase: "Phase 4: Capstone Portfolio & Vector Search Extension",
        duration: "Weeks 7 - 8",
        tag: "Placement Ready",
        color: "#6366F1",
        goals: [
          "Deploy live containerized service to Render or Railway with interactive Swagger docs",
          "Add optional semantic vector search module using ChromaDB",
          "Publish a clean GitHub repository with README demo GIF and system architecture diagram"
        ],
        curatedResources: ["Building Production RAG Systems", "Portfolio Presentation Guide for ML Engineers"]
      }
    ],
    recommendedProjects: [
      {
        title: "Dockerized PyTorch Visual Classifier API",
        difficulty: "Intermediate",
        estimatedTime: "12 Hours",
        addressesGaps: ["PyTorch", "Docker", "FastAPI"],
        description: "Build an end-to-end computer vision service that accepts image uploads, runs ResNet inference with PyTorch, and returns predictions via FastAPI running in a lightweight Docker container.",
        architectureHighlights: ["PyTorch ResNet-18", "FastAPI Async Endpoints", "Docker Multi-stage build", "Swagger Documentation"]
      },
      {
        title: "Semantic Document Q&A with Vector Embeddings",
        difficulty: "Intermediate-Advanced",
        estimatedTime: "15 Hours",
        addressesGaps: ["Embeddings", "Vector Databases", "NumPy"],
        description: "Develop a RAG-based search engine that converts academic PDF notes into dense vector embeddings using Sentence-Transformers and queries them via ChromaDB.",
        architectureHighlights: ["Sentence-Transformers", "ChromaDB / pgvector", "Python LangChain", "Streamlit UI"]
      }
    ],
    whatIfSimulator: {
      initialScore: 62,
      skillsToToggle: [
        { id: "pytorch", name: "Master PyTorch & Deep Learning", boost: 16, checked: false },
        { id: "docker", name: "Containerize projects with Docker", boost: 10, checked: false },
        { id: "mlops", name: "Add Vector Search / MLOps Pipeline", boost: 7, checked: false },
        { id: "numpy_adv", name: "Advanced NumPy & Tensor Vectorization", boost: 5, checked: false }
      ]
    }
  },

  fullstack_dev: {
    id: "fullstack_dev",
    title: "Junior Full-Stack Cloud & Web Engineer",
    targetCompany: "CloudScale SaaS • Enterprise Tech",
    studentInfo: {
      degree: "B.Tech Information Technology",
      semester: "8th Semester",
      university: "National Engineering Institute",
      cgpa: "8.1 / 10"
    },
    metrics: {
      overallReadiness: 68,
      academicCoverage: 62,
      resumeEvidence: 74,
      jobRequirementFit: 66,
      totalSkillsAnalyzed: 16,
      strongSkills: 8,
      moderateSkills: 3,
      missingSkills: 4,
      learnLater: 1
    },
    documents: {
      syllabus: {
        title: "IT302: Information Technology Syllabus",
        summary: "Focus on Java, Object-Oriented Design, Computer Networks, Operating Systems, Relational Databases, and Software Engineering lifecycles.",
        coverageTags: ["Java OOP", "SQL & ER Models", "Computer Networks", "Software Engineering", "Web Fundamentals"]
      },
      resume: {
        title: "Resume_WebDev_Candidate.pdf",
        summary: "Strong Javascript experience with React, Tailwind CSS, Node.js, and MongoDB. Demonstrated several responsive frontend projects.",
        evidenceHighlights: [
          "Built full-stack e-commerce store with React, Node.js, and MongoDB",
          "Implemented JWT authentication and state management with Redux Toolkit",
          "Created responsive landing pages with Tailwind CSS"
        ]
      },
      jobDescription: {
        title: "JD_FullStack_React_Node_TypeScript.txt",
        summary: "Seeking a modern full-stack developer fluent in TypeScript, React, Next.js Server Components, PostgreSQL, Docker, and CI/CD automated testing.",
        requiredSkills: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Docker", "Jest / Unit Tests"],
        preferredSkills: ["AWS S3 / CloudFront", "GraphQL", "Tailwind CSS"]
      }
    },
    skillComparison: [
      {
        id: "fs1",
        name: "React.js & State Management",
        category: "Frontend",
        academicLevel: "Not in syllabus (only HTML/CSS)",
        resumeEvidence: "Built 3 production apps with React & Redux",
        jobRequirement: "Required (Must-have)",
        status: "strong",
        badge: "Ready",
        explanation: "Extensive practical experience despite absence from traditional college syllabus.",
        impactWeight: 16
      },
      {
        id: "fs2",
        name: "TypeScript",
        category: "Languages",
        academicLevel: "Not in syllabus (taught Java/C++)",
        resumeEvidence: "All projects written in vanilla JavaScript (ES6)",
        jobRequirement: "Required (Strict standard)",
        status: "missing",
        badge: "High Priority Gap",
        explanation: "Company codebase is 100% strict TypeScript. Student only knows JavaScript.",
        impactWeight: 16
      },
      {
        id: "fs3",
        name: "Node.js & Express APIs",
        category: "Backend",
        academicLevel: "Briefly discussed in elective",
        resumeEvidence: "Built REST APIs with auth middleware and MongoDB",
        jobRequirement: "Required (Must-have)",
        status: "strong",
        badge: "Ready",
        explanation: "Solid backend foundations proven through deployed projects.",
        impactWeight: 14
      },
      {
        id: "fs4",
        name: "PostgreSQL & Relational DBs",
        category: "Databases",
        academicLevel: "Covered in depth (Semester 4 RDBMS)",
        resumeEvidence: "Resume primarily showcases MongoDB (NoSQL)",
        jobRequirement: "Required (Must-have)",
        status: "moderate",
        badge: "Needs Practice",
        explanation: "Has university theoretical knowledge of SQL, but needs to bridge it into Prisma/Drizzle ORM for modern apps.",
        impactWeight: 12
      },
      {
        id: "fs5",
        name: "Automated Testing (Jest / Vitest)",
        category: "Quality Assurance",
        academicLevel: "Software Testing methodology covered theoretically",
        resumeEvidence: "No test files or coverage mentioned in projects",
        jobRequirement: "Required (Must-have)",
        status: "missing",
        badge: "High Priority Gap",
        explanation: "Crucial for enterprise reliability; rarely practiced by college students without guidance.",
        impactWeight: 10
      },
      {
        id: "fs6",
        name: "Docker Containerization",
        category: "DevOps",
        academicLevel: "Not in syllabus",
        resumeEvidence: "No containerization experience mentioned",
        jobRequirement: "Required",
        status: "missing",
        badge: "High Priority Gap",
        explanation: "Standard for local environment reproducibility and cloud staging.",
        impactWeight: 10
      }
    ],
    skillDependencyGraph: {
      nodes: [
        { id: "js", label: "JavaScript ES6+", category: "Core", status: "completed", desc: "Closures, async/await, DOM APIs" },
        { id: "react", label: "React.js", category: "Frontend", status: "completed", desc: "Hooks, state, component lifecycle" },
        { id: "typescript", label: "TypeScript", category: "Language", status: "target_gap", desc: "Generics, interfaces, strict types" },
        { id: "nextjs", label: "Next.js App Router", category: "Framework", status: "prereq_ready", desc: "Server components, SSR, API routes" },
        { id: "sql_theory", label: "RDBMS Theory", category: "College", status: "completed", desc: "ACID transactions & normalization (Sem 4)" },
        { id: "postgres", label: "PostgreSQL & Prisma", category: "Database", status: "in_progress", desc: "Migrations, relational queries, indexes" },
        { id: "testing", label: "Jest & React Testing Lib", category: "QA", status: "target_gap", desc: "Unit & component integration tests" },
        { id: "docker", label: "Docker for Web", category: "DevOps", status: "target_gap", desc: "Dockerfile & docker-compose for full-stack" }
      ],
      edges: [
        { from: "js", to: "react" },
        { from: "js", to: "typescript" },
        { from: "react", to: "nextjs" },
        { from: "typescript", to: "nextjs" },
        { from: "sql_theory", to: "postgres" },
        { from: "react", to: "testing" },
        { from: "nextjs", to: "docker" },
        { from: "postgres", to: "docker" }
      ]
    },
    roadmap: [
      {
        phase: "Phase 1: TypeScript Migration & Strict Typing",
        duration: "Weeks 1 - 2",
        tag: "Highest Priority",
        color: "#EF4444",
        goals: [
          "Master TypeScript type system: interfaces, union types, and utility types",
          "Convert an existing React JavaScript repository into strict TypeScript without `any`",
          "Type React props, events, and API response contracts cleanly"
        ],
        curatedResources: ["Total TypeScript by Matt Pocock", "React TypeScript Cheatsheet"]
      },
      {
        phase: "Phase 2: Relational Databases & Prisma ORM",
        duration: "Weeks 3 - 4",
        tag: "Database Shift",
        color: "#F59E0B",
        goals: [
          "Connect college SQL theory with PostgreSQL running locally or on Neon",
          "Write schema migrations and complex relational joins with Prisma or Drizzle ORM",
          "Benchmark index performance and optimize query response times"
        ],
        curatedResources: ["PostgreSQL Tutorial for Developers", "Prisma ORM Getting Started"]
      },
      {
        phase: "Phase 3: Automated Testing & Dockerization",
        duration: "Weeks 5 - 6",
        tag: "Production Readiness",
        color: "#10B981",
        goals: [
          "Write unit tests with Vitest and UI component tests with React Testing Library",
          "Create a multi-service `docker-compose.yml` for Next.js frontend, Node backend, and Postgres",
          "Setup GitHub Actions workflow to run lint and tests on pull requests"
        ],
        curatedResources: ["Testing JavaScript by Kent C. Dodds", "Docker Compose Fullstack Guide"]
      }
    ],
    recommendedProjects: [
      {
        title: "Full-Stack Task Manager in TypeScript & Next.js 14",
        difficulty: "Intermediate",
        estimatedTime: "14 Hours",
        addressesGaps: ["TypeScript", "Next.js", "PostgreSQL"],
        description: "A collaborative Kanban workspace built with Next.js App Router, strict TypeScript, PostgreSQL database with Prisma ORM, and Supabase auth.",
        architectureHighlights: ["Next.js 14 App Router", "Strict TypeScript", "PostgreSQL + Prisma", "Server Actions"]
      },
      {
        title: "Dockerized Microservice with Jest CI/CD",
        difficulty: "Intermediate",
        estimatedTime: "10 Hours",
        addressesGaps: ["Docker", "Testing", "CI/CD"],
        description: "A production-grade REST API with 90%+ test coverage using Vitest/Jest, packaged into automated Docker containers with GitHub Actions pipeline.",
        architectureHighlights: ["Docker Multi-stage", "Vitest Unit Tests", "GitHub Actions CI", "Healthcheck monitoring"]
      }
    ],
    whatIfSimulator: {
      initialScore: 68,
      skillsToToggle: [
        { id: "ts", name: "Convert React projects to TypeScript", boost: 14, checked: false },
        { id: "pg", name: "Add PostgreSQL & Prisma schema to portfolio", boost: 8, checked: false },
        { id: "dock", name: "Dockerize full-stack application", boost: 6, checked: false },
        { id: "test", name: "Add Jest / Vitest test suites", boost: 4, checked: false }
      ]
    }
  }
};
