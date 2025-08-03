import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast'
import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import axios from 'axios';
import Layout from '../Layout/layout';
import { useAuth } from '../context/auth'; 
//import $ from 'jquery'; 

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [auth] = useAuth(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');


// new work
const handleAddToWishlist = async (productId) => {
  if (!auth?.token) {
    toast.error("Please login to add to wishlist");
    return;
  }

  try {
    const { data } = await axios.post(
      "/api/v1/wishlist/add",
      { productId },
      {
        headers: { Authorization: auth.token },
      }
    );

    if (data?.success) {
      toast.success(data.message || "Added to wishlist");
    } else {
      toast.error(data?.message || "Already in wishlist");
    }
  } catch (err) {
    console.error("❌ Error in wishlist:", err);
    toast.error("Error adding to wishlist");
  }
};

// new work
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/v1/product/get-product/${slug}`);
        const prod = response.data.product;
        setProduct(prod);
        setMainImage(`/api/v1/product/product-photo/${prod._id}`);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch product');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const changeImage = (imageUrl) => {
    setMainImage(imageUrl);
  };


  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item._id === product._id);

    if (existingItem) {
      existingItem.quantity += quantity;
      toast.info('Product quantity updated in cart');
    } else {
      cart.push({ ...product, quantity });
      toast.success('Product added to cart');
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  };

    

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!product) return <div className="alert alert-info">Product not found</div>;

  return (
    <Layout>
      <div className="container py-5">
        <div className="row">
          {/* Product Images */}
          <div className="col-md-6 mb-4">
            {mainImage && (
              <img
                src={mainImage}
                alt={product.name}
                className="img-fluid rounded shadow-sm mb-3"
                style={{ maxHeight: '500px', objectFit: 'contain' }}
              />
            )}
            {/* Thumbnail */}
            <div className="d-flex gap-2">
              <img
                src={`/api/v1/product/product-photo/${product._id}`}
                alt="Thumbnail"
                onClick={() => changeImage(`/api/v1/product/product-photo/${product._id}`)}
                className={`rounded ${mainImage.includes(product._id) ? 'border border-primary' : ''}`}
                style={{ width: '80px', height: '80px', objectFit: 'cover', cursor: 'pointer' }}
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="col-md-6">
            <h2 className="mb-3 fw-bold">{product.name}</h2>
            <p className="text-muted">SKU: {product._id}</p>

            <h4 className="text-success mb-3">₹{product.price.toFixed(2)}</h4>

            <div className="mb-3">
              <span className="ms-2">⭐⭐⭐⭐☆ 4.5 (120 reviews)</span>
            </div>

            <p className="mb-4">{product.description}</p>

            {product.quantity <= 5 && (
              <p className="text-danger">Only {product.quantity} left in stock!</p>
            )}

            <div className="mb-4">
              <label htmlFor="quantity" className="form-label fw-bold">Quantity:</label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                value={quantity}
                min="1"
                max={product.quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(product.quantity, parseInt(e.target.value) || 1)))}
                style={{ width: '100px' }}
              />
            </div>
              
            <div className="mb-4">
                <button className="btn btn-primary btn-lg me-2" onClick={addToCart}>
                <AiOutlineShoppingCart className="me-2" /> Add to Cart
                </button>

      {product && (
  <button
  className="btn btn-outline-secondary btn-lg"
  onClick={() => handleAddToWishlist(product._id)}>
  <AiOutlineHeart className="me-2" /> Add to Wishlist
</button>

)}
<div className="mb-3">
  <button
    className="btn btn-outline-warning btn-lg mt-2"
    onClick={() => navigate('/dashboard/user/WishlistPage')}>
  
    👁️ View Wishlist
  </button>
</div>
            </div>
            <div className="mt-4 pt-3 border-top">
              <h5 className="fw-bold">Product Details:</h5>
              <ul className="list-unstyled">
                <li><strong>Category:</strong> {product.category?.name || 'N/A'}</li>
                <li><strong>Availability:</strong> {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}</li>
                <li><strong>Shipping:</strong> {product.shipping ? 'Free Shipping' : 'Shipping charges apply'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
