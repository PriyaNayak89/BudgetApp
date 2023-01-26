import React from "react";
import styled from "styled-components";

export const PrimaryButton = styled.button`
   {
    background-color: #007bff;
    border: none;
    padding: 1rem 3rem;
    color: #ffffff;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.25rem;
    transition: all0 0.3s ease-in-out;
  }

  :disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  :hover:not(:disabled) {
    background-color: #062c33;
  }
  cursor: ${(props) => (!!props.$loading ? "not-allowed" : "pointer")};
`;
