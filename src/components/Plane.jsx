import React, { useRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { Group } from "three";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import usePlaneControls from "./usePlaneControls";
import { useTrimesh } from "@react-three/cannon";

const findGeometry = (object) => {
  // Check if the object has geometry
  if (object.geometry) {
    return object.geometry;
  }

  // If the object has children, recursively search for geometry in children
  if (object.children && object.children.length > 0) {
    for (let i = 0; i < object.children.length; i++) {
      const geometry = findGeometry(object.children[i]);
      if (geometry) {
        return geometry;
      }
    }
  }

  // Geometry not found in this branch
  return null;
};

const Plane = () => {
  const { scene, animations } = useGLTF("/assets/spitfire.glb");
  const [vertices, setVertices] = useState([]);
  const [indices, setIndices] = useState([]);

  useEffect(() => {
    // Find geometry in the scene
    const geometry = findGeometry(scene);
    if (geometry) {
      // Extract vertices and indices
      const verticesArray = geometry.attributes.position.array;
      const indicesArray = geometry.index.array;

      // Convert TypedArray to regular arrays
      const vertices = Array.from(verticesArray);
      const indices = Array.from(indicesArray);

      // Update state
      setVertices(vertices);
      setIndices(indices);
    } else {
      console.error("Geometry not found in  model.");
    }
  }, [scene]);

  const [ref] = useTrimesh(
    () => ({
      args: [vertices, indices],
      mass: 0,
      type: "Static",
    }),
    useRef(null),
  );

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
