import React, { useState, useEffect } from 'react';
import AdminMenu from '../../Layout/AdminMenu';
import Layout from '../../Layout/layout';
import axios from 'axios';
import moment from 'moment';
import { useAuth } from '../../context/auth';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();

  const getAllOrders = async () => {
    try {
      const { data } = await axios.get('/api/v1/auth/all-orders');
      if (data?.success) {
        setOrders(data.orders || []);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("❌ Error fetching orders:", error.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <Layout>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2 className="mb-3">🧾 All Orders</h2>

            {loading ? (
              <p>Loading orders...</p>
            ) : orders.length === 0 ? (
              <div className="alert alert-warning">No orders found.</div>
            ) : (
              orders.map((order, index) => (
                <div className="border shadow mb-4 p-3" key={order._id}>
                  <h5 className="text-secondary mb-2">
                    📦 Order #{index + 1}
                  </h5>
                  <table className="table table-bordered">
                    <thead className="table-dark">
                      <tr>
                        <th>Status</th>
                        <th>Buyer</th>
                        <th>Date</th>
                        <th>Payment</th>
                        <th>Total Items</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{order?.status || "Pending"}</td>
                        <td>{order?.buyer?.name || "Unknown"}</td>
                        <td>{moment(order?.createdAt).fromNow()}</td>
                        <td>{order?.payment?.success ? "✅ Success" : "❌ Failed"}</td>
                        <td>{order?.products?.length || 0}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="row">
                    {order.products?.map((product) => (
                      <div
                        className="col-md-6 d-flex mb-3"
                        key={product._id}
                      >
                        <div className="card w-100 flex-row">
                          <img
                            src={`/api/v1/product/product-photo/${product._id}`}
                            className="card-img-left"
                            alt={product.name}
                            style={{
                              width: '150px',
                              height: '150px',
                              objectFit: 'cover'
                            }}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">
                              {product.description?.substring(0, 50) || "No description"}
                            </p>
                            <p className="card-text">💰 ₹{product.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
