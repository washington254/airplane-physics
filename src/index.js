import "./index.css";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import { Physics } from "@react-three/cannon";

createRoot(document.getElementById("root")).render(
  <>
    <Canvas>
      <Physics broadphase="SAP" gravity={[0, -9.8, 0]}>
        <Scene />
      </Physics>
    </Canvas>

    <div class="controls">
      <p>press W A to move forward backward</p>
      <p>press Q E to yaw left right</p>
      <p>press r to reset</p>
      <p>press arrows up and down to inclinde and decline</p>
    </div>
  </>,
);
