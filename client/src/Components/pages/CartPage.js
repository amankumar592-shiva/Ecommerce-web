import React, { useState, useEffect, useRef } from 'react';
import Layout from '../Layout/layout';
import { useCart } from '../context/Cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import dropin from 'braintree-web-drop-in';
import toast from 'react-hot-toast';



const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState('');
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const dropinRef = useRef(null);
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price;
      });
      return total.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    } catch (error) {
      console.log(error);
      return '$0.00';
    }
  };

  const removeCartItem = (pid) => {
    try {
      const myCart = [...cart];
      const index = myCart.findIndex((item) => item._id === pid);
      if (index !== -1) {
        myCart.splice(index, 1);
        setCart(myCart);
        localStorage.setItem('cart', JSON.stringify(myCart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/braintree/token');
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getToken();
  }, [auth?.token]);

  useEffect(() => {
    if (clientToken && dropinRef.current) {
      dropin.create(
        {
          authorization: clientToken,
          container: dropinRef.current,
          paypal: {
            flow: 'vault',
          },
        },
        (err, instance) => {
          if (err) {
            console.error('Dropin error:', err);
          } else {
            setInstance(instance);
          }
        }
      );
    }
  }, [clientToken]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post('/api/v1/product/braintree/payment', {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem('cart');
      setCart([]);
      navigate('/dashboard/user/orders');
      toast.success('Payment Completed Successfully');
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error('Payment Failed');
    }
  };

  return (
    <Layout>
      <div className='cartpage'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='text-center bg-light p-2 mb-1'>
              {!auth?.user ? 'Hello Guest' : `Hello ${auth?.user?.name}`}
              <p className='text-center'>
                {cart?.length
                  ? `You have ${cart.length} item(s) in your cart${
                      auth?.token ? '' : ' Please login to checkout.'
                    }`
                  : 'Your Cart is Empty'}
              </p>
            </h1>
          </div>
        </div>

        <div className='container'>
          <div className='row'>
            <div className='col-md-7 p-0 m-0'>
              {cart?.map((p) => (
                <div className='row card flex-row mb-3' key={p._id}>
                  <div className='col-md-4'>
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      width='100%'
                      height='130px'
                    />
                  </div>
                  <div className='col-md-4'>
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}...</p>
                    <p>Price: ${p.price}</p>
                  </div>
                  <div className='col-md-4 cart-remove-btn'>
                    <button
                      className='btn btn-danger'
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className='col-md-5 cart-summary'>
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total: {totalPrice()}</h4>

              {auth?.user?.address ? (
                <div className='mb-3'>
                  <h5>Current Address:</h5>
                  <p>{auth.user.address}</p>
                  <button className='btn btn-warning mb-2'
                  onClick={() => navigate('/dashboard/user/Profile')}>

                    Update Address
                  </button>
                </div>
              ) : (

                
                <div className='mb-3'>
                  <button className='btn btn-outline-warning' 
                   onClick={() => navigate('/dashboard/user/Profile')}>

                    Update Address
                  </button>
                </div>
              )}

              <div className='mt-3'>
                {!auth?.token || !cart?.length ? (
                  <button
                    className='btn btn-primary'
                    onClick={() => navigate('/login')}
                  >
                    Login to Checkout
                  </button>
                ) : (
                  <>
                    <div ref={dropinRef}></div>
                    <button
                      className='btn btn-success mt-2'
                      onClick={handlePayment}
                      disabled={loading || !instance}
                    >
                      {loading ? 'Processing...' : 'Make Payment'}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
