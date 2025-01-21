import { useRef, useEffect } from 'react';
import camera5 from '../Assets/Images/51.png';
import camera6 from '../Assets/Images/61.png';
import camera7 from '../Assets/Images/71.png';
import camera8 from '../Assets/Images/81.png';
import camera9 from '../Assets/Images/91.png';
import camera10 from '../Assets/Images/101.png';

const images = [
  { url: camera6, title: 'Architecture' },
  { url: camera5, title: 'Portrait' },
  { url: camera7, title: 'Nature' },
  { url: camera8, title: 'Events' },
  { url: camera9, title: 'Fashion' },
  { url: camera10, title: 'Product' },
];

import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Gallery() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  return (
    <div id="gallery" ref={containerRef} className="py-20 bg-black min-h-screen">
      <motion.h2
        style={{ opacity, scale }}
        className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
      >
        Portfolio
      </motion.h2>

      <motion.div
        style={{ opacity }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 max-w-7xl mx-auto"
      >
        {images.map((image, index) => (
          <GalleryItem key={index} image={image} index={index} />
        ))}
      </motion.div>
    </div>
  );
}

function GalleryItem({ image, index }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: 50,
      }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
            }
          : {}
      }
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className="relative group cursor-pointer overflow-hidden rounded-lg"
    >
      <div className="aspect-w-3 aspect-h-4">
        <img
          src={image.url}
          alt={image.title}
          className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm"
      >
        <motion.h3
          initial={{ y: 20 }}
          whileHover={{ y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-white text-2xl font-bold"
        >
          {image.title}
        </motion.h3>
      </motion.div>
    </motion.div>
  );
}
