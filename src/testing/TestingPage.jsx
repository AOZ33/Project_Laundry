import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { axiosInstance } from '../lib/axios'; // Import axios for HTTP requests
import UbahProduct from "./UbahProduct";
import { useNavigate } from 'react-router-dom';

// import Header from "../navbar/Header";

const TestingPage = () => {
  const [products, setProducts] = useState([]); // Local state for products
  const [loading, setLoading] = useState(true); // State to manage loading
  const navigate = useNavigate();
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("nilai token");
      const response = await axiosInstance.get("/products", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      setProducts(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching products:", error);
      setLoading(false);
    }
  };

  const toProduct = () => {
    navigate('/produk')
  };

  useEffect(() => {
    fetchProducts(); // Fetch products on component mount
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <Table aria-label="Product List" className="w-3/8 h-4/5">
            <TableHeader className="text-lg font-semibold">
              <TableColumn>NAME</TableColumn>
              <TableColumn>TYPE</TableColumn>
              <TableColumn>PRICE</TableColumn>
              <TableColumn className="text-right">ACTION</TableColumn>
            </TableHeader>

            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.type}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell style={{height: 'auto',  minWidth: '100%',}}>
                    <UbahProduct
                      id={product.id}
                      name={product.name}
                      type={product.type}
                      price={product.price}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <Button onClick={toProduct}>Back To Product</Button>
      </div>
    </>
  );
};

export default TestingPage;