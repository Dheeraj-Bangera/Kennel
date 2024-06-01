import React, { useEffect, useState } from 'react';
import Card from './Cards';
import cardData from './CardsData';
import axios from 'axios';

function CardsContainer() {
  const [data, setdata] = useState([])
  const fetchAllposts = async () => {
    const response = await axios.get("http://localhost:8080/posts/getAllPost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setdata(response.data.posts)
  };
  useEffect(() => {
    fetchAllposts()
  
    
  }, [])
  
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 justify-center">
        {data.map((item) => (
          <Card
            key={item._id}
            id={item._id}
            animal={item.animal}
            animal_name={item.animal_name}
            city={item.city}
            address={item.address}
            breed={item.breed}
            description={item.description}
            images={item.image} // Pass images array or a single image wrapped in an array
            gender={item.gender}
          />
        ))}


        
      </div>
    </div>
  );
}

export default CardsContainer;
