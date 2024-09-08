import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to Enigma Laundry</h1>
      <div className="flex flex-col items-center space-y-4">
        <Link to="/produk" className="w-full md:w-1/2 p-4 bg-blue-500 text-white text-center rounded-md shadow-md hover:bg-blue-600">
          Manage Products
        </Link>
        <Link to="/pelanggan" className="w-full md:w-1/2 p-4 bg-green-500 text-white text-center rounded-md shadow-md hover:bg-green-600">
          Manage Customers
        </Link>
        <Link to="/transakasi" className="w-full md:w-1/2 p-4 bg-yellow-500 text-white text-center rounded-md shadow-md hover:bg-yellow-600">
          Manage Transactions
        </Link>
      </div>
    </div>
  );
};

export default Home;
