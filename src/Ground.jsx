import { usePlane } from "@react-three/cannon";
import { useEffect, useRef } from "react";
import { BufferAttribute } from "three";

export function Ground() {
  const [ref] = usePlane(
    () => ({
      type: "Static",
      rotation: [-Math.PI / 2, 0, 0],
    }),
    useRef(null),
  );

  const meshRef = useRef(null);

  useEffect(() => {
    if (!meshRef.current) return;

    var uvs = meshRef.current.geometry.attributes.uv.array;
    meshRef.current.geometry.setAttribute("uv2", new BufferAttribute(uvs, 2));
  }, [meshRef.current]);

  return (
    <>
      <mesh
        ref={meshRef}
        position={[-2.285, -0.015, -1.325]}
        rotation-x={-Math.PI * 0.5}
        rotation-z={-0.079}
      >
        <planeGeometry args={[300, 300]} />
        <meshBasicMaterial color={"brown"} />
      </mesh>
    </>
  );
}
