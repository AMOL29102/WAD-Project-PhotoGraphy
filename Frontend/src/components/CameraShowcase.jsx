// import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
// import { useRef } from 'react';
// import camera from '../Assets/Images/2.png';
// import camera3 from '../Assets/Images/3.png';
// import camera4 from '../Assets/Images/41.png';
// import camera5 from '../Assets/Images/51.png';
// import camera6 from '../Assets/Images/61.png';
// import camera7 from '../Assets/Images/71.png';



// const features = [
//   {
//     title: "Professional Grade",
//     description: "Industry leading camera technology for unmatched quality",
//     position: { top: "20%", left: "10%" }
//   },
//   {
//     title: "High Resolution",
//     description: "Capture every detail with stunning clarity",
//     position: { top: "40%", right: "10%" }
//   },
//   {
//     title: "Perfect Focus",
//     description: "Advanced autofocus system for sharp images",
//     position: { bottom: "20%", left: "15%" }
//   },
//   {
//     title: "Creative Control",
//     description: "Full manual controls for artistic expression",
//     position: { top: "60%", right: "15%" }
//   }
// ];

// const specs = [
//   "50.3 Megapixels",
//   "8K Video Recording",
//   "Dual Card Slots",
//   "Advanced AF System",
// ];

// export default function CameraShowcase() {
//   const containerRef =  useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"]
//   });

//   const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
//   const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 300]), springConfig);
//   const scale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]), springConfig);
//   const rotate = useSpring(useTransform(scrollYProgress, [0, 1], [0, 45]), springConfig);
//   const rotateY = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]), springConfig);
//   const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

//   return (
//     <div
//       ref={containerRef}
//       className="min-h-[300vh] relative overflow-hidden"
//     >
//       {/* First Section - Main Camera View */}
//       <div className="sticky top-0 flex items-center justify-center overflow-hidden  bg-gradient-to-b from-black via-gray-950 to-black ">
//         <motion.div
//           style={{ y, opacity }}
//           className="relative w-full max-w-7xl mx-auto px-4"
//         >
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1 }}
//             className="text-center text-white mb-2 mt-[5%]"
//           >
//             <h2 className="text-5xl md:text-7xl font-bold mb-6">Master Your Craft</h2>
//             <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
//               Experience photography like never before with our professional equipment
//             </p>
//           </motion.div>

//           <div className="relative perspective-2000">
//             <motion.div
//               style={{
//                 scale,
//                 rotateY,
//                 rotateX: rotate,
//                 transformStyle: "preserve-3d"
//               }}
//               className="relative mx-auto"
//             >
//               <motion.img
//                 src={camera}
//                 alt="Professional Camera"
//                 className="w-[800px] h-[900px] object-cover rounded-2xl mx-auto shadow-2xl"
//               />

//               {/* Centered Text over the Camera Image */}
//               <motion.div
//                 className="absolute inset-0 flex items-center justify-center text-white z-10"
//                 style={{
//                   opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
//                   scale: useSpring(useTransform(scrollYProgress, [0, 0.2, 1], [0.8, 1.2, 0.8]), springConfig),
//                   y: useSpring(useTransform(scrollYProgress, [0, 0.4], [50, 0]), springConfig)
//                 }}
//               >
//                 <div className="text-center">
//                   <h3 className="text-4xl font-bold">Photography Mastery</h3>
//                   <p className="text-lg mt-4 text-gray-300">
//                     Explore the ultimate in camera technology and elevate your creativity.
//                   </p>
//                 </div>
//               </motion.div>

//               {/* 3D Floating Specs */}
//               {specs.map((spec, index) => (
//                 <motion.div
//                   key={spec}
//                   style={{
//                     opacity: useTransform(
//                       scrollYProgress,
//                       [0.1 + index * 0.1, 0.2 + index * 0.1, 0.3 + index * 0.1],
//                       [0, 1, 0]
//                     ),
//                     x: useSpring(
//                       useTransform(
//                         scrollYProgress,
//                         [0.1 + index * 0.1, 0.1 + index * 0.1],
//                         [index % 2 === 0 ? -100 : 100, 0]
//                       ),
//                       { stiffness: 100, damping: 10 }
//                     ),
//                     top: `${20 + index * 10}%`, // Set `top` as an inline style
//                   }}
//                   className={`absolute text-white text-lg font-medium bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full
//       ${index % 2 === 0 ? 'left-4' : 'right-4'}`}
//                 >
//                   {spec}
//                 </motion.div>
//               ))}

