import React, { useState } from "react";
import axios from "axios";
import { MdCloudUpload } from "react-icons/md";
import doogo from "../../../assets/dog.png";
import cat from "../../../assets/cat.png";
import Display from "./Display";

const Post = () => {
  const [formData, setFormData] = useState({
    animal: "",
    animal_name: "",
    gender: "",
    image: null,
    description: "",
    breed: "",
    address: "",
    city: "",
  });

  const [Img, setImg] = useState([]);
  const {
    animal,
    animal_name,
    gender,
    image,
    description,
    breed,
    address,
    city,
  } = formData;

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const [clicking, setClicking] = useState(false);

  const handleMouseDown = () => {
    setClicking(true);
  };

  const handleMouseUp = () => {
    setClicking(false);
  };

  function uploadPhoto(ev) {
    const files = ev.target.files[0];
    setImg([...Img, files]);
    console.log({ files });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = new FormData();
      postData.append("animal", animal);
      postData.append("animal_name", animal_name);
      postData.append("gender", gender);
      postData.append("image", image);
      postData.append("description", description);
      postData.append("breed", breed);
      postData.append("address", address);
      postData.append("city", city);

      const res = await axios.post(
        "http://localhost:8080/post/create",
        postData,
        {
          headers: "multipart/form",
        }
      );
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className=" flex flex-col justify-center items-center  mb-8 ">
        <h1 className="text-3xl font-bold mb-4 font-[Knewave] flex items-center justify-center mt-6 ">
          Post a Furry for Adoption
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-[#3A6944]/30 p-4 rounded-xl grid grid-cols-1 md:grid-cols-2 "
        >
          <div className="px-10">
            <div className="mb-4">
              <p className="text-xl mt-4 font-bold">Title</p>
              <input
                type="text"
                placeholder="E.g., Fluffy the Cat"
                name="animal"
                value={animal}
                onChange={handleChange}
                className="w-72 bg-white rounded-lg m-2 text-black p-3 border shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <p className="text-xl mt-4 font-bold">Name to call them by: </p>
              <input
                type="text"
                placeholder="Animal Name E.g., Bella, Max or Luna."
                name="animal_name"
                value={animal_name}
                onChange={handleChange}
                className="w-72 bg-white rounded-lg m-2 text-black p-3 border shadow-sm"
              />
            </div>
            <div className="mb-4">
              <p className="text-xl mt-4 font-bold">Gender</p>
              <div className="flex items-center mt-3">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Female
                </label>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-xl mt-4 font-bold">Address </p>
              <input
                type="text"
                placeholder="Address"
                name="address"
                value={address}
                onChange={handleChange}
                className="w-72 bg-white rounded-lg m-2 text-black p-3 border shadow-sm"
              />
            </div>
            <div className="mb-4">
              <p className="text-xl mt-4 font-bold">City </p>
              <input
                type="text"
                placeholder="City"
                name="city"
                value={city}
                onChange={handleChange}
                className="w-72 bg-white rounded-lg m-2 text-black p-3 border shadow-sm"
              />
            </div>
          </div>
          <div >
            <div className="">
              <p className="text-xl mt-4 font-bold">Photos </p>
              <p className="text-sm  text-gray-500">more=better </p>

              <div className="mt-2 grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4 gap-2">
                {Img.length > 0 ? (
                  Img.map((index) => {
                    if (index == null) {
                      return;
                    }
                    return <Display image={index} />;
                  })
                ) : (
                  <></>
                )}
                
                  <label className="border rounded-2xl cursor-pointer h-24 w-32  p-4 text-gray-600">
                    <input
                      type="file"
                      className=" hidden"
                      accept="image/*"
                      multiple
                      onChange={uploadPhoto}
                    />
                    <MdCloudUpload className="text-lg text-black" />
                    <p className="text-sm">Upload</p>
                  </label>
                
              </div>
            </div>
            <div className="mb-4">
              <p className="text-xl mt-4 font-bold">Description </p>
              <textarea
                placeholder="Description"
                name="description"
                value={description}
                onChange={handleChange}
                className="w-96 h-28 bg-white rounded-lg m-2 text-black p-3 border shadow-sm"
              />
            </div>
            <div className="mb-4 lg:mt-12">
              <p className="text-xl mt-4 font-bold">Breed </p>
              <p className="text-sm  text-gray-500">Type nil if don't know</p>
              <input
                type="text"
                placeholder="Breed E.g German sheperd, Pomerian"
                name="breed"
                value={breed}
                onChange={handleChange}
                className="w-72 bg-white rounded-lg m-2 text-black p-3 border shadow-sm"
              />
            </div>
          </div>
          <div className="flex justify-center md:col-span-2">
            <button
              className={`bg-[#3A6944]/30  lg:w-64 w-[90%] p-3 text-xl rounded-lg font-bold m-2 
          ${clicking ? "transition-transform transform hover:scale-105" : ""}`}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
            >
              Add
            </button>
          </div>
        </form>
      </div>
      <div className="relative">
        <img
          src={doogo}
          className="md:h-48 md:w-48 absolute   hidden md:block bottom-0 left-0"
          alt="Team"
        />
        <img
          src={cat}
          className="md:h-48 md:w-48 absolute   hidden md:block bottom-0 right-12"
          alt="Team"
        />
      </div>
    </div>
  );
};

export default Post;
