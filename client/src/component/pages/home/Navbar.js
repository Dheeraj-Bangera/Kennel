import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-scroll';
import logo from '../../../assets/logo.png';
import { toast } from 'react-hot-toast';
import { GiHamburgerMenu, GiCancel } from 'react-icons/gi';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../../redux/reducers/rootSlice';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  function onToggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    toast.success('Logged Out');
      dispatch(setUserInfo({}));
      window.location.reload();

    setIsLoggedIn(false);
  }

  return (
    <nav className='flex justify-between w-[92%] mx-auto'>
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
            <NavLink to='/feeds' className='hover:text-gray-500'>
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
          <div>
            <NavLink to='/Login' className='hover:text-gray-500 mx-2'>
              <button>Login</button>
            </NavLink>
            <span>|</span>
            <NavLink to='/Signup' className='hover:text-gray-500 mx-2'>
              <button>Sign up</button>
            </NavLink>
          </div>
        )}

        {isLoggedIn && (
          <button className='hover:text-gray-500' onClick={handleLogout}>
            Log out
          </button>
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
