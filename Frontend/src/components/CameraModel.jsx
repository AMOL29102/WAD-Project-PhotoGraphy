import React from "react";
import { useGLTF } from "@react-three/drei";

const CameraModel = () => {
  const { scene } = useGLTF("/nikon_d5600/scene.gltf"); // Replace with your actual file path
  return <primitive object={scene} />;
};

export default CameraModel;
