"use client"

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
      style={{ perspective: 1000 }} // <- viktiga 1: ge scenen djup
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT (visas när wrappern vrider sig 180 grader) */}
        <img
          src={frontImage}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: "rotateY(180deg)", 
            backfaceVisibility: "hidden",           
          }}
        />

        {/* BACK (visas när wrappern är 0deg) */}
        <img
          src={backImage}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            backfaceVisibility: "hidden",           // <- göm när den är bortvänd
          }}
        />
      </motion.div>
    </button>
  );
};

export default Card;
