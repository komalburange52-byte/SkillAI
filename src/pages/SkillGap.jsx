import { Link } from "react-router-dom";
import { useState } from "react";

import {
    ArrowLeft,
    BarChart3,
    Target,
    Brain,
    Sparkles,
    TrendingUp,
} from "lucide-react";


function SkillGap() {

    // ================= ROLE =================

    const [selectedRole, setSelectedRole] = useState("AI Engineer");

    // Stores the role that was actually analyzed
    const [analyzedRole, setAnalyzedRole] = useState(null);


    // ================= USER SKILLS =================

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


    // ================= ANALYZED DATA =================

    const [analyzedSkills, setAnalyzedSkills] = useState(null);


    // ================= BACKEND STATE =================

    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);


    // ================= CAREER SKILLS =================

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


    // ================= FRONTEND ANALYSIS =================

    /*
        IMPORTANT:

        This uses analyzedSkills instead of userSkills.

        Therefore moving the slider does NOT immediately
        change the analysis.

        The values only change after clicking
        "Analyze My Skills".
    */

    const skills = analyzedSkills && analyzedRole
        ? careerSkills[analyzedRole].map((skill) => {

            const current = analyzedSkills[skill.name] || 0;

            const gap = Math.max(
                skill.required - current,
                0
            );


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

        })

        : [];


    // ================= FRONTEND SCORE =================

    const skillMatch = skills.length

        ? Math.round(

            skills.reduce((total, skill) => {

                const percentage = Math.min(

                    (skill.current / skill.required) * 100,

                    100

                );


                return total + percentage;

            }, 0) / skills.length

        )

        : 0;


    const matchedSkills = skills.filter(

        (skill) =>
            skill.current >= skill.required * 0.8

    ).length;


    const skillGaps = skills.filter(

        (skill) =>
            skill.current < skill.required

    ).length;


    // ================= PRIORITY SKILLS =================

    const prioritySkills =

        analysis?.priority_skills ||

        [...skills]

            .filter((skill) => skill.gap > 0)

            .sort((a, b) => b.gap - a.gap)

            .slice(0, 3);


    // ================= BACKEND API =================

    const analyzeSkills = async () => {

        try {

            setLoading(true);


            const response = await fetch(

                "http://127.0.0.1:8000/api/skill-gap/analyze",

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json",

                    },

                    body: JSON.stringify({

                        role: selectedRole,

                        skills: userSkills,

                    }),

                }

            );


            if (!response.ok) {

                throw new Error(
                    "Failed to analyze skills"
                );

            }


            const result = await response.json();


            // Save the slider values that were analyzed
            setAnalyzedSkills({
                ...userSkills
            });


            // Save the role that was analyzed
            setAnalyzedRole(selectedRole);


            // Save backend result
            setAnalysis(result);


        } catch (error) {

            console.error(
                "Skill analysis error:",
                error
            );


            alert(
                "Unable to connect to SkillAI backend. Make sure FastAPI is running."
            );


        } finally {

            setLoading(false);

        }

    };


    // ================= DISPLAY VALUES =================

    const displaySkillMatch =

        analysis?.skill_match ??
        skillMatch;


    const displayMatchedSkills =

        analysis?.matched_skills ??
        matchedSkills;


    const displaySkillGaps =

        analysis?.skill_gaps ??
        skillGaps;


    // ================= PAGE =================

    return (

        <div className="skill-gap-page">


            {/* ================= HEADER ================= */}

            <div className="skill-gap-header">

                <div>

                    <p className="welcome-tag">

                        AI COMPETENCY ANALYSIS

                    </p>


                    <h1>

                        <Target size={32} />

                        Skill Gap Analysis

                    </h1>


                    <p>

                        Discover the skills you need to reach your target career.

                    </p>

                </div>


                <Link

                    to="/"

                    className="back-button"

                >

                    <ArrowLeft size={18} />

                    Dashboard

                </Link>

            </div>



            {/* ================= ROLE SELECTION ================= */}

            <div className="role-card">


                <div className="role-icon">

                    <Brain size={26} />

                </div>


                <div className="role-content">

                    <p>

                        YOUR TARGET CAREER

                    </p>


                    <h2>

                        {selectedRole}

                    </h2>


                    <span>

                        Skills are compared against industry requirements.

                    </span>

                </div>


                <select

                    value={selectedRole}

                    onChange={(e) => {

                        const newRole = e.target.value;


                        setSelectedRole(newRole);


                        // Reset previous analysis
                        setAnalysis(null);

                        setAnalyzedSkills(null);

                        setAnalyzedRole(null);

                    }}

                >

                    <option>

                        AI Engineer

                    </option>


                    <option>

                        Data Scientist

                    </option>


                    <option>

                        Machine Learning Engineer

                    </option>


                    <option>

                        MERN Developer

                    </option>

                </select>

            </div>



            {/* ================= MY CURRENT SKILLS ================= */}

            <div className="my-skills-card">


                <div className="card-header">

                    <div>

                        <p className="welcome-tag">

                            YOUR PROFILE

                        </p>


                        <h2>

                            My Current Skills

                        </h2>

                    </div>


                    <div className="my-skills-icon">

                        <Target size={22} />

                    </div>

                </div>



                <p className="skills-description">

                    Adjust your current skill level and click
                    "Analyze My Skills" to update your competency analysis.

                </p>



                <div className="my-skills-grid">


                    {careerSkills[selectedRole].map(

                        (skill) => (

                            <div

                                className="my-skill-item"

                                key={skill.name}

                            >


                                <div className="my-skill-header">

                                    <span>

                                        {skill.name}

                                    </span>


                                    <strong>

                                        {userSkills[skill.name] || 0}%

                                    </strong>

                                </div>



                                <input

                                    type="range"

                                    min="0"

                                    max="100"

                                    value={
                                        userSkills[skill.name] || 0
                                    }

                                    onChange={(e) => {

                                        setUserSkills({

                                            ...userSkills,

                                            [skill.name]:
                                                Number(
                                                    e.target.value
                                                ),

                                        });


                                        /*
                                            IMPORTANT:

                                            Do NOT update analysis here.

                                            The analysis will update only
                                            after clicking the button.
                                        */

                                    }}

                                />



                                <div className="range-labels">

                                    <span>

                                        Beginner

                                    </span>


                                    <span>

                                        Expert

                                    </span>

                                </div>

                            </div>

                        )

                    )}

                </div>



                {/* ================= ANALYZE BUTTON ================= */}

                <div className="analyze-button-wrapper">


                    <button

                        onClick={analyzeSkills}

                        disabled={loading}

                    >

                        {loading

                            ? "Analyzing..."

                            : "Analyze My Skills"

                        }

                    </button>

                </div>


            </div>



            {/* ================= SCORE SECTION ================= */}

            <div className="gap-overview">


                <div className="score-card">


                    <div className="score-circle">

                        <span>

                            {analyzedSkills
                                ? `${displaySkillMatch}%`
                                : "--"
                            }

                        </span>

                    </div>


                    <div>


                        <p>

                            OVERALL SKILL MATCH

                        </p>


                        <h2>

                            {!analyzedSkills

                                ? "Not Analyzed"

                                : displaySkillMatch >= 80

                                    ? "Excellent Progress"

                                    : displaySkillMatch >= 60

                                        ? "Good Progress"

                                        : "Needs Improvement"

                            }

                        </h2>


                        <span>

                            {!analyzedSkills

                                ? "Adjust your skills above and click Analyze My Skills."

                                : analysis?.recommendation ||

                                "Your competency analysis has been updated."

                            }

                        </span>

                    </div>

                </div>



                <div className="overview-stat">

                    <TrendingUp size={24} />

                    <div>

                        <p>

                            Skills Matched

                        </p>


                        <h2>

                            {analyzedSkills

                                ? `${displayMatchedSkills} / ${skills.length}`

                                : "--"

                            }

                        </h2>

                    </div>

                </div>



                <div className="overview-stat warning">

                    <BarChart3 size={24} />

                    <div>

                        <p>

                            Skill Gaps

                        </p>


                        <h2>

                            {analyzedSkills

                                ? displaySkillGaps

                                : "--"

                            }

                        </h2>

                    </div>

                </div>

            </div>



            {/* ================= SKILL COMPARISON ================= */}

            <div className="analysis-card">


                <div className="card-header">

                    <div>

                        <p className="welcome-tag">

                            DETAILED ANALYSIS

                        </p>


                        <h2>

                            Required Skills vs Your Skills

                        </h2>

                    </div>


                    <Sparkles size={22} />

                </div>



                <div className="skill-list">


                    {!analyzedSkills ? (

                        <div className="empty-analysis">

                            <p>

                                Adjust your skills above and click
                                "Analyze My Skills" to see your detailed analysis.

                            </p>

                        </div>

                    ) : (

                        (analysis?.skills || skills).map(

                            (skill) => (

                                <div

                                    className="analysis-skill"

                                    key={skill.name}

                                >


                                    <div className="analysis-skill-header">


                                        <div>

                                            <h3>

                                                {skill.name}

                                            </h3>


                                            <span

                                                className={`status ${(

                                                    skill.priority ||

                                                    skill.status

                                                )

                                                    .toLowerCase()

                                                    .replaceAll(

                                                        " ",

                                                        "-"

                                                    )

                                                }`}

                                            >

                                                {

                                                    skill.priority ||

                                                    skill.status

                                                }

                                            </span>

                                        </div>


                                        <strong>

                                            {skill.current}%


                                            <small>

                                                {" / "}

                                                {skill.required}%

                                            </small>

                                        </strong>

                                    </div>



                                    <div className="comparison-bar">

                                        <div

                                            className="current-level"

                                            style={{

                                                width:

                                                    `${skill.current}%`,

                                            }}

                                        />

                                    </div>



                                    <div className="skill-labels">

                                        <span>

                                            Your Level:{" "}

                                            {skill.current}%

                                        </span>


                                        <span>

                                            Required:{" "}

                                            {skill.required}%

                                        </span>

                                    </div>

                                </div>

                            )

                        )

                    )}

                </div>

            </div>



            {/* ================= AI RECOMMENDATION ================= */}

            <div className="ai-insight">


                <div className="ai-insight-icon">

                    <Sparkles size={28} />

                </div>


                <div>

                    <p>

                        AI RECOMMENDATION

                    </p>


                    <h2>

                        {!analyzedSkills

                            ? "Analyze your skills first"

                            : prioritySkills.length > 0

                                ? `Your biggest opportunity is ${prioritySkills[0].name}`

                                : "Your skills are looking strong"

                        }

                    </h2>


                    <span>

                        {!analyzedSkills

                            ? "Click Analyze My Skills to receive a personalized recommendation."

                            : analysis?.recommendation ||

                            (

                                prioritySkills.length > 0

                                    ? `Improving ${prioritySkills

                                        .map(

                                            (skill) =>
                                                skill.name

                                        )

                                        .join(", ")} can increase your ${selectedRole} skill match.`

                                    : "Keep developing your skills to maintain your career readiness."

                            )

                        }

                    </span>

                </div>



                <Link

                    to="/roadmap"

                    state={{

                        selectedRole,

                        prioritySkills,

                    }}

                    className="roadmap-button"

                >

                    Generate Roadmap

                </Link>

            </div>



           {/* ================= PRIORITY SKILLS ================= */}

<div className="priority-section">

    <div className="section-header">

        <div>

            <p className="welcome-tag">
                AI PRIORITIZATION
            </p>

            <h2>
                Skills to Focus On
            </h2>

        </div>

    </div>


    <div className="priority-grid">

        {!analyzedSkills ? (

            <div className="priority-empty">

                <Target size={24} />

                <p>
                    Analyze your skills to see personalized
                    priority recommendations.
                </p>

            </div>

        ) : prioritySkills.length === 0 ? (

            <div className="priority-empty">

                <TrendingUp size={24} />

                <p>
                    Great job! No major skill gaps found.
                </p>

            </div>

        ) : (

            prioritySkills.map((skill, index) => {

                const priority =
                    skill.priority ||
                    skill.status ||
                    (
                        skill.gap >= 30
                            ? "High Priority"
                            : "Needs Improvement"
                    );


                let priorityLabel = "MEDIUM";

                let cardClass = "medium";


                if (priority === "High Priority") {

                    priorityLabel = "HIGH";

                    cardClass = "high";

                } else if (priority === "Good") {

                    priorityLabel = "GOOD";

                    cardClass = "good";

                }


                return (

                    <div
                        className={`priority-card ${cardClass}`}
                        key={skill.name}
                    >

                        <div className="priority-icon">

                            {index === 0 ? (

                                <Target size={22} />

                            ) : index === 1 ? (

                                <BarChart3 size={22} />

                            ) : (

                                <Brain size={22} />

                            )}

                        </div>


                        <div className="priority-content">

                            <h3>
                                {skill.name}
                            </h3>

                            <p>
                                {skill.current}% current level
                            </p>

                            <small>
                                {skill.gap}% skill gap
                            </small>

                        </div>


                        <strong>
                            {priorityLabel}
                        </strong>

                    </div>

                );

            })

        )}

    </div>

</div>


                <div className="section-header">

                    <div>

                        <p className="welcome-tag">

                            AI PRIORITIZATION

                        </p>


                        <h2>

                            Skills to Focus On

                        </h2>

                    </div>

                </div>



                <div className="priority-grid">


                    {!analyzedSkills ? (

                        <p>

                            Analyze your skills to see priority recommendations.

                        </p>

                    ) : prioritySkills.length === 0 ? (

                        <p>

                            No major skill gaps found.

                        </p>

                    ) : (

                        prioritySkills.map(

                            (skill, index) => {


                                const priority =

                                    skill.priority ||

                                    skill.status ||

                                    (

                                        skill.gap >= 30

                                            ? "High Priority"

                                            : "Needs Improvement"

                                    );



                                const cardClass =

                                    priority === "High Priority"

                                        ? "high"

                                        : "medium";



                                return (

                                    <div

                                        className={`priority-card ${cardClass}`}

                                        key={skill.name}

                                    >


                                        <div className="priority-icon">

                                            {index === 0 ? (

                                                <Target size={22} />

                                            ) : index === 1 ? (

                                                <BarChart3 size={22} />

                                            ) : (

                                                <Brain size={22} />

                                            )}

                                        </div>



                                        <div>

                                            <h3>

                                                {skill.name}

                                            </h3>


                                            <p>

                                                {skill.current}%

                                                {" "}current level

                                            </p>

                                        </div>



                                        <strong>

                                            {priority === "High Priority"

                                                ? "HIGH"

                                                : priority === "Needs Improvement"

                                                    ? "MEDIUM"

                                                    : "GOOD"

                                            }

                                        </strong>

                                    </div>

                                );

                            }

                        )

                    )}

                </div>

            </div>


        

    );

}


export default SkillGap;