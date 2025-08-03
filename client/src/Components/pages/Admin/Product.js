import React, { useEffect, useState } from 'react';
import AdminMenu from '../../Layout/AdminMenu';
import Layout from '../../Layout/layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Product = () => {
  const [product, setProduct] = useState([]);

  // =============================
  // get all Products
  // =============================
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProduct(data.product);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // ===========================
  // lifecycle method
  // ===========================
  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <Layout>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
            {product?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/update-product/${p.slug}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: '18rem' }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{ width: '100%', height: '200px' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
