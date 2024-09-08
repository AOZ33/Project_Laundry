import { useEffect, useState } from 'react';
import { Input, Button, Card, CardHeader, Divider, CardBody } from '@nextui-org/react';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, addProduct, deleteProduct, updateProduct, setAuthData } from '../redux/slices/productSlice';
import { axiosInstance } from '../lib/axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import NavBar from '../components/NavBar';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const authData = useSelector((state) => state.products.authData);
  // const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const getToken = () => {
    try {
      return authData?.token || localStorage.getItem('nilai token');
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  };

  const schema = z.object({
    name: z.string().nonempty('Harus Masukan Nama Barang'),
    price: z.preprocess((val) => Number(val), z.number().positive().min(1000, 'Minimal Masukan harga 1000 atau lebih')),
    type: z.string().nonempty('Harus Masukan Nama Satuan'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const logout = () => {
    try {
      localStorage.removeItem('nilai token');
      dispatch(setAuthData(null));
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Error during logout');
    }
  };

  useEffect(() => {
    const logoutTimer = setTimeout(() => {
      logout();
    }, 30 * 60 * 1000); // 30 menit dalam milidetik

    return () => clearTimeout(logoutTimer);
  }, [dispatch]);

  const fetchProducts = async () => {
    try {
      const token = getToken();
      if (!token) throw new Error('No token found');

      const headers = { Authorization: `Bearer ${token}` };
      const response = await axiosInstance.get('/products', { headers });

      if (response.status === 200) {
        dispatch(setProducts(response.data.data || []));
      } else {
        toast.error('Failed to fetch products');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Unauthorized: Please check your token or login again');
        logout();
      } else {
        const errorMessage = error.response?.data?.message || 'Failed to fetch products';
        toast.error(errorMessage);
      }
      console.error('Error fetching products:', error);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const token = getToken();
      if (!token) throw new Error('No token found');

      const headers = { Authorization: `Bearer ${token}` };
      const response = await axiosInstance.post(
        '/products',
        {
          name: data.name,
          price: Number(data.price),
          type: data.type,
        },
        { headers }
      );
      dispatch(
        addProduct({
          id: response.data.id,
          name: data.name,
          price: Number(data.price),
          type: data.type,
        })
      );
      toast.success('Product added successfully');
      reset(); // Reset form after successful submission
      fetchProducts(); // Refetch products to get the latest list
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error saving product';
      toast.error(errorMessage);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // const updateDataProduct = async (data) => {
  //   setLoading(true);
  //   try {
  //     const token = getToken();
  //     if (!token) throw new Error('No token found');

  //     const headers = { Authorization: `Bearer ${token}` };
  //     const response = await axiosInstance.put(`/products/${editingProduct.id}`, {
  //       name: data.name,
  //       price: Number(data.price),
  //       type: data.type,
  //     }, { headers });

  //     if (response.status === 200) {
  //       dispatch(updateProduct(response.data.data));
  //       toast.success('Product updated successfully');
  //       setEditingProduct(null);
  //       reset();
  //       fetchProducts(); // Refresh the list of products after update
  //     } else {
  //       toast.error('Failed to update product');
  //     }
  //   } catch (error) {
  //     const errorMessage = error.response?.data?.message || 'Failed to update product';
  //     toast.error(errorMessage);
  //     console.error('Error updating product:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Apakah Anda yakin ingin menghapus barang ini?');
    if (!confirmed) return;

    try {
      const token = getToken();
      if (!token) throw new Error('No token found');

      const headers = { Authorization: `Bearer ${token}` };
      await axiosInstance.delete(`/products/${id}`, { headers });
      dispatch(deleteProduct(id));
      toast.success('Product deleted successfully');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error deleting product';
      toast.error(errorMessage);
      console.error('Error:', error);
    }
  };

  // const handleEdit = (product) => {
  //   setEditingProduct(product);
  //   setValue('name', product.name);
  //   setValue('price', product.price);
  //   setValue('type', product.type);
  // };

  const toEdit = () => {
    navigate('/EditPage')
  };

  useEffect(() => {
    fetchProducts();
  }, [authData]);

  return (
    <div className='p-4'>
      <NavBar />
      <h1 className='text-center text-xl font-semibold'>Masukan Data Barang</h1>

      <div className='flex flex-col items-center p-4'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
          <div className='flex p-4 gap-4'>
            <div className='gap-5'>
              <Input
                {...register('name')}
                label="Nama Barang"
                color='secondary'
              />
              {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>

            <div className='gap-5'>
              <Input
                {...register('type')}
                label="Tipe barang Satuan/Kg"
                color='secondary'
              />
              {errors.type && <span className="text-red-500">{errors.type.message}</span>}
            </div>

            <div className='gap-5'>
              <Input
                type="number"
                {...register('price')}
                label="Harga Jasa"
                color='secondary'
              />
              {errors.price && <span className="text-red-500">{errors.price.message}</span>}
            </div>
          </div>
          <Button type='submit' color='primary' disabled={loading}>
            {loading ? 'Processing...' : ('Tambahkan')}
          </Button>
        </form>
      </div>

      <div className='flex flex-col items-center p-2'>
        <Card className="flex flex-col items-center p-4">
          <CardHeader className="font-semibold text-lg justify-center">Daftar Barang</CardHeader>
          <Divider />
          <CardBody>
            {products.length === 0 ? (
              <p className='text-center'>Tidak Ada Barang Yang Dimasukan</p>
            ) : (
              <table className="table-auto w-full mt-4">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Nama</th>
                    <th className="px-4 py-2">Tipe</th>
                    <th className="px-4 py-2">Harga</th>
                    <th className="px-4 py-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="text-center">
                      <td className="border px-4 py-2">{product.name}</td>
                      <td className="border px-4 py-2">{product.type}</td>
                      <td className="border px-4 py-2">Rp{product.price},-</td>
                      <td className="border px-4 py-2">
                        <Button className='bg-yellow-500 text-white mr-2' size="sm" onClick={toEdit} >Edit</Button>
                        <Button className='bg-red-500 text-white' size="sm" onClick={() => handleDelete(product.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardBody>
        </Card>
      </div>

      <div className='mt-4 text-center'>
        <Button onClick={logout} color='primary'>Logout</Button>
      </div>
    </div>
  );
};

export default ProductsPage;
