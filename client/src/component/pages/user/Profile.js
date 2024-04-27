import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../feeds/navbar/FeedsNav';

const Profile = () => {
  // const [showSearch, setShowSearch] = useState(false); // Set initial state to true to show the search bar
  const { activepage } = useParams();

  return (
    <div>
      <Navbar  /> {/* Pass showSearch as a prop */}
    </div>
  );
};

export default Profile;
