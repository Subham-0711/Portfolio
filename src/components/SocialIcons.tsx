import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;
    if (!social) return;

    const cleanups: Array<() => void> = [];

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;
      if (!link) return;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;
      let animId: number;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        animId = requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);
      updatePosition();

      cleanups.push(() => {
        cancelAnimationFrame(animId);
        document.removeEventListener("mousemove", onMouseMove);
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a
            href="https://github.com/Subham-0711"
            target="_blank"
            rel="noreferrer"
            title="GitHub"
          >
            <FaGithub />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/in/k-subham-07-kumar-patra"
            target="_blank"
            rel="noreferrer"
            title="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a
            href="https://www.instagram.com/its._subham._07/"
            target="_blank"
            rel="noreferrer"
            title="Instagram"
          >
            <FaInstagram />
          </a>
        </span>
      </div>
      <a
        className="resume-button"
        href="/K_Subham_Kumar_Patra_CV.pdf"
        target="_blank"
        rel="noreferrer"
        title="View CV"
      >
        <HoverLinks text="CV" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
