import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CameraModel from "./CameraModel";

const RotatingCameraModel = () => {
  const ref = useRef();

  // Handle rotation inside a Canvas-compatible component
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    // Apply rotation to the model
    if (ref.current) ref.current.rotation.y = elapsedTime * 0.6; // Adjust speed as needed
  });

  return (
    <group ref={ref}>
      <CameraModel />

    </group>
  );
};

const Camera3D = () => {
  const controlsRef = useRef();
  const [zoomEnabled, setZoomEnabled] = useState(false);

  // Reset the camera to its initial position
  const resetCameraPosition = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  // Enable zoom when mouse enters the canvas
  const handlePointerEnter = () => setZoomEnabled(true);

  // Disable zoom when mouse leaves the canvas
  const handlePointerLeave = () => setZoomEnabled(false);

  return (
    <div className="h-[30rem] bg-gradient-to-b from-black via-gray-900 to-black pt-24 flex justify-center items-center relative z-10 mb-8">
      <Canvas
        camera={{ position: [4, 2, 8], fov: 50 }}
        className="w-full h-[5rem]"
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[ 0, 1, 5]} intensity={3} />
        <RotatingCameraModel />
        <OrbitControls 
          ref={controlsRef} 
          enableZoom={false} 
          enablePan={false}   // Disable panning
          enableRotate={true} // Enable rotation only
          rotateSpeed={0.5}   // Control the speed of the rotation 
          />  
      </Canvas>
      <button
        onClick={resetCameraPosition}
        className="absolute top-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Reset View
      </button>
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-white text-center">
        <h1 className="text-xl font-bold">3D Camera Showcase</h1>
        <p className="text-m">Explore the model by rotating and panning!</p>
      </div>
    </div>
  );
};

export default Camera3D;
