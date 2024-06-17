import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const ProductCard = ({product}) => {
    const [imageElement, setImageElement] = useState(null);
    const clientId = "fEnjprnmiPtmrBocZk6FeubbgW2LPR99EJ7TW03wZuk";
    // const endpoint = `https://api.unsplash.com/photos/random/?client_id=${clientId}`;
    const cacheKey = `productImage_${product.productId}`; // Unique key for caching
    const cachedImage = localStorage.getItem(cacheKey); // Attempt to retrieve cached image

    const navigate = useNavigate();


//     useEffect(() => {
//     const fetchImage = async () => {
//       try {
//         const response = await fetch(endpoint);
//         const jsonData = await response.json();
//         setImageElement(jsonData.urls.regular);
//       } catch (error) {
//         console.error('Error fetching image:', error);
//       }
//     };

//     fetchImage();
//   }, []); // Empty dependency array ensures this runs only once

useEffect(() => {
    const fetchImage = async () => {
      try {
        // Check if image is cached
        if (cachedImage) {
          setImageElement(cachedImage); // Set cached image
        //   console.log("cached");
          return;
        }

        // Fetch image from API
        const endpoint = `https://api.unsplash.com/photos/random/?query=mobile&client_id=${clientId}`;
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        const imageUrl = jsonData.urls.regular;

        // Store image URL in local storage for caching
        localStorage.setItem(cacheKey, imageUrl);
        setImageElement(imageUrl);
      } catch (error) {
        console.error('Error fetching image:', error);
        
      }
    };

    fetchImage();
  }, [cacheKey, cachedImage]); // Dependencies: cacheKey and cachedImage


  const handleCardClick = () => {
    navigate(`/card/${product.productId}`,{state:{cacheKey:cacheKey}});
  };

  return (
    <div onClick={handleCardClick} className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white mx-2 my-2" >
      <div className="px-6 py-4">
        {imageElement ? (
          <img src={imageElement} alt="randomImage" className="w-[250px] h-[250px] " />
        ) : (
          <div>Loading image...</div>
        )}
        <div className="font-bold text-xl mb-2 w-[250px]">{product.productName}</div>
        <p className="text-gray-700 text-base w-[250px]">{product.productDesc}</p>
      </div>
      {/* Additional details or actions can be added here */}
    </div>
  );    
};

export default ProductCard;