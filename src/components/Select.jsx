import React from "react";
import styled from "styled-components";
import { ErrorStyle } from "./FloatingTextField.jsx";

export const LabelStyle = styled.label`
  display: flex;
  color: #062c33;
  margin-bottom: 0.5rem;
`;

const SelectStyle = styled.select`
  border: 1px solid #1b1e21;
  padding: 0.75rem;
  width: 100%;
`;
function Select({ value, label, onChange, error, children, className }) {
  return (
    <div style={{ width: "100%" }}>
      {label && <LabelStyle> {label} </LabelStyle>}
      <div style={{ display: "flex", alignItems: "center" }}>
        <SelectStyle value={value} onChange={onChange} className={className}>
          {children}
        </SelectStyle>
      </div>

      {error && <ErrorStyle> {error} </ErrorStyle>}
    </div>
  );
}

export default Select;
