import {useState} from 'react';
import { useNavigate  } from 'react-router-dom';
// import Product from './Product';
import axios  from 'axios';


const ProductForm = () => {
    const [productName, setProductName] = useState('');
    const [productDesc, setProductDesc] = useState('');
    const navigate = useNavigate();

  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Create a new product object
      const adminId=localStorage.getItem("id");
      try {
        const response = await axios.post('http://localhost:9090/product/create', {
            productName,
            productDesc,
            adminId

        });
        console.log('Product added:', response.data);
        // Redirect to products page after successful submission
        navigate(0);
      } catch (error) {
        console.error('Error adding product:', error);
        // Handle error, show error message, etc.
      }
  
      setProductName('');
      setProductDesc('');
      
    };
  
    return (
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-bold mb-4">Add Product</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Product Description"
              value={productDesc}
              onChange={(e) => setProductDesc(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit" 
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default ProductForm;