import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import camera11 from '/Assets/Images/111.png';

export default function Contact() {
  return (
    <div className="relative py-12 sm:py-16 md:py-20 bg-black text-white overflow-hidden z-10">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={camera11}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div
          style={{ backdropFilter: 'blur(1px)' }}
          className="absolute inset-0 bg-black bg-opacity-50 sm:bg-opacity-60"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 min-h-[80vh]"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16">
          Get in Touch
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 sm:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="space-y-6 sm:space-y-8 bg-black/30 sm:bg-black/40 backdrop-blur-md p-6 sm:p-8 rounded-2xl"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <p className="text-base sm:text-lg md:text-xl">
                hiraiphotostudio@gmail.com
              </p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <p className="text-base sm:text-lg md:text-xl">+91 9881522732</p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <p className="text-base sm:text-lg md:text-xl">
                Hirai Photo Studio, Main Road, Gujar Ali, Chopda, Dist. Jalgaon
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}