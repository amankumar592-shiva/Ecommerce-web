import { useState, useEffect } from "react";
import { useAuth } from "../Components/context/auth";
import axios from "axios";
import { Outlet } from "react-router-dom"; 
import Spinner from "../Components/Spinner"; 

const AdminRoute = () => {
  const [ok, setok] = useState(false);
  const [auth] = useAuth(); 
  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("/api/v1/auth/admin-auth");
        if (res.data.ok) {
          setok(true);
        } else {
          setok(false);
        }
      } catch (error) {
        console.error("Auth check failed", error);
        setok(false);
      }
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
};

export default AdminRoute;
