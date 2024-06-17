import { useState } from 'react';

const UpdateForm = ({ card, onUpdate }) => {
  const [productName, setProductName] = useState(card.productName);
  const [productDesc, setProductDesc] = useState(card.productDesc);
 const productId = card.productId;
  const handleSubmit = (e) => {
    e.preventDefault();
    const adminId = localStorage.getItem("id");
    const updatedData = {
        productId,
        adminId,
      productName,
      productDesc,
    };
    onUpdate(updatedData);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Product Description</label>
          <textarea
            value={productDesc}
            onChange={(e) => setProductDesc(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600">
          Save
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
