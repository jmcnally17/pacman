import React, { useState } from "react";
import "./signup.css";
import { Profanity, ProfanityOptions } from "@2toad/profanity";

const options = new ProfanityOptions();
options.wholeWord = false;
const profanity = new Profanity(options);

const usersUrl = process.env.REACT_APP_URL
  ? `${process.env.REACT_APP_URL}/users`
  : "http://localhost:9000/users";

const sessionsUrl = process.env.REACT_APP_URL
  ? `${process.env.REACT_APP_URL}/sessions`
  : "http://localhost:9000/sessions";

const redirectUrl = process.env.REACT_APP_URL
  ? process.env.REACT_APP_URL
  : "http://localhost:3000";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsername = ({ target }) => {
    setUsername(target.value);
  };

  const handlePassword = ({ target }) => {
    setPassword(target.value);
  };

  const handleSubmit = () => {
    let nameError = document.getElementById("error-message");
    if (username === "") {
      nameError.innerText = "You must enter a username";
    } else if (username.includes(" ")) {
      nameError.innerText = "Username cannot contain any spaces";
    } else if (username.length < 3 || username.length > 15) {
      nameError.innerText = "Username must be 3-15 characters long";
    } else if (profanity.exists(username)) {
      nameError.innerText = "No profanity!";
    } else if (password === "") {
      nameError.innerText = "You must enter a password";
    } else if (password.length < 8) {
      nameError.innerText = "Password must be at least 8 characters long";
    } else {
      fetch(usersUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((response) => {
          if (response.ok) {
            login();
          } else {
            throw response;
          }
        })
        .catch((err) => setError(err.statusText));
    }
  };

  const login = () => {
    fetch(sessionsUrl, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = redirectUrl;
        } else {
          throw response;
        }
      })
      .catch((err) => {
        setError(err.statusText);
      });
  };

  return (
    <div className="signup">
      <h1>Sign Up</h1>
      <div className="border">
        <input placeholder="Username" onChange={handleUsername}></input>
        <br></br>
        <input
          type="password"
          placeholder="Password"
          onChange={handlePassword}
        ></input>
        <br></br>
        <button onClick={handleSubmit}>Sign up</button>
        <p className="error-message" id="error-message">
          {error}
        </p>
      </div>
    </div>
  );
}
