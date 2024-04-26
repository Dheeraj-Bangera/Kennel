import React from "react";
import Card from "./Cards";
import data from "./CardsData";

function CardsContainer() {
    return (
        <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 justify-center">
                {/* Map over the data array and render a Card component for each item */}
                {data.map((item, index) => (
                    <Card
                        key={index}
                        animal={item.animal}
                        animal_name={item.animal_name}
                        city={item.city}
                        address={item.address}
                        breed={item.breed}
                        description={item.description}
                        image={item.image}
                        gender={item.gender}
                    />
                ))}
            </div>
        </div>
    );
}

export default CardsContainer;
