import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              K SUBHAM
              <br />
              <span>KUMAR PATRA</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3 className="landing-label">Student &</h3>
            <h1 className="landing-learner">LEARNER</h1>
            <p className="landing-tagline">
              Developer • Problem Solver • Builder
            </p>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
