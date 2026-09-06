import { MdEmail, MdPhone, MdArrowOutward, MdCopyright } from "react-icons/md";
import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import "./styles/Contact.css";

const Contact = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3 className="contact-heading">LET'S CONNECT</h3>
        <p className="contact-subtext">
          "I'm always open to learning, collaborating, discussing ideas, and
          exploring interesting opportunities."
        </p>

        <div className="contact-flex">
          {/* LEFT: DIRECT CONTACT */}
          <div className="contact-box contact-left">
            <h4 className="contact-box-title">DIRECT CONTACT</h4>
            
            <div className="contact-item">
              <span className="contact-icon"><MdEmail /></span>
              <div className="contact-item-info">
                <span className="contact-item-label">Personal Email</span>
                <a
                  href="mailto:ksubhamkumarpatra2007@gmail.com"
                  className="contact-link"
                  data-cursor="disable"
                >
                  ksubhamkumarpatra2007@gmail.com
                </a>
              </div>
            </div>

            <div className="contact-item">
              <span className="contact-icon"><MdEmail /></span>
              <div className="contact-item-info">
                <span className="contact-item-label">Student Email</span>
                <a
                  href="mailto:subham.kumar20254@lpu.in"
                  className="contact-link"
                  data-cursor="disable"
                >
                  subham.kumar20254@lpu.in
                </a>
              </div>
            </div>

            <div className="contact-item">
              <span className="contact-icon"><MdPhone /></span>
              <div className="contact-item-info">
                <span className="contact-item-label">Phone</span>
                <a href="tel:+918302244874" className="contact-link" data-cursor="disable">
                  +91-8302244874
                </a>
                <span className="contact-divider">/</span>
                <a href="tel:+919692282094" className="contact-link" data-cursor="disable">
                  +91-9692282094
                </a>
              </div>
            </div>
          </div>

          {/* CENTER: SOCIAL LINKS */}
          <div className="contact-box contact-center">
            <h4 className="contact-box-title">SOCIAL LINKS</h4>
            <div className="contact-social-list">
              <a
                href="https://github.com/Subham-0711"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
                className="contact-social-btn"
              >
                <span className="social-btn-brand">
                  <FaGithub className="social-icon" /> GitHub
                </span>
                <MdArrowOutward className="social-arrow" />
              </a>

              <a
                href="https://www.linkedin.com/in/k-subham-07-kumar-patra"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
                className="contact-social-btn"
              >
                <span className="social-btn-brand">
                  <FaLinkedinIn className="social-icon" /> LinkedIn
                </span>
                <MdArrowOutward className="social-arrow" />
              </a>

              <a
                href="https://www.instagram.com/its._subham._07/"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
                className="contact-social-btn"
              >
                <span className="social-btn-brand">
                  <FaInstagram className="social-icon" /> Instagram
                </span>
                <MdArrowOutward className="social-arrow" />
              </a>
            </div>
          </div>

          {/* RIGHT: ABOUT ME */}
          <div className="contact-box contact-right">
            <h4 className="contact-box-title">ABOUT ME</h4>
            <h2 className="contact-brand-name">
              K. SUBHAM KUMAR PATRA
            </h2>
            <p className="contact-tagline">
              Student • Learner • Developer • Problem Solver
            </p>
            <p className="contact-lpu">Lovely Professional University (LPU)</p>
            <p className="contact-quote">
              "Learning today. Building for tomorrow."
            </p>
            <h5 className="contact-copyright">
              <MdCopyright /> {currentYear} K. SUBHAM KUMAR PATRA
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
