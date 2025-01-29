// import { useRef, useEffect } from 'react';
// import camera5 from '../Assets/Images/51.png';
// import camera6 from '../Assets/Images/61.png';
// import camera7 from '../Assets/Images/71.png';
// import camera8 from '../Assets/Images/81.png';
// import camera9 from '../Assets/Images/91.png';
// import camera10 from '../Assets/Images/101.png';

// const images = [
//   { url: camera6, title: 'Architecture' },
//   { url: camera5, title: 'Portrait' },
//   { url: camera7, title: 'Nature' },
//   { url: camera8, title: 'Events' },
//   { url: camera9, title: 'Fashion' },
//   { url: camera10, title: 'Product' },
// ];

// import { motion, useScroll, useTransform } from "framer-motion";
// import { useInView } from "react-intersection-observer";

// export default function Gallery() {
//   const containerRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"],
//   });

//   const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
//   const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

//   return (
//     <div id="gallery" ref={containerRef} className="py-20 min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
//       <motion.h2
//         style={{ opacity, scale }}
//         className="text-4xl md:text-5xl font-bold text-center text-white mb-16 "
//       >
//         Portfolio
//       </motion.h2>

//       <motion.div
//         style={{ opacity }}
//         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 max-w-7xl mx-auto"
//       >
//         {images.map((image, index) => (
//           <GalleryItem key={index} image={image} index={index} />
//         ))}
//       </motion.div>
//     </div>
//   );
// }

// function GalleryItem({ image, index }) {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   return (
//     <motion.div
//       ref={ref}
//       initial={{
//         opacity: 0,
//         y: 50,
//       }}
//       animate={
//         inView
//           ? {
//               opacity: 1,
//               y: 0,
//             }
//           : {}
//       }
//       transition={{
//         duration: 0.6,
//         delay: index * 0.1,
//         ease: "easeOut",
//       }}
//       className="relative group cursor-pointer overflow-hidden rounded-lg"
//     >
//       <div className="aspect-w-3 aspect-h-4">
//         <img
//           src={image.url}
//           alt={image.title}
//           className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
//         />
//       </div>
//       <motion.div
//         initial={{ opacity: 0 }}
//         whileHover={{ opacity: 1 }}
//         transition={{ duration: 0.3 }}
//         style={{ backdropFilter: 'blur(1px)' }}
//         className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//       >
//         <motion.h3
//           initial={{ y: 20 }}
//           whileHover={{ y: 0 }}
//           transition={{ duration: 0.3 }}
//           className="text-white text-2xl font-bold"
//         >
//           {image.title}
//         </motion.h3>
//       </motion.div>
//     </motion.div>
//   );
// }

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import camera5 from '/Assets/Images/51.png';
import camera6 from '/Assets/Images/61.png';
import camera7 from '/Assets/Images/71.png';
import camera8 from '/Assets/Images/81.png';
import camera9 from '/Assets/Images/91.png';
import camera10 from '/Assets/Images/101.png';

// Using Unsplash for images and Coverr for videos as placeholders
const items = [
  {
    image: camera5,
    video:
      "https://videos.pexels.com/video-files/4087672/4087672-hd_1080_1920_20fps.mp4",
    title: "Architecture"
  },
  {
    image: camera6,
    video:
      "https://cdn.pixabay.com/video/2020/07/20/45132-441301006_large.mp4 ",
    title: "Portrait"
  },
  {
    image: camera7,
    video:
      "https://cdn.pixabay.com/video/2016/01/05/1841-150885292_medium.mp4",
    title: "Nature"
  },
  {
    image: camera8,
    video: "https://cdn.pixabay.com/video/2018/01/20/13857-252799040_large.mp4",
    title: "Events"
  },
  {
    image: camera9,
    video:
      "https://cdn.pixabay.com/video/2024/03/29/206029_large.mp4",
    title: "Fashion"
  },
  {
    image:camera10,
    video:
      "https://cdn.pixabay.com/video/2016/10/24/6090-188704540_large.mp4",
    title: "Product"
  }
]

function GalleryItem({ item, index }) {
  const videoRef = useRef(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="relative group cursor-pointer overflow-hidden rounded-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="aspect-w-3 aspect-h-4">
        <img
          src={item.image}
          alt={item.title}
          className="object-cover w-full h-full transform group-hover:opacity-0 transition-opacity duration-500"
        />
        <video
          ref={videoRef}
          src={item.video}
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          loop
          muted
          playsInline
        />
      </div>
      <motion.div
        initial={{ opacity: 0.8 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        // style={{ backdropFilter: "blur(1px)" }}
        className="absolute inset-0 bg-black/30 bg-opacity-80 flex items-center justify-center"
      >
        <motion.h3
          initial={{ y: 20 }}
          whileHover={{ y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-white text-2xl font-bold"
        >
          {item.title}
        </motion.h3>
      </motion.div>
    </motion.div>
  )
}

export default function Gallery() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1])

  return (
    <div
      id="gallery"
      ref={containerRef}
      className="py-20 min-h-screen bg-gradient-to-b from-black via-gray-900 to-black"
    >
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
        {items.map((item, index) => (
          <GalleryItem key={index} item={item} index={index} />
        ))}
      </motion.div>
    </div>
  )
}
