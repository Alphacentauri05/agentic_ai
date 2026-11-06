import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle

output_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "sample_documents")
os.makedirs(output_dir, exist_ok=True)

styles = getSampleStyleSheet()

# Custom styles
title_style = ParagraphStyle(
    'DocTitle',
    parent=styles['Heading1'],
    fontName='Helvetica-Bold',
    fontSize=18,
    leading=22,
    textColor=colors.HexColor('#1E293B'),
    spaceAfter=6
)

subtitle_style = ParagraphStyle(
    'DocSubTitle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=10,
    leading=14,
    textColor=colors.HexColor('#64748B'),
    spaceAfter=12
)

h2_style = ParagraphStyle(
    'SectionHeader',
    parent=styles['Heading2'],
    fontName='Helvetica-Bold',
    fontSize=12,
    leading=16,
    textColor=colors.HexColor('#0F172A'),
    spaceBefore=8,
    spaceAfter=4
)

body_style = ParagraphStyle(
    'BodyText',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9.5,
    leading=13.5,
    textColor=colors.HexColor('#334155'),
    spaceAfter=6
)

bullet_style = ParagraphStyle(
    'BulletText',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9,
    leading=13,
    textColor=colors.HexColor('#334155'),
    leftIndent=12,
    spaceAfter=3
)

