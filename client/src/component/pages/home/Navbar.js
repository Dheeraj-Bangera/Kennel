import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {Link} from 'react-scroll';
import logo from '../../../assets/logo.png';
import { toast } from 'react-hot-toast';
import { GiHamburgerMenu, GiCancel } from 'react-icons/gi';


const Navbar = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let isLoggedIn = props.isLoggedIn;
  let setIsLoggedIn = props.setIsLoggedIn;

  function onToggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  return (
    
      <nav className='flex justify-between  w-[92%] mx-auto'>
        <div>
          <NavLink to='/'>
            <img src={logo} alt='Kennel' className='w-36' />
          </NavLink>
        </div>

        <div
          className={`md:static absolute bg-[#FEFAE0] min-h-[40vh] md:min-h-fit
         md:w-auto left-0 top-[-100%] w-full flex justify-center items-center ${
           isMenuOpen ? 'top-[9%]' : ''
         }`}
        >
          <ul className='flex md:flex-row flex-col font-bold md:items-center md:gap-[4vw] gap-8'>
            <li>
              <NavLink to='/'  className='hover:text-gray-500'>
                Home
              </NavLink>
            </li>
            <li>
            <Link to='work' spy={true} smooth={true} offset={50} duration={500} className='hover:text-gray-500'>
              Our Work
            </Link>
            </li>
            <li>
            <Link to='about' spy={true} smooth={true} offset={-100} duration={500} className='hover:text-gray-500'>
              About us
            </Link>
            </li>
          </ul>
        </div>

        <div className='flex space-x-3 font-bold items-center'>
          {!isLoggedIn && (
            <NavLink to='/Login' className='hover:text-gray-500'>
              <button>Login</button>
            </NavLink>
          )}
          <span>|</span>
          {!isLoggedIn && (
            <NavLink to='/Signup' className='hover:text-gray-500'>
              <button>Sign up</button>
            </NavLink>
          )}
          {isLoggedIn && (
            <NavLink to='/Logout' className='hover:text-gray-500'>
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  toast.success('Logged Out');
                }}
              >
                Log out
              </button>
            </NavLink>
          )}

          {isMenuOpen ? (
            <GiCancel
              className='text-3xl cursor-pointer md:hidden'
              onClick={onToggleMenu}
            />
          ) : (
            <GiHamburgerMenu
              className='text-3xl cursor-pointer md:hidden'
              onClick={onToggleMenu}
            />
          )}
        </div>
      </nav>

  );
};

export default Navbar;
