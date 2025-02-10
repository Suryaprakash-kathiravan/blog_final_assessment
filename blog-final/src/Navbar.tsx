import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">My Blog</div>
        <div className="space-x-4 hidden md:flex">
          <Link to="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Home</Link>
          <Link to="/create-new" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Create New</Link>
          <Link to="/blogs" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Blogs</Link>
          <Link to="/contact" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Contact</Link>
        </div>
        <button className="md:hidden text-white focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden space-y-2 mt-2">
          <Link to="/" className="block text-white hover:bg-gray-700 px-3 py-2 rounded">Home</Link>
          <Link to="/create-new" className="block text-white hover:bg-gray-700 px-3 py-2 rounded">Create New</Link>
          <Link to="/blogs" className="block text-white hover:bg-gray-700 px-3 py-2 rounded">Blogs</Link>
          <Link to="/contact" className="block text-white hover:bg-gray-700 px-3 py-2 rounded">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
