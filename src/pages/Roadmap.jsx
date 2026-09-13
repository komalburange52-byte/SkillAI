import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

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


    // ================= STATE =================

    const [roadmap, setRoadmap] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);
const [completedTopics, setCompletedTopics] = useState(() => {

    const savedProgress =
        localStorage.getItem(
            `skillai-roadmap-${selectedRole}`
        );

    return savedProgress
        ? JSON.parse(savedProgress)
        : {};

});
    // ================= PROGRESS TRACKING =================

const toggleTopic = (skillName, topic) => {

    const key = `${skillName}-${topic}`;

    setCompletedTopics((previous) => {

        const updatedProgress = {
            ...previous,
            [key]: !previous[key],
        };


        localStorage.setItem(
            `skillai-roadmap-${selectedRole}`,
            JSON.stringify(updatedProgress)
        );


        return updatedProgress;

    });

};


const isTopicCompleted = (skillName, topic) => {

    const key = `${skillName}-${topic}`;

    return completedTopics[key] || false;

};


const totalTopics = roadmap.reduce(
    (total, phase) => total + (phase.topics?.length || 0),
    0
);


const completedCount = Object.values(
    completedTopics
).filter(Boolean).length;


const overallProgress = totalTopics
    ? Math.round(
        (completedCount / totalTopics) * 100
    )
    : 0;


    // ================= ICON MAPPING =================

    const getSkillIcon = (skillName) => {

        if (
            skillName === "NLP" ||
            skillName === "Deep Learning" ||
            skillName === "Machine Learning" ||
            skillName === "TensorFlow"
        ) {
            return Brain;
        }

        if (skillName === "MLOps") {
            return Rocket;
        }

        if (
            skillName === "Python" ||
            skillName === "JavaScript" ||
            skillName === "React" ||
            skillName === "Node.js" ||
            skillName === "MongoDB" ||
            skillName === "Express.js" ||
            skillName === "SQL"
        ) {
            return Code2;
        }

        return Target;
    };


    // ================= GENERATE ROADMAP =================

    useEffect(() => {

        const generateRoadmap = async () => {

            try {

                setLoading(true);
                setError(null);


                const response = await fetch(
                    "http://127.0.0.1:8000/api/roadmap/generate",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json",
                        },

                        body: JSON.stringify({
                            role: selectedRole,
                            priority_skills: prioritySkills,
                        }),
                    }
                );


                if (!response.ok) {

                    throw new Error(
                        "Failed to generate roadmap"
                    );

                }


                const result =
                    await response.json();


                if (!result.success) {

                    throw new Error(
                        "Roadmap generation failed"
                    );

                }


                setRoadmap(
                    result.roadmap || []
                );

            } catch (err) {

                console.error(
                    "Roadmap error:",
                    err
                );

                setError(
                    "Unable to generate your roadmap. Make sure the SkillAI backend is running."
                );

            } finally {

                setLoading(false);

            }

        };


        generateRoadmap();

    }, [selectedRole, prioritySkills]);


    // ================= LOADING =================

    if (loading) {

        return (

            <div className="roadmap-page">

                <div className="roadmap-loading">

                    <Sparkles size={30} />

                    <h2>
                        Generating Your Roadmap...
                    </h2>

                    <p>
                        SkillAI is creating a personalized
                        learning path based on your skill gaps.
                    </p>

                </div>

            </div>

        );

    }


    // ================= ERROR =================

    if (error) {

        return (

            <div className="roadmap-page">

                <div className="roadmap-empty">

                    <Target size={30} />

                    <h3>
                        Roadmap Generation Failed
                    </h3>

                    <p>
                        {error}
                    </p>

                    <Link
                        to="/skill-gap"
                        className="roadmap-action"
                    >
                        Back to Skill Analysis
                    </Link>

                </div>

            </div>

        );

    }


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
                        A personalized learning path based on
                        your current skill gaps.
                    </p>

                </div>

            </div>


            {/* ================= SUMMARY ================= */}

            <div className="roadmap-summary">


                <div className="roadmap-summary-card">

                    <Target size={22} />

                    <div>

                        <span>
                            Focus Skills
                        </span>

                        <strong>
                            {roadmap.length}
                        </strong>

                    </div>

                </div>


                <div className="roadmap-summary-card">

                    <BookOpen size={22} />

                    <div>

                        <span>
                            Learning Path
                        </span>

                        <strong>
                            Personalized
                        </strong>

                    </div>

                </div>


                <div className="roadmap-summary-card">

                    <Rocket size={22} />

                    <div>

                        <span>
                            Career Goal
                        </span>

                        <strong>
                            {selectedRole}
                        </strong>

                    </div>

                </div>

            </div>
            {/* ================= OVERALL PROGRESS ================= */}

