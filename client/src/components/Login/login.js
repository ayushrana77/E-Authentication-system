import React from "react";
import { NavLink } from "react-router-dom";

function Login() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-6 offset-md-3 offset-sm-1">
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                aria-describedby="emailHelp"
                placeholder="Enter the Email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter the Password"
              />
            </div>
            <NavLink to="/register">Didn't register! register here</NavLink>
            <br />
            <br />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