//             </motion.div>

//             {/* Feature Cards */}
//<div className="hidden md:block">
//             {features.map((feature, index) => (
//               <motion.div
//                 key={feature.title}
//                 style={{
//                   opacity: useTransform(
//                     scrollYProgress,
//                     [0.3 + index * 0.02, 0.4 + index * 0.1, 0.7 + index * 0.1, 0.8 + index * 0.1],
//                     [0, 1, 1, 0]
//                   ),
//                   x: useSpring(
//                     useTransform(
//                       scrollYProgress,
//                       [0.3 + index * 0.1, 0.7 + index * 0.1],
//                       [index % 2 === 0 ? -100 : 100, 0]
//                     ),
//                     springConfig
//                   ),
//                   z: useSpring(useTransform(
//                     scrollYProgress,
//                     [0, 1],
//                     [0, 50]
//                   ), springConfig),
//                   ...feature.position // Merging feature.position into the style object
//                 }}
//                 className="absolute text-white p-6 bg-black/60 backdrop-blur-lg rounded-xl max-w-xs transform-gpu overflow-hidden"
//               >
//                 <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
//                 <p className="text-gray-300">{feature.description}</p>
//               </motion.div>
//             ))}
//</div>
//           </div>
//         </motion.div>
//       </div >

//       {/* Second Section - Technical Details */}
//       < div className="sticky h-screen flex items-center justify-center bg-black/90 mt-[10%] bg-gradient-to-b from-black via-gray-900 to-black" >
//         <motion.div
//           style={{
//              opacity: useTransform(scrollYProgress, [0.2, 0.4, 0.9, 1], [0.4, 1, 1, 0.2])
//           }}
//           className="w-full max-w-7xl mx-auto px-4"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//             <motion.div
//               style={{
//                  x: useSpring(useTransform(scrollYProgress, [0.1, 0.7], [-200, 0]), springConfig)
//               }}
//             >
//               <motion.img
//                 src={camera3}
//                 alt="Camera Details"
//                 className="rounded-2xl shadow-2xl transform -rotate-12"
//               />
//             </motion.div>
//             <motion.div
//               style={{
//                x: useSpring(useTransform(scrollYProgress, [0.1, 0.4], [200, 0]), springConfig)
//               }}
//               className="text-white space-y-6"
//             >
//               <h3 className="text-4xl font-bold">Technical Excellence</h3>
//               <p className="text-xl text-gray-300">
//                 Every detail matters in professional photography. Our equipment is designed to meet
//                 the highest standards of image quality and reliability.
//               </p>
//               <ul className="space-y-4">
//                 {specs.map((spec, index) => (
//                   <motion.li
//                     key={spec}
//                     initial={{ opacity: 0, x: 50 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     className="flex items-center gap-3 text-xl"
//                   >
//                     <span className="w-2 h-2 bg-white rounded-full" />
//                     <span>{spec}</span>
//                   </motion.li>
//                 ))}
//               </ul>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div >


//       {/* Third section Lens */}
//       <div className="sticky top-0 h-screen flex items-center justify-center bg-black/90 mb-[15rem] ">
//         <motion.div
//           style={{
//             opacity: useTransform(scrollYProgress, [0.6, 0.5, 1], [0.3, 2, 1]), // Enhanced opacity range
//           }}
//           className="w-full"
//         >
//           <div className="relative h-screen overflow-hidden">
//             <motion.div
//               style={{
//                 x: useSpring(
//                   useTransform(scrollYProgress, [0.6, 1], ["0%", "-1800%"]), // Add smooth horizontal scroll
//                   { stiffness: 200, damping: 25 }
//                 ),
//               }}
//               className="flex gap-8 absolute top-1/4 -translate-y-1/2 bottom-1/4 "
//             >
//               {[camera4, camera5, camera6, camera7, camera4, camera5, camera6,camera7].map((url, index) => (
//                 <div
//                   key={index}
//                   className="relative flex-none w-[400px] h-[600px] rounded-2xl overflow-hidden shadow-lg"
//                 >
//                   <img
//                     src={url}
//                     alt={`Lens ${index + 1}`}
//                     className="w-full h-full object-cover"
//                     loading="lazy"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                 </div>
//               ))}
//             </motion.div>
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
//               <motion.h3
//                 style={{
//                   y: useSpring(
//                     useTransform(scrollYProgress, [0.6, 0.7], [50, 0]),
//                     { stiffness: 200, damping: 25 }
//                   ),
//                 }}
//                 className="text-5xl font-bold mb-4"
//               >
//                 Premium Lens Collection
//               </motion.h3>
//               <motion.p
//                 style={{
//                   y: useSpring(
//                     useTransform(scrollYProgress, [0.6, 0.7], [50, 0]),
//                     { stiffness: 200, damping: 25 }
//                   ),
//                 }}
//                 className="text-xl text-gray-300"
//               >
//                 Choose from our wide range of professional lenses
//               </motion.p>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//     </div >
//   );
// }


