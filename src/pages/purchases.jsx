import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { HttpClient } from "../util/HttpClient.jsx";
import { Page } from "../components/Page.jsx";
import { CustomDialog, useDialog } from "react-st-modal";
import { Modal } from "../components/Modal.jsx";
import FloatingTextField from "../components/FloatingTextField.jsx";
import { PrimaryButton } from "../components/PrimaryButton.jsx";
import Select from "../components/Select.jsx";
import { Table } from "../components/Table.jsx";
import cargoToast from "cogo-toast";

const items = [
  {
    _id: 1,
    title: "custom",
    isCustom: true,
  },
  {
    _id: 2,
    title: "food",
  },
  {
    _id: 3,
    title: "petrol",
  },
  {
    _id: 4,
    title: "education",
  },
  {
    _id: 5,
    title: "medicine",
  },
  {
    _id: 6,
    title: "travel",
  },
  {
    _id: 7,
    title: "entertainment",
  },
];

const SearchInput = styled.input`
  border: 1px solid #1b1e21;
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  height: 100%;
`;

const TotalConatainer = styled.article`
  min-width: 400px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  padding: 2rem;

  h2 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }

  ul {
    flex: 1;
    list-style-type: none;
    overflow-y: auto;
    margin-bottom: 1rem;

    li {
      display: flex;
      gap: 1rem;

      i {
        color: #ff0000;
        cursor: pointer;
      }
    }
  }

  article {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const Box = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #1b1e21;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  user-select: none;
  align-items: center;
  margin: 0.25rem;

  &:hover {
    background: none;
  }
`;

const BoxContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 0 1rem;
  flex: 1;
`;

const ReceiptDialogStyled = styled.section`
  padding: 1rem;
  h1 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }

  section {
    display: flex;
    gap: 0.5rem;

    article {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #1b1e21;
      width: 300px;
    }
  }
`;

const ReceiptDialog = ({ total, lines, bankAccounts }) => {
  const dialog = useDialog();
  const [bankAccountId, setBankAccountId] = useState("");
  const [chosenBankAccount, setChosenBankAccount] = useState(null);

  useEffect(() => {
    if (bankAccountId) {
      const account = bankAccounts.find(
        (bank) => bank.id === parseInt(bankAccountId)
      );
      setChosenBankAccount(account);
    }
  }, [bankAccountId]);

  const getBalanceAfterTransaction = () => {
    if (chosenBankAccount == null) return 0;
    return chosenBankAccount.balance - total;
  };

  const save = async () => {
    const body = {
      lines,
      total,
      bank_account_id: bankAccountId,
    };

    const result = await HttpClient().post("/api/purchase/purchase", body);
    if (result) {
      dialog.close(true);
      await cargoToast.success("Successfully Added purchase");
    }
  };

  return (
    <ReceiptDialogStyled>
      <h1>Summary</h1>
      <Select
        label="Choose Bank Account"
        value={bankAccountId}
        onChange={(e) => setBankAccountId(e.target.value)}
      >
        <option value="">Choose</option>
        {bankAccounts.map((bankAccount, index) => (
          <option value={bankAccount.id} key={index}>
            {bankAccount.name}
          </option>
        ))}
      </Select>

      {chosenBankAccount && (
        <>
          <Table style={{ margin: "1rem 0" }}>
            <tbody>
              <tr>
                <td> chosen Bank Account Balance :</td>
                <td> {chosenBankAccount.balance}</td>
              </tr>
              <tr>
                <td>Total for Purchase</td>
                <td>{total}</td>
              </tr>
              <tr>
                <td>Balance After Transaction(s)</td>
                <td>{getBalanceAfterTransaction()}</td>
              </tr>
            </tbody>
          </Table>
          <PrimaryButton onClick={save}> Save</PrimaryButton>
        </>
      )}
    </ReceiptDialogStyled>
  );
};
const AddTransactionDialog = ({ item }) => {
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const dialog = useDialog();

  const credit = (event) => {
    event.preventDefault();

    if (item.custom) {
      dialog.close({
        ...item,
        amount,
        title,
      });
    } else {
      dialog.close({
        ...item,
        amount,
      });
    }
  };
  return (
    <Modal>
      <h2> Credit {!item.isCustom ? item.title : "Custom"}</h2>

      <form onSubmit={credit}>
        <FloatingTextField
          value={title}
          onChange={() => setTitle(event.target.value)}
          label="Title"
        ></FloatingTextField>
        <FloatingTextField
          value={amount}
          onChange={() => setAmount(event.target.value)}
          label="Amount"
        ></FloatingTextField>
        <PrimaryButton>Add Amount </PrimaryButton>
      </form>
    </Modal>
  );
};
export default function Purchase(props) {
  const [search, setSearch] = useState("");
  const [purchase, setPurchase] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [bankAccounts, setBankAccounts] = useState([]);

  useEffect(() => {
    if (search) {
      const _items = [...items].filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );

      setFilteredItems(_items);
    } else {
      setFilteredItems(items);
    }
  }, [search]);

  useEffect(() => {
    //getPurchases();
    getBankAccounts();
  }, []);

  const getPurchases = async () => {
    const { data } = await HttpClient().get("/api/purchase");
    setBankAccounts(data.content);
  };
  const getBankAccounts = async () => {
    const { data } = await HttpClient().get("/api/bank-accounts");
    setBankAccounts(data.content);
  };
  const getTotal = () => {
    if (!purchase.length) return;
    let total = 0;
    purchase.forEach((item) => {
      total += parseFloat(item.amount);
    });

    return total;
  };

  const credit = async (item) => {
    const result = await CustomDialog(
      <AddTransactionDialog item={item}></AddTransactionDialog>
    );

    if (result) {
      const _purchases = [...purchase];
      _purchases.push(result);
      setPurchase(_purchases);
    }
  };

  const deleteTransaction = (index) => {
    const _purchase = purchase.filter((item, i) => i !== index);
    setPurchase(_purchase);
  };

  const RegisterPurchase = async () => {
    await CustomDialog(
      <ReceiptDialog
        total={getTotal()}
        bankAccounts={bankAccounts}
        lines={Purchase}
      ></ReceiptDialog>
    );
  };

  return (
    <Page>
      <Wrapper>
        <div style={{ flex: 1, height: "100%", overflowY: "auto" }}>
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
          ></SearchInput>
          <div>
            <BoxContainer>
              {filteredItems.map((item, index) => (
                <Box key={index} onClick={() => credit(item)}>
                  {item.title}
                </Box>
              ))}
            </BoxContainer>{" "}
          </div>
        </div>
        <TotalConatainer>
          <h2>Total Transaction</h2>

          <ul>
            {purchase.map((purchaseItem, index) => (
              <li key={index}>
                <span>
                  {purchaseItem.title} -{parseFloat(purchaseItem.amount)}
                </span>
                <a href="#" onClick={() => deleteTransaction(index)}>
                  Delete
                </a>
              </li>
            ))}
          </ul>

          <article style={{ display: "flex", justifyContent: "space-between" }}>
            <span> Total : {getTotal()}</span>
            <PrimaryButton onClick={RegisterPurchase}>Register</PrimaryButton>
          </article>
        </TotalConatainer>
      </Wrapper>
    </Page>
  );
}
