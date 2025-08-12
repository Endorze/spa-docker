"use client";

import { motion } from "framer-motion";
import { CardProps } from "@/data/cards";

type Props = CardProps & {
  isFlipped: boolean;
  onClick: () => void;
  disabled?: boolean;
};

const Card = ({ backImage, frontImage, alt, isFlipped, onClick, disabled }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-[100px] h-[150px] cursor-pointer"
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT */}
        <motion.img
          src={frontImage}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
          animate={{
            opacity: isFlipped ? 1 : 0.6,
            boxShadow: isFlipped
              ? [
                  "0 0 10px 2px rgba(255, 0, 255, 0.8), 0 0 20px 5px rgba(255, 0, 255, 0.6), 0 0 40px 10px rgba(255, 0, 255, 0.4)",
                  "0 0 15px 3px rgba(255, 100, 255, 1), 0 0 25px 6px rgba(255, 100, 255, 0.8), 0 0 50px 15px rgba(255, 100, 255, 0.6)",
                  "0 0 10px 2px rgba(255, 0, 255, 0.8), 0 0 20px 5px rgba(255, 0, 255, 0.6), 0 0 40px 10px rgba(255, 0, 255, 0.4)",
                ]
              : "none",
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror",
            },
            opacity: {
              duration: 0.4, // mjuk fade när man vänder kortet
            },
          }}
        />

        {/* BACK */}
        <img
          src={backImage}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
          style={{
            backfaceVisibility: "hidden",
          }}
        />
      </motion.div>
    </button>
  );
};

export default Card;
