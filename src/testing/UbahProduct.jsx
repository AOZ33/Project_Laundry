import React, { useState } from "react";
import { axiosInstance } from '../lib/axios'; // Import axios for HTTP requests

const UbahProduct = ({ id, name, price, type }) => {
  const [productName, setProductName] = useState(name);
  const [productPrice, setProductPrice] = useState(price);
  const [productType, setProductType] = useState(type);
  const [message, setMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("nilai token");
      const updatedProduct = {
        id: id,  // Include ID if your backend uses it in the request body
        name: productName,
        price: parseFloat(productPrice), // Ensure price is a number
        type: productType,
      };

      // Sending the product ID, name, and price in the request body
      const response = await axiosInstance.put(
        `/products`, // Endpoint without ID in the URL
        updatedProduct, // Request body with updated product details
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("Product updated successfully!");
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      if (error.response) {
        // Handle different error statuses
        if (error.response.status === 404) {
          setMessage("Product not found. Please check the details.");
        } else if (error.response.status === 401) {
          setMessage("Unauthorized access. Please log in.");
        } else {
          setMessage("Error updating product: " + error.response.status);
        }
      } else {
        setMessage("Network error or server is down.");
      }
      console.error("ERROR UPDATING DATA", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleUpdate} className="flex space-x-2">
      
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Product Name"
          className="border p-1 w-28"
        />
        <input
          type="text"
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
          placeholder="Product Type"
          className="border p-1 w-9"
        />
        <input
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          placeholder="Product Price"
          className="border p-1 w-20"
        />
        
        <button type="submit" className="bg-blue-500 text-white p-1 justify-center">
          Update
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UbahProduct;