import "./styles/Work.css";

const Work = () => {
  return (
    <div className="work-section section-container" id="work">
      <div className="work-container">
        <h2>
          MY <span>WORK</span>
        </h2>
        <div className="work-empty-card">
          <div className="work-empty-badge">00 PROJECTS</div>
          <h3 className="work-empty-title">Nothing to showcase yet.</h3>
          <p className="work-empty-text">
            "I'm currently learning, experimenting, and building toward projects
            that deserve a place here."
          </p>
          <div className="work-empty-flow">
            <span>LEARNING</span> ➔ <span>BUILDING</span> ➔ <span>SHIPPING</span>
          </div>
          <p className="work-empty-subtext">
            Projects will appear here as the journey continues.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Work;
