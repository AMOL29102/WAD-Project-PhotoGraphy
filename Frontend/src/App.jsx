import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import CameraShowcase from './components/CameraShowcase';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Camera3D from './components/Camera3D';




function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate preloading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black">
      <AnimatePresence>
        {/* {loading && <Preloader />} */}
      </AnimatePresence>
      
      {/* Main Sections */}
      <Hero />
      <CameraShowcase />
      <Camera3D />
      <Gallery />
      <Contact />
    </div>
  );
}

export default App;
