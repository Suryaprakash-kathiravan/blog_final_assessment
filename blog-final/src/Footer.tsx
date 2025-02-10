import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 p-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-white">
          &copy; 2025 My Blog. All rights reserved.
        </p>
        <p>
          <a href="/about" className="text-white hover:underline">
            About
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
