/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "./profile.css";
function Profile() {
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [age, setage] = useState("");
  const [address, setaddress] = useState("");
  const [education, seteducation] = useState("");
  const [sex, setsex] = useState();

  const getdata = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    });
    const data = await res.json();
    if (res.status === 201) {
      setemail(data.email);
      setname(`${data.name} ${data.lname}`);
      setphone(data.phone);
      setaddress(data.address);
      setage(data.age);
      setsex(data.sex);
      seteducation(data.education);
    } else {
      window.alert("Data not found");
    }
  };
  useEffect(() => {
    getdata();
  });
  getdata();
  return (
    <div>
      <div className="container">
        <div id="user-profile-2" className="user-profile">
          <div className="tabbable">
            <div className="tab-content no-border padding-24">
              <div id="home" className="tab-pane in active">
                <div className="row">
                  <div className="col-xs-12 col-sm-3 center set-img">
                    <span className="profile-picture">
                      <img
                        className="editable img-responsive avt"
                        alt=" Avatar"
                        id="avatar2"
                        src={
                          sex === "male"
                            ? require("./male.png")
                            : require("./female.png")
                        }
                      />
                    </span>
                  </div>

                  <div className="col-xs-12 col-sm-8">
                    <h4 className="blue">
                      <span className="middle">{name}</span>
                    </h4>

                    <div className="profile-user-info">
                      <div className="profile-info-row">
                        <div className="profile-info-name"> Email </div>

                        <div className="profile-info-value">
                          <span>{email}</span>
                        </div>
                      </div>

                      <div className="profile-info-row">
                        <div className="profile-info-name"> Age </div>

                        <div className="profile-info-value">
                          <span>{age}</span>
                        </div>
                      </div>
                      <div className="profile-info-row">
                        <div className="profile-info-name"> phone </div>

                        <div className="profile-info-value">
                          <span>{phone}</span>
                        </div>
                      </div>
                      <div className="profile-info-row">
                        <div className="profile-info-name"> Sex </div>
                        <div className="profile-info-value">
                          <span>{sex}</span>
                        </div>
                      </div>
                      <div className="profile-info-row">
                        <div className="profile-info-name"> Address </div>

                        <div className="profile-info-value">
                          <i className="fa fa-map-marker light-orange bigger-110"></i>
                          <span>{address}</span>
                        </div>
                      </div>

                      <div className="profile-info-row">
                        <div className="profile-info-name"> Education </div>

                        <div className="profile-info-value">
                          <i className="fa fa-map-marker light-orange bigger-110"></i>
                          {education}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
