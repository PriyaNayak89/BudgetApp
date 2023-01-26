import "./App.css";
import React, { useEffect, useState } from "react";
import { HttpClient } from "./util/HttpClient.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import styled from "styled-components";
import Sidebar from "./components/Sidebar.jsx";
import { AppContext } from "./AppContext.jsx";
import Purchase from "./pages/purchases.jsx";
import Accounts from "./pages/accounts.jsx";
import Trends from "./pages/trends.jsx";

const Wraper = styled.div`
  display: flex;
  height: 100%;
`;
function App() {
  const [initiated, setInitiated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    if (initiated) return;
    const { data } = await HttpClient().get("/api/auth/init");

    if (data) {
      console.log("data::", data.user, data[1]);
      await setUser(data[1]);
    }

    await setInitiated(true);
    await console.log("user data and initiated::", user, initiated);
  };

  const logout = async () => {
    setUser(null);
    localStorage.setItem("token", null);
    window.location.reload();
  };
  return (
    // <BrowserRouter>
    //   <Wraper>
    //     <Sidebar />
    //     <Routes>
    //       <Route path="/transactions" element={<Purchase />}></Route>
    //       <Route path="/accounts" element={<Accounts />}></Route>
    //       <Route path="/dashboard" element={<Trends />}></Route>
    //     </Routes>
    //   </Wraper>
    // </BrowserRouter>

    <AppContext.Provider
      value={{
        user,
        setUser,
        logout,
      }}
    >
      <>
        {initiated && user ? (
          <BrowserRouter>
            <Wraper>
              <Sidebar />
              <Routes>
                <Route path="/transactions" element={<Purchase />}></Route>
                <Route path="/accounts" element={<Accounts />}></Route>
                <Route path="/trends" element={<Trends />}></Route>
              </Routes>
            </Wraper>
          </BrowserRouter>
        ) : (
          <Login />
        )}
      </>
    </AppContext.Provider>
  );
}

export default App;
