import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <h2 className="about-headline">
          I DON'T JUST LEARN TECHNOLOGY. <br />
          <span className="gradient-text">I BUILD WITH IT.</span>
        </h2>
        <div className="about-text">
          <p>
            I’m <strong>K. SUBHAM KUMAR PATRA</strong>, an engineering student at{" "}
            <span className="university-highlight">
              Lovely Professional University (LPU)
            </span>{" "}
            with a strong interest in software development, artificial
            intelligence, problem solving, and building technology-driven
            solutions.
          </p>
          <p>
            I enjoy learning how technology works and applying that knowledge to
            create practical projects, experiment with new ideas, and solve
            real-world problems.
          </p>
          <div className="mindset-strip">
            <span className="mindset-label">MY MINDSET:</span>
            <div className="mindset-flow">
              <span>LEARN</span> ➔ <span>EXPLORE</span> ➔ <span>BUILD</span> ➔{" "}
              <span>IMPROVE</span>
            </div>
          </div>
          <div className="identity-tags">
            <span className="id-tag">Engineering Student</span>
            <span className="id-tag">Learner</span>
            <span className="id-tag">Developer</span>
            <span className="id-tag">Problem Solver</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
