import { useState, useEffect } from "react";
import { useAuth } from "../Components/context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Components/Spinner";

const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    let isMounted = true;

    const authCheck = async () => {
      try {
        const res = await axios.get("/api/v1/auth/user-auth", {
          // headers: {
          //   Authorization: `Bearer ${auth?.token}`,
          // },
        });

        if (isMounted) setOk(res.data.ok);
      } catch (err) {
        console.error("Auth Check Error", err);
        if (isMounted) setOk(false);
      }
    };

    if (auth?.token) authCheck();

    return () => {
      isMounted = false;
    };
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
};

export default PrivateRoute;
