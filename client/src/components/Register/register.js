import React from "react";
import { NavLink } from "react-router-dom";

function Register() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-md-7 col-sn-6">
          <h1>Welcome</h1>
        </div>
        <div className="col-12 col-md-5 col-sn-6">
          <from method="post">
            <div className="mb-3">
              <label htmlFor="Name" class="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="Name"
                name="Name"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" class="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Ente r your Email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" class="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                placeholder="Enter your phone Number"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" class="form-label">
                Password
              </label>
              <input
                type="Password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter your Password"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cpassword" class="form-label">
                Confrom Password
              </label>
              <input
                type="Password"
                className="form-control"
                id="cpassword"
                name="cpassword"
                placeholder="Enter Password again"
              />
            </div>
            <NavLink to="/login">Already Register, then login here!</NavLink>
            <br />
            <br />
            <button
              type="submit"
              className="btn btn-primary"
              id="register"
              name="register"
            >
              Register
            </button>
          </from>
        </div>
      </div>
    </div>
  );
}

export default Register;
