import React, {useState} from "react";
import instaPlay from "../../assests/img/instaPlay.svg";

const LoginForm = ({login, errors, setErrors, handleLogin, apiError}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate({username, password});
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0 && !isSuccess) {
      await login({username, password});
    }
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    if (name === "username") {
      setUsername(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        username:
          value.length < 4 ? "Username must be at least 4 characters!" : "",
      }));
    } else if (name === "password") {
      setPassword(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          value.length < 4 ? "Password must be at least 4 characters!" : "",
      }));
    }
    setIsSuccess(false);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username is required";
    } else if (values.username.length < 4) {
      errors.username = "Username must be at least 4 characters!";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be at least 4 characters!";
    }

    return errors;
  };

  return (
    <header className="container">
      <nav className="navBarSection">
        <img src={instaPlay} alt="navbarLogo" />
      </nav>

      <div className="formFieldContainer">
        <div className="signInPart">
          <h3>Sign in</h3>
          <h5>Sign in to your Self Service Portal</h5>
          <form onSubmit={handleSubmit}>
            <div className="formField">
              <input
                type="text"
                placeholder="Username"
                className="usernameField"
                name="username"
                value={username}
                onChange={handleChange}
              />
              {errors.username && <p className="formData">{errors.username}</p>}

              <input
                type="password"
                placeholder="Password"
                className="passwordField"
                name="password"
                value={password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="formErrors">{errors.password}</p>
              )}
              {apiError && <p className="formAPIErrors">{apiError}</p>}
              <button className="buttonField" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
};

export default LoginForm;