# ==========================================
# 1. College Syllabus PDF (B.Tech CS)
# ==========================================
def generate_syllabus_pdf():
    pdf_path = os.path.join(output_dir, "1_College_Syllabus_BTech_CS.pdf")
    doc = SimpleDocTemplate(pdf_path, pagesize=letter, rightMargin=40, leftMargin=40, topMargin=40, bottomMargin=40)
    story = []

    story.append(Paragraph("STATE TECHNICAL UNIVERSITY • DEPARTMENT OF COMPUTER SCIENCE", subtitle_style))
    story.append(Paragraph("Course Curriculum: CS401 — Core Academic Syllabus (Semesters 3 to 7)", title_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#3B82F6'), spaceAfter=10))

    story.append(Paragraph("Course Overview & Academic Objectives", h2_style))
    story.append(Paragraph(
        "This curriculum provides foundational knowledge in algorithmic thinking, discrete mathematical models, "
        "database management systems, and system programming. Designed for undergraduate engineering students.",
        body_style
    ))
    story.append(Spacer(1, 6))

    # Unit 1
    story.append(Paragraph("Unit 1: Data Structures and Algorithms (Semester 3)", h2_style))
    story.append(Paragraph("• Linear Data Structures: Arrays, Doubly Linked Lists, Stacks, Circular Queues.", bullet_style))
    story.append(Paragraph("• Non-Linear Data Structures: Binary Search Trees, AVL Trees, Graph Traversal (BFS & DFS).", bullet_style))
    story.append(Paragraph("• Algorithm Design: Divide and Conquer, MergeSort, QuickSort, Big-O Time Complexity.", bullet_style))
    story.append(Spacer(1, 4))

    # Unit 2
    story.append(Paragraph("Unit 2: Relational Database Management Systems (Semester 4)", h2_style))
    story.append(Paragraph("• Database Concepts: ER modeling, Relational Algebra, Functional Dependencies, Normalization (1NF to BCNF).", bullet_style))
    story.append(Paragraph("• SQL Structured Query Language: DDL/DML, Complex JOIN queries, Indexing, Triggers, Views.", bullet_style))
    story.append(Paragraph("• Transaction Management: ACID properties, Concurrency Control, Two-Phase Locking.", bullet_style))
    story.append(Spacer(1, 4))

    # Unit 3
    story.append(Paragraph("Unit 3: Applied Linear Algebra & Probability (Semester 4)", h2_style))
    story.append(Paragraph("• Matrix Algebra: Vector spaces, Eigenvalues, Eigenvectors, Singular Value Decomposition (SVD).", bullet_style))
    story.append(Paragraph("• Probability: Conditional probability, Bayes Theorem, Gaussian distributions, Random variables.", bullet_style))
    story.append(Spacer(1, 4))

    # Unit 4
    story.append(Paragraph("Unit 4: Operating Systems & System Programming (Semester 5)", h2_style))
    story.append(Paragraph("• Process Management: CPU Scheduling algorithms, Deadlock detection and avoidance.", bullet_style))
    story.append(Paragraph("• Memory Management: Virtual memory, Page replacement, Linux Shell scripting & bash utilities.", bullet_style))
    story.append(Spacer(1, 4))

    # Unit 5
    story.append(Paragraph("Unit 5: Introduction to Python & Artificial Intelligence (Semester 6 Elective)", h2_style))
    story.append(Paragraph("• Python Syntax: Functions, Object-Oriented Programming (OOP) in Python, List comprehensions.", bullet_style))
    story.append(Paragraph("• AI Fundamentals: Classical Search (A* algorithm, Alpha-Beta pruning), Rule-based Expert Systems.", bullet_style))
    story.append(Paragraph("• Note on Course Limitations: Modern deep learning frameworks (PyTorch, TensorFlow) and containerization are not part of this curriculum.", bullet_style))

    doc.build(story)
    print(f"Generated: {pdf_path}")

# ==========================================
# 2. Student Resume PDF
# ==========================================
def generate_resume_pdf():
    pdf_path = os.path.join(output_dir, "2_Student_Resume_Rohan_Sharma.pdf")
    doc = SimpleDocTemplate(pdf_path, pagesize=letter, rightMargin=40, leftMargin=40, topMargin=40, bottomMargin=40)
    story = []

    story.append(Paragraph("ROHAN SHARMA", title_style))
    story.append(Paragraph("Bengaluru, India • +91 98765 43210 • rohan.cs@example.com • github.com/rohan-dev • linkedin.com/in/rohan-sharma", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#10B981'), spaceAfter=8))

    # Education
    story.append(Paragraph("EDUCATION", h2_style))
    story.append(Paragraph("<b>Bachelor of Technology in Computer Science & Engineering</b> | State Technical University", body_style))
    story.append(Paragraph("Expected Graduation: June 2026 | CGPA: 8.4 / 10 | Relevant Coursework: Data Structures, DBMS, Linear Algebra, OS", bullet_style))
    story.append(Spacer(1, 4))

    # Skills
    story.append(Paragraph("TECHNICAL SKILLS", h2_style))
    story.append(Paragraph("• <b>Programming Languages:</b> Python (OOP, data analysis), C++, SQL (PostgreSQL, MySQL)", bullet_style))
    story.append(Paragraph("• <b>Frameworks & Libraries:</b> Flask, Scikit-Learn (basic modeling), Pandas, NumPy, HTML5/CSS3", bullet_style))
    story.append(Paragraph("• <b>Developer Tools:</b> Git, GitHub, VS Code, Postman, Linux Terminal", bullet_style))
    story.append(Spacer(1, 4))

    # Projects
    story.append(Paragraph("PRACTICAL PROJECTS", h2_style))
    
    story.append(Paragraph("<b>College Event Management & Ticketing REST API</b> (Python, Flask, PostgreSQL)", body_style))
    story.append(Paragraph("• Engineered a robust REST API service using Flask to handle 1,000+ student registrations.", bullet_style))
    story.append(Paragraph("• Architected relational database schema in PostgreSQL with normalization and foreign key constraints.", bullet_style))
    story.append(Paragraph("• Implemented JWT token-based authentication middleware and tested endpoint throughput with Postman.", bullet_style))
    story.append(Spacer(1, 4))

    story.append(Paragraph("<b>Student Performance Predictive Modeling</b> (Python, Scikit-Learn, Pandas)", body_style))
    story.append(Paragraph("• Preprocessed and cleaned 1,500 historical academic records using Pandas and NumPy.", bullet_style))
    story.append(Paragraph("• Trained Logistic Regression and Random Forest models achieving 82% classification accuracy.", bullet_style))
    story.append(Paragraph("• Computed correlation heatmaps and feature importance metrics using Matplotlib.", bullet_style))
    story.append(Spacer(1, 4))

    # Achievements
    story.append(Paragraph("CERTIFICATIONS & ACTIVITIES", h2_style))
    story.append(Paragraph("• Active open-source contributor to college repository using Git feature-branch workflows.", bullet_style))
    story.append(Paragraph("• Completed 30-Day Python & Data Structures coding challenge on LeetCode.", bullet_style))

    doc.build(story)
    print(f"Generated: {pdf_path}")

# ==========================================
# 3. Job Description PDF
# ==========================================
def generate_jd_pdf():
    pdf_path = os.path.join(output_dir, "3_Job_Description_Junior_ML_Engineer.pdf")
    doc = SimpleDocTemplate(pdf_path, pagesize=letter, rightMargin=40, leftMargin=40, topMargin=40, bottomMargin=40)
    story = []

    story.append(Paragraph("NEXTGEN AI LABS • SERIES-A VENTURE", subtitle_style))
    story.append(Paragraph("Job Opportunity: Junior AI / Machine Learning Engineer", title_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#F59E0B'), spaceAfter=8))

    story.append(Paragraph("About The Role", h2_style))
    story.append(Paragraph(
        "We are looking for an ambitious Junior Machine Learning Engineer to join our core AI engineering team. "
        "In this role, you will build, train, evaluate, and containerize modern neural network architectures and deploy them "
        "as production-grade inference microservices.",
        body_style
    ))
    story.append(Spacer(1, 4))

    story.append(Paragraph("Key Responsibilities", h2_style))
    story.append(Paragraph("• Design, implement, and train neural network models using the <b>PyTorch</b> deep learning framework.", bullet_style))
    story.append(Paragraph("• Construct high-performance data processing pipelines using <b>NumPy</b>, <b>Pandas</b>, and <b>SQL</b>.", bullet_style))
    story.append(Paragraph("• Package trained model weights into asynchronous REST inference microservices using <b>FastAPI</b>.", bullet_style))
    story.append(Paragraph("• Containerize inference applications with <b>Docker</b> to ensure reproducible deployment environments.", bullet_style))
    story.append(Paragraph("• Collaborate on code reviews, version control, and staging pipelines using <b>Git</b> and GitHub.", bullet_style))
    story.append(Spacer(1, 4))

    story.append(Paragraph("Required Qualifications (Must-Have)", h2_style))
    story.append(Paragraph("• Strong foundational proficiency in <b>Python</b> and Object-Oriented Design.", bullet_style))
    story.append(Paragraph("• Hands-on model building experience with <b>PyTorch</b> (DataLoaders, training loops, backprop).", bullet_style))
    story.append(Paragraph("• Experience with web backend APIs using <b>FastAPI</b> or Flask.", bullet_style))
    story.append(Paragraph("• Working knowledge of <b>Docker</b> container creation and multi-stage Dockerfiles.", bullet_style))
    story.append(Paragraph("• Solid understanding of relational database querying using <b>SQL</b>.", bullet_style))
    story.append(Spacer(1, 4))

    story.append(Paragraph("Preferred / Nice to Have (Bonus)", h2_style))
    story.append(Paragraph("• Familiarity with Vector Databases (ChromaDB / pgvector) and dense vector embeddings.", bullet_style))
    story.append(Paragraph("• Basic understanding of MLOps pipelines and CI/CD automated deployment.", bullet_style))

    doc.build(story)
    print(f"Generated: {pdf_path}")

if __name__ == "__main__":
    generate_syllabus_pdf()
    generate_resume_pdf()
    generate_jd_pdf()
    print("All sample PDF files generated successfully!")
