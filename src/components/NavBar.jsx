import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-white text-2xl font-semibold">Enigma Laundry</Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/produk" className="text-gray-300 hover:text-white transition duration-150 ease-in-out">Produk</Link>
            <Link to="/addcustomer" className="text-gray-300 hover:text-white transition duration-150 ease-in-out">Data Pelanggan</Link>
            <Link to="/transaksi" className="text-gray-300 hover:text-white transition duration-150 ease-in-out">Transaksi</Link>

          </div>
          <div className="flex items-center">
            <button className="md:hidden text-gray-300 hover:text-white focus:outline-none focus:text-white transition duration-150 ease-in-out">
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/produk" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Produk</Link>
          <Link to="/pelanggan" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Pelanggan</Link>
          <Link to="/transaksi" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Transaksi</Link>
          <Link to="/addcustomer" className="text-gray-300 hover:text-white transition duration-150 ease-in-out">Data Pelanggan</Link>
          <Link to="/testpage" className="text-gray-300 hover:text-white transition duration-150 ease-in-out">cobacoba</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;