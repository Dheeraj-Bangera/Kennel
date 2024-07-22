import React, { useEffect, useState } from 'react';
import Card from './Cards';
// import CardData from './CardsData';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../../../redux/reducers/rootSlice';
import Loader from "../../../../component/Loader";

function CardsContainer() {
  const [data, setData] = useState([]);
  const { loading } = useSelector((state) => state.root);
  const dispatch = useDispatch();

  const fetchAllPosts = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get("http://localhost:8080/posts/getAllPost", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setData(response.data.posts);
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Error fetching posts", error);
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return loading ? (
    <Loader />
  ) : (
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
