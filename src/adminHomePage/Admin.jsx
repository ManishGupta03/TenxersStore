import {useState,useEffect} from 'react';
import ProductForm from './ProductForm';
// import Product from './Product';
import axios from 'axios';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';
import backArrow from '../Assets/backArrow.svg';





const Admin = () => {
   
    const [isFormVisible, setFormVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [products,setProducts] = useState([]);
    const navigate = useNavigate();


    const toggleFormVisibility = () => {
        setFormVisible(!isFormVisible);
      };
   
      const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get('http://localhost:9090/product/get');
          console.log(response);
          setProducts(response.data.data);
          console.log(products);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchProducts();
    }, []); // Empty dependency array ensures useEffect runs only once

     // Filter products based on the search query
    const filteredProducts = searchQuery? products.filter(product =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
    ) : products;
    const name = localStorage.getItem("name1");
  return (
    <div className="container mx-auto p-4">
        <div className='flex justify-between p-[20px]'>
      <h1 className="text-2xl font-bold mb-4 ">{name} Products</h1>
      <span className="px-8 bg-blue-700 rounded-full border border-blue-900 opacity-80 hover:opacity-100 cursor-pointer font-bold text-0.5xl inline-flex items-center justify-center text-white" onClick={toggleFormVisibility} >{isFormVisible ? 'Create' : 'Create'}</span></div>
      <div className="flex items-center mb-6 ">
        <img src={backArrow}  alt="Back Arrow" className="cursor-pointer w-6 h-6 mr-4" onClick={() => navigate(-1)}/>
        <h2 className="text-2xl sm:text-xl">Product List</h2>
      </div>
      <div className="mb-4">
                <input type="text"placeholder="Search products..." value={searchQuery} onChange={handleSearchChange} className="w-full px-4 py-2 border rounded"/>
            </div>
      {isFormVisible && <div className="mb-4"><ProductForm/></div>}
      <div className="flex flex-wrap justify-center ">
      {filteredProducts.map((product) => (
        <ProductCard key={product.productId} product={product} />
      ))}
      </div>
      {/* <div><Product/></div> */}
      </div>
  )
}

export default Admin