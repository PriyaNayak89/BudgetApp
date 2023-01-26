import React from "react";
import styled from "styled-components";
import { v4 } from "uuid";

export const ErrorStyle = styled.span`
  color: #ff0000;
  text-align: left;
`;
const FloatingTextFieldStyled = styled.div`
  &.field {
    display: flex;
    flex-flow: column-reverse; // check this
    margin-bottom: 1rem;
    width: 100%;
  }
  label,
  input {
    transition: all 0.2s ease-in-out;
  }

  input {
    font-size: 1.25rem;
    border: 0;
    border-bottom: 1px solid #ccc;
    padding: 0 0.25rem 0;
  }

  input:focus {
    outline: 0;
    border-bottom: 1px solid #3d5471;
  }

  label {
    color: #3d5471;
  }

  input:placeholder-shown + label {
    cursor: text;
    max-width: 66.66%;
    transform-origin: left bottom;
    transform: translate(0, 0.6rem) scale(1.25);
  }

  input::placeholder {
    opacity: 0;
    transition: inherit;
  }

  input:not(placeholder-shown) + label,
  input:focus + label {
    transform: translate(0, 0) scale(1);
  }
`;
function FloatingTextField({ label, onChange, value, type, error }) {
  const uuid = v4();

  return (
    <FloatingTextFieldStyled className="field">
      {!!error && <ErrorStyle>{error}</ErrorStyle>}
      <input
        id={uuid}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={label}
      />
      <label htmlFor={uuid}>{label}</label>
    </FloatingTextFieldStyled>
  );
}

export default FloatingTextField;
