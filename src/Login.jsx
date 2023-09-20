import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

const Login = ({ text }) => {
  let nevigate = useNavigate();
  const [worning, setWorning] = useState(false);
  const [login, setLogin] = useState({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "https://i-notebook-backend-ca67.vercel.app/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ email: login.email, password: login.password }),
      }
    );
    const json = await response.json();

    if (json.success === true) {
      sessionStorage.setItem("token", json.AuthToken);

      nevigate("/");
      // window.location.href = "/";
    } else {
      setWorning(true);
    }
  };
  const onChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ height: "100vh" }}>
      <div
        style={{
          border: "2px solid blue",
          padding: "5vh",
          borderRadius: "20px",
          display: "flex",
          alignItem: "center",
          justifyContent: "center",
          marginTop: "10vh",
          marginBottom: "20vh",
          height: "50vh",
        }}
      >
        <form className="container" onSubmit={handleSubmit}>
          <div className="mb-3 ">
            <b
              style={{
                color: "red",
                display: worning === true ? "block" : "none",
              }}
            >
              Email or password is incorrect.
            </b>
            <label
              htmlFor="exampleInputEmail1"
              className="form-label"
              style={{ color: text }}
            >
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={login.email}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label"
              style={{ color: text }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={login.password}
              className="form-control"
              id="exampleInputPassword1"
              onChange={onChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <Link style={{ float: "right" }} to="/signUp">
            New User please Create an Account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
