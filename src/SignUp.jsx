import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
const SignUp = ({ text }) => {
  let nevigate = useNavigate();
  const [worning, setWorning] = useState(false);
  const [SignUp, setSignUp] = useState({ name: "", email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "https://i-notebook-backend-ca67.vercel.app/api/auth/CreateUSer",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          name: SignUp.name,
          email: SignUp.email,
          password: SignUp.password,
        }),
      }
    );
    const json = await response.json();
    console.log(json);

    if (json.success === true) {
      localStorage.setItem("token", json.authtoken);
      nevigate("/login");
      // window.location.href = "/";
    } else {
      setWorning(true);
     
    }
  };
  const onchange = (e) => {
    setSignUp({ ...SignUp, [e.target.name]: e.target.value });
  };
  return (
    <div style={{ height: "100vh" }}>
      <div
        className="container my-10"
        style={{
          border: "2px solid blue",
          padding: "5vh",
          borderRadius: "20px",
          display: "flex",
          alignItem: "center",
          justifyContent: "center",
          marginTop: "10vh",
          marginBottom: "20vh",
          height: "60vh",
        }}
      >
        <form className="container" onSubmit={handleSubmit}>
          <div className="mb-3">
            <b style={{ color: "red", display: worning ? "block" : "none" }}>
              The provided email is already registered.
            </b>
            <label
              htmlFor="name"
              style={{ color: text }}
              className="form-label"
            >
              User Name
            </label>
            <input
              type="text"
              className="form-control w-100"
              id="nameExample"
              aria-describedby="nameHelp"
              name="name"
              value={SignUp.name}
              required
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              style={{ color: text }}
              className="form-label"
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={SignUp.email}
              onChange={onchange}
              required
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              style={{ color: text }}
              className="form-label"
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={SignUp.password}
              onChange={onchange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
          <Link style={{ float: "right" }} to="/login">
            Click here if Already have an Account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
