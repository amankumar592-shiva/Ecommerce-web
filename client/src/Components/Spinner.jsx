import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/${path}`);
    }, 2000);

    return () => clearTimeout(timer); 
  }, [navigate, path]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", background: "#f8f9fa" }}
    >
      <div className="text-center">
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "4rem", height: "4rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="mt-3 fw-semibold text-secondary">Redirecting...</div>
      </div>
    </div>
  );
};

export default Spinner;
