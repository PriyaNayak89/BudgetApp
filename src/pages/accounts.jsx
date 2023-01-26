import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { HttpClient } from "../util/HttpClient.jsx";
import { Page } from "../components/Page.jsx";
import { LabelStyle } from "../components/Select.jsx";

const BankAccountContainer = styled.div`
  border: 1px solid #1b1e21;
  border-radius: 2px;
  padding: 1rem;
  box-shadow: 0 0.5px 0.2px rgba(0, 0, 0, 0.25);
  margin-bottom: 2rem;
  position: relative;
  color: #062c33;

  h2 {
    margin-bottom: 1rem;
    font-size: 2rem;
    color: #062c33;
  }
`;

const EditBankContainer = styled.div`
  position: absolute;
  top: 25px;
  right: 15px;
  display: flex;
  gap: 1rem;
  justify-content: space-between;

  i {
    cursor: pointer;
    font-size: 1.25rem;
    color: #062c33;
  }
`;

const BankDetailCard = styled.div`
  box-shadow: 3px 4px 0.2px rgb(0 0 0 / 25%);
  list-style: none;
  margin: 2rem 0;
  padding: 1rem;
  background: #eee;

  p {
    display: flex;
  }
`;
function Accounts(props) {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBankAccounts = async () => {
    const { data } = await HttpClient().get("/api/bank-accounts");
    if (data) {
      setBankAccounts(data.content);
    }
  };
  useEffect(() => {
    getBankAccounts();
  }, []);

  return (
    <Page>
      <BankAccountContainer>
        <h2> Bank Details</h2>

        <EditBankContainer>
          <i className="fa-solid fa-circle-plus"></i>
        </EditBankContainer>

        {bankAccounts &&
          bankAccounts.map((account) => (
            <BankDetailCard key={account.id}>
              <p>
                <LabelStyle> Account Name </LabelStyle>
                <span>: {account.name}</span>
              </p>
              <p>
                <LabelStyle>Balance</LabelStyle>
                <span>{account.balance}</span>
              </p>
            </BankDetailCard>
          ))}
      </BankAccountContainer>
    </Page>
  );
}

export default Accounts;
