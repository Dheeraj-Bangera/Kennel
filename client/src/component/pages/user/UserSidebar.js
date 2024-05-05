import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdImage } from "react-icons/io";
import { FaPaw } from "react-icons/fa";
import { MdRemoveRedEye } from "react-icons/md";
import { IoDocument } from "react-icons/io5";


import { Link } from "react-router-dom";

const UserSidebar = ({ activepage }) => {
  return (
    <div className="w-full h-full flex flex-col items-left gap-2 p-4">
      {/* //account-settings */}
      {activepage === "accountsettings" ? (
        <div className="flex  items-center  gap-2 p-3 font-medium text-lg bg-[#3A6944]/70 rounded-md cursor-pointer">
          <FaRegUserCircle className=" text-black  w-8 h-8"/>
          <span className="hidden sm:block ">Account Settings</span>
        </div>
      ) : (
        <Link to="/user/accountsettings" className="none">
          <div className=" flex  items-center gap-2 p-3 font-medium text-gray-500 text-lg hover:bg-[#3A6944]/70 hover:rounded-md hover:cursor-pointer">
          <FaRegUserCircle className="text-gray-500  w-8 h-8" />
          <span className="hidden sm:block ">Account Settings</span>
        </div>
        </Link>
      )}
      {/* your posts */}
      {activepage === "yourposts" ? (
        <div className="flex  items-center  gap-2 p-3 font-medium text-lg bg-[#3A6944]/70 rounded-md cursor-pointer">
         <IoMdImage className="text-black  w-8 h-8" />
          <span className="hidden sm:block">Your Posts</span>
        </div>
      ) : (
        <Link to="/user/yourposts" className="none">
          <div className="flex  items-center gap-2 p-3 font-medium text-gray-500 text-lg hover:bg-[#3A6944]/70 hover:rounded-md hover:cursor-pointer">
          <IoMdImage className="text-gray-500   w-8 h-8" />
          <span className="hidden sm:block">Your Posts</span>
        </div>
        </Link>
      )}
      {/* your adoption */}
      {activepage === "youradoption" ? (
        <div className="flex  items-center  gap-2 p-3 font-medium text-lg bg-[#3A6944]/70 rounded-md cursor-pointer">
         <FaPaw 
 className="text-black  w-8 h-8" />
          <span className="hidden sm:block">Your Adoption</span>
        </div>
      ) : (
        <Link to="/user/youradoption" className="none">
          <div className="flex  items-center gap-2 p-3 font-medium text-gray-500 text-lg hover:bg-[#3A6944]/70 hover:rounded-md hover:cursor-pointer">
          <FaPaw className="text-gray-500   w-8 h-8" />
          <span className="hidden sm:block">Your Adoption</span>
        </div>
        </Link>
      )}
      {/* legal notice */}
      {activepage === "legalnotice" ? (
        <div className="flex  items-center  gap-2 p-3 font-medium text-lg bg-[#3A6944]/70 rounded-md cursor-pointer">
         <IoDocument  className="text-black  w-8 h-8" />
          <span className="hidden sm:block">Legal Notice</span>
        </div>
      ) : (
        <Link to="/user/legalnotice" className="none">
          <div className="flex  items-center gap-2 p-3 font-medium text-gray-500 text-lg hover:bg-[#3A6944]/70 hover:rounded-md hover:cursor-pointer">
          <IoDocument className="text-gray-500   w-8 h-8" />
          <span className="hidden sm:block">Legal Notice</span>
        </div>
        </Link>
      )}
      {/* chaange password */}
      {activepage === "changepassword" ? (
        <div className="flex  items-center  gap-2 p-3 font-medium text-lg bg-[#3A6944]/70 rounded-md cursor-pointer">
         <MdRemoveRedEye
  className="text-black  w-8 h-8" />
          <span className="hidden sm:block"> Change Password</span>
        </div>
      ) : (
        <Link to="/user/changepassword" className="none">
          <div className="flex  items-center gap-2 p-3 font-medium text-gray-500 text-lg hover:bg-[#3A6944]/70 hover:rounded-md hover:cursor-pointer">
          <MdRemoveRedEye className="text-gray-500   w-8 h-8" />
          <span className="hidden sm:block">Change Password</span>
        </div>
        </Link>
      )}
    </div>
  );
};

export default UserSidebar;
