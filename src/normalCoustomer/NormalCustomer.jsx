import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import backArrow from '../Assets/backArrow.svg';
import NormalCustomerCard from './NormalCustomerCard';


const NormalCustomer = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:9090/product/get');
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleClick = ()=>{
    navigate('/login');
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
};

const filteredProducts = searchQuery? products.filter(product =>
  product.productName.toLowerCase().includes(searchQuery.toLowerCase())
) : products;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex items-center mb-6 mt-[20px]">
        {/* <img
          src={backArrow}
          alt="Back Arrow"
          className="cursor-pointer w-6 h-6 mr-4"
          onClick={() => navigate(-1)}
        /> */}
        <h2 className="text-2xl ">Customer Product List</h2>
      </div>
      <div>
      <span className="px-8 ml-[1200px] bg-blue-700 rounded-full border border-blue-900 opacity-80 hover:opacity-100 cursor-pointer font-bold text-0.5xl inline-flex items-center justify-center text-white mb-[20px] h-[40px] " onClick={handleClick} >Login/Signup</span>
      </div>
      <div className="mb-4">
                <input type="text"placeholder="Search products..." value={searchQuery} onChange={handleSearchChange} className="w-full px-4 py-2 border rounded"/>
            </div>
      <div className="flex flex-wrap justify-center ">
        {filteredProducts.map((product) => (
            
          <NormalCustomerCard key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
};

export default NormalCustomer;