// PointOfSale.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pointofsale.css'; // Make sure the file path is correct

const PointOfSale = () => {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch products or set them from your context/state
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:80/service/getProducts.php');
        const products = response.data || [];
        setAllProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    // Check if the product is already in the cart
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // If the product is already in the cart, update the quantity instead of adding a new item
      const updatedCart = cart.map((item) =>
        item.id === existingProduct.id ? { ...item, quantity: item.quantity + 1 } : item
      );

      setCart(updatedCart);
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    // Update the total amount
    setTotalAmount(totalAmount + parseFloat(product.price));
  };

  const handleRemoveFromCart = (productId) => {
    // Find the item in the cart
    const itemToRemove = cart.find((item) => item.id === productId);

    if (itemToRemove) {
      // If the item is in the cart, update the quantity and total amount
      const updatedCart = cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, item.quantity - 1) } // Ensure quantity is not negative
          : item
      );

      setCart(updatedCart);

      // Ensure that the total amount is not reduced below zero
      setTotalAmount(Math.max(0, totalAmount - parseFloat(itemToRemove.price)));
    }
  };

  const handleCheckout = async () => {
    // Implement the checkout logic here, e.g., send a request to the server
    // You can pass the 'cart' array to the server for processing
    try {
      // Example: Sending a POST request to the server for checkout
      const response = await axios.post('http://localhost:80/service/checkout.php', { cart });
      console.log(response.data);

      // Clear the cart and update the total amount after successful checkout
      setCart([]);
      setTotalAmount(0);
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    // Update the filteredProducts based on the search query
    const updatedFilteredProducts = allProducts.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
    setFilteredProducts(updatedFilteredProducts);
  };

  return (
    <div className="point-of-sale-container">
      <div className="product-list-container">
        <h3>Product List</h3>
        <label className="search-label">
          Search:
          <input type="text" value={searchQuery} onChange={handleSearch} className="search-input" />
        </label>
        {/* Render the product list with an 'Add to Cart' button */}
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-list-item">
            <p>
              {product.name} - {parseFloat(product.price).toFixed(2)} Rs.
            </p>
            <img
              src={`http://localhost:80/${product.image_url}`}
              alt={`Product ${product.id}`}
              style={{ maxWidth: '50px', borderRadius: '5px' }}
            />
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div className="cart-container">
        <h3>Cart</h3>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - {parseFloat(item.price).toFixed(2)} Rs. - Quantity: {item.quantity}
              <button onClick={() => handleRemoveFromCart(item.id)}>Remove from Cart</button>
            </li>
          ))}
        </ul>
        <p>Total Amount: {totalAmount.toFixed(2)} Rs.</p>
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default PointOfSale;
