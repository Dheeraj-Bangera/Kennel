import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../../assets/logo.png";
import { IoSearch } from "react-icons/io5";
import DropDown from "./DropDown";
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../../../redux/reducers/rootSlice';
import axios from "axios";

const FeedsNav = ({ setData, data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchAllPosts = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get("http://localhost:8080/posts/search", {
        params: { keyword: searchTerm.trim()},
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setData(response.data.data); // Adjust based on the actual structure of your response
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Error fetching posts", error);
      dispatch(setLoading(false));
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchAllPosts();
  };

  return (
    <div className="flex justify-between w-[92%] mx-auto">
      <div>
        <NavLink to="/feeds">
          <img src={logo} alt="Kennel" className="w-48" />
        </NavLink>
      </div>

      <div className="flex justify-center w-full items-center">
        <form onSubmit={handleSearchSubmit} className="relative flex items-center text-gray-400 focus-within:text-gray-600">
          <IoSearch className="w-5 h-5 absolute ml-3 pointer-events-none" />
          <input
            type="text"
            name="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search the location..."
            className="lg:w-96 w-44 p-2 pr-3 pl-10 rounded-full border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
          />
        </form>
      </div>

      <div className="mt-2">
        <DropDown />
      </div>
    </div>
  );
};

export default FeedsNav;
