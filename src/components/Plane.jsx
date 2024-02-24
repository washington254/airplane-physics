import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { Group } from "three";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import usePlaneControls from "./usePlaneControls";

const Plane = () => {
  const { scene, animations } = useGLTF("/assets/spitfire.glb");
  const planeRef = useRef();
  const mixerRef = useRef(null);
  const { camera } = useThree();

  useEffect(() => {
    if (animations.length) {
      mixerRef.current = new THREE.AnimationMixer(scene);
      const action = mixerRef.current.clipAction(animations[1]);
      action.play();
    }
  }, [animations, scene]);

  const cameraOffset = new THREE.Vector3(1, 1, 8);
  const cameraSpeed = 0.05;

  useFrame(() => {
    if (planeRef.current) {
      const plane = planeRef.current;

      const relativeCameraOffset = new THREE.Vector3(-10, 3, 0);
      const targetCameraPosition = relativeCameraOffset.applyMatrix4(
        plane.matrixWorld,
      );

      camera.position.lerp(targetCameraPosition, cameraSpeed);
      camera.lookAt(plane.position);
    }

    if (mixerRef.current) {
      mixerRef.current.update(0.19);
    }
  });

  usePlaneControls(planeRef, camera);

  return (
    <group
      rotation={[0, Math.PI / 2, 0]}
      scale={0.5}
      ref={planeRef}
      dispose={null}
    >
      <pointLight position={[10, 10, 100]} />
      <primitive
        object={scene}
        position={[0, 0, 0]}
        rotation={[0, -(Math.PI / 2), 0]}
      />
    </group>
  );
};

export default Plane;
