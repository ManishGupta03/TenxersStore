import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import backArrow from '../Assets/backArrow.svg';
import starWhite from '../Assets/star-white.svg';
import clock from '../Assets/clock.svg';
import UpdateForm from './UpdateForm'; // Import the UpdateForm component

const CardDetail = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [data, setData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [showUpdateForm, setShowUpdateForm] = useState(false); // State to control form visibility

  const cacheKey = location.state || '';
  const [picture, setPicture] = useState('');

  useEffect(() => {
    async function getData() {
      const response = await axios.get('http://localhost:9090/product/get');
      setData(response.data.data);
      const selectedCard = response.data.data.find(card => card.productId === parseInt(id));
      setCard(selectedCard);
      const demo = localStorage.getItem(`${cacheKey.cacheKey}`);
      setPicture(demo);
    }
    getData();
  }, [id, cacheKey]);

  const handleUpdate = async (updatedData) => {
    try {
      // Call the API to update the product
      const response = await axios.post(`http://localhost:9090/product/update`, updatedData);
      alert('Product updated successfully!');
      setCard(response.data); // Update the card with the new data from the server
      setShowUpdateForm(false); // Hide the update form
      navigate(0);
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product.');
    }
  };
   const adminId = localStorage.getItem("id");
   const productId = parseInt(id);
  const handleDelete = async () => {
    try {
      // Call the API to delete the product
      await axios.post(`http://localhost:9090/product/delete`,{adminId,productId});
      alert('Product deleted successfully!');
      navigate(-1); // Navigate back to the previous page
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product.');
    }
  };

  if (!card) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex items-center mb-6 ml-[-220px]">
        <img
          src={backArrow}
          alt="Back Arrow"
          className="cursor-pointer w-6 h-6 mr-4"
          onClick={() => navigate(-1)}
        />
        <h2 className="text-2xl ">Product Details</h2>
      </div>
      {showUpdateForm ? (
        <UpdateForm card={card} onUpdate={handleUpdate} />
      ) : (
      <div className="flex flex-col md:flex-row bg-white shadow-md rounded-md overflow-hidden">
        <div className="md:w-1/2">
          <img
            className="object-cover w-[500px] h-[350px]"
            src={picture || 'https://via.placeholder.com/350x250'}
            alt="Product"
          />
        </div>
        <div className="md:w-1/2 p-6">
          <h1 className="text-3xl font-bold flex items-center justify-between ml-[40px]">
            {card.productName}
            <div className="flex items-center bg-green-500 text-white px-2 py-1 rounded-lg mr-[30px]">
              <span className="text-sm">4.2</span>
              <img src={starWhite} alt="Star" className="w-2.5 h-2.5 ml-1" />
            </div>
          </h1>

          <p className="text-gray-700 mt-4 ml-[40px]">{card.productDesc}</p>

          <div className="flex items-center mt-[90px] text-gray-600">
            <img src={clock} alt="Clock" className="w-5 h-5 mr-2 ml-[35px]" />
            <p className="text-sm ml-[0px]">{new Date(card.createdAt).toLocaleDateString()}</p>
            <p className="text-sm ml-[60px] font-bold ">By--→ {card.createdBy}</p>
          </div>
          <div className="flex  space-x-[200px] p-[40px] mt-[0px]">
            <button
              onClick={() => setShowUpdateForm(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 font-bold"
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600 font-bold"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default CardDetail;


