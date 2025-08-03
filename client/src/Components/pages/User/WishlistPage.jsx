import React, { useEffect, useState } from 'react';
import axios from 'axios';
import $ from 'jquery';
import toast from 'react-hot-toast';
import Layout from '../../Layout/layout';
import { useAuth } from '../../context/auth';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [auth] = useAuth();

  const loadWishlist = async () => {
    try {
      const { data } = await axios.get('/api/v1/wishlist/user', {
        headers: { Authorization: auth?.token },
      });
      if (data?.success) setWishlist(data.wishlist);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    $(document).on('click', '.remove-from-wishlist', async function () {
      const id = $(this).data('id');
      try {
        const { data } = await axios.delete(`/api/v1/wishlist/remove/${id}`, {
          headers: { Authorization: auth?.token },
        });

        if (data?.success) {
          toast.success('Removed from wishlist');
          loadWishlist();
        } else {
          toast.error('Remove failed');
        }
      } catch (err) {
        toast.error('Error removing');
        console.error(err);
      }
    });

    return () => {
      $(document).off('click', '.remove-from-wishlist');
    };
  }, [auth]);

  useEffect(() => {
    if (auth?.token) loadWishlist();
  }, [auth?.token]);

  return (
    <Layout title="Your Wishlist">
      <div className="container my-5">
        <h2 className="mb-4 text-center fw-bold text-primary">💖 Your Wishlist</h2>

        {wishlist.length === 0 && (
          <div className="alert alert-info text-center">
            No items in your wishlist.
          </div>
        )}

        <div className="row">
          {wishlist.map((item) => (
            <div key={item._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm h-100">
                <img
                  src={`/api/v1/product/product-photo/${item.product._id}`}
                  className="card-img-top"
                  alt={item.product.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{item.product.name}</h5>
                    <p className="card-text text-muted">
                      {item.product.description?.substring(0, 60)}...
                    </p>
                  </div>
                  <button
                    className="btn btn-outline-danger mt-3 remove-from-wishlist"
                    data-id={item._id}
                  >
                    <i className="bi bi-trash me-2"></i>Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default WishlistPage;
