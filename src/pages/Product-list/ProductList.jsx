import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ProductList.css"

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductImage, setNewProductImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:80/service/getProducts.php');
        console.log(response.data);
        setProducts(response.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    if (newProductName && newProductPrice && newProductImage) {
      const formData = new FormData();
      formData.append('name', newProductName);
      formData.append('price', newProductPrice);
      formData.append('image', newProductImage);

      try {
        const response = await axios.post('http://localhost:80/service/saveProduct.php', formData);
        console.log(response.data);

        // Fetch updated product list after successful save
        const updatedProducts = await axios.get('http://localhost:80/service/getProducts.php');
        setProducts(updatedProducts.data);
      } catch (error) {
        console.error('Error adding product:', error);
      }

      setNewProductName('');
      setNewProductPrice('');
      setNewProductImage(null);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:80/service/deleteProduct.php?id=${productId}`);
      console.log(response.data);

      // Fetch updated product list after successful deletion
      const updatedProducts = await axios.get('http://localhost:80/service/getProducts.php');
      setProducts(updatedProducts.data);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewProductImage(selectedImage);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div>
      <h2>Product List</h2>
      <div>
        <label>
          Search:
          <input type="text" value={searchQuery} onChange={handleSearch} />
        </label> 
      </div>
      <table className='productlist-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>

{filteredProducts.map((product) => (
    <tr key={product.id}>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{typeof parseFloat(product.price) === 'number' ? parseFloat(product.price).toFixed(2) : 'Invalid Price'} Rs.</td>
        <td>
            <img
                src={`http://localhost:80/${product.image_url}`}
                alt={`Product ${product.id}`}
                style={{ maxWidth: '50px' }}
            />
        </td>
        <td>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
        </td>
    </tr>
))}


        </tbody>
      </table>

      <div>
        <h2>Add Product</h2>
        <form>
          <label>
            Name:
            <input
              type="text"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              value={newProductPrice}
              onChange={(e) => setNewProductPrice(e.target.value)}
            />
          </label>
          <label>
            Image:
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
          <button type="button" onClick={handleAddProduct}>
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductList;
