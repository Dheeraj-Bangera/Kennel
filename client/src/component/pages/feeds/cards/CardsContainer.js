import React from 'react';
import Card from './Cards';
import cardData from './CardsData';

function CardsContainer() {
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 justify-center">
        {cardData.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            animal={item.animal}
            animal_name={item.animal_name}
            city={item.city}
            address={item.address}
            breed={item.breed}
            description={item.description}
            images={item.images || [item.image]} // Pass images array or a single image wrapped in an array
            gender={item.gender}
          />
        ))}


        
      </div>
    </div>
  );
}

export default CardsContainer;
