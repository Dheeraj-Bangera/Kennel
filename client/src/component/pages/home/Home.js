import React from "react";

import Work from "./Work";
import Card from "./Card";

import dog from "../../../assets/dog.png";
import cat from "../../../assets/cat.png";
import firstaid from "../../../assets/firstaid.png";
import statics from "../../../assets/statistics.png";
import location from "../../../assets/location.png";
import Quote from "./Quote";
import Adopt from "./Adopt";
import Team from "./Team";
import dogbtn from "../../../assets/dog-btn.png";
import catbtn from "../../../assets/cat-btn.png";
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
    <div className="bg-[#FEFAE0] h-full">
      <Quote />

     


      

      <div className="flex flex-col items-center ">
        <div className="flex gap-4 ">
          {cards.map((card, index) => (
            <div classname=" select-none" key={index}>
              <Card img={card.img} />
            </div>
          ))}
        </div>
      </div>
      <Work />
      <Adopt />
      <Team />
    </div>
  );
};

export default Home;
