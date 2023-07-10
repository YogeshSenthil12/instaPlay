import React, {useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";

const ProtectedRoutes = () => {
  const navigate = useNavigate();

  const isAuth = localStorage.getItem("data");

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, []);

  if (isAuth) {
    return <Outlet />;
  }
};

export default ProtectedRoutes;
