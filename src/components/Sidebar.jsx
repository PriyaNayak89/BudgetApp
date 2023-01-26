import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "./PrimaryButton.jsx";
import { AppContext } from "../AppContext.jsx";
import { useDialog } from "react-st-modal";

const SideBarStyled = styled.div`
  min-width: 300px;
  max-width: 300px;
  padding: 1rem;
  height: 100vh;
  background-color: #062c33;
  color: #fff;
  display: flex;
  flex-direction: column;

  .title {
    text-align: center;
    font-size: 1.25rem;
    margin-bottom: 2rem;
  }

  article {
    flex: 1;

    ul {
      list-style: none;

      li {
        cursor: pointer;
        padding: 0.5rem;
        transition: all 0.5s ease-in-out;

        &:hover {
          padding-left: 0.5rem;
        }
      }
    }
  }
`;

export default function Sidebar(props) {
  const { user, logout } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <SideBarStyled>
      <div className="title"> Vikhyat</div>
      <article>
        <ul>
          <li
            onClick={() => {
              navigate("/trends");
            }}
          >
            Trends
          </li>
          <li
            onClick={() => {
              navigate("/transactions");
            }}
          >
            Transactions
          </li>
          <li
            onClick={() => {
              navigate("/accounts");
            }}
          >
            Accounts
          </li>
          <li
            onClick={() => {
              navigate("/Trends");
            }}
          >
            History
          </li>
        </ul>
      </article>
      <PrimaryButton> Logout </PrimaryButton>
    </SideBarStyled>
  );
}
