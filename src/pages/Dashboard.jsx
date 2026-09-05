import "../App.css";
import { Link } from "react-router-dom";

import {
    LayoutDashboard,
    BarChart3,
    Target,
    ClipboardCheck,
    Bot,
    BookOpen,
    Trophy,
    Settings,
    Search,
    Bell,
    Sparkles,
    TrendingUp,
    CheckCircle,
    Brain,
    Flame,
    LineChart,
    Clock,
} from "lucide-react";

import {
    LineChart as RechartsLineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const learningData = [
    { day: "Mon", progress: 25 },
    { day: "Tue", progress: 35 },
    { day: "Wed", progress: 32 },
    { day: "Thu", progress: 45 },
    { day: "Fri", progress: 55 },
    { day: "Sat", progress: 68 },
    { day: "Sun", progress: 75 },
];

function App() {
    return (
        <div className="dashboard">

            {/* ================= SIDEBAR ================= */}

            <aside className="sidebar">

                <div className="logo">
                    <Brain className="logo-icon" />
                    Skill<span>AI</span>
                </div>

                <nav className="sidebar-menu">

                    <a href="#" className="active">
                        <LayoutDashboard size={19} />
                        Dashboard
                    </a>

                    <Link to="/skill-gap">
                        <BarChart3 size={19} />
                        Skill Gap
                    </Link>

                    <a href="#">
                        <Target size={19} />
                        Roadmap
                    </a>

                    <a href="#">
                        <ClipboardCheck size={19} />
                        Assessments
                    </a>

                    <a href="#">
                        <Bot size={19} />
                        AI Tutor
                    </a>

                    <a href="#">
                        <BookOpen size={19} />
                        Resources
                    </a>

                    <a href="#">
                        <Trophy size={19} />
                        Achievements
                    </a>

                    <a href="#">
                        <Settings size={19} />
                        Settings
                    </a>

                </nav>

                <div className="premium-card">
                    <Sparkles size={24} />

                    <h3>Go Premium</h3>

                    <p>
                        Unlock advanced AI insights and personalized learning.
                    </p>

                    <button>Upgrade Now</button>
                </div>

            </aside>


            {/* ================= MAIN CONTENT ================= */}

            <main className="main-content">

                {/* TOP BAR */}

                <header className="topbar">

                    <div className="search-box">
                        <Search size={18} />

                        <input
                            type="text"
                            placeholder="Search anything..."
                        />
                    </div>

                    <div className="profile-section">

                        <div className="notification">
                            <Bell size={21} />
                            <span>3</span>
                        </div>

                        <div className="profile">

                            <div className="avatar">
                                K
                            </div>

                            <div>
                                <strong>Komal</strong>
                                <p>Learner</p>
                            </div>

                        </div>

                    </div>

                </header>


                {/* WELCOME */}

                <section className="welcome-section">

                    <p className="welcome-tag">
                        YOUR AI LEARNING DASHBOARD
                    </p>

                    <h1>
                        Welcome back, Komal 👋
                    </h1>

                    <p>
                        Track your skills, fill competency gaps,
                        and accelerate your career growth.
                    </p>

                </section>


                {/* ================= STATISTICS ================= */}

                <section className="stats-grid">

                    <div className="stat-card purple">

                        <div className="stat-icon">
                            <TrendingUp size={24} strokeWidth={2} />
                        </div>
                        <p>Skill Match Score</p>

                        <h2>72%</h2>

                        <span>Good Progress ↗</span>

                    </div>


                    <div className="stat-card blue">

                        <div className="stat-icon">
                            <BookOpen size={25} />
                        </div>

                        <p>Learning Progress</p>

                        <h2>45%</h2>

                        <span>Keep Learning ↗</span>

                    </div>


                    <div className="stat-card green">

                        <div className="stat-icon">
                            <CheckCircle size={25} />
                        </div>

                        <p>Completed Skills</p>

                        <h2>24</h2>

                        <span>Out of 60 Skills</span>

                    </div>


                    <div className="stat-card orange">

                        <div className="stat-icon">
                            <Sparkles size={25} />
                        </div>

                        <p>AI Insights</p>

                        <h2>8</h2>

                        <span>New Insights ↗</span>

                    </div>

                </section>


                {/* ================= ANALYTICS ================= */}

                <section className="analytics-grid">

                    {/* REAL CHART */}

                    <div className="dashboard-card progress-card">

                        <div className="card-header">

                            <div>
                                <p className="welcome-tag">
                                    ANALYTICS
                                </p>

                                <h2>
                                    Learning Progress Overview
                                </h2>
                            </div>

                            <button className="time-button">
                                This Week
                            </button>

                        </div>


                        <div className="chart-container">

                            <ResponsiveContainer width="100%" height={280}>

                                <RechartsLineChart data={learningData}>

                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#27324a"
                                    />

                                    <XAxis
                                        dataKey="day"
                                        stroke="#7f8aa3"
                                    />

                                    <YAxis
                                        stroke="#7f8aa3"
                                        domain={[0, 100]}
                                    />

                                    <Tooltip />

                                    <Line
                                        type="monotone"
                                        dataKey="progress"
                                        stroke="#a855f7"
                                        strokeWidth={3}
                                        dot={{
                                            r: 5,
                                            fill: "#a855f7",
                                        }}
                                    />

                                </RechartsLineChart>

                            </ResponsiveContainer>

                        </div>

                    </div>


                    {/* SKILL GAPS */}

                    <div className="dashboard-card skill-gap-card">

                        <div className="card-header">

                            <div>
                                <p className="welcome-tag">
                                    AI ANALYSIS
                                </p>

                                <h2>
                                    Top Skill Gaps
                                </h2>
                            </div>

                            <button className="time-button">
                                View All
                            </button>

                        </div>


                        <div className="skill">

                            <div className="skill-info">
                                <span>
                                    Natural Language Processing
                                </span>

                                <strong>30%</strong>
                            </div>

                            <div className="progress-bar">
                                <div className="progress nlp"></div>
                            </div>

                        </div>


                        <div className="skill">

                            <div className="skill-info">
                                <span>PyTorch</span>

                                <strong>20%</strong>
                            </div>

                            <div className="progress-bar">
                                <div className="progress pytorch"></div>
                            </div>

                        </div>


                        <div className="skill">

                            <div className="skill-info">
                                <span>Deep Learning</span>

                                <strong>25%</strong>
                            </div>

                            <div className="progress-bar">
                                <div className="progress deep-learning"></div>
                            </div>

                        </div>


                        <div className="skill">

                            <div className="skill-info">
                                <span>MLOps</span>

                                <strong>35%</strong>
                            </div>

                            <div className="progress-bar">
                                <div className="progress mlops"></div>
                            </div>

                        </div>

                    </div>

                </section>


                {/* ================= RECOMMENDATIONS ================= */}

                <section className="recommendations">

                    <div className="section-header">

                        <div>

                            <p className="welcome-tag">
                                POWERED BY AI
                            </p>

                            <h2>
                                <Sparkles size={20} />
                                Personalized Recommendations
                            </h2>

                        </div>

                        <button className="view-btn">
                            View Roadmap
                        </button>

                    </div>


                    <div className="recommendation-grid">


                        {/* CARD 1 */}

                        <div className="recommendation-card">

                            <span className="badge">
                                TOP PRIORITY
                            </span>

                            <div className="recommendation-icon">
                                <Brain size={42} />
                            </div>

                            <h3>
                                Master NLP Fundamentals
                            </h3>

                            <p>
                                Start with text preprocessing,
                                embeddings and transformers.
                            </p>

                            <small>
                                <Clock size={14} />
                                15 hrs · Beginner
                            </small>

                        </div>


                        {/* CARD 2 */}

                        <div className="recommendation-card">

                            <span className="badge blue-badge">
                                RECOMMENDED
                            </span>

                            <div className="recommendation-icon">
                                <Flame size={42} />
                            </div>

                            <h3>
                                PyTorch for Deep Learning
                            </h3>

                            <p>
                                Learn tensors, autograd and build
                                your first neural network.
                            </p>

                            <small>
                                <Clock size={14} />
                                20 hrs · Intermediate
                            </small>

                        </div>


                        {/* CARD 3 */}

                        <div className="recommendation-card">

                            <span className="badge green-badge">
                                UP NEXT
                            </span>

                            <div className="recommendation-icon">
                                <LineChart size={42} />
                            </div>

                            <h3>
                                Deep Learning Specialization
                            </h3>

                            <p>
                                Improve your understanding of CNNs,
                                RNNs and neural networks.
                            </p>

                            <small>
                                <Clock size={14} />
                                25 hrs · Advanced
                            </small>

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default App;