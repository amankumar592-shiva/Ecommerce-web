// client/src/Components/pages/User/profile.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../Layout/layout';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth'; 

const Profile = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [password, setPassword] = useState("");

  //  Load user data
  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const { data } = await axios.get("/api/v1/auth/user-profile", {
  //         headers: {
  //           Authorization: `Bearer ${auth?.token}`,
  //         },
  //       });
  //       if (data?.success) {
  //         const user = data.user;
  //         setName(user.name || "");
  //         setEmail(user.email || "");
  //         setPhone(user.phone || "");
  //         setAddress(user.address || "");
  //         setAnswer(user.answer || "");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       toast.error("Failed to load user data");
  //     }
  //   };

  //   if (auth?.token) getUserData();
  // }, [auth?.token]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "/api/v1/auth/update-profile",
        { name, email, phone, address, answer, password },


      );

      if (data?.success) {
        toast.success("Profile updated successfully");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="container py-5" style={{ maxWidth: '800px' }}>
        <h3 className="mb-4 text-center fw-bold">Update Profile</h3>
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Left Column */}
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="answer" className="form-label">Answer</label>
                <input
                  type="text"
                  className="form-control"
                  id="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password (optional)</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">Update Profile</button>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;
