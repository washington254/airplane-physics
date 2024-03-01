import { useCompoundBody } from "@react-three/cannon";

export default function Plane() {
  // Main body parameters
  const bodyWidth = 0.55;
  const bodyHeight = 0.07;
  const bodyDepth = 1.55;

  // Wing parameters
  const wingWidth = 1.5;
  const wingHeight = 0.02;
  const wingDepth = 0.45;

  // Create compound body for the plane
  const [compoundBody] = useCompoundBody(() => ({
    shapes: [
      {
        type: "Box",
        args: [bodyWidth, bodyHeight, bodyDepth],
        position: [0, 0, 0],
      }, // Main body
      {
        type: "Box",
        args: [wingWidth, wingHeight, wingDepth],
        position: [-bodyWidth / 2 - wingWidth / 2, bodyHeight / 2 + 0.1, 0],
      }, // Left wing
      {
        type: "Box",
        args: [wingWidth, wingHeight, wingDepth],
        position: [bodyWidth / 2 + wingWidth / 2, bodyHeight / 2 + 0.1, 0],
      }, // Right wing
    ],
    position: [0, 1, 0],
    mass: 250, // Total mass of the compound body
  }));

  return (
    <group ref={compoundBody}>
      {/* Main body */}
      <mesh>
        <meshBasicMaterial color="blue" />
        <boxGeometry args={[bodyWidth, bodyHeight, bodyDepth]} />
      </mesh>

      {/* Left wing */}
      <mesh>
        <meshBasicMaterial color="green" />
        <boxGeometry args={[wingWidth, wingHeight, wingDepth]} />
      </mesh>

      {/* Right wing */}
      <mesh>
        <meshBasicMaterial color="green" />
        <boxGeometry args={[wingWidth, wingHeight, wingDepth]} />
      </mesh>
    </group>
  );
}
