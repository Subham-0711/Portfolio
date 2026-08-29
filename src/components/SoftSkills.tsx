import { useState, useRef, useEffect } from "react";
import "./styles/SoftSkills.css";

export interface SoftSkill {
  id: string;
  name: string;
  category: "THINK" | "COMMUNICATE" | "LEAD" | "CREATE" | "GROW" | "BUILD";
  description: string;
  x: number; // base position %
  y: number; // base position %
  connectedTo: string[];
}

const softSkillsList: SoftSkill[] = [
  {
    id: "problem-solving",
    name: "Problem Solving",
    category: "THINK",
    description: "Breaking complex problems into practical and manageable solutions.",
    x: 35,
    y: 28,
    connectedTo: ["subham", "critical-thinking", "decision-making"],
  },
  {
    id: "critical-thinking",
    name: "Critical Thinking",
    category: "THINK",
    description: "Analyzing situations carefully, questioning assumptions, and making logical decisions.",
    x: 20,
    y: 38,
    connectedTo: ["problem-solving", "analytical-thinking"],
  },
  {
    id: "analytical-thinking",
    name: "Analytical Thinking",
    category: "THINK",
    description: "Evaluating data and patterns to draw sound technical conclusions.",
    x: 18,
    y: 58,
    connectedTo: ["critical-thinking", "subham"],
  },
  {
    id: "decision-making",
    name: "Decision Making",
    category: "THINK",
    description: "Making timely, effective choices based on evidence and logic.",
    x: 32,
    y: 70,
    connectedTo: ["problem-solving", "subham"],
  },
  {
    id: "communication",
    name: "Communication",
    category: "COMMUNICATE",
    description: "Expressing ideas clearly and communicating effectively with teammates.",
    x: 65,
    y: 28,
    connectedTo: ["subham", "presentation", "teamwork"],
  },
  {
    id: "presentation",
    name: "Presentation Skills",
    category: "COMMUNICATE",
    description: "Articulating technical concepts effectively to diverse audiences.",
    x: 80,
    y: 36,
    connectedTo: ["communication"],
  },
  {
    id: "team-collaboration",
    name: "Team Collaboration",
    category: "COMMUNICATE",
    description: "Working seamlessly across teams to achieve shared objectives.",
    x: 75,
    y: 52,
    connectedTo: ["communication", "teamwork"],
  },
  {
    id: "leadership",
    name: "Leadership",
    category: "LEAD",
    description: "Taking responsibility, coordinating with others, and guiding teams toward a common goal.",
    x: 50,
    y: 22,
    connectedTo: ["subham", "coordination", "responsibility"],
  },
  {
    id: "coordination",
    name: "Coordination",
    category: "LEAD",
    description: "Aligning team efforts and resources for smooth project execution.",
    x: 48,
    y: 10,
    connectedTo: ["leadership"],
  },
  {
    id: "teamwork",
    name: "Teamwork",
    category: "LEAD",
    description: "Supporting team members and building collaborative environments.",
    x: 68,
    y: 68,
    connectedTo: ["leadership", "subham"],
  },
  {
    id: "creativity",
    name: "Creativity",
    category: "CREATE",
    description: "Approaching challenges with fresh perspectives and innovative ideas.",
    x: 30,
    y: 48,
    connectedTo: ["subham", "experimentation"],
  },
  {
    id: "experimentation",
    name: "Experimentation",
    category: "CREATE",
    description: "Testing new tools, concepts, and prototypes to discover what works best.",
    x: 28,
    y: 84,
    connectedTo: ["creativity", "product-thinking"],
  },
  {
    id: "product-thinking",
    name: "Product Thinking",
    category: "CREATE",
    description: "Focusing on user value and building solutions that matter.",
    x: 46,
    y: 86,
    connectedTo: ["subham", "experimentation"],
  },
  {
    id: "continuous-learning",
    name: "Continuous Learning",
    category: "GROW",
    description: "Continuously improving knowledge by exploring new tools and concepts.",
    x: 50,
    y: 76,
    connectedTo: ["subham", "adaptability"],
  },
  {
    id: "adaptability",
    name: "Adaptability",
    category: "GROW",
    description: "Learning quickly and adjusting to new technologies and requirements.",
    x: 64,
    y: 84,
    connectedTo: ["continuous-learning"],
  },
  {
    id: "discipline",
    name: "Discipline & Time",
    category: "GROW",
    description: "Managing time efficiently and maintaining consistent progress.",
    x: 82,
    y: 68,
    connectedTo: ["subham", "adaptability"],
  },
];

