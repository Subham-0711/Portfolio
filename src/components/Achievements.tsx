import { useState } from "react";
import { createPortal } from "react-dom";
import "./styles/Achievements.css";
import { MdArrowOutward, MdClose } from "react-icons/md";

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

// Central achievements data structure (Populated with REAL certificate images)
export const achievementsData: AchievementItem[] = [
  {
    id: "dsa-board-infinity",
    title: "Data Structures & Algorithms Course",
    type: "CERTIFICATES",
    organization: "Board Infinity",
    date: "04-02-2026",
    description:
      "Successfully completed the Data Structures & Algorithms Course issued by Board Infinity.",
    image: "/images/certificates/dsa.jpg",
    credentialId: "CERT-20260204-1615872",
  },
  {
    id: "angular-genai-d4",
    title: "Beyond the Browser: Angular Meets Generative AI",
    type: "CERTIFICATES",
    organization: "D4 Community",
    date: "10-01-2026",
    description:
      "Certificate of Participation for attending 'Beyond the Browser: Angular Meets Generative AI' technical session organized by D4 Community.",
    image: "/images/certificates/angular.jpg",
    credentialId: "D4IVE-3-202626046999",
  },
  {
    id: "ai-bootcamp-blockseblock",
    title: "Hands-on Bootcamp on Artificial Intelligence",
    type: "CERTIFICATES",
    organization: "BlockseBlock x OpenxAI",
    date: "28-08-2025",
    description:
      "Awarded for the successful completion of the Hands-on Bootcamp on Artificial Intelligence, demonstrating applied learning and professional excellence.",
    image: "/images/certificates/ai.jpg",
  },
  {
    id: "cdp-times-foundation",
    title: "Community Development Project",
    type: "CERTIFICATES",
    organization: "Times Foundation & LPU",
    date: "2025",
    description:
      "Successfully completed the Community Development Project organized by Times Foundation in collaboration with Lovely Professional University.",
    image: "/images/certificates/cdp.png",
    credentialUrl:
      "https://verification.givemycertificate.com/v/ba1ff7cc-4104-4569-a050-c72d31f9d8d5",
  },
];

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
  const [selectedAchievement, setSelectedAchievement] =
    useState<AchievementItem | null>(null);

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
              <div
                key={item.id || index}
                className="achievement-card clickable-card"
                onClick={() => setSelectedAchievement(item)}
                title="Click to open certificate"
              >
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
                {item.credentialId && (
                  <div className="card-cred-id">
                    Credential ID: {item.credentialId}
                  </div>
                )}
                <div className="card-action-bar">
                  <span className="view-cert-badge">
                    VIEW CERTIFICATE <MdArrowOutward />
                  </span>
                </div>
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

      {/* Certificate Modal Lightbox (Rendered into document.body to bypass GSAP ScrollSmoother transform context) */}
      {selectedAchievement &&
        createPortal(
          <div
            className="certificate-modal-overlay"
            onClick={() => setSelectedAchievement(null)}
          >
            <div
              className="certificate-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="certificate-image-wrapper">
                {selectedAchievement.image ? (
                  <img
                    src={selectedAchievement.image}
                    alt={selectedAchievement.title}
                    className="certificate-img"
                  />
                ) : (
                  <div className="certificate-fallback-card">
                    <h3>{selectedAchievement.title}</h3>
                    <h4>{selectedAchievement.organization}</h4>
                    <p>{selectedAchievement.description}</p>
                  </div>
                )}

                {/* Small cross mark on the right bottom of the certificate to get back */}
                <button
                  className="certificate-close-btn-bottom-right"
                  onClick={() => setSelectedAchievement(null)}
                  title="Close Certificate"
                  aria-label="Close Certificate"
                >
                  <MdClose />
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Achievements;
