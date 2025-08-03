import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"; 
import toast from "react-hot-toast";
import Layout from '../../Layout/layout';


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        phone,
        address,
        answer,
        password
         
      });
      

      // if (res && res.data.success) {
      //   toast.success(res.data && res.data.message );
      //   navigate("/login");
      // }
      // else {
      //   toast.error(res.data.message); 
      // }



      if (res && res.status === 201) {
  //toast.success(res.data.message);
      alert(res.data.message || "Registration successful");
       navigate("/login");
} else {
      // toast.error(res.data.message);
      alert("Something went wrong. Please try again.");
  
}

     


    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);

    }
  };

  return (
     <Layout>
      <div className="container py-5" style={{ maxWidth: '800px' }}>
        <h3 className="mb-4 text-center fw-bold">New User Register</h3>
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
                  name='name'
                  placeholder="Enter full name"
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
                  name='email'
                  placeholder="Enter email"
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
                  placeholder="Enter number"
                  name='phone'
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
                  placeholder="Enter address"
                  name='address'
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="address" className="form-label">Answer</label>
                <input
                  type="text"
                  className="form-control"
                  id="answer"
                  placeholder="Enter answer"
                  name='answer'
                  onChange={(e) => setAnswer(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </div>
     </Layout>
  );
};

export default Register;