import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

export default function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'loop', // ensures the animation loops properly
        }}
      >
        <Camera size={64} className="text-white" />
      </motion.div>
    </motion.div>
  );
}
