import axios from "axios";
import React, { useEffect } from "react";


const YourPosts = () => {
  const fetchMyposts = async () => {
    const response = await axios.get("http://localhost:8080/posts/getMypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(response)
  };
  useEffect(() => {
    fetchMyposts();
  }, []);

  return <div>hello</div>;
};

export default YourPosts;
