import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Register from './Components/pages/auth/Register';
import Login from './Components/pages/auth/Login';
import ForgotPassword from './Components/pages/auth/forgot-password';

import AdminRoute from './routes/AdminRoutes';
import PrivateRoute from './routes/Privateroutes';

import AdminDashboard from './Components/pages/Admin/AdminDashboard';
import AdminOrders from './Components/pages/Admin/AdminOrders';
import CreateCategory from './Components/pages/Admin/CreateCategory';
import CreateProduct from './Components/pages/Admin/CreateProduct';
import Product from './Components/pages/Admin/Product';
import UpdateProduct from './Components/pages/Admin/UpdateProduct';
import Users from './Components/pages/Admin/Users';
import ProductDetail from './Components/pages/productDetail';

import Dashboard from './Components/pages/User/Dashboard';
import Orders from './Components/pages/User/Orders';
import Profile from './Components/pages/User/Profile';
import CartPage from './Components/pages/CartPage';
import WishlistPage from "./Components/pages/User/WishlistPage";


function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/cart" element={<CartPage/>} />
      <Route path="/product/:slug" element={<ProductDetail />} />
      


     

      {/* Admin Protected Routes */}
      <Route path="/dashboard/admin" element={<AdminRoute />}>
        <Route index element={<AdminDashboard />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="create-category" element={<CreateCategory />} />
        <Route path="create-product" element={<CreateProduct />} />
        <Route path="products" element={<Product />} />
        <Route path="update-product/:slug" element={<UpdateProduct />} />
        <Route path="users" element={<Users />} />
      </Route>

      {/* User Protected Routes */}
      <Route path="/dashboard/user" element={<PrivateRoute />}>
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="profile" element={<Profile />} />
        <Route path="WishlistPage" element={<WishlistPage />} />

      </Route>
    </Routes>
  );
}

export default App;
