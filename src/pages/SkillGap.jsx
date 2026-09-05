import { Link } from "react-router-dom";
import { useState } from "react";

import {
    ArrowLeft,
    BarChart3,
    CheckCircle,
    Target,
    Brain,
    Sparkles,
    TrendingUp,
} from "lucide-react";

function SkillGap() {
    const [selectedRole, setSelectedRole] = useState("AI Engineer");
    const [userSkills, setUserSkills] = useState({
        Python: 90,
        "Machine Learning": 75,
        "Deep Learning": 55,
        NLP: 40,
        MLOps: 35,
        Statistics: 60,
        SQL: 50,
        "Data Visualization": 65,
        TensorFlow: 45,
        JavaScript: 70,
        React: 55,
        "Node.js": 50,
        MongoDB: 45,
        "Express.js": 50,
    });

    const careerSkills = {
        "AI Engineer": [
            { name: "Python", required: 90 },
            { name: "Machine Learning", required: 90 },
            { name: "Deep Learning", required: 85 },
            { name: "NLP", required: 80 },
            { name: "MLOps", required: 75 },
        ],

        "Data Scientist": [
            { name: "Python", required: 90 },
            { name: "Machine Learning", required: 85 },
            { name: "Statistics", required: 85 },
            { name: "SQL", required: 80 },
            { name: "Data Visualization", required: 75 },
        ],

        "Machine Learning Engineer": [
            { name: "Python", required: 90 },
            { name: "Machine Learning", required: 95 },
            { name: "Deep Learning", required: 85 },
            { name: "TensorFlow", required: 75 },
            { name: "MLOps", required: 85 },
        ],

        "MERN Developer": [
            { name: "JavaScript", required: 90 },
            { name: "React", required: 85 },
            { name: "Node.js", required: 85 },
            { name: "MongoDB", required: 80 },
            { name: "Express.js", required: 75 },
        ],
    };

    const skills = careerSkills[selectedRole].map((skill) => {
        const current = userSkills[skill.name] || 0;

        const gap = Math.max(skill.required - current, 0);

        let status = "Strong";

        if (current < skill.required * 0.5) {
            status = "High Priority";
        } else if (current < skill.required * 0.8) {
            status = "Needs Improvement";
        } else if (current < skill.required) {
            status = "Good";
        }

        return {
            ...skill,
            current,
            gap,
            status,
        };
    });
    const skillMatch = Math.round(
        skills.reduce((total, skill) => {
            const percentage = Math.min(
                (skill.current / skill.required) * 100,
                100
            );

            return total + percentage;
        }, 0) / skills.length
    );
    const matchedSkills = skills.filter(
        (skill) => skill.current >= skill.required * 0.8
    ).length;
    const skillGaps = skills.filter(
        (skill) => skill.current < skill.required
    ).length;
    const prioritySkills = [...skills]
        .filter((skill) => skill.gap > 0)
        .sort((a, b) => b.gap - a.gap);

    const biggestGap = prioritySkills[0];

    const biggestOpportunity = biggestGap
        ? biggestGap.name
        : "All Skills";

    const recommendationText = biggestGap
        ? `Improving ${biggestGap.name} can significantly increase your ${selectedRole} skill match.`
        : `Excellent work! Your current skills meet the requirements for ${selectedRole}.`;
    return (
        <div className="skill-gap-page">

            {/* HEADER */}

            <div className="skill-gap-header">

                <div>
                    <p className="welcome-tag">AI COMPETENCY ANALYSIS</p>

                    <h1>
                        <Target size={32} />
                        Skill Gap Analysis
                    </h1>

                    <p>
                        Discover the skills you need to reach your target career.
                    </p>
                </div>

                <Link to="/" className="back-button">
                    <ArrowLeft size={18} />
                    Dashboard
                </Link>

            </div>


            {/* ROLE SELECTION */}

            <div className="role-card">

                <div className="role-icon">
                    <Brain size={26} />
                </div>

                <div className="role-content">

                    <p>YOUR TARGET CAREER</p>

                    <h2>{selectedRole}</h2>

                    <span>
                        Skills are compared against industry requirements.
                    </span>

                </div>

                <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                >
                    <option>AI Engineer</option>
                    <option>Data Scientist</option>
                    <option>Machine Learning Engineer</option>
                    <option>MERN Developer</option>
                </select>

            </div>


            {/* SCORE SECTION */}

            <div className="gap-overview">

                <div className="score-card">

                    <div className="score-circle">
                        <span>{skillMatch}%</span>
                    </div>

                    <div>
                        <p>OVERALL SKILL MATCH</p>
                        <h2>Good Progress</h2>

                        <span>
                            You are on the right path. Keep improving your
                            high-priority skills.
                        </span>
                    </div>

                </div>


                <div className="overview-stat">
                    <TrendingUp size={24} />

                    <div>
                        <p>Skills Matched</p>
                        <h2>
                            {matchedSkills} / {skills.length}
                        </h2>
                    </div>
                </div>


                <div className="overview-stat warning">
                    <BarChart3 size={24} />

                    <div>
                        <p>Skill Gaps</p>
                        <h2>{skillGaps}</h2>
                    </div>
                </div>

            </div>

            {/* ================= MY SKILLS ================= */}

            <div className="my-skills-card">

                <div className="card-header">

                    <div>
                        <p className="welcome-tag">YOUR PROFILE</p>
                        <h2>My Current Skills</h2>
                    </div>

                    <div className="my-skills-icon">
                        <Target size={22} />
                    </div>

                </div>


                <p className="skills-description">
                    Adjust your current skill level. SkillAI will automatically
                    recalculate your competency gaps.
                </p>


                <div className="my-skills-grid">

                    {careerSkills[selectedRole].map((skill) => (

                        <div className="my-skill-item" key={skill.name}>

                            <div className="my-skill-header">

                                <span>{skill.name}</span>

                                <strong>
                                    {userSkills[skill.name] || 0}%
                                </strong>

                            </div>


                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={userSkills[skill.name] || 0}
                                onChange={(e) =>
                                    setUserSkills({
                                        ...userSkills,
                                        [skill.name]: Number(e.target.value),
                                    })
                                }
                            />


                            <div className="range-labels">
                                <span>Beginner</span>
                                <span>Expert</span>
                            </div>

                        </div>

                    ))}

                </div>

            </div>
            {/* SKILL COMPARISON */}

            <div className="analysis-card">

                <div className="card-header">

                    <div>
                        <p className="welcome-tag">DETAILED ANALYSIS</p>

                        <h2>Required Skills vs Your Skills</h2>
                    </div>

                    <Sparkles size={22} />

                </div>


                <div className="skill-list">

                    {skills.map((skill) => (

                        <div className="analysis-skill" key={skill.name}>

                            <div className="analysis-skill-header">

                                <div>
                                    <h3>{skill.name}</h3>

                                    <span className={`status ${skill.status
                                        .toLowerCase()
                                        .replaceAll(" ", "-")}`}>
                                        {skill.status}
                                    </span>
                                </div>

                                <strong>
                                    {skill.current}%
                                    <small> / {skill.required}%</small>
                                </strong>

                            </div>


                            <div className="comparison-bar">

                                <div
                                    className="current-level"
                                    style={{
                                        width: `${skill.current}%`,
                                    }}
                                />

                            </div>


                            <div className="skill-labels">

                                <span>Your Level: {skill.current}%</span>

                                <span>
                                    Required: {skill.required}%
                                </span>

                            </div>

                        </div>

                    ))}

                </div>

            </div>


            {/* AI RECOMMENDATION */}

            <div className="ai-insight">

                <div className="ai-insight-icon">
                    <Sparkles size={28} />
                </div>

                <div>

                    <p>AI RECOMMENDATION</p>

                    <h2>
                        Your biggest opportunity is {biggestOpportunity}
                    </h2>

                    <span>
                        {recommendationText}
                    </span>

                </div>

                <button>
                    Generate Roadmap
                </button>

            </div>


            {/* PRIORITY SKILLS */}

            <div className="priority-section">

                <div className="section-header">

                    <div>
                        <p className="welcome-tag">AI PRIORITIZATION</p>
                        <h2>Skills to Focus On</h2>
                    </div>

                </div>


                <div className="priority-grid">

                    <div className="priority-card high">

                        <div className="priority-icon">
                            <Target size={22} />
                        </div>

                        <div>
                            <h3>NLP</h3>
                            <p>40% current level</p>
                        </div>

                        <strong>HIGH</strong>

                    </div>


                    <div className="priority-card high">

                        <div className="priority-icon">
                            <BarChart3 size={22} />
                        </div>

                        <div>
                            <h3>MLOps</h3>
                            <p>35% current level</p>
                        </div>

                        <strong>HIGH</strong>

                    </div>


                    <div className="priority-card medium">

                        <div className="priority-icon">
                            <Brain size={22} />
                        </div>

                        <div>
                            <h3>Deep Learning</h3>
                            <p>55% current level</p>
                        </div>

                        <strong>MEDIUM</strong>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default SkillGap;