import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

const textureLoader = new THREE.TextureLoader();

// Available webp image textures
const webpMap: { [key: string]: string } = {
  React: "/images/react2.webp",
  "Next.js": "/images/next2.webp",
  "Node.js": "/images/node2.webp",
  "REST API": "/images/express.webp",
  MongoDB: "/images/mongo.webp",
  MySQL: "/images/mysql.webp",
  TypeScript: "/images/typescript.webp",
  JavaScript: "/images/javascript.webp",
};

// Complete technology definitions for ONE single bubble cluster
interface TechDef {
  name: string;
  bgColor: string;
  textColor: string;
}

const techList: TechDef[] = [
  { name: "C", bgColor: "#00599C", textColor: "#FFFFFF" },
  { name: "C++", bgColor: "#004482", textColor: "#FFFFFF" },
  { name: "Python", bgColor: "#3776AB", textColor: "#FFD43B" },
  { name: "JavaScript", bgColor: "#F7DF1E", textColor: "#000000" },
  { name: "TypeScript", bgColor: "#3178C6", textColor: "#FFFFFF" },
  { name: "HTML5", bgColor: "#E34F26", textColor: "#FFFFFF" },
  { name: "CSS3", bgColor: "#1572B6", textColor: "#FFFFFF" },
  { name: "React", bgColor: "#20232A", textColor: "#61DAFB" },
  { name: "Next.js", bgColor: "#000000", textColor: "#FFFFFF" },
  { name: "Node.js", bgColor: "#339933", textColor: "#FFFFFF" },
  { name: "Git", bgColor: "#F05032", textColor: "#FFFFFF" },
  { name: "GitHub", bgColor: "#181717", textColor: "#FFFFFF" },
  { name: "VS Code", bgColor: "#007ACC", textColor: "#FFFFFF" },
  { name: "REST API", bgColor: "#009688", textColor: "#FFFFFF" },
  { name: "MongoDB", bgColor: "#13aa52", textColor: "#FFFFFF" },
  { name: "MySQL", bgColor: "#4479A1", textColor: "#FFFFFF" },
  { name: "Artificial Intelligence", bgColor: "#7C3AED", textColor: "#FFFFFF" },
  { name: "Generative AI", bgColor: "#EC4899", textColor: "#FFFFFF" },
  { name: "AI Agents", bgColor: "#2563EB", textColor: "#FFFFFF" },
  { name: "Machine Learning", bgColor: "#8B5CF6", textColor: "#FFFFFF" },
  { name: "Automation", bgColor: "#059669", textColor: "#FFFFFF" },
  { name: "Data Structures & Algorithms", bgColor: "#0891B2", textColor: "#FFFFFF" },
];

// Helper to generate a bright, crisp canvas texture with logo text
function createCanvasTexture(tech: TechDef): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    // Solid Tech Background
    ctx.fillStyle = tech.bgColor || "#1e293b";
    ctx.fillRect(0, 0, 512, 512);

    // Subtle Radial Highlight
    const grad = ctx.createRadialGradient(256, 256, 30, 256, 256, 250);
    grad.addColorStop(0, "rgba(255, 255, 255, 0.35)");
    grad.addColorStop(1, "rgba(0, 0, 0, 0.15)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    // Glowing Border Frame
    ctx.strokeStyle = tech.textColor || "#ffffff";
    ctx.lineWidth = 14;
    ctx.strokeRect(20, 20, 472, 472);

    // Tech Name / Logo Text
    ctx.fillStyle = tech.textColor || "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const name = tech.name;
    if (name.length > 15) {
      ctx.font = "900 36px sans-serif";
      const words = name.split(" ");
      if (words.length >= 2) {
        const mid = Math.ceil(words.length / 2);
        ctx.fillText(words.slice(0, mid).join(" "), 256, 210);
        ctx.fillText(words.slice(mid).join(" "), 256, 302);
      } else {
        ctx.fillText(name, 256, 256);
      }
    } else if (name.length > 8) {
      ctx.font = "900 48px sans-serif";
      ctx.fillText(name, 256, 256);
    } else {
      ctx.font = "900 68px sans-serif";
      ctx.fillText(name, 256, 256);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

// 32 Spheres inside ONE single cluster
const spheres = [...Array(32)].map(() => ({
  scale: [0.75, 1, 0.85, 1.1, 0.9][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const workEl = document.getElementById("work");
      if (workEl) {
        const threshold = workEl.getBoundingClientRect().top;
        setIsActive(scrollY > threshold);
      }
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const materials = useMemo(() => {
    return techList.map((tech) => {
      let texture: THREE.Texture;
      if (webpMap[tech.name]) {
        texture = textureLoader.load(webpMap[tech.name]);
      } else {
        texture = createCanvasTexture(tech);
      }

      // Bright, vibrant MeshPhysicalMaterial - eliminates black spheres completely
      return new THREE.MeshPhysicalMaterial({
        color: "#ffffff",
        map: texture,
        emissive: "#ffffff",
        emissiveMap: texture,
        emissiveIntensity: 0.35,
        metalness: 0.1,
        roughness: 0.3,
        clearcoat: 0.3,
      });
    });
  }, []);

  return (
    <div className="techstack" id="techstack">
      <h2>
        MY <span>TECH STACK</span>
      </h2>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={1.2} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              {...props}
              material={materials[i % materials.length]}
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
