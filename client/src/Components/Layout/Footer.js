import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row text-center text-md-start">

          {/* Get to Know Us */}
          <div className="col-12 col-sm-6 col-md-3 mb-4">
            <h6 className="fw-bold">Get to Know Us</h6>
            <ul className="list-unstyled">
              <li><Link to="/about" className="text-white text-decoration-none">About Pamazon</Link></li>
              <li><Link to="/careers" className="text-white text-decoration-none">Careers</Link></li>
              <li><Link to="/press" className="text-white text-decoration-none">Press Releases</Link></li>
              <li><Link to="/blog" className="text-white text-decoration-none">Pamazon Blog</Link></li>
            </ul>
          </div>

          {/* Connect with Us */}
          <div className="col-12 col-sm-6 col-md-3 mb-4">
            <h6 className="fw-bold">Connect with Us</h6>
            <ul className="list-unstyled">
              <li><a href="https://facebook.com" className="text-white text-decoration-none" target="_blank" rel="noreferrer">Facebook</a></li>
              <li><a href="https://twitter.com" className="text-white text-decoration-none" target="_blank" rel="noreferrer">Twitter</a></li>
              <li><a href="https://instagram.com" className="text-white text-decoration-none" target="_blank" rel="noreferrer">Instagram</a></li>
            </ul>
          </div>

          {/* Make Money with Us */}
          <div className="col-12 col-sm-6 col-md-3 mb-4">
            <h6 className="fw-bold">Make Money with Us</h6>
            <ul className="list-unstyled">
              <li><Link to="/sell" className="text-white text-decoration-none">Sell on Pamazon</Link></li>
              <li><Link to="/affiliate" className="text-white text-decoration-none">Become an Affiliate</Link></li>
              <li><Link to="/advertising" className="text-white text-decoration-none">Advertise Your Products</Link></li>
              <li><Link to="/vendor" className="text-white text-decoration-none">Vendor Program</Link></li>
            </ul>
          </div>

          {/* Let Us Help You */}
          <div className="col-12 col-sm-6 col-md-3 mb-4">
            <h6 className="fw-bold">Let Us Help You</h6>
            <ul className="list-unstyled">
              <li><Link to="/account" className="text-white text-decoration-none">Your Account</Link></li>
              <li><Link to="/orders" className="text-white text-decoration-none">Your Orders</Link></li>
              <li><Link to="/returns" className="text-white text-decoration-none">Returns Centre</Link></li>
              <li><Link to="/help" className="text-white text-decoration-none">Help</Link></li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary" />

        <div className="text-center">
          <small>
            &copy; {new Date().getFullYear()} <strong>Pamazon Ecommerce Pvt. Ltd.</strong> – All Rights Reserved.
          </small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
