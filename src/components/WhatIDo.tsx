import { useState } from "react";
import "./styles/WhatIDo.css";

interface ItemData {
  num: string;
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
}

const itemsData: ItemData[] = [
  {
    num: "01",
    title: "SOFTWARE DEVELOPMENT",
    subtitle: "Building with Code",
    description:
      "I enjoy writing code, understanding programming concepts, solving problems, and building practical software while strengthening my development fundamentals.",
    skills: ["C", "C++", "Python", "JavaScript", "TypeScript"],
  },
  {
    num: "02",
    title: "WEB DEVELOPMENT",
    subtitle: "Creating Modern Experiences",
    description:
      "Exploring modern web technologies to build responsive, interactive, and useful web applications.",
    skills: ["HTML", "CSS", "React", "Next.js", "Node.js"],
  },
  {
    num: "03",
    title: "AI & AUTOMATION",
    subtitle: "Exploring Intelligent Systems",
    description:
      "Exploring artificial intelligence, generative AI, AI agents, machine learning, and automation to understand how intelligent systems can solve real-world problems.",
    skills: [
      "Artificial Intelligence",
      "Generative AI",
      "AI Agents",
      "Machine Learning",
      "Automation",
    ],
  },
  {
    num: "04",
    title: "PROBLEM SOLVING",
    subtitle: "Turning Problems Into Solutions",
    description:
      "I enjoy breaking complex problems into smaller parts, thinking logically, experimenting with different approaches, and working toward practical solutions.",
    skills: [
      "DSA",
      "Algorithms",
      "Critical Thinking",
      "Debugging",
      "Analytical Thinking",
    ],
  },
  {
    num: "05",
    title: "BUILDING & EXPERIMENTATION",
    subtitle: "Ideas → Experiments → Learning",
    description:
      "I like exploring ideas, creating prototypes, testing concepts, and learning from what works and what does not.",
    skills: [
      "Rapid Prototyping",
      "Product Thinking",
      "Research",
      "Experimentation",
    ],
  },
  {
    num: "06",
    title: "TEAM & COMMUNITY",
    subtitle: "Learning With People",
    description:
      "I enjoy collaborating with others, contributing to communities, sharing ideas, taking responsibility, and learning through teamwork.",
    skills: [
      "Collaboration",
      "Communication",
      "Leadership",
      "Community",
      "Presentation",
    ],
  },
];

const WhatIDo = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handlePointerEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handlePointerLeaveSection = () => {
    setActiveIndex(null);
  };

  const handleClickItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div
      className="whatIDO"
      id="whatido"
      onPointerLeave={handlePointerLeaveSection}
    >
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> EXPLORE</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%" height="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>

          {itemsData.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={item.num}
                className={`what-content-item ${isActive ? "active" : ""}`}
                onPointerEnter={() => handlePointerEnter(index)}
                onClick={() => handleClickItem(index)}
              >
                <div className="what-border1">
                  <svg width="100%" height="100%">
                    <line
                      x1="0"
                      y1="0"
                      x2="100%"
                      y2="0"
                      stroke="white"
                      strokeWidth="2"
                      strokeDasharray="6,6"
                    />
                    <line
                      x1="0"
                      y1="100%"
                      x2="100%"
                      y2="100%"
                      stroke="white"
                      strokeWidth="2"
                      strokeDasharray="6,6"
                    />
                  </svg>
                </div>
                <div className="what-corner"></div>

                {/* Compact Item Header */}
                <div className="what-item-header">
                  <span className="what-num">{item.num}</span>
                  <h3 className="what-title">{item.title}</h3>
                  <div className={`what-arrow ${isActive ? "arrow-active" : ""}`}></div>
                </div>

                {/* Expandable Content Area */}
                <div className="what-expandable-wrapper">
                  <div className="what-expandable-content">
                    <h4 className="what-subtitle">{item.subtitle}</h4>
                    <p className="what-desc">{item.description}</p>
                    <h5 className="what-skills-label">Skills / Technologies</h5>
                    <div className="what-content-flex">
                      {item.skills.map((skill) => (
                        <div className="what-tags" key={skill}>
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;
