import React, { useState } from "react";
import { motion } from "framer-motion";
import "./FlipCard.css";

const FlipCard = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCardFlip = () => {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  };

  return (
    <div
      className="flex cursor-pointer"
      onMouseEnter={handleCardFlip}
      onMouseLeave={handleCardFlip}
    >
      <div className="flip-card ">
        <motion.div
          className="flip-card-inner md:h-48 md:w-48 max-h-64  bg-[#3A6944]/20 rounded-lg"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 360 }}
          transition={{ duration: 0.6, animationDirection: "normal" }}
          onAnimationComplete={() => {
            setIsAnimating(false);
          }}
        >
          <div className="flip-card-front text-2xl font-knewave w-[100%] h-[100%] bg-cover border-2 rounded-lg p-4">
            <p>{question}</p>
          </div>
          <div className="flip-card-back text-base font-noto-sans w-[100%] h-[100%] bg-cover border-2 rounded-lg p-4">
            <p>{answer}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FlipCard;