import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import camera from '../Assets/Images/2.png';
import camera3 from '../Assets/Images/3.png';
import camera4 from '../Assets/Images/41.png';
import camera5 from '../Assets/Images/51.png';
import camera6 from '../Assets/Images/61.png';
import camera7 from '../Assets/Images/71.png';

const features = [
  {
    title: "Professional Grade",
    description: "Industry leading camera technology for unmatched quality",
    position: {
      desktop: { top: "20%", left: "10%" },
      mobile: { top: "10%", left: "5%" }
    }
  },
  {
    title: "High Resolution",
    description: "Capture every detail with stunning clarity",
    position: {
      desktop: { top: "40%", right: "10%" },
      mobile: { top: "30%", right: "5%" }
    }
  },
  {
    title: "Perfect Focus",
    description: "Advanced autofocus system for sharp images",
    position: {
      desktop: { bottom: "20%", left: "15%" },
      mobile: { bottom: "25%", left: "5%" }
    }
  },
  {
    title: "Creative Control",
    description: "Full manual controls for artistic expression",
    position: {
      desktop: { top: "60%", right: "15%" },
      mobile: { bottom: "10%", right: "5%" }
    }
  }
];

const specs = [
  "50.3 Megapixels",
  "8K Video Recording",
  "Dual Card Slots",
  "Advanced AF System",
];

