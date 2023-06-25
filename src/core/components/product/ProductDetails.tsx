import React, { useState } from 'react';

type ProductDetailsProps = {
  product?: any
}
const ProductDetails = (props: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    // Logique pour ajouter le produit au panier
    console.log(`Ajouter au panier : ${props.product.name}, Quantité : ${quantity}`);
  };

  const handleAddToWishlist = () => {
    // Logique pour ajouter le produit à la liste de souhaits
    console.log(`Ajouter à la liste de souhaits : ${props.product.name}`);
  };

  const renderQuantityOptions = () => {
    const options = [];
    for (let i = 1; i <= props.product.stock; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  return (
    <div className="w-64 p-4 border border-gray-300 rounded bg-white">
      <h2 className="text-lg font-bold mb-2">{props.product.name}</h2>
      <p className="text-gray-800 mb-2">Prix : {props.product.price}</p>
      <select
        value={quantity}
        onChange={handleQuantityChange}
        className="w-full mb-2 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      >
        {renderQuantityOptions()}
      </select>
      <button
        onClick={handleAddToCart}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Ajouter au panier
      </button>
      <button
        onClick={handleAddToWishlist}
        className="w-full bg-gray-300 text-gray-800 py-2 rounded mt-2 hover:bg-gray-400"
      >
        Ajouter à la liste de souhaits
      </button>
    </div>
  );
};

export default ProductDetails;
