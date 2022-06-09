import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./register.css";
function Register() {
  const navigate = useNavigate();
  const [user, setuser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
    sex: "",
    lname: "",
    address: "",
    education: "",
    age: "",
  });

  const handleInput = (e) => {
    let namee = e.target.name;
    let value = e.target.value;
    console.log(namee);
    console.log(value);
    setuser({ ...user, [namee]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const {
      name,
      email,
      phone,
      password,
      cpassword,
      sex,
      lname,
      address,
      education,
      age,
    } = user;

    const res = await fetch("/api/adminRegister", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
        cpassword,
        sex,
        lname,
        address,
        education,
        age,
      }),
    });

    const data = await res.json();

    if (res.status === 201) {
      console.log(data.token);
      localStorage.setItem("token", data.token);
      navigate("/register/otp");
    } else {
      window.alert("Registertion Failed");
    }
  };

  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-4 border-right">
          <h1 className="wel">Welcome</h1>
        </div>
        <div className="col-md-8 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Register Page</h4>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="labels">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleInput}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lnane"
                  name="lname"
                  value={user.lname}
                  onChange={handleInput}
                  placeholder="Surname"
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="labels">SEX</label>
                <select
                  className="form-control"
                  id="sex"
                  name="sex"
                  value={user.sex}
                  onChange={handleInput}
                >
                  <option value="none">None</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="labels">Age</label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  name="age"
                  value={user.age}
                  onChange={handleInput}
                  placeholder="Enter the age"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <label className="labels">Mobile Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter phone number"
                  id="phone"
                  name="phone"
                  value={user.phone}
                  onChange={handleInput}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter address"
                  id="address"
                  name="address"
                  value={user.address}
                  onChange={handleInput}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Education</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Education"
                  id="education"
                  name="education"
                  value={user.education}
                  onChange={handleInput}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Email ID</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter email id"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleInput}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter the password"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleInput}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password again"
                  id="cpassword"
                  name="cpassword"
                  value={user.cpassword}
                  onChange={handleInput}
                />
              </div>
            </div>
            <br />
            <NavLink className="link" to="/login">
              Already register login in here!
            </NavLink>
            <br />
            <div className="mt-5 text-center">
              <button
                className="btn btn-primary profile-button"
                type="button"
                onClick={postData}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