export default function CameraShowcase() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 300]), springConfig);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]), springConfig);
  const rotate = useSpring(useTransform(scrollYProgress, [0, 1], [0, 45]), springConfig);
  const rotateY = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]), springConfig);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div
      ref={containerRef}
      className="min-h-[400vh] relative overflow-hidden"
    >
      {/* First Section - Main Camera View */}
      <div className="sticky top-0 flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black">
        <motion.div
          style={{ y, opacity }}
          className="relative w-full max-w-7xl mx-auto px-4 py-8 sm:py-12 md:py-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-center text-white mb-2 mt-[5%]"
          >
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6">Master Your Craft</h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto px-4">
              Experience photography like never before with our professional equipment
            </p>
          </motion.div>

          <div className="relative perspective-2000">
            <motion.div
              style={{
                scale,
                rotateY,
                rotateX: rotate,
                transformStyle: "preserve-3d"
              }}
              className="relative mx-auto"
            >
              <motion.img
                src={camera}
                alt="Professional Camera"
                className="w-full h-auto max-w-[300px] sm:max-w-[500px] md:max-w-[800px] object-contain rounded-2xl mx-auto shadow-2xl"
              />

              {/* Centered Text over the Camera Image */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-white z-10"
                style={{
                  opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
                  scale: useSpring(useTransform(scrollYProgress, [0, 0.2, 1], [0.8, 1.2, 0.8]), springConfig),
                  y: useSpring(useTransform(scrollYProgress, [0, 0.4], [50, 0]), springConfig)
                }}
              >
                <div className="text-center px-4">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">Photography Mastery</h3>
                  <p className="text-base sm:text-lg mt-2 sm:mt-4 text-gray-300">
                    Explore the ultimate in camera technology and elevate your creativity.
                  </p>
                </div>
              </motion.div>

              {/* 3D Floating Specs */}
              {specs.map((spec, index) => (
                <motion.div
                  key={spec}
                  style={{
                    opacity: useTransform(
                      scrollYProgress,
                      [0.1 + index * 0.1, 0.2 + index * 0.1, 0.3 + index * 0.1],
                      [0, 1, 0]
                    ),
                    x: useSpring(
                      useTransform(
                        scrollYProgress,
                        [0.1 + index * 0.1, 0.1 + index * 0.1],
                        [index % 2 === 0 ? -100 : 100, 0]
                      ),
                      { stiffness: 100, damping: 10 }
                    ),
                    top: `${20 + index * 10}%`,
                  }}
                  className={`absolute text-white text-sm sm:text-base md:text-lg font-medium bg-black/50 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full
                    ${index % 2 === 0 ? 'left-1 sm:left-4' : 'right-1 sm:right-4'}`}
                >
                  {spec}
                </motion.div>
              ))}
            </motion.div>

            {/* Feature Cards */}
            <div className="hidden md:block">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  style={{
                    opacity: useTransform(
                      scrollYProgress,
                      [0.3 + index * 0.02, 0.4 + index * 0.1, 0.7 + index * 0.1, 0.8 + index * 0.1],
                      [0, 1, 1, 0]
                    ),
                    x: useSpring(
                      useTransform(
                        scrollYProgress,
                        [0.3 + index * 0.1, 0.7 + index * 0.1],
                        [index % 2 === 0 ? -100 : 100, 0]
                      ),
                      springConfig
                    ),
                    z: useSpring(useTransform(
                      scrollYProgress,
                      [0, 1],
                      [0, 50]
                    ), springConfig),
                    ...feature.position.desktop,
                    '@media (max-width: 640px)': feature.position.mobile
                  }}
                  className="absolute text-white p-4 sm:p-6 bg-black/60 backdrop-blur-lg rounded-xl max-w-[250px] sm:max-w-xs transform-gpu overflow-hidden"
                >
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Second Section - Technical Details */}
      <div className="sticky h-screen flex items-center justify-center bg-black/90 mt-[10%] bg-gradient-to-b from-black via-gray-900 to-black">
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0.2, 0.4, 0.9, 1], [0.4, 1, 1, 0.2])
          }}
          className="w-full max-w-7xl mx-auto px-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              style={{
                x: useSpring(useTransform(scrollYProgress, [0.1, 0.7], [-200, 0]), springConfig)
              }}
              className="px-4 sm:px-0"
            >
              <motion.img
                src={camera3}
                alt="Camera Details"
                className="rounded-2xl shadow-2xl transform -rotate-12 w-full max-w-[400px] mx-auto"
              />
            </motion.div>
            <motion.div
              style={{
                x: useSpring(useTransform(scrollYProgress, [0.1, 0.4], [200, 0]), springConfig)
              }}
              className="text-white space-y-4 sm:space-y-6 px-4 sm:px-6"
            >
              <h3 className="text-3xl sm:text-4xl font-bold">Technical Excellence</h3>
              <p className="text-lg sm:text-xl text-gray-300">
                Every detail matters in professional photography. Our equipment is designed to meet
                the highest standards of image quality and reliability.
              </p>
              <ul className="space-y-3 sm:space-y-4">
                {specs.map((spec, index) => (
                  <motion.li
                    key={spec}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-base sm:text-xl"
                  >
                    <span className="w-2 h-2 bg-white rounded-full" />
                    <span>{spec}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Third section Lens */}
      <div className="sticky top-0 h-screen flex items-center justify-center bg-black/90 mb-[15rem]">
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0.6, 0.5, 1], [0.3, 2, 1]),
          }}
          className="w-full"
        >
          <div className="relative h-screen overflow-hidden">
            <motion.div
              style={{
                x: useSpring(
                  useTransform(scrollYProgress, [0.6, 1], ["0%", "-1800%"]),
                  { stiffness: 200, damping: 25 }
                ),
              }}
              className="flex gap-4 sm:gap-8 absolute top-1/4 -translate-y-1/2 bottom-1/4"
            >
              {[camera4, camera5, camera6, camera7, camera4, camera5, camera6, camera7].map((url, index) => (
                <div
                  key={index}
                  className="relative flex-none w-[250px] sm:w-[300px] md:w-[400px] h-[400px] sm:h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-lg"
                >
                  <img
                    src={url}
                    alt={`Lens ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              ))}
            </motion.div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white z-10 px-4">
              <motion.h3
                style={{
                  y: useSpring(
                    useTransform(scrollYProgress, [0.6, 0.7], [50, 0]),
                    { stiffness: 200, damping: 25 }
                  ),
                }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              >
                Premium Lens Collection
              </motion.h3>
              <motion.p
                style={{
                  y: useSpring(
                    useTransform(scrollYProgress, [0.6, 0.7], [50, 0]),
                    { stiffness: 200, damping: 25 }
                  ),
                }}
                className="text-base sm:text-lg md:text-xl text-gray-300"
              >
                Choose from our wide range of professional lenses
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}