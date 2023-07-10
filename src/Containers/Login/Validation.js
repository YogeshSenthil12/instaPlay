import React, {useEffect, useState} from "react";
import LoginForm from "./LoginForm";
import "./index.css";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Validation = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const getKeys = localStorage.getItem("data");
    if (getKeys) {
      navigate("/home");
      return;
    }
    getTokens();
  }, []);

  const getTokens = async () => {
    const tokenFromServer = await fetchToken();
    setData(tokenFromServer.request_token);
  };

  const fetchToken = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/authentication/token/new?api_key=728f79990e026537f04182b251b23988"
    );
    const details = await response.json();
    return details;
  };

  const login = async (formValues) => {
    const response = await fetch(
      "https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=728f79990e026537f04182b251b23988",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...formValues, request_token: data}),
      }
    );
    const responseData = await response.json();
    handleLogin(responseData);
  };

  const handleLogin = (responseData) => {
    if (responseData.success) {
      localStorage.setItem("data", JSON.stringify(data));
      toast.success("Logged in successfully", {position: "top-center"});
      navigate("/home");
    } else {
      setApiError(responseData.status_message);
    }
  };

  return (
    <div className="App">
      <LoginForm
        setFormValues={setFormValues}
        formValues={formValues}
        login={login}
        errors={errors}
        setErrors={setErrors}
        apiError={apiError}
      />
    </div>
  );
};

export default Validation;
