import { useEffect, useState } from 'react';
import { Input, Button, Card, CardHeader, Divider, CardBody, Checkbox, Spacer, Select, SelectItem } from '@nextui-org/react';
import { useSelector, useDispatch } from 'react-redux';
import { setPelanggan, addPelanggan, deletePelanggan } from '../redux/slices/pelangganSlice';
import { axiosInstance } from '../lib/axios';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { setProducts } from '../redux/slices/productSlice';
import NavBar from '../components/NavBar';

const PelangganPage = () => {
  const dispatch = useDispatch();
  const konsumen = useSelector(state => state.bills.konsumen);
  const products = useSelector(state => state.products.products);
  const [customers, setCustomers] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  // Define the schema for validation
  const schema = z.object({
    nama: z.string().nonempty('Nama wajib diisi'),
    telp: z.string().min(11, 'Minimal 11 angka no telp'),
  });
  

  // Setup react-hook-form
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  // Fetch pelanggan from the database
  const fetchTransaksi = async () => {
    try {
      const token = localStorage.getItem('nilai token');
      if (!token) {
        toast.error('Please log in to continue');
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };
      const response = await axiosInstance.get("/bills", { headers });
      dispatch(setPelanggan(response.data.data));
    } catch (error) {
      toast.error('Error fetching pelanggan');
    }
  };

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('nilai token');
      if (!token) {
        toast.error('Please log in to continue');
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };
      const response = await axiosInstance.get("/products", { headers });
      dispatch(setProducts(response.data.data));
    } catch (error) {
      toast.error('Error fetching products');
    }
  };

  // Fetch customers from the API
  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem('nilai token');
      if (!token) {
        toast.error('Please log in to continue');
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };
      const response = await axiosInstance.get("/customers", { headers });
      setCustomers(response.data.data);
    } catch (error) {
      toast.error('Error fetching customers');
    }
  };

  //Handle form submission
  const onSubmit = async (data) => {
    try {
      // Prepare the products with quantity
      const selectedProductsWithQty = Object.keys(selectedProducts).map(productId => ({
        productId,
        qty: selectedProducts[productId].qty,
      }));

      // Add new customer
      const token = localStorage.getItem('nilai token');
      console.log("Token:", token); // Cek apakah token valid
      if (!token) {
        toast.error('Please log in to continue');
        return;
      };
      const headers = { Authorization: `Bearer ${token}` };
            console.log("Payload yang dikirim:", {
              name: data.name,
              totalPrice: totalPrice,
              products: selectedProductsWithQty,
            });
            
            const response = await axiosInstance.post("/bills", {
              name: data.name,
              totalPrice: totalPrice,
              products: selectedProductsWithQty,
            }, { headers });
            
            
      dispatch(addPelanggan({
        id: response.data.id,
        name: data.name,
        totalPrice: totalPrice,
        products: selectedProductsWithQty,
      }));
      toast.success('Customer added successfully');
      reset();
      fetchTransaksi();
      fetchProducts();
      setSelectedProducts({});
      setTotalPrice(0);
    } catch (error) {
      console.error('Error:', error.response?.data || error.message); // Tambahkan logging lebih detail
      toast.error(error.response?.data?.message || 'Something went wrong');
    };
        
  };

  // const calculate = (qty, price) => ({
  //   newTotal : qty * price,
  // }); setTotalPrice(newTotal); setTotalPrice(0);

  // const submitButton = async (data) => {
  //   const payload = {
  //     customerId: data.customers,
  //     billDetails: [
  //       {
  //         product: {
  //           id: data.products,
  //         },
  //         qty: data.qty,
  //       },
  //     ],
  //   };
  //   await dispatch(postBill(payload));
  //   console.log(data);
  //   onOpenChange(false);
  // };

  // Handle customer deletion
  // const handleDelete = async (id) => {
  //   const pelanggan = konsumen.find(bills => bills.id === id);
  //   if (!pelanggan) {
  //     toast.error('Customer not found');
  //     return;
  //   }
  //   try {
  //     await axiosInstance.delete(`/bills/${id}`);
  //     dispatch(deletePelanggan(id));
  //     toast.success('Customer deleted successfully');
  //   } catch (error) {
  //     toast.error('Error deleting customer');
  //   }
  // };

  

  // Calculate total price of selected products
  const calculateTotalPrice = (selectedProducts) => {
    const newTotal = Object.keys(selectedProducts).reduce((sum, productId) => {
      if (selectedProducts[productId]?.isSelected) {
        const product = products.find(p => p.id === productId);
        if (product) sum += product.price * (selectedProducts[productId].qty || 1);
      }
      return sum;
    }, 0);
    setTotalPrice(newTotal);
  };  

  // Handle product selection and update total price
  const handleProductChange = (productId, qty) => {
    setSelectedProducts(prev => {
      const updatedSelection = {
        ...prev,
        [productId]: {
          ...prev[productId],
          isSelected: !prev[productId]?.isSelected,
          qty: qty || 1, // Default quantity to 1 if not provided
        }
      };
      calculateTotalPrice(updatedSelection);
      return updatedSelection;
    });
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchTransaksi(); // Ambil transaksi pelanggan
    fetchProducts();  // Ambil data produk
    fetchCustomers(); // Ambil daftar pelanggan
  }, [dispatch]);
  
  // Render loading jika data belum selesai diambil
  if (!konsumen.length || !products.length || !customers.length) {
    return <p>Loading...</p>;
  }
  
  

  // Convert product IDs to product names with quantity
  // const getSelectedProductNames = (selectedProductIds) => {
  //   if (!selectedProductIds || !Array.isArray(selectedProductIds)) {
  //     return '';
  //   }
  
  //   return selectedProductIds.map(({ productId, qty }) => {
  //     const product = products.find(p => p.id === productId);
  //     return `${product?.name || 'Unknown Product'} (Qty: ${qty})`;
  //   }).join(', ');
  // };
  

  return (
    <div className='p-4'>
      <NavBar />
      <h1 className='text-center text-xl font-semibold'>Masukan Data Diri & Pesanan</h1>

      <div className='flex flex-col items-center p-4'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
          <div className='gap-5'>
            <Select aria-label="Select Customers" placeholder="Select Customer">
              {customers.map(customer => (
                <SelectItem key={customer.id} value={customer.id}>
                  {customer.name}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div>
            <p>Pilih Produk:</p>
            {Array.isArray(products) && products.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Produk</th>
                    <th>Kuantitas</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id} className='flex items-center'>
                      <td>
                        <div className='flex items-center'>
                          <Checkbox
                            isSelected={selectedProducts[product.id]?.isSelected || false}
                            onChange={() => handleProductChange(product.id, selectedProducts[product.id]?.qty || 1)}
                          >
                            {product.name} | ({product.type}) | Rp{product.price},-
                          </Checkbox>
                        </div>
                      </td>
                      <td>
                        {selectedProducts[product.id]?.isSelected && (
                          <Input
                            type="number"
                            min="1"
                            value={selectedProducts[product.id]?.qty || 1}
                            onChange={(e) => handleProductChange(product.id, Number(e.target.value))}
                            className="ml-4"
                            label="Qty"
                            width="80px"
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No products available.</p>
            )}
          </div>

          <div>Total Harga Produk: Rp{totalPrice}</div>
          <div className="mt-4">
          <Button onClick={onSubmit} type='submit'>Save Transaction</Button>
          </div>
        </form>
      </div>

      <Divider className="my-5" />

      <div>
        {konsumen.map((konsumen) => (
          <Card key={konsumen.id} className='w-full mt-3'>
            <CardHeader>
              <h2 className='text-lg'>{konsumen.customer.name}</h2>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>Produk: {konsumen.product}</p>
              <p>Qty: {konsumen.qty} | Kg</p>
              <p>Total Harga: Rp{konsumen.qty * konsumen.price}</p>
              {/* <div className='mt-2'>
                <Button onPress={() => handleDelete(item.id)}>Delete</Button>
                <Link to={`/customers/${item.id}`}>
                  <Button>Edit</Button>
                </Link>
              </div> */}
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PelangganPage;
