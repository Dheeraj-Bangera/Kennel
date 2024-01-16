import React from "react";

import Card from "./card";

import dog from "../../../assets/dog.png";
import cat from "../../../assets/cat.png";
import firstaid from "../../../assets/firstaid.png";
import statics from "../../../assets/statistics.png";
import location from "../../../assets/location.png";
import Quote from "./Quote";

const Home = () => {
  const cards = [
    {
      img: dog,
    },
    {
      img: cat,
    },
    {
      img: firstaid,
    },
    {
      img: statics,
    },
    {
      img: location,
    },
  ];

  return (
    <div className="bg-[#FEFAE0] h-screen">
      <Quote/>
      <div className="flex flex-col items-center  h-screen ">
        <div className="flex gap-4 ">
          {cards.map((card, index) => (
            <div key={index}>
              <Card img={card.img} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;