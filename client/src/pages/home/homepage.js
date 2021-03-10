import React from "react";
import "./homePage.css";
import "./btn.css";
import SignIn from "../signIn";
import Modal from "../../components/modal";

export default function Homepage() {
  function handleclick(e) {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const containe = document.querySelector(".containe");

    sign_up_btn.addEventListener("click", () => {
      containe.classList.add("sign-up-mode");
    });

    sign_in_btn.addEventListener("click", () => {
      containe.classList.remove("sign-up-mode");
    });
  }
  return (
    <div className="containe">
      <div className="spans-containe">
        <div className="signin-signup">
          <div className="form sign-in-form">
            <Modal />
          </div>
          <div className=" form sign-up-form">
            <SignIn />
          </div>
        </div>
      </div>
      <div className="panels-containe">
        <div className="panel left-panel">
          <div className="content">
            <h2>One of us ?</h2>
            <button
              className="pulse-button"
              id="sign-up-btn"
              onClick={handleclick}
            >
              Sign In
            </button>
          </div>
          <img
            src={process.env.PUBLIC_URL + "/img/home.svg"}
            className="image"
            alt=""
          />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h5 style={{ lineHeight: 1.5 }}>
              Login with the given Email and Password, or <br />
              contact support to register an account.
            </h5>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={handleclick}
            >
              Home
            </button>
          </div>
          <img
            src={process.env.PUBLIC_URL + "/img/sign_in.svg"}
            className="image"
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
}