<div className="roadmap-progress-card">

    <div className="roadmap-progress-header">

        <div>

            <p className="welcome-tag">
                YOUR PROGRESS
            </p>

            <h2>
                Learning Progress
            </h2>

        </div>

        <strong>
            {overallProgress}%
        </strong>

    </div>


    <div className="overall-progress-bar">

        <div
            className="overall-progress-fill"
            style={{
                width: `${overallProgress}%`,
            }}
        />

    </div>


    <p className="progress-summary">

        {completedCount} of {totalTopics} learning topics completed

    </p>

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


                {roadmap.length === 0 ? (

                    <div className="roadmap-empty">

                        <CheckCircle size={28} />

                        <h3>
                            No roadmap available
                        </h3>

                        <p>
                            No priority skills were found.
                            Analyze your skills first.
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


                        {roadmap.map(
                            (phase, index) => {

                                const Icon =
                                    getSkillIcon(
                                        phase.skill
                                    );


                                const progress =
                                    Math.min(
                                        phase.current_level || 0,
                                        100
                                    );


                                return (

                                    <div
                                        className="roadmap-card"
                                        key={phase.skill}
                                    >


                                        {/* TIMELINE */}

                                        <div className="roadmap-number">

                                            <span>
                                                {phase.phase ||
                                                    index + 1}
                                            </span>


                                            {index <
                                                roadmap.length - 1 && (

                                                <div
                                                    className="timeline-line"
                                                />

                                            )}

                                        </div>


                                        {/* CONTENT */}

                                        <div className="roadmap-content">


                                            {/* TITLE */}

                                            <div className="roadmap-card-top">

                                                <div className="roadmap-skill-icon">

                                                    <Icon size={22} />

                                                </div>


                                                <div>

                                                    <p className="phase-label">
                                                        PHASE{" "}
                                                        {phase.phase ||
                                                            index + 1}
                                                    </p>

                                                    <h3>
                                                        {phase.skill}
                                                    </h3>

                                                </div>

                                            </div>


                                            {/* DESCRIPTION */}

                                            <p className="roadmap-description">

                                                {phase.description}

                                            </p>


                                            {/* PROGRESS */}

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
                                                            width:
                                                                `${progress}%`,
                                                        }}
                                                    />
                                                    

                                                </div>

                                            </div>
                                            


                                            {/* TOPICS */}

                                            <div className="roadmap-topics">

                                                <h4>
                                                    What you'll learn
                                                </h4>


                                                <div className="topic-list">

                                                   {phase.topics?.map(
    (topic) => {

        const completed =
            isTopicCompleted(
                phase.skill,
                topic
            );


        return (

            <div
                className={`topic-item ${
                    completed
                        ? "completed"
                        : ""
                }`}
                key={topic}
                onClick={() =>
                    toggleTopic(
                        phase.skill,
                        topic
                    )
                }
            >

                <div className="topic-checkbox">

                    {completed && (
                        <CheckCircle
                            size={15}
                        />
                    )}

                </div>


                <span>
                    {topic}
                </span>

            </div>

        );

    }
)}

                                                </div>

                                            </div>


                                            {/* DURATION */}

                                            <div className="roadmap-duration">

                                                <Clock size={16} />

                                                <span>
                                                    Estimated duration:
                                                </span>

                                                <strong>
                                                    {phase.duration}
                                                </strong>

                                            </div>


                                            {/* PRIORITY */}

                                            <div className="roadmap-priority">

                                                <span>
                                                    Priority:
                                                </span>

                                                <strong>
                                                    {phase.priority}
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


            {/* ================= FOOTER ================= */}

            {roadmap.length > 0 && (

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