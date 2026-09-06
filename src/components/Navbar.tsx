import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  const [isPhotoActive, setIsPhotoActive] = useState(false);

  useEffect(() => {
    const wrapper = document.getElementById("smooth-wrapper");
    const content = document.getElementById("smooth-content");
    if (wrapper && content) {
      const existing = ScrollSmoother.get();
      if (existing) {
        smoother = existing;
      } else {
        smoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.7,
          speed: 1.7,
          effects: true,
          autoResize: true,
          ignoreMobileResize: true,
        });
      }
      if (smoother) {
        smoother.scrollTop(0);
        smoother.paused(false);
      }
    }

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          if (section) {
            smoother.scrollTo(section, true, "top top");
          }
        }
      });
    });
    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });
  }, []);

  const handlePhotoClick = (e: React.MouseEvent) => {
    if (window.innerWidth <= 1024) {
      e.preventDefault();
      setIsPhotoActive(!isPhotoActive);
    }
  };

  return (
    <>
      <div className="header">
        <div
          className={`navbar-brand-wrapper ${isPhotoActive ? "active" : ""}`}
          onClick={handlePhotoClick}
        >
          <a href="/#" className="navbar-brand-link" data-cursor="disable">
            <div className="profile-photo-container">
              <img
                src="/images/profile.jpg"
                alt="K. Subham Kumar Patra"
                className="navbar-profile-img"
              />
            </div>
            <span className="navbar-title-text">KSKP</span>
          </a>
        </div>

        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#whatido" href="#whatido">
              <HoverLinks text="WHAT I DO" />
            </a>
          </li>
          <li>
            <a data-href="#experience" href="#experience">
              <HoverLinks text="EXPERIENCE" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#achievements" href="#achievements">
              <HoverLinks text="ACHIEVEMENTS" />
            </a>
          </li>
          <li>
            <a data-href="#techstack" href="#techstack">
              <HoverLinks text="TECH STACK" />
            </a>
          </li>
          <li>
            <a data-href="#softskills" href="#softskills">
              <HoverLinks text="SOFT SKILLS" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
