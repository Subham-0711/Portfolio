import { useState } from "react";
import "./styles/Achievements.css";
import { MdArrowOutward } from "react-icons/md";

export interface AchievementItem {
  id: string;
  title: string;
  type: string;
  organization: string;
  date: string;
  description: string;
  image?: string;
  credentialUrl?: string;
  credentialId?: string;
}

// Central achievements data structure (Ready for user to populate certificates/badges)
export const achievementsData: AchievementItem[] = [];

const categories = [
  "ALL",
  "CERTIFICATES",
  "BADGES",
  "HACKATHONS",
  "COMPETITIONS",
  "ACADEMIC",
  "COMMUNITY",
  "OTHER",
];

const Achievements = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filteredAchievements = achievementsData.filter((item) => {
    if (activeCategory === "ALL") return true;
    return item.type.toUpperCase() === activeCategory;
  });

  return (
    <div className="achievements-section section-container" id="achievements">
      <div className="achievements-container">
        <h2>
          MY <span>ACHIEVEMENTS</span>
        </h2>

        {/* Filter Bar */}
        <div className="achievements-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Content Grid or Empty State */}
        {filteredAchievements.length > 0 ? (
          <div className="achievements-grid">
            {filteredAchievements.map((item, index) => (
              <div key={item.id || index} className="achievement-card">
                <div className="card-top">
                  <span className="card-num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="card-type">{item.type}</span>
                </div>
                <h3 className="card-title">{item.title}</h3>
                <div className="card-org">{item.organization}</div>
                <div className="card-date">{item.date}</div>
                <p className="card-desc">{item.description}</p>
                {item.credentialUrl && (
                  <a
                    href={item.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="card-link"
                  >
                    VIEW CREDENTIAL <MdArrowOutward />
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="achievements-empty-card">
            <div className="achievements-empty-badge">00 MILESTONES</div>
            <h3 className="achievements-empty-title">
              Every milestone starts with learning.
            </h3>
            <p className="achievements-empty-text">
              "Certificates, badges, and achievements will appear here as the
              journey continues."
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Achievements;
