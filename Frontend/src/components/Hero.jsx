import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Camera } from 'lucide-react';
import { debounce } from "lodash";

export default function App() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll to gallery
  const scrollToGallery = () => {
    const gallerySection = document.getElementById("gallery");
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Debounce the scroll function
  const debouncedScroll = debounce(scrollToGallery, 200);

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity, scale, y }}
      className="h-screen relative overflow-hidden bg-black"
    >
      {/* Video Background */}
      {/* https://cdn.pixabay.com/video/2017/12/03/13186-246454298_large.mp4 */}
      {/* https://cdn.pixabay.com/video/2023/03/12/154384-807362369_large.mp4 */}
      {/* https://cdn.pixabay.com/video/2016/01/05/1841-150885292_medium.mp4 */}
      {/* https://cdn.pixabay.com/video/2018/01/20/13857-252799040_large.mp4 */}
      {/* https://video-previews.elements.envatousercontent.com/bc31b948-3bfa-4c68-80f0-2afac3b60413/watermarked_preview/watermarked_preview.mp4 */}
      {/* https://www.pexels.com/search/videos/photography%20animation/ */}
      {/* https://cdn.pixabay.com/video/2020/07/20/45132-441301006_large.mp4 */}
      {/* https://cdn.pixabay.com/video/2024/03/29/206029_large.mp4 */}
      {/* https://videos.pexels.com/video-files/4087672/4087672-hd_1080_1920_20fps.mp4 */}
      {/* https://cdn.pixabay.com/video/2016/10/24/6090-188704540_large.mp4 */}
      {/* https://cdn.pixabay.com/video/2023/07/08/170655-843752693_large.mp4 */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full opacity-90 z-100"
        >
          <source 
            src="https://cdn.pixabay.com/video/2017/12/03/13186-246454298_large.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Gradient Overlay */}
      <motion.div
        initial={{ opacity: 0.6 }}
        animate={{ opacity: isLoaded ? 1 : 0.6 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/30"
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col items-center gap-8 mb-40"
        >
          {/* Icon */}
          <motion.div
            animate={{
              rotateY: [0, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 5,
            }}
            className="mb-4 opacity-60"
          >
            <Camera size={64} className="text-white" />
          </motion.div>

          {/* Heading */}
          {/* <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.2, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-6xl md:text-8xl font-bold text-center leading-tight z-1"
          >
            Lens & Light
          </motion.h1> */}

          {/* Subheading */}
          {/* <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-xl md:text-3xl text-center max-w-2xl text-gray-300"
          >
            Where moments become timeless memories
          </motion.p> */}
        </motion.div>

        {/* Call to Action Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 30px rgba(255,255,255,0.3)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={debouncedScroll}
          className="px-12 py-4 bg-white text-black rounded-full text-xl font-semibold hover:bg-opacity-90 transition-colors"
        >
          Explore Our Work
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.p className="text-white/80 text-sm uppercase tracking-widest">
          Scroll to Discover
        </motion.p>
        <motion.div
          animate={{
            y: [0, 10, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="w-1 h-12 bg-white/30 rounded-full relative overflow-hidden"
        >
          <motion.div
            animate={{
              y: [0, 48, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="absolute top-0 left-0 right-0 h-1/2 bg-white rounded-full"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}