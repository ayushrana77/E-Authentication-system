import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Otp() {
  const navigate = useNavigate();
  const [otp, setotp] = useState();

  const setData = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(token);
    const res = await fetch("/otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp,
        token,
      }),
    });

    if (res.status === 201) {
      window.alert("Register Successful");
      navigate("/");
    } else {
      window.alert("InValid OTP");
    }
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-6 offsetmd-5 offset-sm-1">
          <from>
            <div className="mb-3">
              <label htmlFor="otp" className="form-lable">
                <h1>Check the email for OTP</h1>
              </label>
              <br />
              <br />
              <input
                type="text"
                className="form-control"
                id="otp"
                name="otp"
                placeholder="Enter the otp"
                value={otp}
                onChange={(e) => setotp(e.target.value)}
              />
              <br />
              <br />
              <button
                type="submit"
                className="btn btn-primary"
                id="otpbtn"
                name="otpbtn"
                onClick={setData}
              >
                Submit
              </button>
            </div>
          </from>
        </div>
      </div>
    </div>
  );
}

export default Otp;
