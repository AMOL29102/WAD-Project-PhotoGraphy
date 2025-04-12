

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
    <div className="relative min-h-[17rem] lg:min-h-[40rem] w-full flex justify-center items-center z-10 mb-[14rem] lg:mb-[15rem] lg:mt-[15rem]">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-contain sm:object-cover z-0 py-10"
        src="https://cdn.pixabay.com/video/2023/07/08/170655-843752693_large.mp4" // Replace with your video link
        aria-hidden="true"
      ></video>

      {/* Canvas and UI */}
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <Canvas
          camera={{ position: [4, 2, 8], fov: 50 }}
          className="w-full h-[5rem]"
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[0, 1, 5]} intensity={3} />
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
          className="absolute top-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-md z-20"
        >
          Reset View
        </button>
        {/* <div className="absolute bottom-2 sm:bottom-5 left-1/2 transform -translate-x-1/2 text-white text-center z-20 max-w-[90vw] sm:max-w-[80vw]">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold whitespace-nowrap sm:whitespace-normal overflow-hidden text-ellipsis">
            3D Camera Showcase
          </h1>
          <p className="text-sm sm:text-base lg:text-lg whitespace-nowrap sm:whitespace-normal overflow-hidden text-ellipsis">
            Hold and drag to rotate the model!
          </p>
        </div> */}
      </div>

      {/* Overlay to ensure content is visible */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div> */}
    </div>
  );
};

export default Camera3D;
