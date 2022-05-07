import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [user, setuser] = useState({
    Name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  const handleInput = (e) => {
    let namee = e.target.name;
    let value = e.target.value;

    setuser({ ...user, [namee]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { Name, email, phone, password, cpassword } = user;

    const res = await fetch("/adminRegister", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name,
        email,
        phone,
        password,
        cpassword,
      }),
    });

    const data = await res.json;

    if (res.status === 201) {
      localStorage.setItem("token", data.token);
      window.alert("Register Successful");
      navigate("/");
    } else {
      window.alert("Registertion Failed");
    }
  };
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
                value={user.Name}
                onChange={handleInput}
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
                value={user.email}
                onChange={handleInput}
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
                value={user.phone}
                onChange={handleInput}
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
                value={user.password}
                onChange={handleInput}
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
                value={user.cpassword}
                onChange={handleInput}
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
              onClick={postData}
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
