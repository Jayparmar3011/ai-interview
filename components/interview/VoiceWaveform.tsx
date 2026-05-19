"use client";

import { motion } from "framer-motion";

export default function VoiceWaveform() {
  return (
    <div className="flex items-end gap-1 h-10">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-cyan-400 rounded-full"
          animate={{
            height: [10, 30, 15, 35, 12],
          }}
          transition={{
            repeat: Infinity,
            duration: 1,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}
