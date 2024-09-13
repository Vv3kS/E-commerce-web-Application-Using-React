import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar({ setCatname, finalCategory }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (finalCategory.includes(searchTerm.toLowerCase())) {
      setCatname(searchTerm.toLowerCase());
    } else {
      setCatname('');
      alert('No category found');
    }
  };

  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="max-w-[1320px] mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-mono font-bold cursor-pointer" onClick={() => navigate('/')}>
          Vvek Store
        </h1>
        <div className="space-x-4">
          <button className="hover:text-gray-400" onClick={() => navigate('/')}>Home</button>
          <button className="hover:text-gray-400" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            Search
          </button>
          <button className="hover:text-gray-400" onClick={handleLoginLogout}>
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>
      {isSearchOpen && (
        <div className="max-w-[1320px] mx-auto mt-4">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              placeholder="Search category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 text-gray-900 rounded-md focus:outline-none"
            />
            <button type="submit" className="ml-4 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600">
              Search
            </button>
          </form>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
