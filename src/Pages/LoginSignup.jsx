import React, { useState, useContext } from "react";
import { auth, signIn, signUp } from "../Services/firebase";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const navigate = useNavigate();
  const { fetchCartFromFirebase } = useContext(ShopContext);
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAuth = async (authFunc) => {
    try {
      await authFunc(auth, formData.email, formData.password);
      fetchCartFromFirebase();
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const login = () => handleAuth(signIn);
  const signup = () => handleAuth(signUp);

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" && (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
            />
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
          />
        </div>
        <button onClick={state === "Login" ? login : signup}>Continue</button>
        <p className="loginsignup-login">
          {state === "Sign Up"
            ? "Already have an account?"
            : "Create an account?"}{" "}
          <span
            onClick={() => setState(state === "Login" ? "Sign Up" : "Login")}
          >
            {state === "Sign Up" ? "Login here" : "Click here"}
          </span>
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
