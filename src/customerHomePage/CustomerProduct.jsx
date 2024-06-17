import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backArrow from '../Assets/backArrow.svg';
import CustomerCard from './CustomerCard';


const CustomerProduct = () => {
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
};

const filteredProducts = searchQuery? products.filter(product =>
  product.productName.toLowerCase().includes(searchQuery.toLowerCase())
) : products;
const name = localStorage.getItem("name1");
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex items-center mb-6">
        <img
          src={backArrow}
          alt="Back Arrow"
          className="cursor-pointer w-6 h-6 mr-4"
          onClick={() => navigate(-1)}
        />
        <h2 className="text-2xl">{name} Products</h2>
      </div>
      <div className="mb-4">
                <input type="text"placeholder="Search products..." value={searchQuery} onChange={handleSearchChange} className="w-full px-4 py-2 border rounded"/>
            </div>
      <div className="flex flex-wrap justify-center ">
        {filteredProducts.map((product) => (
            
          <CustomerCard key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CustomerProduct;