import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addProduct, removeProduct } from "../features/productSlice";

function Products() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products);

  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
  });

  // ฟังก์ชัน handleChange เพื่ออัปเดตค่าที่ผู้ใช้กรอกในฟอร์ม
  const handleChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  // ฟังก์ชัน handleAddProduct เพื่อเพิ่มสินค้าใหม่
  const handleAddProduct = (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้า
    dispatch(
      addProduct({
        id: newProduct.id,
        name: newProduct.name,
        price: newProduct.price,
        description: newProduct.description,
      })
    );
    // ล้างฟอร์มหลังจากเพิ่มสินค้าแล้ว
    setNewProduct({ id: "", name: "", price: "", description: "" });
  };

  const handleRemoveProduct = (id) => {
    dispatch(removeProduct(id));
  };

  return (
    <div>
      <h2>Product List</h2>

      <ul>
        {productList.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>
              {product.name} - {product.price}
            </Link>
            <button onClick={() => handleRemoveProduct(product.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      {/* ฟอร์มสำหรับเพิ่มสินค้าใหม่ */}
      <h2>Add New Product</h2>
      <form onSubmit={handleAddProduct}>
        <div>
          <label>ID:</label>
          <input
            type="number"
            name="id"
            value={newProduct.id}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            type="text"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default Products;
