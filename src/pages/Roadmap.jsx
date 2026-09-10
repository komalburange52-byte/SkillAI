import { Link, useLocation } from "react-router-dom";
import {
    ArrowLeft,
    BookOpen,
    CheckCircle,
    Clock,
    Target,
    Sparkles,
} from "lucide-react";

import "../App.css";

function Roadmap() {
   const location = useLocation();

const selectedRole =
    location.state?.selectedRole || "AI Engineer";

const prioritySkills =
    location.state?.prioritySkills || [];
    const roadmap = prioritySkills.map((skill, index) => ({
    level: `Step ${index + 1}`,
    title: `Improve ${skill.name}`,
    description: `Focus on improving your ${skill.name} skills from ${skill.current}% toward the required ${skill.required}% level for your ${selectedRole} career goal.`,
    skills: [skill.name],
    duration:
        skill.gap >= 30
            ? "2–3 Weeks"
            : skill.gap >= 15
            ? "1–2 Weeks"
            : "1 Week",
    status:
        index === 0
            ? "High Priority"
            : index === 1
            ? "Recommended"
            : "Upcoming",
}));

    return (
        <div className="roadmap-page">

            {/* HEADER */}

            <div className="roadmap-header">

                <div>
                    <p className="welcome-tag">PERSONALIZED AI ROADMAP</p>

                    <h1>
                        <Target size={32} />
                        Your Learning Roadmap
                    </h1>

                    <p>
                        A personalized learning path based on your current
                        skills and career goals.
                    </p>
                </div>

                <Link to="/skill-gap" className="back-button">
                    <ArrowLeft size={18} />
                    Skill Gap
                </Link>

            </div>


            {/* AI SUMMARY */}

            <div className="roadmap-summary">

                <div className="roadmap-summary-icon">
                    <Sparkles size={26} />
                </div>

                <div>
                    <p>AI GENERATED ROADMAP</p>

                    <h2>
    Become a {selectedRole}
</h2>
                    <span>
    SkillAI created this roadmap from your current
    skill levels and competency gaps.
</span>
                </div>

            </div>


            {/* ROADMAP */}

           <div className="roadmap-container">

    {roadmap.length === 0 ? (
        <div className="roadmap-card">
            <h2>No roadmap generated yet</h2>

            <p className="roadmap-description">
                Go to Skill Gap Analysis and generate a
                personalized roadmap based on your skills.
            </p>

            <Link to="/skill-gap" className="roadmap-button">
                Go to Skill Gap
            </Link>
        </div>
    ) : (
        roadmap.map((item, index) => (

                    <div className="roadmap-step" key={item.title}>

                        <div className="roadmap-number">
                            {index + 1}
                        </div>

                        <div className="roadmap-line"></div>

                        <div className="roadmap-card">

                            <div className="roadmap-card-header">

                                <div>
                                    <span className="roadmap-level">
                                        {item.level}
                                    </span>

                                    <h2>{item.title}</h2>
                                </div>

                                <span className="roadmap-status">
                                    {item.status}
                                </span>

                            </div>

                            <p className="roadmap-description">
                                {item.description}
                            </p>


                            <div className="roadmap-skills">

                                {item.skills.map((skill) => (

                                    <span key={skill}>
                                        <BookOpen size={14} />
                                        {skill}
                                    </span>

                                ))
                                }

                            </div>


                            <div className="roadmap-footer">

                                <span>
                                    <Clock size={16} />
                                    {item.duration}
                                </span>

                                <button>
                                    <CheckCircle size={16} />
                                    Mark Complete
                                </button>

                            </div>

                        </div>

                    </div>

                ))
            )}

            </div>

        </div>
    );
}

export default Roadmap;