import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="experience">
      <div className="career-container">
        <h2>
          MY JOURNEY <span>&</span>
          <br /> EXPERIENCE
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Co-Lead</h4>
                <h5>D4 COMMUNITY</h5>
              </div>
              <h3>NOV 2025–PRESENT</h3>
            </div>
            <p>
              Contributing as a Co-Lead of the D4 Community, helping coordinate
              community activities, collaborate with members, support initiatives,
              and contribute to a collaborative learning environment.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Volunteer</h4>
                <h5>PENTOMNIA CLUB</h5>
              </div>
              <h3>PRESENT</h3>
            </div>
            <p>
              Volunteering with Pentomnia Club, contributing to club activities,
              teamwork, coordination, and community initiatives.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Engineering Student</h4>
                <h5>LOVELY PROFESSIONAL UNIVERSITY</h5>
              </div>
              <h3>CURRENT</h3>
            </div>
            <p>
              Pursuing engineering while building a strong foundation in
              programming, software development, problem solving, emerging
              technologies, and practical learning.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Learning &amp; Building</h4>
                <h5>PERSONAL DEVELOPMENT</h5>
              </div>
              <h3>PRESENT</h3>
            </div>
            <p>
              Continuously learning new technologies, experimenting with ideas,
              improving technical skills, and preparing to build meaningful
              real-world projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
