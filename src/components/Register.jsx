import React, { useState } from "react";
import styled from "styled-components";
import FloatingTextField, { ErrorStyle } from "./FloatingTextField.jsx";
import { PrimaryButton } from "./PrimaryButton.jsx";
import { HttpClient } from "../util/HttpClient.jsx";

const Wrapper = styled.div`
  width: 75%;
  margin: 4rem auto;
  border: 1px solid #cccc;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  padding: 1rem;
`;

const MESSAGES = {
  INVALID_CREDENTIALS: "You have entered invalid credentials",
};

export default function Register({ setMode }) {
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [alertError, setAlertError] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    setError({});

    const _error = {};
    if (!name) _error.name = "Name is required";
    if (!email) _error.email = "Email is required";
    if (!password) _error.password = "Password is required";

    if (Object.keys(_error).length) {
      setError(_error);
      return;
    }

    try {
      setLoading(true);
      const body = {
        name,
        email,
        password,
      };
      const { data } = await HttpClient().post("/api/auth/register", body);
      localStorage.setItem("token", data.token);
      setLoading(false);
      window.location.reload();
    } catch (e) {
      if (e.response && e.response.status === 401) {
        setAlertError(MESSAGES[e.response.data.message]);
      }
      setLoading(false);
    }
  };
  return (
    <Wrapper>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        {!!alertError && <ErrorStyle>{alertError}</ErrorStyle>}
        <FloatingTextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Name"
          error={error.name}
        ></FloatingTextField>
        <FloatingTextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          error={error.email}
        ></FloatingTextField>

        <FloatingTextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          error={error.password}
        ></FloatingTextField>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <PrimaryButton $loading={loading}>Register</PrimaryButton>
          <PrimaryButton onClick={() => setMode("login")}>
            Go Back to Login
          </PrimaryButton>
        </div>
      </form>
    </Wrapper>
  );
}
