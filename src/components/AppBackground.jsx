import { motion } from "motion/react";

export default function AppBackground() {
  return (
    <div className="animated-bg" aria-hidden="true">
      /// Three soft lights that move slowly 
      <motion.div
        className="orb orb-1"
        animate={{ x: [0, 120, -60, 0], y: [0, -100, 80, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb orb-2"
        animate={{ x: [0, -140, 90, 0], y: [0, 120, -70, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb orb-3"
        animate={{ x: [0, 80, -120, 0], y: [0, -140, 50, 0] }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="bg-grid" />
      <div className="bg-noise" />
    </div>
  );
}
