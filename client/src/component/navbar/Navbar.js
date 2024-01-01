import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import {toast} from "react-hot-toast"


const Navbar = (props) => {
  let isLoggedIn=props.isLoggedIn;
  let setIsLoggedIn=props.setIsLoggedIn;

  return (
    <div >
      <nav>
        <div className="flex  ">
          <div className=''>
          
              <NavLink to="/" > <img
              src={logo}
              alt="Kennel"
              // height={115}
              // width={312}
              className="object-contain "
            /></NavLink>
          
           
          </div>
          <ul className="flex space-x-12 justify-center	items-center ml-[230px] mb-14 font-bold">
            <li>
              <NavLink to="/" >Home</NavLink>
            </li>
            <li>
              <NavLink to="/Work">Our Work</NavLink>
            </li>
            <li>
              <NavLink to="/About">About us</NavLink>
            </li>
          </ul>
          <div className='flex space-x-3 font-bold items-center ml-auto mb-14 mr-4'>
          
              {!isLoggedIn &&
                <NavLink to="Login" ><button>Login
                  </button></NavLink>
                }
            
            <span>|</span>
            { !isLoggedIn &&
              <NavLink to="/Signup"><button >Sign up
              </button></NavLink>
            }
            { isLoggedIn &&
              <NavLink to="/Logout"><button onClick={()=>{
                setIsLoggedIn(false);
                toast.success("Logged Out");
              }}>Log out
              </button></NavLink>
            }
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
