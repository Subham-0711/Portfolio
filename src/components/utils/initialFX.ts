import gsap from "gsap";
import { smoother } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  if (smoother) {
    try {
      smoother.paused(false);
    } catch (e) {
      console.warn("Smoother pause failed:", e);
    }
  }
  const mainElem = document.getElementsByTagName("main")[0];
  if (mainElem) {
    mainElem.style.opacity = "1";
    mainElem.classList.add("main-active");
  }

  gsap.to("body", {
    backgroundColor: "#0a0e17",
    duration: 0.5,
  });

  // Intro text and header visibility guarantee
  gsap.to(
    [
      ".header",
      ".icons-section",
      ".nav-fade",
      ".landing-intro h2",
      ".landing-intro h1",
      ".landing-label",
      ".landing-learner",
      ".landing-tagline",
    ],
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.8,
      stagger: 0.05,
      ease: "power2.out",
    }
  );
}
