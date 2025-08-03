import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { toast } from "react-hot-toast";
import axios from "axios";
import Layout from "../src/Components/Layout/layout";
import { AiOutlineReload, AiOutlineHeart } from "react-icons/ai";
import { useCart } from "./Components/context/Cart";
import { prices } from "../src/Components/prices";
import { useAuth } from "./Components/context/auth";




const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  

  
// google
useEffect(() => {
  const fetchGoogleUser = async () => {
  try {
    const res = await axios.get("/api/v1/auth/user-profile"); 
    if (res?.data?.user) {
      //  1. Update React Context
      setAuth({
        user: res.data.user,
        token: res.data.token || "",
      });

      //  2. Save in localStorage also
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: res.data.user,
          token: res.data.token || "",
        })
      );
    }
  } catch (error) {
    console.log(" Error loading Google user:", error);
  }
};

  const params = new URLSearchParams(location.search);
  if (params.get("existing") === "true") {
    toast.success(" You already signed up with Google!");
    fetchGoogleUser(); //  Set user in localStorage
    window.history.replaceState({}, "", location.pathname);
  }
}, [location]);

//google





  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/view-category");
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get all product
  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProduct(data.product);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Get total product count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Load more product
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/product-list/${page}`
      );
      setProduct([...product, ...data?.product]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Handle filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // Get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  // Initial fetch
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // Fetch product on filter reset
  useEffect(() => {
    if (!checked.length && !radio.length) getAllProduct();
  }, [checked.length, radio.length]);

  // Fetch filtered product
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // Load more when page changes
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //wishlist

  // wishlist 

  return (
    <Layout title="All Product - Best offers">
      <div className="container-fluid">

        {/* === Carousel Banner === */}
        <div className="row mb-5">
          <div className="col-12">
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></button>
              </div>
              <div className="carousel-inner rounded shadow">
                <div className="carousel-item active">
                  <img src="/Images/ecommerce.jpg" className="d-block w-100" alt="Banner 1" style={{ height: '400px', objectFit: 'cover' }} />
                </div>
                <div className="carousel-item">
                  <img src="/Images/ecommerce1.jpg" className="d-block w-100" alt="Banner 2" style={{ height: '400px', objectFit: 'cover' }} />
                </div>
                <div className="carousel-item">
                  <img src="/Images/ecommerce2.jpg" className="d-block w-100" alt="Banner 3" style={{ height: '400px', objectFit: 'cover' }} />
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon"></span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon"></span>
              </button>
            </div>
          </div>
        </div>

        {/* === Filters + Products Grid === */}
        <div className="row">
          {/* Filters */}
          <div className="col-md-3 mb-4">
            <h4 className="text-center mb-3">Filter By Category</h4>
            <div className="d-flex flex-column ps-3">
              {categories?.map((c) => (
                <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                  {c.name}
                </Checkbox>
              ))}
            </div>
            <h4 className="text-center mt-4 mb-3">Filter By Price</h4>
            <div className="d-flex flex-column ps-3">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {prices?.map((p) => (
                  <Radio value={p.Array} key={p._id}>
                    {p.name}
                  </Radio>
                ))}
              </Radio.Group>
            </div>
            <button className="btn btn-danger w-100 mt-4" onClick={() => window.location.reload()}>
              RESET FILTERS
            </button>
          </div>

          {/* Products */}
          <div className="col-md-9">
            <h2 className="text-center mb-4">All Products</h2>
            <div className="row">
              {product?.map((p) => (
                <div className="col-md-4 col-sm-6 mb-4" key={p._id}>
                  <div className="card h-100 shadow-sm">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      onError={(e) => e.target.src = "/images/default.jpg"}
                      className="card-img-top"
                      alt={p.name}
                      style={{ height: '220px', objectFit: 'cover' }}
                    />

                    <div className="card-body d-flex flex-column justify-content-between">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">
                        {p.description ? p.description.substring(0, 60) + "..." : "No description available"}
                      </p>
                      <h6 className="text-success fw-bold">
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </h6>
                      <div className="mt-auto d-flex justify-content-between">
                        <button className="btn btn-info btn-sm" onClick={() => navigate(`/product/${p.slug}`)}>
                          More Details
                        </button>
                        <button
                          className="btn btn-dark btn-sm"
                          onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem("cart", JSON.stringify([...cart, p]));
                            toast.success("Item Added to cart");
                          }}
                        >
                          Add to Cart
                        </button>
                        
 
   
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {product && product.length < total && (
              <div className="text-center my-4">
                <button
                  className="btn btn-outline-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading..." : <>Load More <AiOutlineReload /></>}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
