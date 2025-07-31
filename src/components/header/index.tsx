import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="text-xl font-bold">
          <Link to="/home">📌 Lost&Found</Link>
        </div>
        <button className="sm:hidden" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <nav className="hidden sm:flex gap-6">
          <Link to="/home" className="hover:text-gray-300">Asosiy</Link>
          <Link to="/home/additem" className="hover:text-gray-300">Topilma qo'shish</Link>
          <Link to="/contact" className="hover:text-gray-300">Kontakt</Link>
        </nav>
      </div>
      {isOpen && (
        <div className="sm:hidden bg-gray-700 px-4 py-2 flex flex-col gap-3">
          <Link to="/home" className="hover:text-gray-300" onClick={toggleMenu}>Asosiy</Link>
          <Link to="/home/additem" className="hover:text-gray-300" onClick={toggleMenu}>Topilma qo'shish</Link>
          <Link to="/contact" className="hover:text-gray-300" onClick={toggleMenu}>Kontakt</Link>
        </div>
      )}
    </header>
  );
}

export default Header;
