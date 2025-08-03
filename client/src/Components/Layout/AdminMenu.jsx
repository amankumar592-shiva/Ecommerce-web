import React from 'react';
import { NavLink } from 'react-router-dom';
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />

const AdminMenu = () => {
  return (
    <>
      {/* Inline CSS for Sidebar */}
      <style>
        {`
          .sidebar {
            background: linear-gradient(180deg, #4e73df 0%, #224abe 100%);
            width: 250px;
          }
          .sidebar .nav-link {
            color: white;
          }
          .sidebar .nav-link:hover {
            background-color: rgba(255, 255, 255, 0.1);
            border-left: 3px solid white;
          }
          .sidebar .nav-link.active {
            background-color: rgba(255, 255, 255, 0.2);
          }
        `}
      </style>

      <div className="sidebar vh-100 d-flex flex-column p-3 pt-4 text-white">
        <div className="sidebar-header text-center pb-3 mb-3 border-bottom border-white border-opacity-10">
          <h2 className="fs-5 fw-semibold">
            <i className="fas fa-bars me-2"></i> Menu
          </h2>
        </div>

 <div className="sidebar-menu flex-grow-1">
   <NavLink
    to="/dashboard/admin"
    className="nav-link d-flex align-items-center text-decoration-none py-2 px-3 mb-1 rounded"
          >
            <i className="fas fa-home me-3"></i>
            <span>AdminDashboard</span>
          </NavLink>

          <NavLink
            to="/dashboard/admin/orders"
            className="nav-link d-flex align-items-center text-decoration-none py-2 px-3 mb-1 rounded"
          >
            <i className="fas fa-plus-circle me-3"></i>
            <span>AdminOrders</span>
          </NavLink>

          <NavLink
            to="/dashboard/admin/create-category"
            className="nav-link d-flex align-items-center text-decoration-none py-2 px-3 mb-1 rounded"
          >
            <i className="fas fa-box-open me-3"></i>
            <span> CreateCategory</span>
          </NavLink>

          <NavLink
            to="/dashboard/admin/create-Product" 
            className="nav-link d-flex align-items-center text-decoration-none py-2 px-3 mb-1 rounded"
          >
            <i className="fas fa-envelope me-3"></i>
            <span>CreateProduct</span>
          </NavLink>
       
          <NavLink
            to="/dashboard/admin/products"
            className="nav-link d-flex align-items-center text-decoration-none py-2 px-3 mb-1 rounded"
          >
            <i className="fas fa-user-plus me-3"></i>
            <span>Product</span>
          </NavLink>

          {/* <NavLink
            to="/dashboard/admin/update-product/demo-slug"
            className="nav-link d-flex align-items-center text-decoration-none py-2 px-3 mb-1 rounded"
          >
            <i className="fas fa-handshake me-3"></i>
            <span>UpdateProduct</span>
          </NavLink> */}

  <NavLink
            to="/dashboard/admin/Users"
            className="nav-link d-flex align-items-center text-decoration-none py-2 px-3 mb-1 rounded"
          >
            <i className="fas fa-handshake me-3"></i>
            <span>Users</span>
          </NavLink>


        </div>
      </div>
    </>
  );
};

export default AdminMenu;
