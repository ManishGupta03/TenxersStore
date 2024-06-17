

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerCard = ({product}) => {
  const [imageElement, setImageElement] = useState(null);
  const clientId = "fEnjprnmiPtmrBocZk6FeubbgW2LPR99EJ7TW03wZuk";
  const cacheKey = `productImage_${product.productId}`;
  const cachedImage = localStorage.getItem(cacheKey);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (cachedImage) {
          setImageElement(cachedImage);
          return;
        }

        const endpoint = `https://api.unsplash.com/photos/random/?query=mobile&client_id=${clientId}`;
        const response = await fetch(endpoint);
        if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
        const jsonData = await response.json();
        const imageUrl = jsonData.urls.regular;

        localStorage.setItem(cacheKey, imageUrl);
        setImageElement(imageUrl);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, [cacheKey, cachedImage]);

  const handleCardClick = () => {
    navigate(`/customer/${product.productId}`, { state: { cacheKey: cacheKey } });
  };


  return (
   <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-[65.5vw] m-[20px] border-2 border-black-400" onClick={handleCardClick}>
        <div className="md:w-1/2">
        {imageElement ? (
        <img src={imageElement} alt="randomImage" className="w-[500px] h-[200px] " />
      ) : (
        <div>Loading image...</div>
      )}
        </div>
        <div className="md:w-1/2 p-6 bg-gradient-to-r from-gray-500 via-gray-300 to-pink-100 text-black ml-[0px] ">
          <h1 className="text-3xl  font-bold flex items-center justify-between ml-[40px] ">
            {product.productName}
             </h1>

          <p className="text-black mt-4 ml-[40px]">{product.productDesc}</p>
          </div>
          </div>
  );
};

export default CustomerCard;
