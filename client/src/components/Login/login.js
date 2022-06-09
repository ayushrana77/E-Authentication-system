import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./login.css";
function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const setData = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/adminLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // "email":email,
        // "password":password
        email,
        password,
      }),
    });
    const data = await res.json();

    if (res.status === 201) {
      localStorage.setItem("token", data.token);
      window.alert("Login Successful");
      navigate("/");
    } else {
      window.alert("Invalid Credentials");
    }
  };
  return (
    <div className="container cent mt-5">
      <div className="row">
        <div className="col-sm-6 offset-md-3 offset-sm-1">
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control log"
                id="email"
                name="email"
                aria-describedby="emailHelp"
                placeholder="Enter the Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control log"
                id="password"
                name="password"
                placeholder="Enter the Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <NavLink className="link" to="/register">
              Didn't register! register here
            </NavLink>
            <br />
            <br />
            <button
              type="submit"
              className="btn btn-primary"
              id="login"
              name="login"
              onClick={setData}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
