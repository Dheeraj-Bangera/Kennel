import React, { useState, useEffect } from "react";

const Card = ({ img }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setIsMobile(windowWidth <= 768); // Adjust threshold as needed (768px is for medium screens)
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call initially to set state based on current screen size

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardClasses = `paper bg-[#3A6944]/40 text-white rounded-md select-none ${
    isMobile ? "mt-4" : "mt-56"
  }`;

  return (
    <div className={cardClasses}>
      <div className="flex items-center justify-center">
        <img src={img} className="md:h-44 md:w-48 max-h-64" alt="Card Image" />
      </div>
    </div>
  );
};

export default Card;