const SoftSkills = () => {
  const [activeSkill, setActiveSkill] = useState<SoftSkill | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodePositions, setNodePositions] = useState<{ [key: string]: { x: number; y: number } }>({});

  useEffect(() => {
    // Initial node positions %
    const initialPos: { [key: string]: { x: number; y: number } } = {
      subham: { x: 50, y: 50 },
    };
    softSkillsList.forEach((skill) => {
      initialPos[skill.id] = { x: skill.x, y: skill.y };
    });
    setNodePositions(initialPos);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
    const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

    const newPos: { [key: string]: { x: number; y: number } } = {
      subham: { x: 50, y: 50 },
    };

    softSkillsList.forEach((skill) => {
      const dx = skill.x - mouseX;
      const dy = skill.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 22) {
        const force = (22 - dist) * 0.35;
        const angle = Math.atan2(dy, dx);
        newPos[skill.id] = {
          x: skill.x + Math.cos(angle) * force,
          y: skill.y + Math.sin(angle) * force,
        };
      } else {
        newPos[skill.id] = { x: skill.x, y: skill.y };
      }
    });

    setNodePositions(newPos);
  };

  const handlePointerLeave = () => {
    // Spring back to original positions
    const originalPos: { [key: string]: { x: number; y: number } } = {
      subham: { x: 50, y: 50 },
    };
    softSkillsList.forEach((skill) => {
      originalPos[skill.id] = { x: skill.x, y: skill.y };
    });
    setNodePositions(originalPos);
    setActiveSkill(null);
  };

  return (
    <div className="softskills-section section-container" id="softskills">
      <div className="softskills-container">
        <h2>
          HOW I <span>WORK</span>
        </h2>
        <p className="softskills-subtitle">
          "Technical skills help me build. Soft skills shape how I build."
        </p>

        <div
          className="constellation-area"
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          {/* SVG Connecting Lines */}
          <svg className="constellation-lines" ref={svgRef}>
            {softSkillsList.map((skill) => {
              const start = nodePositions[skill.id] || { x: skill.x, y: skill.y };
              return skill.connectedTo.map((targetId) => {
                const targetSkill = softSkillsList.find((s) => s.id === targetId);
                const target =
                  targetId === "subham"
                    ? nodePositions["subham"] || { x: 50, y: 50 }
                    : nodePositions[targetId] ||
                      (targetSkill ? { x: targetSkill.x, y: targetSkill.y } : null);

                if (!target) return null;

                const isHighlighted =
                  activeSkill &&
                  (activeSkill.id === skill.id ||
                    activeSkill.id === targetId ||
                    activeSkill.connectedTo.includes(skill.id));

                return (
                  <line
                    key={`${skill.id}-${targetId}`}
                    x1={`${start.x}%`}
                    y1={`${start.y}%`}
                    x2={`${target.x}%`}
                    y2={`${target.y}%`}
                    className={`constellation-line ${
                      isHighlighted ? "active-line" : ""
                    }`}
                  />
                );
              });
            })}
          </svg>

          {/* Central SUBHAM Node */}
          <div
            className="constellation-node central-node"
            style={{
              left: `${nodePositions["subham"]?.x || 50}%`,
              top: `${nodePositions["subham"]?.y || 50}%`,
            }}
          >
            <span>SUBHAM</span>
            <div className="node-glow"></div>
          </div>

          {/* Skill Nodes */}
          {softSkillsList.map((skill) => {
            const pos = nodePositions[skill.id] || { x: skill.x, y: skill.y };
            const isHovered = activeSkill?.id === skill.id;
            const isConnected =
              activeSkill && activeSkill.connectedTo.includes(skill.id);

            return (
              <div
                key={skill.id}
                className={`constellation-node skill-node category-${skill.category.toLowerCase()} ${
                  isHovered ? "hovered" : ""
                } ${isConnected ? "connected" : ""}`}
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                }}
                onPointerEnter={() => setActiveSkill(skill)}
              >
                <span className="node-text">{skill.name}</span>
                <span className="node-dot"></span>
              </div>
            );
          })}

          {/* Hover Skill Description Card */}
          {activeSkill && (
            <div className="skill-detail-card">
              <div className="card-cat">{activeSkill.category}</div>
              <h4>{activeSkill.name}</h4>
              <p>"{activeSkill.description}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SoftSkills;
