import { Link, useLocation } from "react-router-dom";

import {
    ArrowLeft,
    BookOpen,
    CheckCircle,
    Clock,
    Target,
    Brain,
    Code2,
    Rocket,
    Sparkles,
} from "lucide-react";

import "../App.css";

function Roadmap() {
    const location = useLocation();

    const selectedRole =
        location.state?.selectedRole || "AI Engineer";

    const prioritySkills =
        location.state?.prioritySkills || [];

    const roadmapData = {
        NLP: {
            icon: Brain,
            description:
                "Build strong Natural Language Processing fundamentals and learn how AI systems understand and process human language.",
            topics: [
                "Text preprocessing",
                "Tokenization",
                "TF-IDF",
                "Word embeddings",
                "Transformers",
            ],
            duration: "2-3 Weeks",
        },

        "Deep Learning": {
            icon: Brain,
            description:
                "Strengthen your deep learning knowledge and learn how neural networks are used to solve complex AI problems.",
            topics: [
                "Neural networks",
                "Backpropagation",
                "CNN",
                "Transfer learning",
                "Model optimization",
            ],
            duration: "3-4 Weeks",
        },

        MLOps: {
            icon: Rocket,
            description:
                "Learn how machine learning models are deployed, monitored and maintained in real-world production environments.",
            topics: [
                "Model deployment",
                "Docker",
                "APIs with FastAPI",
                "CI/CD",
                "Model monitoring",
            ],
            duration: "2-3 Weeks",
        },

        Python: {
            icon: Code2,
            description:
                "Strengthen your Python programming skills for AI and data science development.",
            topics: [
                "Python fundamentals",
                "Object-oriented programming",
                "NumPy",
                "Pandas",
                "Clean code",
            ],
            duration: "2 Weeks",
        },

        "Machine Learning": {
            icon: Brain,
            description:
                "Improve your machine learning fundamentals and learn how to build and evaluate predictive models.",
            topics: [
                "Supervised learning",
                "Unsupervised learning",
                "Feature engineering",
                "Model evaluation",
                "Hyperparameter tuning",
            ],
            duration: "3-4 Weeks",
        },

        Statistics: {
            icon: Target,
            description:
                "Develop the statistical foundation required for data science and machine learning.",
            topics: [
                "Probability",
                "Descriptive statistics",
                "Distributions",
                "Hypothesis testing",
                "Correlation",
            ],
            duration: "2 Weeks",
        },

        SQL: {
            icon: Code2,
            description:
                "Improve your SQL skills for working with databases and analyzing data.",
            topics: [
                "SELECT queries",
                "JOIN operations",
                "GROUP BY",
                "Subqueries",
                "Window functions",
            ],
            duration: "1-2 Weeks",
        },

        "Data Visualization": {
            icon: Target,
            description:
                "Learn how to communicate insights effectively using data visualization.",
            topics: [
                "Charts and graphs",
                "Matplotlib",
                "Seaborn",
                "Dashboards",
                "Data storytelling",
            ],
            duration: "1-2 Weeks",
        },

        TensorFlow: {
            icon: Brain,
            description:
                "Develop practical skills for building and training deep learning models with TensorFlow.",
            topics: [
                "TensorFlow basics",
                "Neural networks",
                "Model training",
                "CNN models",
                "Model deployment",
            ],
            duration: "2-3 Weeks",
        },

        JavaScript: {
            icon: Code2,
            description:
                "Strengthen your JavaScript skills for modern web development.",
            topics: [
                "ES6+",
                "Functions",
                "Async JavaScript",
                "Promises",
                "API integration",
            ],
            duration: "2 Weeks",
        },

        React: {
            icon: Code2,
            description:
                "Build modern interactive web applications using React.",
            topics: [
                "Components",
                "Props and state",
                "Hooks",
                "React Router",
                "API integration",
            ],
            duration: "2-3 Weeks",
        },

        "Node.js": {
            icon: Code2,
            description:
                "Learn backend development using Node.js.",
            topics: [
                "Node.js fundamentals",
                "Express",
                "REST APIs",
                "Authentication",
                "Database integration",
            ],
            duration: "2-3 Weeks",
        },

        MongoDB: {
            icon: Code2,
            description:
                "Learn how to store and manage application data using MongoDB.",
            topics: [
                "Collections",
                "Documents",
                "CRUD operations",
                "Queries",
                "Database integration",
            ],
            duration: "1-2 Weeks",
        },

        "Express.js": {
            icon: Code2,
            description:
                "Build scalable backend APIs using Express.js.",
            topics: [
                "Express fundamentals",
                "Routing",
                "Middleware",
                "REST APIs",
                "Error handling",
            ],
            duration: "1-2 Weeks",
        },
    };

    return (
        <div className="roadmap-page">

            {/* ================= HEADER ================= */}

            <div className="roadmap-header">

                <Link
                    to="/skill-gap"
                    className="back-button"
                >
                    <ArrowLeft size={18} />
                    Back to Skill Gap
                </Link>

                <div className="roadmap-title">

                    <p className="welcome-tag">
                        PERSONALIZED LEARNING
                    </p>

                    <h1>
                        {selectedRole} Roadmap
                    </h1>

                    <p>
                        A personalized learning path based on your
                        current skill gaps.
                    </p>

                </div>

            </div>


            {/* ================= SUMMARY ================= */}

            <div className="roadmap-summary">

                <div className="roadmap-summary-card">

                    <Target size={22} />

                    <div>
                        <span>Focus Skills</span>

                        <strong>
                            {prioritySkills.length}
                        </strong>
                    </div>

                </div>


                <div className="roadmap-summary-card">

                    <BookOpen size={22} />

                    <div>
                        <span>Learning Path</span>

                        <strong>
                            Personalized
                        </strong>
                    </div>

                </div>


                <div className="roadmap-summary-card">

                    <Rocket size={22} />

                    <div>
                        <span>Career Goal</span>

                        <strong>
                            {selectedRole}
                        </strong>
                    </div>

                </div>

            </div>


            {/* ================= ROADMAP ================= */}

            <div className="roadmap-container">

                <div className="section-header">

                    <div>

                        <p className="welcome-tag">
                            YOUR LEARNING JOURNEY
                        </p>

                        <h2>
                            Recommended Learning Path
                        </h2>

                    </div>

                </div>


                {prioritySkills.length === 0 ? (

                    <div className="roadmap-empty">

                        <CheckCircle size={28} />

                        <h3>
                            No priority skills found
                        </h3>

                        <p>
                            Analyze your skills first to generate
                            a personalized learning roadmap.
                        </p>

                        <Link
                            to="/skill-gap"
                            className="roadmap-action"
                        >
                            Analyze Skills
                        </Link>

                    </div>

                ) : (

                    <div className="roadmap-list">

                        {prioritySkills.map(
                            (skill, index) => {

                                const data =
                                    roadmapData[skill.name];

                                if (!data) {
                                    return null;
                                }

                                const Icon =
                                    data.icon;

                                const progress =
                                    Math.min(
                                        skill.current || 0,
                                        100
                                    );

                                return (

                                    <div
                                        className="roadmap-card"
                                        key={skill.name}
                                    >

                                        {/* Timeline */}

                                        <div className="roadmap-number">

                                            <span>
                                                {index + 1}
                                            </span>

                                            {index <
                                                prioritySkills.length - 1 && (
                                                <div className="timeline-line" />
                                            )}

                                        </div>


                                        {/* Content */}

                                        <div className="roadmap-content">

                                            <div className="roadmap-card-top">

                                                <div className="roadmap-skill-icon">

                                                    <Icon size={22} />

                                                </div>

                                                <div>

                                                    <p className="phase-label">
                                                        PHASE {index + 1}
                                                    </p>

                                                    <h3>
                                                        {skill.name}
                                                    </h3>

                                                </div>

                                            </div>


                                            <p className="roadmap-description">
                                                {data.description}
                                            </p>


                                            {/* Progress */}

                                            <div className="roadmap-progress">

                                                <div className="progress-info">

                                                    <span>
                                                        Current Level
                                                    </span>

                                                    <strong>
                                                        {progress}%
                                                    </strong>

                                                </div>

                                                <div className="progress-bar">

                                                    <div
                                                        className="progress-fill"
                                                        style={{
                                                            width: `${progress}%`,
                                                        }}
                                                    />

                                                </div>

                                            </div>


                                            {/* Topics */}

                                            <div className="roadmap-topics">

                                                <h4>
                                                    What you'll learn
                                                </h4>

                                                <div className="topic-list">

                                                    {data.topics.map(
                                                        (topic) => (

                                                            <div
                                                                className="topic-item"
                                                                key={topic}
                                                            >

                                                                <CheckCircle
                                                                    size={15}
                                                                />

                                                                <span>
                                                                    {topic}
                                                                </span>

                                                            </div>

                                                        )
                                                    )}

                                                </div>

                                            </div>


                                            {/* Duration */}

                                            <div className="roadmap-duration">

                                                <Clock size={16} />

                                                <span>
                                                    Estimated duration:
                                                </span>

                                                <strong>
                                                    {data.duration}
                                                </strong>

                                            </div>

                                        </div>

                                    </div>

                                );
                            }
                        )}

                    </div>

                )}

            </div>


            {/* ================= FOOTER ACTION ================= */}

            {prioritySkills.length > 0 && (

                <div className="roadmap-footer">

                    <div>

                        <Sparkles size={20} />

                        <div>

                            <h3>
                                Ready to improve your skills?
                            </h3>

                            <p>
                                Follow your personalized roadmap
                                and track your progress.
                            </p>

                        </div>

                    </div>

                    <Link
                        to="/skill-gap"
                        className="roadmap-action"
                    >
                        View Skill Analysis
                    </Link>

                </div>

            )}

        </div>
    );
}

export default Roadmap;