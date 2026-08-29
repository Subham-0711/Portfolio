import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  const [, setChar] = useState<THREE.Object3D | null>(null);
  const [hasWebGLError, setHasWebGLError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    if (canvasDiv.current) {
      let rect = canvasDiv.current.getBoundingClientRect();
      let container = { width: rect.width || window.innerWidth, height: rect.height || window.innerHeight };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        });
      } catch (err) {
        console.warn("THREE.WebGLRenderer context creation failed:", err);
        setHasWebGLError(true);
        setLoading(100);
        return;
      }

      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvasDiv.current.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.0;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: any | null = null;
      let mixer: THREE.AnimationMixer;
      let loadedCharacter: THREE.Object3D | null = null;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      let progress = setProgress((value) => setLoading(value));
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      loadCharacter()
        .then((gltf) => {
          if (!isMounted) return;
          if (gltf) {
            const animations = setAnimations(gltf);
            hoverDivRef.current && animations.hover(gltf, hoverDivRef.current);
            mixer = animations.mixer;
            let character = gltf.scene;
            loadedCharacter = character;
            setChar(character);
            scene.add(character);
            headBone = character.getObjectByName("spine006") || null;
            screenLight = character.getObjectByName("screenlight") || null;
            progress.loaded().then(() => {
              setTimeout(() => {
                if (!isMounted) return;
                light.turnOnLights();
                animations.startIntro();
              }, 2500);
            });
            const onResize = () => {
              if (loadedCharacter) {
                handleResize(renderer, camera, canvasDiv, loadedCharacter);
              }
            };
            window.addEventListener("resize", onResize);
            (window as any)._sceneResizeListener = onResize;
          }
        })
        .catch((err) => {
          if (!isMounted) return;
          console.warn("CHARACTER LOAD ERROR:", err);
          progress.clear();
        });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };

      let debounceTimer: number | undefined;
      let activeTouchMoveTarget: HTMLElement | null = null;
      const onTouchMoveHandler = (e: TouchEvent) => {
        handleTouchMove(e, (x, y) => (mouse = { x, y }));
      };

      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        activeTouchMoveTarget = element;
        debounceTimer = setTimeout(() => {
          element?.addEventListener("touchmove", onTouchMoveHandler);
        }, 200);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", onMouseMove);
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }

      let reqId: number;
      const animate = () => {
        if (!isMounted) return;
        reqId = requestAnimationFrame(animate);
        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          light.setPointLight(screenLight);
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        if (renderer && renderer.domElement) {
          renderer.render(scene, camera);
        }
      };
      animate();

      return () => {
        isMounted = false;
        if (reqId) cancelAnimationFrame(reqId);
        if (debounceTimer) clearTimeout(debounceTimer);
        scene.clear();
        if (renderer) {
          renderer.dispose();
        }
        if ((window as any)._sceneResizeListener) {
          window.removeEventListener("resize", (window as any)._sceneResizeListener);
        }
        if (canvasDiv.current && renderer && renderer.domElement && renderer.domElement.parentNode === canvasDiv.current) {
          canvasDiv.current.removeChild(renderer.domElement);
        }
        document.removeEventListener("mousemove", onMouseMove);
        if (activeTouchMoveTarget) {
          activeTouchMoveTarget.removeEventListener("touchmove", onTouchMoveHandler);
        }
        if (landingDiv) {
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
      };
    }
  }, []);

  if (hasWebGLError) {
    return (
      <div className="character-container">
        <div className="character-model">
          <div className="character-rim" style={{ opacity: 0.8 }}></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
